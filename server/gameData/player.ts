import { Monster } from './monster'

export interface Attack {
	damage: number
	duration: number
}

class phyAtk implements Attack {
	//Phy Attack here
	constructor(public damage: number, public duration: number) {}
}

class magicAtk implements Attack {
	//Magic Attack here
	constructor(public damage: number, public duration: number) {}
}

export interface Position {
	x: number
	y: number
}

interface Players {
	attack(usePrimaryAttack: boolean, bugs: Monster): number
	// switchAttack(): void
	move(keyCode: number): void
	levelUp(bugs: Monster): void
}

export class Character implements Players {
	public id: string
	private name: string
	private primary: Attack
	private secondary: Attack
	// private usePrimaryAttack: boolean
	private position: Position
	private hp: number
	private level: number
	private boardColumns: number
	private boardRows: number
	private direction: string

	constructor(name: string) {
		this.primary = new phyAtk(30, 4000)
		this.secondary = new magicAtk(40, 6000)
		this.hp = 100
		this.level = 1
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		// this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
		this.boardColumns = 16
		this.boardRows = 16
		this.direction = 'down'
	}

	attack(usePrimaryAttack: boolean, bugs: Monster): number {
		let damage = 0
		let attack = this.getAttack(usePrimaryAttack)
		damage = attack.damage
		bugs.injure(damage)

		return attack.duration
	}

	private getAttack(usePrimaryAttack: boolean): Attack {
		if (usePrimaryAttack) {
			return this.primary
		} else {
			return this.secondary
		}
	}

	// mightyAttack(bugs: Monster) {
	// 	let damage = 0
	// 	damage = this.secondary.damage
	// 	bugs.injure(damage)
	// }

	// switchAttack() {
	// 	// TODO: Change the attack mode for this player
	// 	if (this.usePrimaryAttack) {
	// 		this.usePrimaryAttack = false
	// 	} else {
	// 		this.usePrimaryAttack = true
	// 	}
	// }

	move(keyCode: number) {
		switch (keyCode) {
			// left
			case 65:
				if (this.position.x > 0) {
					this.position.x--
					this.direction = 'left'
				}
				break
			// down
			case 83:
				if (this.position.y < this.boardColumns) {
					this.position.y++
					this.direction = 'down'
				}
				break
			// right
			case 68:
				if (this.position.x < this.boardRows) {
					this.position.x++
					this.direction = 'right'
				}
				break
			// up
			case 87:
				if (this.position.y > 0) {
					this.position.y--
					this.direction = 'up'
				}
				break
			default:
				this.position = this.position
				this.direction = this.direction
		}
	}

	getPosition(): {} {
		return this.position
	}

	getDirection(): string {
		// if (this.hp <= 0 ){
		// 	return 'down'
		// } // [CODE REVIEW] this is for demo only
		return this.direction
	}

	getLevel() {
		return this.level
	}

	levelUp(): void {
		this.level++
	}

	heal() {
		this.hp += 10
	}

	respawn() {
		return (this.hp = 100)
	}

	injure(attack: number) {
		this.hp -= attack
		return this.hp
	}

	public getPlayerData() {
		return {
			name: this.name,
			primary: this.primary,
			secondary: this.secondary,
			// usePrimaryAttack: this.usePrimaryAttack,
			position: this.position,
			hp: this.hp,
			level: this.level,
			boardColumns: this.boardColumns,
			boardRows: this.boardRows
		}
	}
}
