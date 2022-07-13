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
// let checkLocation = [{}]

//spritesheet
// const scale = 2
// const width = 16
// const height = 18
// const scaled_width = scale * width
// const scaled_height = scale * height
// const cycle_loop = [0, 1, 0, 2]
// const facing_down = 0
// const facing_up = 1
// const facing_left = 2
// const facing_right = 3
// const frame_limit = 12
var sprite_sheet
var character_animation

const socket = io.connect()

// function preload() {
// 	sprite_sheet = loadSpriteSheet('./image/Soldier-Red.png', 16, 18, 192)
// 	character_animation = loadAnimation(sprite_sheet)
// }

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
	clear()
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

// socket.on('allPlayerLocation', (data) => {
// 	checkLocation = data
// })

// get battle event
socket.on('battleEvent', (data) => {
	console.log(data)
	if (data) {
		//select canvas
		document.getElementById('canvas').classList.add('noshow')
		document.getElementById('BattleScene').classList.remove('noshow')

		//battleing player
		let battlePlayer = document.createElement('div')
		battlePlayer.classList.add('battlePlayer')
		document.querySelector('#BattleScene1').appendChild(battlePlayer)

		//player sword attack
		document.querySelector('#phyAttack').addEventListener('click', () => {
			battlePlayer.classList.add('playerSlash')
			setTimeout(() => {
				battlePlayer.classList.remove('playerSlash')
			}, 3000)
		})
		//player sword attack

		//player magical action
		document
			.querySelector('#magicalAttack')
			.addEventListener('click', () => {
				battlePlayer.classList.add('playerMagic')
				//battling player fire ball
				let fireball = document.createElement('div')
				fireball.classList.add('fireball')
				document.querySelector('#BattleScene1').appendChild(fireball)
				setTimeout(() => {
					fireball.remove()
				}, 1000)
				setTimeout(() => {
					battlePlayer.classList.remove('playerMagic')
					fireball.remove()
				}, 3000)
			})
		//player magical action

		//Alex
		let Alex = document.createElement('div')
		Alex.classList.add('Alex')
		document.querySelector('#BattleScene1').appendChild(Alex)

		//enemy
		let enemyCat = document.createElement('div')
		enemyCat.classList.add('enemyCat')
		document.querySelector('#BattleScene1').appendChild(enemyCat)

		//enemyCatSlash
		setInterval(() => {
			enemyCat.classList.add('enemyCatSlash')
			setTimeout(() => {
				enemyCat.classList.remove('enemyCatSlash')
			}, 3000)
		}, 5000)
		//enemyCatSlash
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

// function loadImage() {
// 	img.src =
// 		'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png'
// 	img.onload = function () {
// 		window.requestAnimationFrame(gameLoop)
// 	}
// }

// function drawFrame(frameX, frameY, canvasX, canvasY) {
// 	ctx.drawImage(
// 		img,
// 		frameX * width,
// 		frameY * height,
// 		width,
// 		height,
// 		canvasX,
// 		canvasY,
// 		scaled_width,
// 		scaled_height
// 	)
// }

// loadImage()

// function gameLoop() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height)

// 	let hasMoved = false

// 	if (keyPresses.w) {
// 		moveCharacter(0, -movement_speed, facing_up)
// 		hasMoved = true
// 	} else if (keyPresses.s) {
// 		moveCharacter(0, movement_speed, facing_down)
// 		hasMoved = true
// 	}

// 	if (keyPresses.a) {
// 		moveCharacter(-movement_speed, 0, facing_left)
// 		hasMoved = true
// 	} else if (keyPresses.d) {
// 		moveCharacter(movement_speed, 0, facing_right)
// 		hasMoved = true
// 	}

// 	if (hasMoved) {
// 		frameCount++
// 		if (frameCount >= frame_limit) {
// 			frameCount = 0
// 			currentLoopIndex++
// 			if (currentLoopIndex >= cycle_loop.length) {
// 				currentLoopIndex = 0
// 			}
// 		}
// 	}

// 	if (!hasMoved) {
// 		currentLoopIndex = 0
// 	}

// 	drawFrame(
// 		cycle_loop[currentLoopIndex],
// 		currentDirection,
// 		positionX,
// 		positionY
// 	)
// 	window.requestAnimationFrame(gameLoop)
// }
