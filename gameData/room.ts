class MAP {
	private location: {}[][]
	// private playerPosition: {}

	public constructor() {
		this.location = []

		for (let i: number = 0; i < 20; i++) {
			for (let j: number = 0; j < 20; j++) {
				this.location[i][j] = new MAP()
			}
		}
	}

	// checkPosition(): {} {
	// 	for (let i: number = 0; i < character.length; i++) {
	// 		this.playerPosition = player.getPosition()
	// 	}
	// 	return this.playerPosition
	// }
}
