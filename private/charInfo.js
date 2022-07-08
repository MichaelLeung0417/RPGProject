document.getElementById('playerName').addEventListener('click', (e) => {
	CharacterSumbit(e)
})

function CharacterSumbit(e) {
	socket.emit('CharacterSumbit', e)
}
