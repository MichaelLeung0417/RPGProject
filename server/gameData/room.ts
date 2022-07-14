import { Character } from './player'
import { Monster } from './monster'

export default class Gameroom {
	private onlinePlayers: Character[]
	private existedBugs: Monster[]

	constructor() {
		this.onlinePlayers = []
		this.existedBugs = []
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

	getBugsInMap() {
		return this.existedBugs
	}

	getAllMapData() {
		let playerInMap: {
			x: number
			y: number
		}[] = []

		let bugsInMap: {
			x: number
			y: number
		}[] = []

		for (const player of this.onlinePlayers) {
			playerInMap.push({
				x: player.getPlayerData().position.x,
				y: player.getPlayerData().position.y
			})
		}

		for (const bugs of this.existedBugs) {
			bugsInMap.push({
				x: bugs.getMonsterData().position.x,
				y: bugs.getMonsterData().position.y
			})
		}

		return this.getAllMapData
	}
}
