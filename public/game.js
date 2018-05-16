function main() {
    var socket = io.connect('http://localhost:3000');
    var writeDiv = document.getElementById('chat');
    var messDiv = document.getElementById('messages')
    var input = document.getElementById('message');
    var button = document.getElementById('submit');

    //Emit message
    function click(){
        socket.emit('new_message', {user:'user', message : input.value})
    }

    button.onclick = click;

    //Listen on new_message
    socket.on("new_message", (data) => {
        input.value = '';

        var message = document.createElement("p");
        var username_element = document.createElement("b");
        var username = document.createTextNode(data.user);
        var node = document.createTextNode(": " + data.message);
        username_element.appendChild(username);
        message.appendChild(username_element);
        message.appendChild(node);
        messDiv.appendChild(message);

    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        alert('typing');
    })

} // main closing bracket

window.onload = main;

/* 
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function(){
        socket.emit('change_username', {username : username.val()})
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

*/