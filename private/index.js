// const data = require('../map/QQQ')

let board
let next
let maxDistance, canvas, columns, rows
let gridSize = 40
let playerlocation = { x: 1, y: 1 }

function setup() {
	canvas = createCanvas(680, 680)
	canvas.parent('canvas')
	columns = floor(width / gridSize)
	rows = floor(height / gridSize)
	board = new Array(columns)
	for (let i = 0; i < columns; i++) {
		board[i] = new Array(rows)
	}
	// Going to use multiple 2D arrays and swap them
	next = new Array(columns)
	for (i = 0; i < columns; i++) {
		next[i] = new Array(rows)
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

function draw() {
	// generate()
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			if (board[i][j] == 1) fill(0)
			else fill(255)
			stroke(0)
			rect(i * gridSize, j * gridSize, gridSize - 1, gridSize - 1)
		}
	}
}

function init() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			board[i][j] = 0
			next[i][j] = 0
		}
	}
}

socket.on('playerLocation', (data) => {
	playerlocation = data
	board[playerlocation.x][playerlocation.y] = 1

	let temp = board
	board = next
	next = temp
})

function keydown(e) {
	if (typing) {
		return
	}
	socket.emit('keydown', e.keyCode)
}

// function generate() {
// 	socket.on('playerLocation', (data) => {
// 		board[data.x][data.y] = 1
// 		next[data.x][data.y] = 0
// 	})

// 	let temp = board
// 	board = next
// 	next = temp
// }
