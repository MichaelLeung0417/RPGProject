import { Character } from './player'
import { Monster } from './monster'
import { Socket } from 'socket.io'

export class BattleEvent {
	private isEvent: boolean

	constructor(
		private player: Character,
		private bugs: Monster,
		private socket: Socket
	) {
		this.isEvent = false
	}

	getEvent() {
		return this.isEvent
	}

	// battleStart() {
	// 	this.isEvent = true
	// }

	battleFinished() {
		this.isEvent = false
	}

	checkEvent(player: Character, bugs: Monster) {
		if (
			JSON.stringify(player.getPosition()) ==
			JSON.stringify(bugs.getPosition())
		) {
			this.isEvent = true
		}
		return this.isEvent
	}

	getEventInfo() {
		return {
			isEvent: this.isEvent
		}
	}

	playerAction(usePrimaryAttack: boolean) {
		const { player, bugs, socket } = this
		const duration = player.attack(usePrimaryAttack, bugs)
		bugs.attack(player)
		setTimeout(() => {
			socket.emit('playerHp', player.getPlayerData().hp)
		}, duration)
		//tell client bugs hp
		socket.emit('bugsHp', bugs.getHP())

		//tell client battle is finished
		if (bugs.getHP() == 0) {
			this.battleFinished()
			setTimeout(() => {
				socket.emit(
					'battleFinished',
					this.battleFinished() // [CODE REVIEW] battleEvent.battleFinished has no return
				)
			}, duration)
			player.levelUp()

			socket.emit('playerLevel', player.getLevel())
			bugs.respawn()
			socket.emit('bugsLocation', bugs.getPosition())
		}

		if (player.getPlayerData().hp == 0) {
			this.battleFinished()
			setTimeout(() => {
				socket.emit('battleFinished', this.battleFinished())
			}, duration)

			player.respawn()
		}
	}
}
