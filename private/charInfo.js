const socket = io.connect()

let characterName = document.getElementById('nameSubmit').value

document
	.getElementById('playerName')
	.addEventListener('click', (characterName) => {
		CharacterSubmit(characterName)
	})

function CharacterSubmit(characterName) {
	socket.emit('CharacterSubmit', characterName)
}
