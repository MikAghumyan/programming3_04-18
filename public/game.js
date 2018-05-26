var username
var color;
var gotData = false;

var thisPlayer = {};
var otherPlayers = [];

var socket = io.connect('http://localhost:3000');

function main() {
    var writeDiv = document.getElementById('chat');
    var messDiv = document.getElementById('messages')
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var styleLink = document.getElementById('style');
    // Prompt for setting a username
    //var connected = false;
    //var typing = false;
    //var lastTypingTime;
    //var $currentInput = $usernameInput.focus();

    const addParticipantsMessage = (data) => { // WORKING
        var message = '';
        if (data.numUsers === 1) {
            message += "there's 1 participant";
        } else {
            message += "there are " + data.numUsers + " participants";
        }
        addChatMessage({
            username: 'server',
            message: message
        });
    }

    // Sets the client's username
    const setUsername = () => { // WORKING
        username = prompt('Please enter your name');

        // If the username is valid
        if (username) {

            // Tell the server your username
            socket.emit('add user', username);
        }
    }

    setUsername();

    // Sends a chat message
    const sendMessage = () => { // HALF WORKING
        var message = input.value;
        // Prevent markup from being injected into the message
        // if there is a non-empty message and a socket connection
        if (message) {
            input.value = '';
            addChatMessage({
                username: username,
                message: message
            });
            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }

    // Adds the visual chat message to the message list
    const addChatMessage = (data, options) => { // WORKING
        // Don't fade the message in if there is an 'X was typing'
        // var $typingMessages = getTypingMessages(data);
        // options = options || {};
        // if ($typingMessages.length !== 0) {
        //     options.fade = false;
        //     $typingMessages.remove();
        // }

        var message = document.createElement("p");
        var username_element = document.createElement("b");
        var username = document.createTextNode(data.username);
        var node = document.createTextNode(": " + data.message);
        username_element.appendChild(username);
        message.appendChild(username_element);
        message.appendChild(node);
        messDiv.appendChild(message);
    }


    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
        connected = true;
        // Display the welcome message
        var message = "Welcome to Game Chat – ";
        addParticipantsMessage(data);
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', (data) => {
        addChatMessage(data);
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', (data) => {
        message = data.username + ' joined';
        addChatMessage({
            username: 'server',
            message: message
        });
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', (data) => {
        message = data.username + ' left';
        addChatMessage({
            username: 'server',
            message: message
        });
    });

    // // Whenever the server emits 'typing', show the typing message
    // socket.on('typing', (data) => {
    //     addChatTyping(data);
    // });

    // // Whenever the server emits 'stop typing', kill the typing message
    // socket.on('stop typing', (data) => {
    //     removeChatTyping(data);
    // });

    // socket.on('disconnect', () => {
    //     log('you have been disconnected');
    // });

    // socket.on('reconnect', () => {
    //     log('you have been reconnected');
    //     if (username) {
    //     socket.emit('add user', username);
    //     }
    // });

    // socket.on('reconnect_error', () => {
    //     log('attempt to reconnect has failed');
    // })


    // socket.emit('playerName', {
    //     user: 'server',
    //     color: 'green',
    //     message: playerName + " connected."
    // })
    //Emit message
    function click() {
        // socket.emit('new_message', {
        //     user: playerName,
        //     color: 'green',
        //     message: input.value
        // })
        sendMessage();
    }

    button.onclick = click;

    socket.on("send_colors", (users) => {
        console.log(users);
        for (const user of users) {
            if (user.name == username) {
                userColor = user.color;
                console.log(userColor);
                break;
            }
        }
    });
    socket.on("send_data", (players) => {
        for (const player of players) {
            if (player.color == userColor) {
                thisPlayer = player;
                console.log(thisPlayer);
            }
            else {
                otherPlayers.push(player);
            }
        }
        console.log(thisPlayer);
        console.log(otherPlayers);
        gotData = true;
        setup();
    });
    // //Listen on new_message
    // socket.on("new_message", (data) => {
    //     input.value = '';

    //     var message = document.createElement("p");
    //     var username_element = document.createElement("b");
    //     var username = document.createTextNode(data.user);
    //     var node = document.createTextNode(": " + data.message);
    //     username_element.appendChild(username);
    //     message.appendChild(username_element);
    //     message.appendChild(node);
    //     messDiv.appendChild(message);

    // })

    // //Emit typing
    // message.bind("keypress", () => {
    //     socket.emit('typing')
    // })

    // //Listen on typing
    // socket.on('typing', (data) => {
    //     alert('typing');
    // })

} // main closing bracket

window.onload = main;
/* 
    //make connection
    var socket = io.connect('http://localhost:3000')
*/console.log(thisPlayer.campImg);/*
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