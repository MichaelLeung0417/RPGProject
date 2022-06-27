const scale = 2
const width = 16
const height = 18
const scaled_width = scale * width
const scaled_height = scale * height
const cycle_loop = [0, 1, 0, 2]
const facing_down = 0
const facing_up = 1
const facing_left = 2
const facing_right = 3
const frame_limit = 12
const movement_speed = 2

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let keyPresses = {}
let currentDirection = facing_down
let currentLoopIndex = 0
let frameCount = 0
let positionX = 0
let positionY = 0
let img = new Image()

window.addEventListener('keydown', keyDownListener)
function keyDownListener(event) {
	keyPresses[event.key] = true
}

window.addEventListener('keyup', keyUpListener)
function keyUpListener(event) {
	keyPresses[event.key] = false
}

function loadImage() {
	img.src =
		'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png'
	img.onload = function () {
		window.requestAnimationFrame(gameLoop)
	}
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
	ctx.drawImage(
		img,
		frameX * width,
		frameY * height,
		width,
		height,
		canvasX,
		canvasY,
		scaled_width,
		scaled_height
	)
	//put back to backend battle system please
	// this.map.startCutSence(
	// 	[
	// 		{ type: "battle" }
	// 	]
	// )
	//put back to backend battle system please
}

loadImage()

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	let hasMoved = false

	if (keyPresses.w) {
		moveCharacter(0, -movement_speed, facing_up)
		hasMoved = true
	} else if (keyPresses.s) {
		moveCharacter(0, movement_speed, facing_down)
		hasMoved = true
	}

	if (keyPresses.a) {
		moveCharacter(-movement_speed, 0, facing_left)
		hasMoved = true
	} else if (keyPresses.d) {
		moveCharacter(movement_speed, 0, facing_right)
		hasMoved = true
	}

	if (hasMoved) {
		frameCount++
		if (frameCount >= frame_limit) {
			frameCount = 0
			currentLoopIndex++
			if (currentLoopIndex >= cycle_loop.length) {
				currentLoopIndex = 0
			}
		}
	}

	if (!hasMoved) {
		currentLoopIndex = 0
	}

	drawFrame(
		cycle_loop[currentLoopIndex],
		currentDirection,
		positionX,
		positionY
	)
	window.requestAnimationFrame(gameLoop)
}

function moveCharacter(deltaX, deltaY, direction) {
	if (
		positionX + deltaX > 0 &&
		positionX + scaled_width + deltaX < canvas.width
	) {
		positionX += deltaX
	}
	if (
		positionY + deltaY > 0 &&
		positionY + scaled_height + deltaY < canvas.height
	) {
		positionY += deltaY
	}
	currentDirection = direction
}
