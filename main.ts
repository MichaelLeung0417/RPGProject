import express from 'express'
import expressSession from 'express-session'
// import fs from 'fs'
import { Client } from 'pg'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import {chat} from "./message"

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

io.on('connection', function(socket){
    console.log('Sever connect to client')
    socket.on('sendSever', async function(data){
        client.query(`INSERT INTO text (messages, created_at, updated_at) VALUES ( $1, NOW(), NOW())`,[data.messages])
        let dbData = await client.query(`SELECT messages FROM text`)
		let boardcastMessage =dbData.rows
        io.emit('sendClient', boardcastMessage)
    })
})

main.use(
	expressSession({
		secret: 'qwpoejqpwoejqpeoj',
		saveUninitialized: true,
		resave: true
	})
)

main.use(express.urlencoded())
main.use(express.json())

main.get('/', (req, res) => {
	res.redirect('login.html')
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
			'INSERT INTO accounts(username, password) VALUES($1,$2)',
			[username, password]
		)

		res.redirect('/')
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

main.use(chat)
main.use(express.static('private'))
main.use(isLogin, express.static('public'))



server.listen(8000, function () {
	console.log(`Listening on 8000 port`)
})
