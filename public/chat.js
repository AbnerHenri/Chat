const socket = io('http://localhost:3000')

let user = null

socket.on('update_message', (messages)=>{
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('.messages') 
    
    let list_message = ''

    messages.forEach(message => {
        list_message += `<div class='msg'><strong>${message.user}</strong> : ${message.msg}</div>`
    });

    div_messages.innerHTML = list_message
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('message_form')
    console.log(form)

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(!user){
            alert('Defina um Usuário')
            return
        }

        const message = document.forms['message_form']['msg'].value
        document.forms['message_form']['msg'].value = ''
        socket.emit('new_message', {msg : message, user : user})

        console.log(message)
    })

    const userForm = document.querySelector('#user_form')
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        user = document.forms['user_form']['user'].value
        userForm.parentNode.removeChild(userForm)
    })
})