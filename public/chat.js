const socket = io('http://localhost:3000')

socket.on('update_message', (messages)=>{
    updateMessagesOnScreen(messages)
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('.messages') 
    let list_message = '<ul>'

    messages.forEach(message => {
        list_message += `<li>${message}</li>`
    });

    list_message += '</ul>'

    div_messages.innerHTML = list_message
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('message_form')
    console.log(form)

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const message = document.forms['message_form']['msg'].value
        document.forms['message_form']['msg'].value = ''
        socket.emit('new_message', {msg : message})

        console.log(message)
    })
})