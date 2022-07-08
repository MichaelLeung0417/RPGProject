export class Map {
	private boardColumns: number = 16
	private boardRows: number = 16

	constructor(boardColumns: number, boardRows: number) {
		this.boardColumns = boardColumns
		this.boardRows = boardRows
	}

	getMap() {
		return {
			boardColumns: this.boardColumns,
			boardRows: this.boardRows
		}
	}
}
