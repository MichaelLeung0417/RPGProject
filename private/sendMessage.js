const socket = io.connect()

//channel convertion
document.querySelector('#public').addEventListener('click', function () {
	document.querySelector('#PublicMessagehistroy').classList.remove('hide')
	document.querySelector('#PrivateMessagehistroy').classList.add('hide')
})

document.querySelector('#private').addEventListener('click', function () {
	document.querySelector('#PrivateMessagehistroy').classList.remove('hide')
	document.querySelector('#PublicMessagehistroy').classList.add('hide')
})
//channel convertion

let sendbtn = document.querySelector('#messageBox')

sendbtn.addEventListener('submit', function (event) {
	event.preventDefault()
	let messages = document.querySelector('#enterMessage')
	if (document.querySelector('#loginUser').value == 'boardcast') {
		if (messages.value != '') {
			socket.emit('sendSever', {
				messages: messages.value
			})
		} else {
			return
		}
	} else {
		if (messages.value != '') {
			let messageReceiver = document.querySelector('#loginUser').value
			let messages = document.querySelector('#enterMessage')
			console.log('further development')
			socket.emit('private-message', {
				receiver: `${messageReceiver}-chatRoom`,
				messages: messages.value
			})
			document.querySelector('#PrivateMessagehistroy').innerHTML +=
				'<p>' + `You: ` + `${messages.value}` + '</p>'
		} else {
			return
		}
	}
	document.querySelector('#enterMessage').value = ''
})

//make selecting communicate target
socket.on('loginUserList', async function (updatedLoginUserList) {
	console.log(`${JSON.stringify(updatedLoginUserList)}`)
	document.querySelector('#loginUser').innerHTML = ''
	document.querySelector('#loginUser').innerHTML = `
    <option value="boardcast" selected>boardcast</option>
    `
	for (let loginUser of await updatedLoginUserList) {
		document.querySelector('#loginUser').innerHTML += `
        <option value="${loginUser.username}">${loginUser.username}</option>
        `
	}

	document.querySelector('#loginUser').innerHTML += `
    </select>
    `
})
//make selecting communicate target

//print boardcast messages
socket.on('sendClient', function (data) {
	document.querySelector('#PublicMessagehistroy').innerHTML = ''
	let messagesReorder = data.reverse()
	for (let messages of messagesReorder) {
		document.querySelector('#PublicMessagehistroy').innerHTML +=
			'<p>' + messages.messages + '</p>'
	}
})
//print boardcast messages

//print private messages
socket.on('designateClient', function (data) {
	console.log(data.messages)
	document.querySelector('#PrivateMessagehistroy').innerHTML +=
		'<p>' + `${data.sender}: ` + `${data.messages}` + '</p>'
})
//print private messages

