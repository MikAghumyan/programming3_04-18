var username;
var color;
var gotData = false;
var energyCount = 50.0;
var coordsChanged = false;

var thisPlayer = {};
var otherPlayers = [];
var obstacles = [];
var golds = [];
var energies = [];

const socket = io.connect('http://localhost:3000');

function main() {
    const writeDiv = document.getElementById('chat');
    const messDiv = document.getElementById('messages')
    const input = document.getElementById('message');
    const button = document.getElementById('submit');
    const styleLink = document.getElementById('style');
    // Prompt for setting a username
    //const connected = false;
    //const typing = false;
    //const lastTypingTime;
    //const $currentInput = $usernameInput.focus();

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
        // const $typingMessages = getTypingMessages(data);
        // options = options || {};
        // if ($typingMessages.length !== 0) {
        //     options.fade = false;
        //     $typingMessages.remove();
        // }

        const message = document.createElement("p");
        const username_element = document.createElement("b");
        const username = document.createTextNode(data.username);
        const node = document.createTextNode(": " + data.message);
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

    button.onclick = sendMessage;

    socket.on("send_colors", (users) => {
        console.log(users);
        for (const user of users) {
            if (user.name == username) {
                color = user.color;
                console.log(color);
                break;
            }
        }
    });
    socket.on('send_resources',(resources) => {
        obstacles = resources.obstacles;
        golds = resources.golds;
        energies = resources.energy;
        console.log(golds);
        console.log(obstacles);
    });
    socket.on("send_data", (players) => {
        for (const player of players) {
            if (player.color == color) {
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
} // main closing bracket

window.onload = main;
