import express from 'express'
import expressSession from 'express-session'
// import fs from 'fs'
import { Client } from 'pg'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import { chat } from './message'
import { Character } from './gameData/player'
import Gameroom from './gameData/room'
import { Monster } from './gameData/monster'
import { BattleEvent } from './gameData/event'

dotenv.config()

export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

client.connect()

const main = express()
const server = new http.Server(main)
export const io = new SocketIO(server)

const gameroom = new Gameroom()
const bugs = new Monster()
const battleEvent = new BattleEvent()
console.log(bugs.getPosition())
let playerArr = gameroom.getOnlinePlayers()

io.on('connection', async function (socket) {
	console.log(`${socket.id}: Sever connect to client`)
	const req = socket.request as express.Request
	socket.leave(`${req.session['playing-user']}-chatRoom`)
	client.query(`UPDATE accounts SET login = FALSE WHERE username=$1`, [
		req.session['playing-user']
	])
	req.session['isUser'] = false
	console.log('reset user status')
	client.query(`UPDATE accounts SET login = TRUE WHERE username=$1`, [
		req.session['playing-user']
	])

	let updatedLoginUserList = await client.query(`
	SELECT username FROM accounts WHERE login = TRUE
	`)

	io.emit('loginUserList', updatedLoginUserList.rows)

	//boardcast
	socket.on('sendSever', async function (data) {
		client.query(
			`INSERT INTO text (messages, created_at, updated_at) VALUES ( $1, NOW(), NOW())`,
			[data.messages]
		)
		let dbData = await client.query(
			`SELECT messages FROM text ORDER BY id DESC LIMIT 5`
		)
		let boardcastMessage = dbData.rows
		io.emit('sendClient', boardcastMessage)
	})

	//end to end
	socket.on('private-message', function (data) {
		io.to(`${data.receiver}`).emit('designateClient', {
			sender: req.session['playing-user'],
			messages: data.messages
		})
	})

	//join client own room
	try {
		if (req.session['isUser']) {
			//may not need double check
			socket.join(`${req.session['playing-user']}-chatRoom`)
		}
	} catch (err) {
		console.error(err)
		console.log('Internal Server Error')
		return
	}

	//offline detection
	socket.on('connect', () => {
		console.log(`${req.session['playing-user']} online`)
	})

	socket.on('disconnect', function () {
		socket.leave(`${req.session['playing-user']}-chatRoom`)
		client.query(`UPDATE accounts SET login = FALSE WHERE username=$1`, [
			req.session['playing-user']
		])
		req.session['isUser'] = false
		console.log(`${req.session['playing-user']} disconnected`)
	})

	//add player to game room
	socket.on('CharacterSubmit', function (data: string) {
		//new player
		let player = new Character(data)
		//generate a player id to each player
		player.id = req.session['playing-user']
		//add player to current game room
		gameroom.addPlayer(player)
		//tell client bugs location
		socket.emit('bugsLocation', bugs.getPosition())
		console.log(`bugs position is: ${bugs.getPosition()}`)
	})

	//get frontend keyCode value
	socket.on('keydown', function (data: number) {
		for (let i: number = 0; i < playerArr.length; i++) {
			if (req.session['playing-user'] === playerArr[i].id) {
				const lz = playerArr[i].getPosition()
				const dir = playerArr[i].getDirection()
				//tell client player pre location
				socket.emit('beforeLocation', lz)
				//tell client player pre direction
				socket.emit('beforeDir', dir)

				//chenge player location
				playerArr[i].move(data)

				//tell client player current location
				socket.emit('currentLocation', playerArr[i].getPosition())
				//tell client player current direction
				socket.emit('currentDir', playerArr[i].getDirection())

				//check if player coli with bugs. If true, tell client battle start
				if (playerArr[i].getPosition() == bugs.getPosition()) {
					socket.emit('battleEvent', battleEvent.getEvent())
				}
			}
		}
	})

	//listen to client when battle finished
	socket.on('battleFinished', function (data: boolean) {
		if ((data = true)) {
			battleEvent.battleFinished()
		}
	})
})

