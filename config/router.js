'use strict';
const addUsers = require('../controller/users/addUser');
const transferAmount = require('../controller/accountDetails/transferAmount');
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
        } else if (req.url === '/accountDetails/transferAmount') {
            transferAmount.transferAmount(req.jsonBody, res);
        } else if (req.url === '/accountDetails/retriveAccountDetails') {
            retriveDetails.retriveAccountDetails(req.jsonBody, res);
        } else if (req.url === '/accountDetails/retriveTransHistory') {
            retriveDetails.retriveTransHistory(req.jsonBody, res);
        }
    });
    } catch(err){
        return err;
    }
}

module.exports = {handleGET, handlePOST};