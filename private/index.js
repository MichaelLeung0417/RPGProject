let board = []
let maxDistance, canvas, columns, rows
let gridSize = 40

function setup() {
	canvas = createCanvas(640, 640)
	canvas.parent('canvas')
	columns = floor(width / gridSize)
	rows = floor(height / gridSize)
	for (let x = 0; x < width; x++) {
		board[x] = [] // create nested array
		for (let y = 0; y < height; y++) {
			let distance = dist(width / 2, height / 2, x, y)
			board[x][y] = (distance / maxDistance) * 255
		}
	}
	document.addEventListener('keydown', (e) => {
		keydown(e)
	})
	init()
	noLoop()
}

function draw() {
	background(0)

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
	socket.on('playerLocation', (data) => {
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				if (board[i][j] == board[data.x][data.y]) {
					fill(255)
					stroke(255)
				}
			}
		}
		console.log('x: ' + data.x + ' y: ' + data.y)
	})
}

function keydown(e) {
	socket.emit('keydown', e.keyCode)
}
