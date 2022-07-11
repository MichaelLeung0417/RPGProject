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
let playerArr = gameroom.getOnlinePlayers()

io.on('connection', async function (socket) {
	console.log(`${socket.id}: Sever connect to client`)
	const req = socket.request as express.Request

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

	socket.on("disconnect",()=>{
	    //... rest of the code
		socket.leave(`${req.session['playing-user']}-chatRoom`)
		client.query(`UPDATE accounts SET login = FALSE WHERE username=$1`, [req.session['player-user']])
		req.session['isUser'] = false;
		console.log('disconnection')
	})

	//add player to game room
	socket.on('CharacterSubmit', function (data: string) {
		let player = new Character(data)
		gameroom.addPlayer(player)
	})

	//get frontend keyCode value
	socket.on('keydown', function (data: number) {
		for (let i: number = 0; i < playerArr.length; i++) {
			playerArr[i].move(data)
			console.log(playerArr[i].getPosition())
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

main.post('/login', async (req, res) => {
	try {
		let users: {
			username: string
			password: string
		}[]

		let username = req.body.username.trim()
		let password = req.body.password.trim()
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
			) {
				req.session['isUser'] = true
				req.session['playing-user'] = `${req.body.username.trim()}`
				client.query(
					`UPDATE accounts SET login = TRUE WHERE username=$1`,
					[req.body.username]
				)
				res.redirect('/charInfo.html')
				return
			}
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

main.post('/logout', (req, res) => {
	req.session['isUser'] = false
	res.redirect('/')
})

main.get('/game', isLogin, (req, res) => {
	res.redirect('/charInfo.html')
})

main.post('/comfirmLogin', isLogin, (req, res) => {
	res.redirect('index.html')
})

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
