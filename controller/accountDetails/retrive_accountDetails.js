'use strict';

const accountModel = require('../../model/accountDetails.schema');

const retriveAccountDetails = async (req, res) => {
    const result = await accountModel.findOne({"account_no": req.account_no});
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({Available_balance: result.Available_balance}));
}

const retriveTransHistory = async (req, res) => {
    accountModel.findOne({"account_no": req.account_no}, async(err, docs) => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({transaction_history: docs.transaction_history}));
    });
}

module.exports = {retriveAccountDetails, retriveTransHistory};