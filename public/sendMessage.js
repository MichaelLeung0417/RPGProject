const socket = io.connect();
let sendbtn = document.querySelector("#messageBox")
sendbtn.addEventListener("submit", function(event){
    event.preventDefault()
    let messages = document.querySelector("#enterMessage")
    socket.emit('sendSever',{
        messages: messages.value,
    })
})

socket.on('sendClient', function(data){
    document.querySelector('#messagehistroy').innerHTML=''
    for(let messages of data){
        console.log(messages)
        document.querySelector('#messagehistroy').innerHTML += '<p>' + messages.messages + '</p><br>'
    }
})