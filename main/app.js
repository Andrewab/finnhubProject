const myMod = require('./dataGenerator');
var http = require('http');
var fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const queryString = require('querystring')
const router = express.Router();


var app = express();
app.set("view-engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/candlestickGraphUpdated', async function(req,res) {

	//console.log('here')
	//console.log(req.protocol + "://" + req.get('host') + req.originalUrl);
	//console.log(req.body.CurrentStock);
	let obj = await myMod.generateChart(req.body.CurrentStock, req.body.interval);
	
	//console.log(obj);
	//chart = myMod.makeChart(obj);
	res.render('candlestickGraphUpdated.ejs',{candleStickPrices : obj,IntervalChosen : IntervalChosen,IntervalDates : IntervalDates});

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
