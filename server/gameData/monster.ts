export class Monster {
	// Think of how to write injure
	private hp: number
	private name: string

	constructor() {
		this.hp = 100
		this.name = 'BUGS'
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

	public getMonsterData() {
		return {
			hp: this.hp,
			name: this.name
		}
	}
}
