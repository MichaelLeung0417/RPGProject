import { Monster } from './monster'

export interface Attack {
	damage: number
}

class phyAtk implements Attack {
	//Phy Attack here
	damage: number
	constructor(damage: number) {
		this.damage = damage
	}
}

class magicAtk implements Attack {
	//Magic Attack here
	damage: number
	constructor(damage: number) {
		this.damage = damage
	}
}

export interface Position {
	x: number
	y: number
}

interface Players {
	attack(bugs: Monster): void
	switchAttack(): void
	move(keyCode: number): void
	levelUp(bugs: Monster): void
}

export class Character implements Players {
	private name: string
	private primary: Attack
	private secondary: Attack
	private usePrimaryAttack: boolean
	private position: Position
	private hp: number
	private level: number
	private boardColumns: number
	private boardRows: number

	constructor(name: string) {
		this.primary = new phyAtk(30)
		this.secondary = new magicAtk(40)
		this.hp = 10
		this.level = 1
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
		this.boardColumns = 16
		this.boardRows = 16
	}

	attack(bugs: Monster): void {
		let damage = 0
		if (this.usePrimaryAttack) {
			// TODO: use primary attack
			damage = this.primary.damage
		} else {
			// TODO: use secondary attack
			damage = this.secondary.damage
		}

		while (bugs.getHP() > 0) {
			let strengthFactor = 1

			if (Math.random() < 1 / 3) {
				strengthFactor *= 2
			}
			bugs.injure(damage * strengthFactor)
		}
	}

	switchAttack() {
		// TODO: Change the attack mode for this player
		if (this.usePrimaryAttack) {
			this.usePrimaryAttack = false
		} else {
			this.usePrimaryAttack = true
		}
	}

	move(keyCode: number) {
		switch (keyCode) {
			// left
			case 65:
				if (this.position.x > 0) {
					this.position.x--
				}
				break
			// down
			case 83:
				if (this.position.y > 0) {
					this.position.y--
				}
				break
			// right
			case 68:
				if (this.position.x < this.boardColumns) {
					this.position.x++
				}
				break
			// up
			case 87:
				if (this.position.y < this.boardRows) {
					this.position.y++
				}
				break
			default:
				this.position = this.position
		}
	}

	getPosition(): {} {
		return this.position
	}

	getLevel() {
		return this.level
	}

	levelUp(bugs: Monster): void {
		if (bugs.getHP() == 0) {
			this.level += this.level + 1
		}
	}

	public getPlayerData() {
		return {
			name: this.name,
			primary: this.primary,
			secondary: this.secondary,
			usePrimaryAttack: this.usePrimaryAttack,
			position: this.position,
			hp: this.hp,
			level: this.level,
			boardColumns: this.boardColumns,
			boardRows: this.boardRows
		}
	}
}