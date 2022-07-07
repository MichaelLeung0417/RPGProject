export class Map {
	private location: {}[][]

	public constructor() {
		this.location = []

		for (let i: number = 0; i < 20; i++) {
			for (let j: number = 0; j < 20; j++) {
				this.location[i][j] = new Map()
			}
		}
	}
}
