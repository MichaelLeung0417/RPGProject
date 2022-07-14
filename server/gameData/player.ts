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
	public id: number
	private name: string
	private primary: Attack
	private secondary: Attack
	private usePrimaryAttack: boolean
	private position: Position
	private hp: number
	private level: number
	private boardColumns: number
	private boardRows: number
	private direction: string

	constructor(name: string) {
		this.primary = new phyAtk(30)
		this.secondary = new magicAtk(40)
		this.hp = 100
		this.level = 1
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
		this.boardColumns = 16
		this.boardRows = 16
		this.direction = 'down'
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
		bugs.injure(damage)
	}

	mightyAttack(bugs: Monster) {
		let damage = 0
		damage = this.secondary.damage
		bugs.injure(damage)
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
			usePrimaryAttack: this.usePrimaryAttack,
			position: this.position,
			hp: this.hp,
			level: this.level,
			boardColumns: this.boardColumns,
			boardRows: this.boardRows
		}
	}
}
