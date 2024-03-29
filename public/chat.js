window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById('field')
    var sendButton = document.getElementById('send')
    var content = document.getElementById('contents')
    var name = document.getElementById('name')

    socket.on('message', function(data) {
        if (data.message) {
            // alert(data.username);
            // alert(data.data);
            messages.push(data);
            var html = '';
            for (var i = 0; i < messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': <b/>';
                html += messages[i].message + '<br/>';
            }
            content.innerHTML = html;
            // content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem : " + data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        if (name.value == "") {
            alert("Please type your name.");
        } else {
            var text = field.value;
            socket.emit('send', {
                message: text,
                username: name.value
            });
            field.value = '';
        }
    }
}
