// const tileSize = 50
// const noiseScale = 0.1
// const speed = 5
// const buffer = 10
// const images = []

// var x = 0
// var y = 0
// var w = 0
// var h = 0
// var xRO = 0
// var yRO = 0
// var xTO = 0
// var yTO = 0

// const tiles = []

// function preload() {
// 	images.push(loadImage('water.png'))
// 	images.push(loadImage('sand.png'))
// 	images.push(loadImage('grass.png'))
// 	images.push(loadImage('forest.png'))
// }

// function setup() {
// 	createCanvas(1080, 720)
// 	w = width / tileSize + buffer
// 	h = height / tileSize + buffer
// 	noStroke()
// 	colorMode(HSB)
// 	drawTerrain()
// }

// function checkKey(key) {
// 	if (key == ' ') {
// 		noiseSeed(millis())
// 		drawTerrain()
// 	}
// 	if (key === 'w') {
// 		y -= speed
// 	}
// 	if (key === 's') {
// 		y += speed
// 	}
// 	if (key === 'a') {
// 		x -= speed
// 	}
// 	if (key === 'd') {
// 		x += speed
// 	}
// }

// function drawTerrain() {
// 	xRO = x % tileSize
// 	yRO = y % tileSize
// 	xTO = parseInt(x / tileSize)
// 	yTO = parseInt(y / tileSize)
// 	for (let i = 0; i < w; i++) {
// 		for (let j = 0; j < h; j++) {
// 			tiles[i + j * w] = getTile(i, j)
// 		}
// 	}

// 	for (let i = 0; i < w; i++) {
// 		for (let j = 0; j < h; j++) {
// 			image(
// 				tiles[i + j * w],
// 				(i - buffer / 2) * tileSize - xRO,
// 				(j - buffer / 2) * tileSize - yRO,
// 				tileSize,
// 				tileSize
// 			)
// 		}
// 	}
// }

// function getTile(x, y, terrainScales) {
// 	let v = noise((xTO + x) * noiseScale, (yTO + y) * noiseScale)
// 	let scales = [0.4, 0.5, 0.7, 1]
// 	for (let i = 0; i < scales.length; i++) {
// 		let terrainScale = scales[i]
// 		if (v <= terrainScale) {
// 			return images[i]
// 		}
// 	}
// }

// function draw() {
// 	clear()
// 	update()
// 	drawTerrain()
// }

// function update() {
// 	if (keyIsPressed) {
// 		checkKey(key)
// 	}
// }
