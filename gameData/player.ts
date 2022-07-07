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
	attack(): void
	switchAttack(): void
	move(keyCode: number): void
}

export class character implements Players {
	private name: string
	private primary: Attack
	private secondary: Attack
	private usePrimaryAttack: boolean
	private position: Position
	private hp: number = 10
	private level: number = 1

	constructor(name: string) {
		this.primary = new phyAtk(30)
		this.secondary = new magicAtk(40)
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
	}

	attack(): void {
		let damage = 0
		if (this.usePrimaryAttack) {
			// TODO: use primary attack
			damage = this.primary.damage
		} else {
			// TODO: use secondary attack
			damage = this.secondary.damage
		}

		while (monster.getHP() > 0) {
			let strengthFactor = 1

			if (Math.random() < 1 / 3) {
				strengthFactor *= 2
			}

			monster.injure(damage * strengthFactor)
			let result = `Players ${
				this.name
			} attacks a monster (HP: ${monster.getHP()})`
			if (strengthFactor > 1) {
				result += ` [CRITICAL]`
			}
			console.log(result)
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
		if (keyCode == 37) {
			this.position.x = -1
		} else if (keyCode == 38) {
			this.position.y - 1
		} else if (keyCode == 39) {
			this.position.x + 1
		} else if (keyCode == 40) {
			this.position.y + 1
		}
	}

	getPosition(): {} {
		return this.position
	}

	// levelUp(): number {
	// 	if (monster.getHP() == 0) {
	// 		return player.level + 1
	// 	}
	// }

	public getPlayerData() {
		return {
			name: this.name,
			position: this.position,
			hp: this.hp,
			level: this.level
		}
	}
}
