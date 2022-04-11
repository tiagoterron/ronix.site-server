const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();
const routers = require('./router/routes.js');
require('./config/db.config.js');
abi = require('./RONIX.json');
const { ethers, utils } = require('ethers');

console.log("URL"+process.env.MONGOOSE_DB_URL);
console.log("PK"+process.env.PRIVATE_KEY);

var allowedOrigins = ['http://localhost:3000', 'https://ronix.site'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

var https = require('https');

app.post('/api/createFreeRonRequest/', routers)
app.post('/api/createTransaction/', routers)
app.post('/api/updateStatusRonRequest/:id/:status/:hash', routers)
app.post('/api/updateStatusTransaction/:id/:status/:hash', routers)
app.post('/api/revertTransaction/:id/:status', routers)
app.post('/api/transferTokens/:hash/', routers)
app.post('/api/updateTxFinalPrice/:hash/', routers)
app.get('/api/getTransactions/', routers)
app.get('/api/checkUserID/', routers)
app.get('/api/getAllRonRequests/', routers)
app.get('/api/getAllRonRequestsPending/', routers)
app.get('/api/getAllRonRequestsCompleted/', routers)
app.get('/api/getAllTransactions/', routers)
app.get('/api/getTransaction/:id', routers)
app.get('/api/getRonRequest/:id', routers)
app.get('/api/getTransactionByHash/:hash', routers)
app.get('/api/getTransactionByHashFrom/:hash', routers)

const PORT = process.env.PORT || 9000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on port ${PORT}.`);
});