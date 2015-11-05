
var express = require('express'),
	app = express();


var port = process.env.PORT || 8080;

var io = require('socket.io').listen(app.listen(port));

app.use(express.static(__dirname + '/public'));

var presentation = io.on('connection', function (socket) {
	console.log("New socket: "+socket)
	// A new client has come online. Check the secret key and 
	// emit a "granted" or "denied" message.
	socket.on('load', function(data){
		console.log(data)
	})
});

app.get("/change-site", function(req,res){
	var data = req.query
	console.dir(data);

	// site.emit('change_site', {
	// 	path: "andrei/index.html"
	// });

	presentation.emit('change_site', {
		path: data.name+"/index.html"
	});

});

console.log('Your presentation is running on http://localhost:' + port);