class player {
	private hp: number = 10
	private atk: number = 1
	private location: {} = { x: 10, y: 10 }
	private characterName: string

	public constructor(hp: number, atk: number, name: string) {
		this.hp = hp
		this.atk = atk
		this.characterName = name
	}

	public gethp(): number {
		return this.hp
	}

	public getatk(): number {
		return this.atk
	}

	public getlocation(): {} {
		return this.location
	}

	public moveLeft(keyCode: number) {
		if (keyCode == 37) {
			this.location = { x: -1, y: 0 }
		}
	}

	public moveRight(keyCode: number) {
		if (keyCode == 38) {
			this.location = { x: 0, y: -1 }
		}
	}

	public moveUp(keyCode: number) {
		if (keyCode == 39) {
			this.location = { x: 1, y: 0 }
		}
	}

	public moveDown(keyCode: number) {
		if (keyCode == 40) {
			this.location = { x: 0, y: 1 }
		}
	}
}
