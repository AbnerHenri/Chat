const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:3000/${room}`)

let user = localStorage.getItem('user')
let div_messages = document.querySelector('.messages') 


socket.on('update_message', (messages)=>{
        updateMessagesOnScreen(messages)
})


// ------------------------------------------------------------- //

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
    const div_title = document.querySelector('.title')

    div_title.innerHTML = room

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(user === null){
            alert('Defina um Usuário')
            return
        }

        const message = document.forms['message_form']['msg'].value
        document.forms['message_form']['msg'].value = ''
        socket.emit('new_message', {msg : message, user : user})

        console.log(message)
    })

    const userForm = document.querySelector('#user_form')

    if(user === null){

        userForm.addEventListener('submit', (e)=>{
            e.preventDefault();
    
            user = document.forms['user_form']['user'].value
            localStorage.setItem('user', user)
            userForm.parentNode.removeChild(userForm)
        })
    }else{
        userForm.parentNode.removeChild(userForm)
    }
        

})