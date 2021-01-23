const mongoose = require('mongoose');
const model = require('./userSchema');
const schema = mongoose.Schema;

const accountDetails = new schema ({
    account_no: {
        type: String,
        required: true
    },
    Available_balance: {
        type: Number,
        required: true
    },
    transaction_history: [{
        transfer_amount: {
          type: Number,
          required: true
        },
        last_balance: {
            type: Number,
            default: 0
        },
        transaction_date: {
          type: String,
          default: Date.now()
        },
        transfered_by: {
            type: String,
            default: "-"
        },
        transfered_to: {
            type: String,
            default: "-"
        },
        transaction_type: {
            type: String,
            default: "-"
        }
    }],
});

const accountModel = mongoose.model('accountDetails', accountDetails ,'accountDetails');
module.exports = accountModel;