const axios = require('axios');
const dateTime =require('date-and-time');
const User = require('../models/user');
const Stock = require('../models/stock');
const Order = require('../models/order');
const mongoose = require('mongoose');

exports.getOrder = (req, res) => {
    Order.findOne({_id:req.params.orderID}).
    then(resp=>res.send(resp)).
    catch(err=>console.log(err));
};

exports.postOrder = (req,res) => {
    let fetchedData;
    fetchStock();
    async function fetchStock() {
        
        const userID = req.body.userID;
        const code = req.body.code;
        const quantity = Number(req.body.quantity);
        const type = req.body.type;
        const order = req.body.order;
        const subType = req.body.subType;
        const orderPrice = Number(req.body.orderPrice);
        const status = 'In Progress';
        const progress = 'Verified';
        await Stock.findOne({code:req.body.code}).
        then(res => fetchedData=res).
        catch(err => console.log(err));
        const name = fetchedData.name;
        const cmp = fetchedData.cmp;
        const exchange = fetchedData.exchange;
        let balanceBeforeTransaction;
        await User.findOne({_id:req.body.userID}).
        then(res => balanceBeforeTransaction=res.balance).
        catch(err => console.log(err));
        const now = new Date();
        const verifiedTimestamp = dateTime.format(now, 'YYYY-MM-DD HH:mm:ss A [GMT]Z');
        let totalAmount = subType==='Market' ? quantity * cmp : quantity * orderPrice;
        totalAmount = totalAmount.toFixed(2);
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
    Order.find({progress : 'Verified'}).
    then(result=>{
        for(let i=0;i<result.length;i++){
            const currentOrder=result[i];
            const type = currentOrder.type;
            const balance = currentOrder.balanceBeforeTransaction;
            const amount = currentOrder.totalAmount
            let balanceAfterTransaction = type==="Sell" ? balance + amount : balance - amount;
            balanceAfterTransaction = balanceAfterTransaction.toFixed(2);
            const now = new Date();
            const timestamp = dateTime.format(now, 'YYYY-MM-DD HH:mm:ss A [GMT]Z');
            User.updateOne({_id:currentOrder.userID},{balance: balanceAfterTransaction}).
            then(resp=>{
                Order.updateOne(
                    {_id:currentOrder._id},
                    {
                        balanceAfterTransaction: balanceAfterTransaction,
                        progress: "Placed",
                        placedTimestamp: timestamp
                }).
                then(response => {res.redirect('/executeOrders');}).
                catch(err => {console.log(err)})
            }).
            catch(err=>console.log(err))
        }
    }).
    catch(err=>console.log(err))
};

exports.executeOrders = (req, res) => {
    Order.find({progress : 'Placed'}).
    then(result=>{
        for(let i=0;i<result.length;i++){
            const currentOrder=result[i];
            const now = new Date();
            const timestamp = dateTime.format(now, 'YYYY-MM-DD HH:mm:ss A [GMT]Z');
            Order.updateOne(
                {_id:currentOrder._id},
                {
                    progress: "Executed",
                    status: "Successful",
                    executedTimestamp: timestamp
            }).
            then( result => console.log(currentOrder._id + ' executed...')).
            catch(err => {console.log(err)})
        }
    }).
    catch(err=>console.log(err))
    res.send('Executed')
};

exports.getOrders = (req, res) => {
    Order.find({userID:req.user._id}).
    sort({placedTimestamp:-1}).
    then(resp=>res.send(resp)).
    catch(err=>console.log(err))
};

exports.getDashboard = (req, res) => {
    console.log('dashboard');
    res.send('get');
};

exports.postPortfolio = (req, res) => {
    console.log('portfolio');
    res.send('post');
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
