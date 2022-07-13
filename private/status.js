//get player hp
socket.on('playerHp', (data) => {
	document.getElementById('playerHp').innerHTML = data
})


//get player level
socket.on('playerLevel', (data) => {
	document.getElementById('playerLevel').innerHTML = data
})

