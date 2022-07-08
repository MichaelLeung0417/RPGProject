import { Monster } from './monster'

interface Attack {
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

interface Position {
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
	private hp: number = 10
	private level: number = 1
	private boardColumns: number = 16
	private boardRows: number = 16

	constructor(name: string) {
		this.primary = new phyAtk(30)
		this.secondary = new magicAtk(40)
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
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
		// left
		if (keyCode == 37 && this.position.x > 0) {
			this.position.x = -1
		}
		// down
		else if (keyCode == 38 && this.position.y > 0) {
			this.position.y - 1
		}
		// right
		else if (keyCode == 39 && this.position.x < this.boardColumns) {
			this.position.x + 1
		}
		// up
		else if (keyCode == 40 && this.position.y < this.boardRows) {
			this.position.y + 1
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
			position: this.position,
			hp: this.hp,
			level: this.level
		}
	}
}
