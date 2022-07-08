export class Map {
	private boardColumns: number = 20
	private boardRows: number = 20

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
