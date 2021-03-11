const axios = require('axios');
const dateTime =require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const mongoose = require('mongoose');

exports.getOrder = (req, res) => {
    console.log(req.params.orderID);
    res.send('get');
};

exports.postOrder = (req,res) => {
    console.log('Create Order');
    let fetchedData;
    fetchStock();
    async function fetchStock() {
        await Stock.findOne({code:req.body.code}).
        then(res => fetchedData=res).
        catch(err => console.log(err));
        

        const userID = req.body.userID;
        const code = req.body.code;
        const name = fetchedData.name;
        const quantity = Number(req.body.quantity);
        const type = req.body.type;
        const order = req.body.order;
        const subType = req.body.subType;
        const balanceBeforeTransaction = req.body.balanceBeforeTransaction;
        const orderPrice = Number(req.body.orderPrice);
        const cmp = fetchedData.cmp;
        const exchange = fetchedData.exchange;
        const status = 'In Progress';
        const progress = 'Verified';
        const now = new Date();
        let times = dateTime.format(now, 'DD/MM/YYYY HH:mm:ss');
        let verifiedTimestamp = times;
        const totalAmount = subType==='Market' ? quantity * cmp : quantity * orderPrice;
        const saveOrder = new Order({
            userID : userID,
            code : code,
            name : name,
            quantity : quantity,
            type : type,
            order : order,
            subType : subType,
            balanceBeforeTransaction : balanceBeforeTransaction,
            orderPrice : orderPrice,
            cmp : cmp,
            exchange : exchange,
            status : status,
            progress : progress,
            verifiedTimestamp : verifiedTimestamp,
            totalAmount : totalAmount
        })
        saveOrder.save().
        then(response => res.redirect('/placeOrders')).
        catch(err => console.log(err))
    }
}

exports.placeOrders = (req, res) => {
    console.log('placeorders');
    res.send('To be Placed')
};

exports.getOrders = (req, res) => {
    console.log('orders');
    res.send('get');
};

exports.getDashboard = (req, res) => {
    console.log('dashboard');
    res.send('get');
};

exports.getWatchlist = (req, res) => {
    const watchlist=req.user.watchlist;
    let sendList=[];
    fetchData();
    async function fetchData(){
        for(let i=0;i<watchlist.length;i++){
            await Stock.find({code:watchlist[i]}).
            then(response=>{ sendList.push(response[0]) }).
            catch(err=>{console.log(err)})
        }
        res.send(sendList);
    }
};

exports.addToWatchList = (req, res) => {
    const _id = req.body.userId;
    const code = req.body.code;

    if(_id.length>1&&code.length>0){
        User.findById(_id)
        .then(result=>{
            let newStocks=result.watchlist,f=1;
            for(let i=0;i<newStocks.length;i++){
                if(newStocks[i]===code)f=0;
            }
            if(f){
                newStocks.push(code);
                User.findByIdAndUpdate(_id, {watchlist: newStocks}).
                then(resp=>{ console.log('Added to WatchList') }).
                catch(err=>{ console.log(err); })
            }
        })
        .catch(err=>{ console.log(err); })
    }
};

exports.removeFromWatchList = (req, res) => {
    const _id = req.body.userId;
    const code = req.body.code;

    if(_id.length>1&&code.length>0){
        User.findById(_id)
        .then(result=>{
            let newStocks=result.watchlist;
            console.log(newStocks);
            const len=newStocks.length;
            for(let i=0;i<len;i++){
                if(newStocks[i]==code){
                    for(let j=i+1;j<len;j++){
                        newStocks[j-1]=newStocks[j];
                    }
                    newStocks.pop();
                    break;
                }
            }
            console.log(newStocks)


            User.findByIdAndUpdate(_id, {watchlist: newStocks}).
            then(resp=>{ console.log('Removed from WatchList') }).
            catch(err=>{ console.log(err); })

        })
        .catch(err=>{ console.log(err); })
    }
    res.send('rem');
};
