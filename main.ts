import express from 'express'
import expressSession from 'express-session'
import fs from 'fs'
import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const client = new Client({
	database: process.env.DB_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

client.connect()

const main = express()

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
				res.redirect('/index.html')
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
	res.redirect('/index.html')
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

		res.redirect('/')
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

main.use(express.static('private'))
main.use(isLogin, express.static('public'))
main.listen(8000)
