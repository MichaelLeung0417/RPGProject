function init() {
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	canvas.width = canvas.height = 1000

	ctx.fillRect(255, 255, canvas.width, canvas.height)
	ctx.rect(0, 0, 0)

	document.addEventListener('keydown', keydown)
	gameActive = true
}

function keydown(e) {
	socket.emit('keydown', e.keyCode)
}

init()
