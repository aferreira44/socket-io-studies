var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var nsp = io.of('/my-namespace');

nsp.on('connection', function(socket){
  console.log('someone connected');
  nsp.emit('hi', 'everyone!');
});

io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.emit('news', { hello: 'world' });

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});