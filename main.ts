import express from 'express'
import expressSession from 'express-session'
import fs from 'fs'
import { Client } from 'pg'
import dotenv from 'dotenv'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import { chat } from './message'

dotenv.config()

export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

client.connect()

const main = express()
const server = new http.Server(main)
const io = new SocketIO(server)

io.on('connection', (client) => {
	client.emit('init', { data: 'hello world' })
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
		let users
		try {
			users = JSON.parse(await fs.promises.readFile('users.json', 'utf8'))
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
		let users
		try {
			users = JSON.parse(await fs.promises.readFile('users.json', 'utf8'))
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

		users.push({
			username: req.body.username.trim(),
			password: req.body.password.trim()
		})

		await fs.promises.writeFile('users.json', JSON.stringify(users))

		// let username = req.body.username.trim()
		// let password = req.body.password.trim()

		// {
		// 	let output = await client.query(
		// 		'SELECT * FROM account WHERE username=$1',
		// 		[username]
		// 	)

		// 	if (output.rows.length > 0) {
		// 		res.redirect('/?error=重覆username')
		// 		return
		// 	}
		// }

		// {
		// 	try {
		// 		let output = await client.query(
		// 			'INSERT INTO account(username, password) VALUES($1,$2)',
		// 			[username, password]
		// 		)
		// 	} catch (err) {
		// 		console.error(err)
		// 		res.status(500).send('Internal Server Error')
		// 		return
		// 	}
		// }

		res.redirect('/')
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

main.use(chat)


main.use(express.static('private'))
main.use(isLogin, express.static('public'))
main.listen(8000)
