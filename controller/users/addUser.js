'use strict';
const adduserModel = require('../../model/userSchema');
const transferAmount = require('../accountDetails/transferAmount');
const mongoose = require('mongoose');
const accountNumber = process.env.accountNum;

const adduserDetails = async(req, res) =>{
    adduserModel.find({},async (err, doc) => {
        req.account_Number = Number(accountNumber) + Number(doc.length) + 1;
        const user = new adduserModel(req);
        const response = await user.save();
        transferAmount.transferAmount(req, res);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({status:200, message: 'User account added successfully!!'}));
    })

}

module.exports = {adduserDetails};