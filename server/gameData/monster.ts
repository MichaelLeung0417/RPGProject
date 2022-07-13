import { Position } from './player'

export class Monster {
	// Think of how to write injure
	private hp: number
	private name: string
	private position: Position
	private boardColumns: number
	private boardRows: number

	constructor() {
		this.hp = 100
		this.name = 'BUGS'
		this.boardColumns = 16
		this.boardRows = 16
		this.position = {
			x: Math.floor(Math.random() * this.boardRows),
			y: Math.floor(Math.random() * this.boardColumns)
		}
	}

	injure(attack: number) {
		this.hp -= attack
		if (this.hp < 0) {
			this.hp = 0
		}
		return this.hp
	}

	getHP(): number {
		return this.hp
	}

	getName(): string {
		return this.name
	}

	getPosition(): {} {
		return this.position
	}
}
