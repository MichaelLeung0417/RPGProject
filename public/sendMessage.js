const socket = io.connect();
let sendbtn = document.querySelector("#messageBox")//may not need
sendbtn.addEventListener("submit", function(event){
    event.preventDefault()
    let messages = document.querySelector("#enterMessage")
    if(messages.value!=''){
        socket.emit('sendSever',{
            messages: messages.value,
        })
    }else{
        return;
    }
    document.querySelector("#enterMessage").value=''
})

socket.on('sendClient', function(data){
    document.querySelector('#messagehistroy').innerHTML=''
    let messagesReorder = data.reverse()
    for(let messages of messagesReorder){
        document.querySelector('#messagehistroy').innerHTML += '<p>' + messages.messages + '</p>'
    }
})