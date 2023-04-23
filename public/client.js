const socket = io() 
let name;
let textarea = document.querySelector("#textarea");
let messageArea= document.querySelector("#message_area")
do{
    name =prompt('pleae enter your name: ')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(ms){
    let msg={
        user:name,
        message:ms.trim()
    }

    // append
    appendMessage(msg,'outgoing')
    textarea.value=''

    // send to server

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv= document.createElement('div');
    mainDiv.classList.add(type,'message')
    
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;

    messageArea.appendChild(mainDiv);
    scrollToBottom();
}


// Receive message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}