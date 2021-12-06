const myMod = require('./dataGenerator');
var http = require('http');
var fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();
var app = express();
app.set("view-engine", "ejs");
app.use(express.json());
//app.use(express.static())
app.get('/candlestickGraphUpdated', function(req,res) {

	//console.log('here')
	//console.log(req.protocol + "://" + req.get('host') + req.originalUrl);

	obj = myMod.generateChart(req.query.CurrentStock)
	console.log(obj);
	res.render('candlestickGraphUpdated.ejs',obj)

})
app.get('/',function(req,res) {
	res.render(__dirname + '/views/candlestickGraph.ejs');
})
/*
var server = http.createServer(function(req, res) {
	console.log('request was made:');
	console.log(req.url,req.method);
});

server.listen(3000,'localhost', () => {
	console.log('listening for requests on port 3000');
})
*/
var server = app.listen(3000,function() {
	console.log('Node server is running');
})
