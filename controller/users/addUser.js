'use strict';
const adduserModel = require('../../model/userSchema');
const depositAmount = require('../accountDetails/depositAmount');
const mongoose = require('mongoose');
const accountNumber = process.env.accountNum;

const adduserDetails = async(req, res) =>{
    // console.log('add user details enabled', req);
    adduserModel.find({},async (err, doc) => {
        console.log(doc.length)
        req.account_Number = Number(accountNumber) + Number(doc.length) + 1;
        const user = new adduserModel(req);
        const response = await user.save();
        depositAmount.depositAmount(req, res);
    })

}

module.exports = {adduserDetails};