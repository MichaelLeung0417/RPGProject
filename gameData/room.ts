import { Character } from './player'
import { Monster } from './monster'
import { Map } from './map'

export default class Gameroom {
	private onlinePlayers: Character[] = []
	private existedBugs: Monster[] = []

	AddPlayer(player: Character) {
		this.onlinePlayers.push(player)
	}

	AddBugs(bugs: Monster) {
		this.existedBugs.push(bugs)
	}

	getAllPlayers() {
		let playerInMap: {
			x: number
			y: number
		}[] = []

		for (const player of this.onlinePlayers) {
			playerInMap.push({
				x: player.getPlayerData().position.x,
				y: player.getPlayerData().position.y
			})
		}
	}
}
