import { Character } from './player'
import { Monster } from './monster'

export default class Gameroom {
	private onlinePlayers: Character[]
	private existedBugs: Monster[]
	private boardColumns: number
	private boardRows: number

	constructor() {
		this.onlinePlayers = []
		this.existedBugs = []
		this.boardColumns = 16
		this.boardRows = 16
	}

	addPlayer(player: Character) {
		this.onlinePlayers.push(player)
	}

	addBugs(bugs: Monster) {
		this.existedBugs.push(bugs)
	}

	getOnlinePlayers() {
		return this.onlinePlayers
	}

	// getBugsInMap() {
	// 	return this.existedBugs
	// }

	getAllPlayers() {
		let playerInMap: {
			x: number
			y: number
		}[] = []

		for (const player of this.onlinePlayers) {
			while (
				player.getPlayerData().position.x < this.boardRows &&
				player.getPlayerData().position.y < this.boardColumns
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
