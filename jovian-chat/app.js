var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var chat = io.of('/chat');

chat.on('connection', socket => {
  let user = socket.handshake.query.user;
  console.log(user + ' connected');
  chat.emit('hi', 'everyone!');
});

// io.on('connection', function (socket) {
//   io.emit('this', { will: 'be received by everyone'});

//   socket.emit('news', { hello: 'world' });

//   socket.on('private message', function (from, msg) {
//     console.log('I received a private message by ', from, ' saying ', msg);
//   });

//   socket.on('disconnect', function () {
//     io.emit('user disconnected');
//   });

//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

server.listen(3000, function(){
  console.log('listening on *:3000');
});