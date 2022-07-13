// import { Character } from './player'
// import { Monster } from './monster'

export class BattleEvent {
	private isEvent: boolean

	constructor() {
		this.isEvent = false
	}

	getEvent() {
		return this.isEvent
	}

	battleFinished() {
		this.isEvent = false
	}

	// checkEvent(player: Character, bugs: Monster) {
	// 	if (player.getPosition() == bugs.getPosition()) {
	// 		this.isEvent = true
	// 	}
	// }

	public getBattleEventData() {
		return {
			isEvent: this.isEvent
		}
	}
}
