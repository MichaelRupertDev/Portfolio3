var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/canvas.html');
});

io.on('connection', function(socket){
	console.log('User connected.');
	socket.on('shape', function(Shape){
		console.log('Shape recieved: ' + Shape);
		io.emit('shape', Shape);
	});
	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
    	io.emit('chat message', msg);
  	});
  	socket.on('text', function(Text){
		console.log('Text received: ' + Text);
		io.emit('text', Text);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
