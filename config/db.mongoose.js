'use static';

const mongoose = require('mongoose');
const dbURL = process.env.dbURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('mongoose connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error while connecting', err);
});