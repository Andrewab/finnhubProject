const axios = require('axios');
//const CanvasJS = require('canvasjs');
async function stockCandles(symbol, resolution, from, to) {
    try {
        const data = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`,{
            headers: {
            'X-Finnhub-Token' : 'c6im5hiad3i8jt9dugng'
        }
        })
        return data.data;
    } catch(err) {
        console.error(err);
    }
}
var finnHubData
module.exports.generateChart =  function(CurrentStock) {
    console.log("In Generate Chart")
    var currentTs = Math.round((new Date()).getTime() / 1000);
    var pastTs = (currentTs - (525600 * 60 * 1000));
/*
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.Status == 200){
                finnHubData = xhttp.responseText;
            }
        }
        */

    console.log(stockCandles(CurrentStock,'M',pastTs,currentTs));
        tmp = JSON.parse(JSON.stringify(stockCandles(CurrentStock,'M',pastTs,currentTs)));
    //tmp = JSON.parse(FinnHubStockPrices);
    for (var i = 0; i < tmp.length; i++) {
            date = new Date.parse(timestamp)
            year = date.getYear();
            month = date.getMonth();
            day = date.getDay();
            c = tmp.c[i];
            h = tmp.h[i];
            l = tmp.l[i];
            o = tmp.o[i];
            finnHubData += "{x: new Date(" + year + "," + month + "," + day + ",y:[" + o + "," + h + "," + l + "," + c + "]},"
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
    });*/
    return finnHubData;
}  