class Player {
	private hp: number
	private atk: number
	// private location: {} = { x: 10, y: 10 }
	// private vol: {} = { x: 0, y: 0 }
	private locationX: number = 10
	private locationY: number = 10
	private name: string

	public constructor(name: string) {
		this.hp = 100
		this.atk = 20
		this.name = name
	}

	public gethp(): number {
		return this.hp
	}

	public getatk(): number {
		return this.atk
	}

	public getlocationX(): {} {
		return this.locationX
	}

	public getlocationY(): {} {
		return this.locationY
	}

	public moveLeft(keyCode: number) {
		if (keyCode == 37) {
			this.locationX = -1
		}
	}

	public moveRight(keyCode: number) {
		if (keyCode == 38) {
			this.locationY - 1
		}
	}

	public moveUp(keyCode: number) {
		if (keyCode == 39) {
			this.locationX + 1
		}
	}

	public moveDown(keyCode: number) {
		if (keyCode == 40) {
			this.locationY + 1
		}
	}

	attack(enemy: Enemy) {
		while (enemy.gethp() > 0) {
			if (Math.random() < 1 / 3) {
				// double hit
				enemy.injure(this.atk * 2)
				console.log(
					`Player ${
						this.name
					} attacks a monster (HP: ${enemy.gethp()}) [CRITICAL]`
				)
			} else {
				enemy.injure(this.atk)
				console.log(
					`Player ${
						this.name
					} attacks a monster (HP: ${enemy.gethp()})`
				)
			}
		}
	}
}

class Enemy {
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

	getName(): string {
		return this.name
	}

	gethp(): number {
		return this.hp
	}
}

const player = new Player('michael')
const monster = new Enemy()

player.attack(monster)
