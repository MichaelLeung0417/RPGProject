import { Character } from './player'
import { Monster } from './monster'

export default class Gameroom {
	private onlinePlayers: string[] = []
	private existedBugs: string[] = []

	AddPlayer(player: Character) {
		this.onlinePlayers.push(player.getPlayerData().name)
	}

	AddBugs(bugs: Monster) {
		this.existedBugs.push(bugs.getMonsterData().name)
	}
}
