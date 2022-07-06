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

interface Player {
	attack(monster: Monster): void
	switchAttack(): void
	move(keyCode: number): void
}

class character implements Player {
	private name: string
	private primary: Attack
	private secondary: Attack
	private usePrimaryAttack: boolean
	private position: Position

	constructor(name: string) {
		this.primary = new phyAtk(30)
		this.secondary = new magicAtk(40)
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
		this.position = { x: 1, y: 1 }
	}

	attack(monster: Monster): void {
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
			let result = `Player ${
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
}

class Monster {
	// Think of how to write injure
	private hp: number
	private name: string

	constructor() {
		this.hp = 100
		this.name = 'Monster'
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
}

class MAP {
	private location: {}[][]

	public constructor() {
		this.location = []

		for (let i: number = 0; i < 20; i++) {
			for (let j: number = 0; j < 20; j++) {
				this.location[i][j] = new MAP()
			}
		}
	}

	checkPostion(): void {
		console.log(`${player.getPosition()}`)
	}
}

const player = new character('Peter')
const monster = new Monster()
player.attack(monster)