const sessionMiddleware = expressSession({
	secret: 'Tecky Academy teaches typescript',
	resave: true,
	saveUninitialized: true
})

main.use(sessionMiddleware)

io.use((socket, next) => {
	let req = socket.request as express.Request
	let res = req.res as express.Response
	sessionMiddleware(req, res, next as express.NextFunction)
})

main.use(express.urlencoded())
main.use(express.json())

main.get('/', (req, res) => {
	res.redirect('/login.html')
})

//login
main.post('/login', async (req, res) => {
	try {
		let users: {
			username: string
			password: string
			charname: string
		}[]

		let username: string = req.body.username.trim()
		let password: string = req.body.password.trim()
		try {
			users = (
				await client.query(
					'SELECT * FROM accounts WHERE username=$1 AND password=$2',
					[username, password]
				)
			).rows
		} catch (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
			return
		}
		for (const user of users) {
			if (
				user.username.trim() === req.body.username.trim() &&
				user.password.trim() === req.body.password.trim()
				// && user.charname !== null
			) {
				req.session['isUser'] = true
				req.session['playing-user'] = `${req.body.username.trim()}`
				res.redirect('/charInfo.html')
				return
			}
			//  else if (
			// 	user.username.trim() === req.body.username.trim() &&
			// 	user.password.trim() === req.body.password.trim() &&
			// 	user.charname == null
			// ) {
			// 	req.session['isUser'] = true
			// 	req.session['playing-user'] = `${req.body.username.trim()}`
			// 	client.query(
			// 		'UPDATE accounts SET login = TRUE WHERE username=$1',
			// 		[req.body.username]
			// 	)
			// 	res.redirect('/charNameInput.html')
			// 	return
			// }
		}

		if (
			client.query('SELECT * FROM accounts WHERE username=$1', [
				username
			]) !== req.body.username.trim() ||
			client.query('SELECT * FROM accounts WHERE password=$1', [
				password
			]) !== req.body.password.trim()
		) {
			res.redirect('/')
		}
	} catch (err) {
		console.error(err)
		console.log(req.body)
		res.status(500).send('Internal Server Error')
	}
})

//check login
const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isUser'] == true) {
		next()
	} else {
		res.redirect('/login.html')
	}
}

//logout
main.post('/logout', isLogin, (req, res) => {
	req.session['isUser'] = false
	client.query(`UPDATE accounts SET login = FALSE WHERE username=$1`, [
		req.body.username
	])
	res.redirect('/')
})

// main.post('/charNameInput', isLogin, (req, res) => {
// 	res.redirect('/charNameInput.html')
// })

//get player's character name
main.post('/charNameSubmit', isLogin, async (req, res) => {
	res.redirect('index.html')
})

// main.post('/comfirmLogin', isLogin, (req, res) => {
// 	res.redirect('index.html')
// })

//register
main.post('/register', async (req, res) => {
	try {
		let users: {
			username: string
		}[]

		let username = req.body.username.trim()
		let password = req.body.password.trim()
		try {
			users = (
				await client.query('SELECT * FROM accounts WHERE username=$1', [
					username
				])
			).rows
		} catch (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
			return
		}

		for (const user of users) {
			if (user.username.trim() === req.body.username.trim()) {
				res.redirect('/?error=重覆username')
				return
			}
		}

		await client.query(
			'INSERT INTO accounts(username, password, login, created_at, updated_at) VALUES($1,$2,$3,NOW(),NOW())',
			[username, password, false]
		)

		res.redirect('/')
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

main.use(chat)
main.use(express.static('../public'))
main.use(isLogin, express.static('../private'))

server.listen(8000, function () {
	console.log(`Listening on 8000 port`)
})
