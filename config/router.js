'use strict';
const addUsers = require('../controller/users/addUser');
const deposiAmount = require('../controller/accountDetails/depositAmount');
const retriveDetails = require('../controller/accountDetails/retrive_accountDetails');

const handleGET = async(req, res) => {
    try {
        var data = "";
        req.on('data', function(chunk){ data += chunk})
        req.on('end', function(){
            req.rawBody = data;
            req.jsonBody = JSON.parse(data);
            next();
        })
    } catch(err) {
        return err;
    }
}

const handlePOST = async(req, res, next) =>{
    try {
        var body = "";
        req.on('data', function(chunk){
             body += chunk.toString();
        });
        
        req.on('end', function(){
            req.rawBody = body;
            req.jsonBody = JSON.parse(body);
        if(req.url === '/users/adduser') {
            addUsers.adduserDetails(req.jsonBody, res);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end();
        } else if (req.url === '/accountDetails/depositamount') {
            deposiAmount.depositAmount(req.jsonBody, res);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end();
        } else if (req.url === '/accountDetails/retriveAccountDetails') {
            retriveDetails.retriveAccountDetails(req.jsonBody, res);
            // res.writeHead(200, { 'Content-Type': 'application/json' });
            // res.write(JSON.stringify({ now: res.Available_balance }));
            // res.end();
        } else if (req.url === '/accountDetails/retriveTransHistory') {
            retriveDetails.retriveTransHistory(req.jsonBody, res);
            // res.writeHead(200, {'Content-Type': 'application/json'});
            // res.end();
        }
    });
    } catch(err){
        return err;
    }
}

module.exports = {handleGET, handlePOST};