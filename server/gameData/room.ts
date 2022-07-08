import { Character } from './player'
import { Monster } from './monster'

export default class Gameroom {
	private onlinePlayers: Character[] = []
	private existedBugs: Monster[] = []
	private boardColumns: number = 16
	private boardRows: number = 16

	constructor(
		onlinePlayers: Character[],
		existedBugs: Monster[],
		boardColumns: number,
		boardRows: number
	) {
		this.onlinePlayers = onlinePlayers
		this.existedBugs = existedBugs
		this.boardColumns = boardColumns
		this.boardRows = boardRows
	}

	addPlayer(player: Character) {
		this.onlinePlayers.push(player)
	}

	addBugs(bugs: Monster) {
		this.existedBugs.push(bugs)
	}

	getAllPlayers() {
		let playerInMap: {
			x: number
			y: number
		}[] = []

		for (const player of this.onlinePlayers) {
			while (
				player.getPlayerData().position.x < this.boardColumns &&
				player.getPlayerData().position.y < this.boardRows
			) {
				playerInMap.push({
					x: player.getPlayerData().position.x,
					y: player.getPlayerData().position.y
				})
			}
		}
		return playerInMap
	}
}
