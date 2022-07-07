const socket = io.connect();
let sendbtn = document.querySelector("#messageBox")

sendbtn.addEventListener("submit", function (event) {
    event.preventDefault()
    let messages = document.querySelector("#enterMessage")
    if(document.querySelector('#loginUser').value=='boardcast'){
        if (messages.value != '') {
            socket.emit('sendSever', {
                messages: messages.value,
            })
        } else {
            return;
        }
    }else{
        console.log('further development')
    }
    document.querySelector("#enterMessage").value = ''
})

//make select
socket.on('loginUserList', async function(updatedLoginUserList) {
    console.log(`${JSON.stringify(updatedLoginUserList)}`)
    document.querySelector('#loginUser').innerHTML = ''
    document.querySelector('#loginUser').innerHTML = `
    <option value="boardcast" selected>boardcast</option>
    `
    for(let loginUser of await updatedLoginUserList){
        document.querySelector('#loginUser').innerHTML+=`
        <option value="${loginUser.username}">${loginUser.username}</option>
        `
    }

    document.querySelector('#loginUser').innerHTML+=`
    </select>
    `
})
//make select

//print messages
socket.on('sendClient', function (data) {
    document.querySelector('#messagehistroy').innerHTML = ''
    let messagesReorder = data.reverse()
    for (let messages of messagesReorder) {
        document.querySelector('#messagehistroy').innerHTML += '<p>' + messages.messages + '</p>'
    }
})
//print messages

 //console.log(document.querySelector('#loginUser').value) select designate user