const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
console.log("PK2: "+process.env.MONGOOSE_DB_URL);


// const app = express();
// const routers = require('./router/routes.js');
// require('./config/db.config.js');
// abi = require('./RONIX.json');
// const { ethers, utils } = require('ethers');

// var allowedOrigins = ['http://localhost:3000', 'https://ronix.site'];
// app.use(cors({
//   origin: function(origin, callback){
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

// var https = require('https');

// app.post('/createFreeRonRequest/', routers)
// app.post('/createTransaction/', routers)
// app.post('/updateStatusRonRequest/:id/:status/:hash', routers)
// app.post('/updateStatusTransaction/:id/:status/:hash', routers)
// app.post('/revertTransaction/:id/:status', routers)
// app.post('/transferTokens/:hash/', routers)
// app.post('/updateTxFinalPrice/:hash/', routers)
// app.get('/getTransactions/', routers)
// app.get('/checkUserID/', routers)
// app.get('/getAllRonRequests/', routers)
// app.get('/getAllRonRequestsPending/', routers)
// app.get('/getAllRonRequestsCompleted/', routers)
// app.get('/getAllTransactions/', routers)
// app.get('/getTransaction/:id', routers)
// app.get('/getRonRequest/:id', routers)
// app.get('/getTransactionByHash/:hash', routers)
// app.get('/getTransactionByHashFrom/:hash', routers)

// const PORT = process.env.PORT || 9000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Runng port ${PORT}.`);
// });