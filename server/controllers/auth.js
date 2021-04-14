const axios = require('axios');
const Portfolio = require('../models/portfolio');
const Stock = require('../models/stock');
const Order = require('../models/order');

exports.getUser = (req, res) => {
    res.send(req.user);
    Portfolio.findOne({userID:req.user._id}).
    then(resp=>{
        let totalReturns = 0;
        const stocksInPortfolio = resp.stocks;
        for(let i=0;i<stocksInPortfolio.length;i++){
            let currentStock = stocksInPortfolio[i];
            Stock.findOne({code:currentStock.code}).
            then(respo=>{
                const returnPerShare = respo.cmp - currentStock.averagePrice;
                console.log(respo.cmp+' '+currentStock.averagePrice)
                currentStock.returns = returnPerShare * currentStock.quantity;
                totalReturns += currentStock.returns;
                stocksInPortfolio[i] = currentStock;
            }).
            catch(err=>console.log(err));
        }
        Portfolio.updateOne({_id:resp._id},{
            totalReturns: totalReturns,
            stocks: stocksInPortfolio
        }).
        then(respo=>console.log(respo)).
        catch(err=>console.log(err))
    }).
    catch(err=>console.log(err))
}

exports.getLogin = (req, res) => {
    console.log('getUser');
}

exports.postLogin = (req, res) => {
    req.session.uid=req.body.uid;
    console.log(req.body);
    console.log(req.session);
    res.send(req.session);
}

exports.postLogout = (req, res) => {
    req.session.uid=null;
    res.send(req.session);
}
