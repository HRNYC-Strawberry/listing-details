const mongoose = require('mongoose')
const uriString = process.env.MONGODB_URI || 'mongodb://localhost/listing-details';
mongoose.connect(uriString, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log('Connection succeeded!');
});

module.exports = db;