const bg_color = '#81d8d0'
const player_color = '#fff'
const items_color = '#e99984'
let canvas, ctx
let gridsize = 200

function init() {
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	canvas.width = canvas.height = 800

	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.rect(0, 0, 0, 0)

	document.addEventListener('keydown', keydown)
}

function keydown(e) {
	socket.emit('keydown', e.keyCode)
}

init()

function printWorld(state) {
	ctx.fillStyle = bg_color
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	const gridsize = state.gridsize
	const items = state.items
	const size = canvas.width / gridsize

	ctx.fillStyle = items_color
	ctx.fillRect(items.x * size, items.y * size, size, size)

	Player(state.player, size, player_color)
}
