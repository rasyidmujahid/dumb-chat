var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, resp) {
    resp.render('page');
});

var io = require('socket.io').listen(app.listen(port));

console.log("listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat'} );
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});