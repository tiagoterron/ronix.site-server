const mongoose = require("mongoose");
const db = mongoose.connect("test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


var schema = mongoose.Schema(
    {
    address: String,
    networkFrom: String,
    networkTo: String,
    networkFromId: Number,
    networkToId: Number,
    hash: String,
    hashFrom: String,
    hashTo: String,
    amountFrom: Number,
    amountTo: Number,
    tokenFrom: String,
    tokenTo: String,
    tokenFromSymbol: String,
    tokenToSymbol: String,
    tokenFromDecimals: Number,
    tokenToDecimals: Number,
    ronixFrom: String,
    ronixTo: String,
    status: {
        type: String,
        enum : ['pending', 'confirming', 'canceled', 'reverted', 'completed']
    }
    },
    { timestamps: true }
);

var FreeRonSchema = mongoose.Schema(
  {
  address: String,
  hash: String,
  amount: Number,
  ip: String,
  postal: String,
  city: String,
  region: String,
  country: String,
  session: String,
  status: {
      type: String,
      enum : ['pending','canceled', 'completed']
  }
  },
  { timestamps: true }
);

Transactions = mongoose.model('transactions', schema);
FreeRon = mongoose.model('freerons', FreeRonSchema);


module.exports = {Transactions, FreeRon}