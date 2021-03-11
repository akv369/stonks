const axios = require('axios');
const Stock = require('../models/stock');
const mongoose = require('mongoose');

exports.getL = (req, res) => {
    res.redirect('/login')
};

exports.getStock = (req, res) => {
        const stockName = req.params.stockID.toUpperCase();    
        const apiKey = '&apikey=OR7C580Y9LGTY7ZE';
        const tdApiKey = '&apikey=d609067766fb4ac9bcd8a24d328d7a13';
        const path = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + stockName + apiKey;
        const tdPath = 'https://api.twelvedata.com/quote?symbol=' + stockName + tdApiKey;
        let companyOverviewData = [], companyPerformanceData = [], exchange;
        let companyName,companySymbol,close,change,tChange,pChange,marketCapitalization;
        let avData, tdData;
        fetchData()
        async function fetchData(){
            await fetchFromApi();
            async function fetchFromApi(){
                await axios.get(path).
                then(response => {
                    avData = response.data;
                    if(avData['Sector']===undefined){ res.send({state:'invalid'}); }
                }).
                catch(err=>{console.log(err);})    
                await axios.get(tdPath).
                then( response => { tdData = response.data; }).
                catch(err=>{console.log(err);})    
            }
            sendData(avData,tdData)

            res.send({
                companyName: companyName,        
                companySymbol: companySymbol,
                overviewData: companyOverviewData,
                performanceData: companyPerformanceData,
                close: close,
                change: change,
                tChange: tChange,
                pChange: pChange
            })
            
            const stock = new Stock({
                code: companySymbol,
                name: companyName,
                cmp: close,
                _200dma: companyPerformanceData[3],
                _52wh: companyPerformanceData[0],
                _52wl: companyPerformanceData[1],
                marketCap: companyOverviewData[0],
                sector: companyOverviewData[10],
                roe: companyOverviewData[7],
                peRatio: companyOverviewData[2],
                exchange: exchange
            })

            Stock.updateOne(
                {code:stockName},
                {
                    cmp: close,
                    _200dma: companyPerformanceData[3],
                    _52wh: companyPerformanceData[0],
                    _52wl: companyPerformanceData[1],
                    marketCap: companyOverviewData[0],
                    sector: companyOverviewData[10],
                    roe: companyOverviewData[7],
                    peRatio: companyOverviewData[2],
                    exchange: exchange,
                    marketCapitalization: marketCapitalization
            }).
            then( result => {
                if(!result.n){
                    stock.save().
                    then(result => {console.log(stockName + ' Saved');}).
                    catch(err => {console.log(err);})
                }
                else console.log(stockName + ' Updated');
            }).
            catch(err => {console.log(err)})

            function sendData (data,tdData) {
                companyName = data['Name'];
                companySymbol = data['Symbol'];
                marketCapitalization = data['MarketCapitalization'];
                let labelValue = data['MarketCapitalization'];
                let marketCap = 
                Number(labelValue) >= 1.0e+12
                ? Number(labelValue) / 1.0e+12 + "T"
                :   Number(labelValue) >= 1.0e+9
                    ? Number(labelValue) / 1.0e+9 + "B"
                    :   Number(labelValue) >= 1.0e+6
                        ? Number(labelValue) / 1.0e+6 + "M"
                        : Number(labelValue) / 1.0e+3 + "K";
                labelValue = Number(marketCap.slice(0,-1)).toFixed(2) + marketCap[marketCap.length-1];
                companyOverviewData.push(labelValue);
                labelValue = Number(data['PEGRatio']).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = Number(data['PERatio']).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = data['EBITDA'];
                let ebitda = 
                Number(labelValue) >= 1.0e+12 ? Number(labelValue) / 1.0e+12 + "T"
                    :Number(labelValue) >= 1.0e+9 ? Number(labelValue) / 1.0e+9 + "B"
                        :Number(labelValue) >= 1.0e+6 ? Number(labelValue) / 1.0e+6 + "M"
                            :Number(labelValue) / 1.0e+3 + "K";
                labelValue = Number(ebitda.slice(0,-1)).toFixed(2) + ebitda[ebitda.length-1];
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = (Number(data['DividendYield'])*100).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = Number(data['BookValue']).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = Number(data['EPS']).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                labelValue = (Number(data['ReturnOnEquityTTM'])*100).toFixed(2);
                if(isNaN(labelValue))companyOverviewData.push("0");
                else companyOverviewData.push(labelValue);
                companyOverviewData.push(data['Description']);
                exchange = data['Exchange'];
                companyOverviewData.push(exchange);
                companyOverviewData.push(data['Sector']);
                companyOverviewData.push(data['Industry']);
                companyOverviewData.push(data['AssetType']);
                labelValue = Number(data['52WeekHigh']).toFixed(2);
                companyPerformanceData.push(labelValue);
                labelValue = Number(data['52WeekLow']).toFixed(2);
                companyPerformanceData.push(labelValue);
                companyPerformanceData.push(data['SharesOutstanding']);
                labelValue = Number(data['200DayMovingAverage']).toFixed(2);
                companyPerformanceData.push(labelValue);
                companyPerformanceData[2]=tdData['volume'];
                labelValue = Number(tdData['open']).toFixed(2);
                companyPerformanceData.push(labelValue);
                labelValue = Number(tdData['high']).toFixed(2);
                companyPerformanceData.push(labelValue);
                labelValue = Number(tdData['low']).toFixed(2);
                companyPerformanceData.push(labelValue);
                labelValue = Number(tdData['previous_close']).toFixed(2);
                companyPerformanceData.push(labelValue);
                close=Number(tdData['close']).toFixed(2);
                if(isNaN(tdData['change'].slice(0,1)))
                    change=Number(tdData['change']).toFixed(2);
                else {
                    change='+'+ String( Number(tdData['change']).toFixed(2) );
                    tChange=1;
                }
                pChange=Number(tdData['percent_change']).toFixed(2);
            }
        }
};

exports.getAllStocks = (req, res) => {
    Stock.find().then(stocks => {
        res.send(stocks);
    })
};

exports.postAllStocks = (req, res) => {
    Stock.find().sort({marketCapitalization:-1}).then(stocks => {
        let filteredStocks=[];
        const cmpUl = Number(req.body.cmpUl);
        const cmpLl = Number(req.body.cmpLl);
        const mcUl = Number(req.body.mcUl)*1000000000;
        const mcLl = Number(req.body.mcLl)*1000000000;
        const sectors = req.body.sectors;
        stocks.map(eachStock => {
            const fetched_200dma = Number(eachStock['_200dma']);
            const fetchedSector = eachStock['sector'];
            const fetchedMc = Number(eachStock['marketCapitalization']);
            if(
                cmpUl>=fetched_200dma &&
                cmpLl<=fetched_200dma &&
                mcUl>=fetchedMc &&
                mcLl<=fetchedMc &&
                (sectors['All']||sectors[fetchedSector])
            ){filteredStocks.push(eachStock);}
        })
        res.send(filteredStocks);
    })
};
