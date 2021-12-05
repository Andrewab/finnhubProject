const axios = require('axios');
/*
async function getStockVal(ticker) {
    try {

        const data = await axios.get(`https://finnhub.io/api/v1/search?q=${ticker}`, {
            headers: {
            'X-Finnhub-Token' : 'c6im5hiad3i8jt9dugng'
        }
        })
        //console.log(data.data);
        var obj = data.data;
        console.log(obj.count)
        //obj = JSON.parse(data.data);
        //console.log(obj.symbol);                                                                                
    } catch(err) {
        console.error(err);
    }
}
*/
async function stockCandles(symbol, resolution, from, to) {
    try {
        const data = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`,{
            headers: {
            'X-Finnhub-Token' : 'c6im5hiad3i8jt9dugng'
        }
        })
        return data.data;
        console.log(obj)
    } catch(err) {
        console.error(err);
    }
}
stockCandles('AAPL','30','1631022248','1631627048')