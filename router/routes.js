const express = require('express')
const routers = express.Router()
const { ethers, utils } = require('ethers');
var cors = require('cors');
const { Transactions, FreeRon } = require('../config/db.config.js');
const { Tokens, Networks } = require('./contracts.js');
var https = require('https');

routers.post("/updateTxFinalPrice/:hash/", cors(), async (req, res) => {
  hash = req.params.hash;
  amount = req.query.amount;
  const tx = await Transactions.find({hash: hash, status: 'completed'});
  if(tx[0]){
    await Transactions.findOneAndUpdate({ hash: hash}, {amountTo:amount});   
  }
});

routers.post("/transferTokens/:hash/", cors(), async (req, res) => {
  hash = req.params.hash;
  
  const tx = await Transactions.find({hash: hash, status: 'pending'});
  if(tx[0]){

    let address = tx[0].address;
    let networkFrom = tx[0].networkFrom;
    let networkTo = tx[0].networkTo;
    let networkFromId = tx[0].networkFromId;
    let networkToId = tx[0].networkToId;
    let hashFrom = tx[0].hashFrom;
    let tokenFrom = tx[0].tokenFrom; 
    let tokenTo = tx[0].tokenTo; 
    let tokenFromSymbol = tx[0].tokenFromSymbol; 
    let tokenToSymbol = tx[0].tokenToSymbol; 
    let tokenFromDecimals = tx[0].tokenFromDecimals;
    let tokenToDecimals = tx[0].tokenToDecimals;
    let ronixFrom = tx[0].ronixFrom;
    let ronixTo = tx[0].ronixTo;
    let amountTo = tx[0].amountTo;
    let amountToWithoutFee = utils.parseUnits(parseFloat(amountTo+(1*amountTo/100)).toFixed(tokenToDecimals), tokenToDecimals);
    let amountToWithFee = utils.parseUnits(parseFloat(amountTo-(1*amountTo/100)).toFixed(tokenToDecimals), tokenToDecimals);

    const url = Networks[networkTo].RpcUrls;      
    const provider = new ethers.providers.JsonRpcProvider(url);
    const gasPrice = await provider.getGasPrice();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const signer = wallet.connect(provider);

    const urlFrom = Networks[networkFrom].RpcUrls;      
    const providerFrom = new ethers.providers.JsonRpcProvider(urlFrom);

    const contract = new ethers.Contract(ronixTo, abi, signer);
    let txExists = 0;
    if(networkFrom !== "RON"){
      const contractFrom = new ethers.Contract(ronixFrom, abi, providerFrom);
      txExists = utils.formatUnits(await contractFrom.getTransaction(address, tokenFrom, networkFromId, hash), tokenFromDecimals);
    }else{
      txExists = 1;
    }
    if(txExists > 0){
    if(networkTo === "RON"){
      if(tokenToSymbol === "RON" || tokenFromSymbol === "RON"){
        let tx = {
            to: address,
            value: amountToWithFee,
            gasLimit: 6721975,
            gasPrice: gasPrice
        };
        exec = await signer.sendTransaction(tx);
        const update = await Transactions.findOneAndUpdate({ hash: hash}, {status:'completed', hashTo:exec.hash, amountTo: parseFloat(amountTo-(1*amountTo/100)).toFixed(tokenToDecimals), tokenToDecimals});
        res.send(update);
        }else{  
          const exec = await contract.transfer(address, amountToWithFee, {
          gasLimit: 6721975,
          gasPrice: gasPrice
          });
          const update = await Transactions.findOneAndUpdate({ hash: hash}, {status:'completed', hashTo:exec.hash, amountTo: parseFloat(amountTo-(1*amountTo/100)).toFixed(tokenToDecimals), tokenToDecimals});
          res.send(update);
        }
    }else{
      const exec = await contract.transferTokens(address, tokenTo, amountToWithoutFee, tx[0].hash, {
      gasLimit: 1000000,
      gasPrice: gasPrice
      });
      const update = await Transactions.findOneAndUpdate({ hash: hash}, {status:'completed', hashTo:exec.hash, hash: tx[0].hash, amountTo: amountTo});
      res.send(exec);
    }
  }

  }else{
    res.send("Notfound");
  }
});


routers.post("/revertTransaction/:id/:status", cors(), (req, res) => {
  Transactions.findOneAndUpdate({ _id: req.params.id}, {status:req.params.status}).then((r) => {
  res.send(r.status); 
});
});

routers.post("/updateStatusTransaction/:id/:status/:hash", cors(), (req, res) => {
  Transactions.find({ _id: req.params.id}, (err1, tx1) => {
    Transactions.findOneAndUpdate({ _id: req.params.id}, {status:req.params.status, hashTo:req.params.hash, hash: tx1[0].hash, amountTo: req.query.value}).then((r) => {
    res.send(r.status);
})   
});
});

routers.get("/getTransactionByHash/:hash", cors(), (req, res) => {
  Transactions.find({hash: req.params.hash}, (err, tx) => {
      res.send(tx);  
    });
});

