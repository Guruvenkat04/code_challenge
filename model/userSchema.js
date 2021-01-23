'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addUser = new Schema({
    account_holder_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    email_id: {
        type: String,
        default: ''
    },
    account_Number: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 18
    },
    address: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 150
    },
    acount_type: {
        type: String,
        required: true
    },
    account_branch: {
        type: String,
        required: true
    },
  
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
});
const model = mongoose.model('users', addUser, 'users');
module.exports= model;