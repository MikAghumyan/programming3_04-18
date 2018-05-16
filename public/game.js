function main() {
    var socket = io.connect('http://localhost:3000');
    var writeDiv = document.getElementById('chat');
    var messDiv = document.getElementById('messages')
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", {writer:'user',message:val});
        }
    }
    button.onclick = handleSubmit;
    function handleMessage(msg) {
        var p = document.createElement('p');messDiv.appendChild(p);
        p.innerHTML = '<b style="color:'+msg.color+'">'+msg.writer+':</b>' + msg.message;
        input.value = "";
}

socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;