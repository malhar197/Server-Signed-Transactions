var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', async function (req, res, next) {
  const Web3 = require('web3');
  var Tx = require('ethereumjs-tx').Transaction;

  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  const accounts = await web3.eth.getAccounts(console.log);
  console.log("Account: ", accounts);
  const contractAddress = '0x46d5dD0f22CC0aB1E7287b72Da27D25Be69c3225';
  const ABI = require('./test.abi.json');
  const account = '0xac2a04fc4e5768a6803247F5c619871A5D0b90c1';
  const privateKey = Buffer.from('40a26f5ab3e9cc41bcc887011aa8ef9c6055e31be540fff5b390f5a2d0e3a1d9', 'hex');
  // const newAddress = '0x678de8051a94e4ACE6B846A0EeB8a7af4a4C445e';
  const num = 1;
 
  var TestContract = new web3.eth.Contract(ABI, contractAddress);
  const _data = TestContract.methods.setNum(num).encodeABI();
  _nonce = await web3.eth.getTransactionCount(account)
  var rawTx = {
    nonce: _nonce,
    gasPrice: '0x20000000000',
    gasLimit: '0x27511',
    to: contractAddress,
    value: 0,
    data: _data
  }
  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  var _receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log("Receipt: ", _receipt);


  res.render('index', { title: 'Express', receipt: JSON.stringify(_receipt) });
});

module.exports = router;
