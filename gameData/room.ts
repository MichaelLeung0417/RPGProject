import { Character } from './player'
import { Monster } from './monster'
import express from 'express'
import http from 'http'
import { Server as SocketIO } from 'socket.io'

const app = express()
const server = new http.Server(app)
const io = new SocketIO(server)

io.on('connection', function (socket) {
	console.log(socket)
})

export default class Gameroom {
	private onlinePlayers: Character[] = []
	private existedBugs: Monster[] = []
	private boardColumns: number = 20
	private boardRows: number = 20

	constructor(
		onlinePlayers: Character[],
		existedBugs: Monster[],
		boardColumns: number,
		boardRows: number
	) {
		this.onlinePlayers = onlinePlayers
		this.existedBugs = existedBugs
		this.boardColumns = boardColumns
		this.boardRows = boardRows
	}

	addPlayer(player: Character) {
		this.onlinePlayers.push(player)
	}

	addBugs(bugs: Monster) {
		this.existedBugs.push(bugs)
	}

	getAllPlayers() {
		let playerInMap: {
			x: number
			y: number
		}[] = []

		for (const player of this.onlinePlayers) {
			while (
				player.getPlayerData().position.x < this.boardColumns &&
				player.getPlayerData().position.y < this.boardRows
			) {
				playerInMap.push({
					x: player.getPlayerData().position.x,
					y: player.getPlayerData().position.y
				})
			}
		}
		return playerInMap
	}
}
