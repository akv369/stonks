const axios = require('axios');

exports.getUser = (req, res) => {
    res.send(req.user);
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
