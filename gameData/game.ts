import { Character } from './player'

export class ClientHandler {
	// private boardColumns: number = 20
	// private boardRows: number = 20
	private playerNames: string[] = []
	// private map: Map

	getPlayers() {
		this.playerNames.push(Character.name)
		console.log(this.playerNames)
	}
}

// private getAllPlayers() {
//     let playersReturn = []
//       for (const player of room.players) {
//         playersReturn.push(character.getPlayerData())
//       }
//     return playersReturn
//   }
