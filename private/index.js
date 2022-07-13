// const data = require('../map/QQQ')
let img
let board
let maxDistance, canvas, columns, rows
let gridSize = 40
let currentLocation = { x: 1, y: 1 }
let beforelocation = {}
let bugsLocation = {}
let battleFinished = true
let playerDir = 'down'
let bugsHp = 100
let bugsName

const socket = io.connect()

function setup() {
	canvas = createCanvas(680, 680)
	img = loadImage('./floor2.png')
	canvas.parent('canvas')
	columns = floor(width / gridSize)
	rows = floor(height / gridSize)
	board = new Array(columns)
	for (let i = 0; i < columns; i++) {
		board[i] = new Array(rows)
	}
	document.addEventListener('keydown', (e) => {
		keydown(e)
	})
	init()
}

//typing detection
let typing = false
document.querySelector('#enterMessage').addEventListener('focus', () => {
	typing = true
})

document.querySelector('#enterMessage').addEventListener('blur', () => {
	typing = false
})

//draw the map
function draw() {
	image(img, 0, 0)
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			if (board[i][j] == 1) {
				fill(0)
			} else if (board[i][j] == 2) {
				fill(150)
			} else if (board[i][j] == 0) {
				noFill()
			}
			rect(i * gridSize, j * gridSize, gridSize - 1, gridSize - 1)
		}
	}
	board[currentLocation.x][currentLocation.y] = 1
}

//reset the map
function init() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			board[i][j] = 0
		}
	}
}

//get bugs location
socket.on('bugsLocation', (data) => {
	bugsLocation = data
	board[bugsLocation.x][bugsLocation.y] = 2
	console.log(data)
})

//get bugs hp
socket.on('bugsHp', (data) => {
	bugsHp = data
})

//get bugs name
socket.on('bugsName', (data) => {
	bugsName = data
})

//get player previous location
socket.on('beforeLocation', (data) => {
	beforelocation = data
	board[beforelocation.x][beforelocation.y] = 0
})

//get player current location
socket.on('currentLocation', (data) => {
	currentLocation = data
	board[currentLocation.x][currentLocation.y] = 1
})

socket.on('currentDir', (data) => {
	playerDir = data
})

// get battle event
socket.on('battleEvent', (data) => {
	console.log(data)
	if (data) {
		//select canvas
		document.getElementById('canvas').classList.add('noshow')
		document.getElementById('BattleScene').classList.remove('noshow')

		//battling player
		let battlePlayer = document.createElement('div')
		battlePlayer.classList.add('player')
		document.querySelector('#BattleScene1').appendChild(battlePlayer)

		//battling player fir ball
		let fireball = document.createElement('div')
		fireball.classList.add('fireball')
		document.querySelector('#BattleScene1').appendChild(fireball)

		//Alex
		let Alex = document.createElement('div')
		Alex.classList.add('Alex')
		document.querySelector('#BattleScene1').appendChild(Alex)
	}
})

//check bugs hp
if (bugsHp == 0) {
	//tell server battle is finished
	socket.emit('battleFinished', battleFinished)
}

//tell server client keydown event
function keydown(e) {
	if (typing) {
		return
	}
	socket.emit('keydown', e.keyCode)
}
