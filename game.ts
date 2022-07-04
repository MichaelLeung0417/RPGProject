const GRID_SIZE = 200

function initGame() {
	const state = createGameState()
	return state
}

function createGameState() {
	return {
		players: {
			pos: {
				x: 3,
				y: 10
			},
			vel: {
				x: 1,
				y: 0
			},
			snake: [
				{ x: 1, y: 10 },
				{ x: 2, y: 10 },
				{ x: 3, y: 10 }
			]
		},
		gridsize: GRID_SIZE
	}
}

function getUpdatedVelocity(keyCode: number): { x: number; y: number } {
	switch (keyCode) {
		case 37: {
			// left
			return { x: -1, y: 0 }
		}
		case 38: {
			// down
			return { x: 0, y: -1 }
		}
		case 39: {
			// right
			return { x: 1, y: 0 }
		}
		case 40: {
			// up
			return { x: 0, y: 1 }
		}
		default: {
			return { x: 0, y: 0 }
		}
	}
}
