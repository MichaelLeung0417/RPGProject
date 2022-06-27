import express from 'express'
import expressSession from 'express-session'
import fs from 'fs'

const main = express()

main.use(
	expressSession({
		secret: 'qwpoejqpwoejqpeoj',
		saveUninitialized: true,
		resave: true
	})
)

main.use(express.urlencoded())

main.use(express.static('public'))

main.get('/', (req, res) => {
	res.redirect('login.html')
})

main.post('/login', (req, res) => {
	if (req.body.username === 'tester' && req.body.password === '123') {
		req.session['isUser'] = true
	}
	res.send('done')
})

const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if ((req.session['isUser'] = true)) {
		next()
	} else {
		res.send('wrong password')
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
})

main.listen(8000)
