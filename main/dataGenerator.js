const axios = require('axios');
//const CanvasJS = require('canvasjs');
async function stockCandles(symbol, resolution, from, to) {
    try {
        const data = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`,{
            headers: {
            'X-Finnhub-Token' : 'c6im5hiad3i8jt9dugng'
        }
        })
        console.log(data.data)
        return data.data;
    } catch(err) {
        console.error(err);
    }
}
var finnHubData
module.exports.generateChart =  function(CurrentStock) {
    console.log("In Generate Chart")
    //stockCandles('AAPL','M',1607241875,1638777875)
    
    var currentTs = new Date();
    var currentTsSeconds = Math.floor(currentTs.valueOf()/ 1000)
    var pastTs = new Date(currentTs.getTime() - (31556926 * 1000))
    var pastTsSeconds = Math.floor(pastTs.valueOf()/1000)
/*
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.Status == 200){
                finnHubData = xhttp.responseText;
            }
        }
    */    
        //console.log("1: " + currentTs + "2: " + pastTs)
    console.log("CurrentStock :" + CurrentStock + "past: " + pastTsSeconds + " current: " + currentTsSeconds);
        tmp = stockCandles(CurrentStock,'M',pastTsSeconds,currentTsSeconds);
    //tmp = JSON.parse(FinnHubStockPrices);
    console.log(tmp)
    for (var i = 0; i < tmp.length; i++) {
                        //console.log('loop')
            date = new Date.parse(timestamp)
            year = date.getYear();
            month = date.getMonth();
            day = date.getDay();

            c = tmp.c[i];
            h = tmp.h[i];
            l = tmp.l[i];
            o = tmp.o[i];
            finnHubData += "{x: new Date(" + year + "," + month + "," + day + ",y:[" + o + "," + h + "," + l + "," + c + "]},"
            //console.log("{x: new Date(" + year + "," + month + "," + day + ",y:[" + o + "," + h + "," + l + "," + c + "]},\n")

        }   
/*
        var chart = new CanvasJS.Chart("chartContainer",
    {
        title:{
            text: "Basic Candle Stick Chart"
        },
        zoomEnabled: true,
        axisY: {    
            includeZero:false,
            title: "Prices",
            prefix: "$ "
        },
        axisX: {
            interval:2,
            intervalType: "month",
            valueFormatString: "MMM-YY",
            labelAngle: -45
        },
        data: [
        {
            type: "candlestick",
            dataPoints: JSON.parse(finnHubData) 

        }
        ]
    });
    console.log(finnHubData)
    */
    return finnHubData;
    
}  