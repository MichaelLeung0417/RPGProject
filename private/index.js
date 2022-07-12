

// const data = require('../map/QQQ')
let img;
let board
let maxDistance, canvas, columns, rows
let gridSize = 40
let currentLocation = { x: 1, y: 1 }
let beforelocation = {}

function setup() {
	canvas = createCanvas(680, 680)
	img = loadImage('./classroom2.png');
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
	image(img, 0, 0);
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			if (board[i][j] == 1) fill(0)
			else noFill()
			stroke(0)
			rect(i * gridSize, j * gridSize, gridSize - 1, gridSize - 1)
		}
	}
	board[currentLocation.x][currentLocation.y] = 1
	init()
}

function init() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			board[i][j] = 0
		}
	}
}

socket.on('beforeLocation', (data) => {
	beforelocation = data
	console.log(beforelocation)
	board[beforelocation.x][beforelocation.y] = 0
})

socket.on('currentLocation', (data) => {
	currentLocation = data
	console.log(currentLocation)
	board[currentLocation.x][currentLocation.y] = 1
})

function keydown(e) {
	if (typing) {
		return
	}
	socket.emit('keydown', e.keyCode)
}