routers.get("/getTransactionByHashFrom/:hash", cors(), (req, res) => {
  Transactions.find({hashFrom: req.params.hash}, (err, tx) => {
      res.send(tx);  
    });
});

routers.get("/getRonRequest/:id", cors(), (req, res) => {
  FreeRon.find({_id: req.params.id}, (err, tx) => {
      res.send(tx);  
    });
});

routers.get("/getTransaction/:id", cors(), (req, res) => {
  Transactions.find({_id: req.params.id}, (err, tx) => {
      res.send(tx);  
    });
});

routers.get("/api/getAllTransactions/", cors(), (req, res) => {
  Transactions.find({}, (err, txs) => {
      var arrTransactions = [];
      let n = 0;
      txs.forEach((tx) => {
          arrTransactions[n] = tx;
          n++;
      });
      res.send(arrTransactions);  
    });

});

routers.post("/updateStatusRonRequest/:id/:status/:hash", cors(), (req, res) => {
  FreeRon.find({ _id: req.params.id}, (err1, tx1) => {
    FreeRon.findOneAndUpdate({ _id: req.params.id}, {status:req.params.status, hash:req.params.hash}).then((r) => {
    res.send(r.status);
})   
});
});

routers.get("/getAllRonRequestsPending/", cors(), (req, res) => {
  FreeRon.find({status: 'pending'}, (err, txs) => {
      var arrFreeRons = [];
      let n = 0;
      txs.forEach((tx) => {
        arrFreeRons[n] = tx;
          n++;
      });
      res.send(arrFreeRons);  
    });

});

routers.get("/getAllRonRequestsCompleted/", cors(), (req, res) => {
  FreeRon.find({status: 'pending'}, (err, txs) => {
      var arrFreeRons = [];
      let n = 0;
      txs.forEach((tx) => {
        arrFreeRons[n] = tx;
          n++;
      });
      res.send(arrFreeRons);  
    });

});

routers.get("/getAllRonRequests/", cors(), (req, res) => {
  FreeRon.find({}, (err, txs) => {
      var arrFreeRons = [];
      let n = 0;
      txs.forEach((tx) => {
        arrFreeRons[n] = tx;
          n++;
      });
      res.send(arrFreeRons);  
    });

});

routers.post("/createTransaction/", cors(), async (req, res) => {
  Transactions.create({ 
      address: req.query.address, 
      networkFrom: req.query.networkFrom,
      networkTo: req.query.networkTo,
      networkFromId: req.query.networkFromId,
      networkToId: req.query.networkToId,
      hash: req.query.hash,
      hashFrom: req.query.hashFrom,
      hashTo: req.query.hashTo,
      amountFrom: req.query.amountFrom,
      amountTo: req.query.amountTo,
      tokenFrom: req.query.tokenFrom,
      tokenTo: req.query.tokenTo,
      tokenFromSymbol: req.query.tokenFromSymbol,
      tokenToSymbol: req.query.tokenToSymbol,
      tokenFromDecimals: req.query.tokenFromDecimals,
      tokenToDecimals: req.query.tokenToDecimals,
      ronixFrom: req.query.ronixFrom,
      ronixTo: req.query.ronixTo,
      status: 'pending'
  });

});

routers.get("/getTransactions/", cors(), (req, res) => {
  const query = Transactions.find({}, null, {limit: 10, sort: {'createdAt': -1}})
  query.exec((err, tx) => {
      res.send(tx);  
    });

});

routers.get("/checkUserID/", cors(), (req, res) => {
  const options = {
    path: '/json/',
    host: 'ipapi.co',
    port: 443,
    headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
  };
  https.get(options, function(resp){
      var body = ''
      resp.on('data', function(data){
          body += data;
      });
  
      resp.on('end', function(){
          var loc = JSON.parse(body);
          let session = utils.solidityKeccak256(["string"], [loc.ip]);
        FreeRon.find({session: session}, (err, tx) => {
          res.send(tx);  
        });
      });
  });
})

routers.post("/createFreeRonRequest/", cors(), (req, res) => {
  let addr = req.query.addr;
  const options = {
    path: '/json/',
    host: 'ipapi.co',
    port: 443,
    headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
  };
  https.get(options, function(resp){
      var body = ''
      resp.on('data', function(data){
          body += data;
      });
  
     
      resp.on('end', function(){
          var loc = JSON.parse(body);
          let session = utils.solidityKeccak256(["string"], [loc.ip]);
          FreeRon.find({session: session, address: addr}, (err, txs) => {
            var arrs = [];
            var n = 0;
            txs.forEach((tx) => {
              arrs[n] = tx;
            });
            if(!arrs[0]){
                FreeRon.create({ 
                  address: addr, 
                  hash: "0x",
                  amount: 0.0005,
                  ip: loc.ip,
                  postal: loc.postal,
                  city: loc.city,
                  region: loc.region,
                  country: loc.country,
                  session: session,
                  status: 'pending'
              });
              res.send("Succefull!");
            }else{
                  res.send("User already claimed!");
                }
            });
      
      });
  });
});

  module.exports = routers
