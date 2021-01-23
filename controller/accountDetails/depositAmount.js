'use strict';

const accountModel = require('../../model/accountDetails.schema');

const depositAmount = async (req, res) => {
    if(req.phone_number) {
        let data = {
            account_no: req.account_Number,
            Available_balance: 1000,
            transaction_history:[{
                transfer_amount: 1000,
                transaction_type: 'credit',
                transaction_date: Date.now()
            }]
        }
        const deposit = new accountModel(data);
        const result = await deposit.save();
    } else {
        accountModel.findOne({"account_no": req.transfered_by}, async(err, doc) =>{
            if(doc.Available_balance >= req.transfer_amount) {
                console.log('if came in');
                let updateBalance = doc.Available_balance - req.transfer_amount;
                let updateData = {
                    transfered_to: req.account_no,
                    last_balance: doc.Available_balance,
                    transfered_by:req.transfered_by,
                    transaction_date : Date.now(),
                    transaction_type : 'debit',
                    transfer_amount : req.transfer_amount
                }
                console.log('updateDataupdateDataupdateData', updateData);
                const result = await accountModel.updateOne({"account_no": req.transfered_by}, {$set: {"Available_balance": updateBalance},
                $push: {"transaction_history": updateData}});  
                if (result.nModified > 0) {
                    creditAmount(req, res);
                } 
                // res.end({status: 200, message:'debit process completed'});
                // else {
                //     transactionFailed(req, res);
                // }  
            } else {
                console.log('no fund');
            }
        });
       
        
    }
}

let creditAmount = async (req, res) => {
    console.log('reqreqreq', req);
    accountModel.findOne({"account_no": req.account_no}, async(err, doc) =>{
    let updatedAvailBal = doc.Available_balance + req.transfer_amount;
     let updateData = {
        transfered_to: req.account_no,
        last_balance: doc.Available_balance,
        transfered_by:req.transfered_by,
        transaction_date : Date.now(),
        transaction_type : 'credit',
        transfer_amount : req.transfer_amount
    }
    const updateResult = await accountModel.updateOne({"account_no": req.account_no}, {
      $push: {"transaction_history": updateData},
        $set: {"Available_balance": updatedAvailBal}
      })
      console.log('updateResult', updateResult);
    });
}

// const transactionFailed = async(req, res)  =>{

// }

module.exports = {depositAmount, creditAmount};