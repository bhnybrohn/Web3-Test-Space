const axios = require('axios')
const express = require('express')
const app = express()
const bip39 = require('bip39')
const bip32 = require('bip32')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')
let { bech32, bech32m } = require('bech32')
const Web3 = require('web3')
// {"jsonrpc": "1.0", "id": "curltest", "method": "getrawtransaction", "params": ["mytxid", true]}' -H 'content-type: text/plain;' http://127.0.0.1:8332/
const Binance = require('node-binance-api')
const BINANCE_APIKEY = "tSFoYcFRqG0vIvb6p7U3pzo3XvUQSgwjWn3eznqOhjKhaKbMS7Sx2lhENgedFvtV"
const BINANCE_APISECRET = "lIfxWGC7QsffqXXZKofgqUCsBms4UnWxaTCMC3EA413KoKRqxVEGXP3DFnXSDCIt"

const web3 = new Web3('https://eth-mainnet.alchemyapi.io/v2/Wj__gSBpJL2CM6SpLB29F2bznKGCd_UY');

const ethers = require('ethers')
const bn = require('bn.js')
const { Bitcoin } = require('./bitcoin')
const mail = require('./email')
const { EmailAddress } = require('@sendgrid/helpers/classes')
const bitcoin = new Bitcoin()
const nodeMailer = require('nodemailer');
const q = require('q');
const sgMail = require('@sendgrid/mail');

// const wkdContractAddress = "0x5344C20FD242545F31723689662AC12b9556fC3d";


// let minABI = [
//     // transfer
//     {
//       'constant': false,
//       'inputs': [
//         {
//           'name': '_to',
//           'type': 'address'
//         },
//         {
//           'name': '_value',
//           'type': 'uint256'
//         }
//       ],
//       'name': 'transfer',
//       'outputs': [
//         {
//           'name': '',
//           'type': 'bool'
//         }
//       ],
//       'type': 'function'
//     }
//   ]
// const binance = new Binance().options({lo
//     APIKEY: BINANCE_APIKEY,
//     APISECRET: BINANCE_APISECRET
//   })

// const AWS = require("aws-sdk");
// const kmsClient = new AWS.KMS({ accessKeyId: 'AKIAVGFYWAOLHNW73KZ4', secretAccessKey: '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', region: "us-east-1" });

app.get('/testground', async (req, res) => {
  //   console.log('s')
  // mail()

  //   const KeyId = 'arn:aws:kms:us-east-1:356869604246:key/144e8897-ed26-4df6-b00a-354a9c770f92';
  //   const Plaintext = 'this is a test';
  //   let x;
  //  await kmsClient.encrypt({ KeyId, Plaintext }, (err, data) => {
  //     console.log('mhbj')
  //     if (err) console.log(err.stack); // an error occurred
  //     else {

  //       const { CiphertextBlob } = data;
  //       console.log(CiphertextBlob.toString('hex').match(/../g).join(' '), CiphertextBlob.toString('base64'));
  //       //  CiphertextBlob = '<Buffer 01 02 02 00 78 49 56 f7 29 b6 bb e0 97 a0 06 12 5e 32 f1 f6 a2 34 72 da 4d bc 43 ee 32 12 4a f4 50 ff d6 2f fb 01 a5 30 9f a3 b0 c1 a1 d3 7d f7 0e b9 59 65 b3 86 00 00 00 6c 30 6a 06 09 2a 86 48 86 f7 0d 01 07 06 a0 5d 30 5b 02 01 00 30 56 06 09 2a 86 48 86 f7 0d 01 07 01 30 1e 06 09 60 86 48 01 65 03 04 01 2e 30 11 04 0c 6e 11 bc 96 70 a9 4e c0 1f bc 0a 47 02 01 10 80 29 2a 6f f4 9c 10 0b 06 b1 85 4e 0e 15 05 4d 52 1f b3 d9 63 da f5 43 1c 94 5a 16 5b 77 3b 41 a3 d6 47 83 22 99 68 dc ae 11 32>'
  //       // console.log(CiphertextBlob)
  //       const buf = Buffer.from(CiphertextBlob.toString('base64'), 'base64');
  //        kmsClient.decrypt({ CiphertextBlob:buf, KeyId }, (err, data) => {
  //         if (err) console.log(err, err.stack); // an error occurred
  //         else {
  //           const { Plaintext } = data;
  //         console.log(Plaintext.toString(), Plaintext); // successful response
  //         }
  //       });

  //     }
  //   });

  // Decrypt a data key
  //
  // Replace the following example key ARN with any valid key identfier

  // const CiphertextBlob = x
  // await kmsClient.decrypt({ CiphertextBlob, KeyId }, (err, data) => {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else {
  //     const { Plaintext } = data;
  //   console.log(Plaintext.toString(), Plaintext); // successful response
  //   }
  // });

  // var block = await web3.eth.getBlock("latest");
  // var gasLimit = block.gasLimit;

  try {

    let deferred = q.defer()
    sgMail.setApiKey("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");

    const msg = {
      to: "smyxbrone@gmail.com",
      from: "Wah Hong <" + "motor@wahhong.sg" + ">",
      subject: "smyxbrone",
      html: `<h1>This is me testing </h1>`,
    };

    sgMail.send(msg, function (err, sentResult) {
      if (err) {
        console.log(err.message);
        deferred.resolve(err);
      } else {
        console.log('sentResult', msg);
        deferred.resolve(sentResult);
      }
    });
    return deferred.promise;

    // const data = {
    //   receiverAddress: '3517dH2nWnEMzWE4YJCUC741doadQ5jhUN',
    //   senderAddress: '1CEmdRsAviepU11Fts49TWGMm5LX44M881',
    // privatekey: 'KysGeF68YZsjPQ3GbogNhuSzAjnkh6XuKLoB3GMhECQHj5DsHqcW',
    // coin: 'BTC',
    // amount: 0.012108175800389425,
    // balance: 0.00046149,
    // spending: false,
    // fee: 0.000034

    // }

    // const sendcoin = await bitcoin.sendBitcoin(data)

    //   const connection = new ethers.providers.AlchemyProvider('mainnet','Wj__gSBpJL2CM6SpLB29F2bznKGCd_UY')
    // //   const gasPrice =  await connection.getGasPrice()
    // // console.log(gasPrice.toString())
    //   // const wallet = new ethers.Wallet("0x5e28647e7cd6ae9ab5b5f7cc1572f2277e39fa90e282364c1974149f982b6229")
    //   const pk = new ethers.Wallet.fromMnemonic('true inspire ribbon network ski surround smooth drop situate matrix move snow', "m/44'/60'/0'/0/0")
    //   console.log(pk._signingKey())

    //   //   const block = await web3.eth.getBlock('latest');

    //   //   const gasLimit = web3.utils.fromWei(block.gasLimit.toString(), 'ether');
    //   //   console.log(gasLimit)
    //   const addWallet = web3.eth.accounts.wallet.add(pk._signingKey().privateKey);
    //   console.log(addWallet)



    // const createTransaction = await web3.eth.accounts.signTransaction(
    //   {
    //     from: "0x12972Ac247BAC3f7385f2792d0448F81f43A63BB",
    //     to: "0xd43e1E0C2aEA450b5B27603fB76C43D117d59F64",
    //     value: web3.utils.toWei(0.001 .toString(), 'ether'),
    //     gas:  44000,
    //   },
    //   "0x4955b0262ed41203cc4050505676ff9b0b34fe9d87e74e154d9c484ccfd7df97",
    // );

    // console.log(createTransaction, web3.utils.toWei(Number(gasLimit).toFixed(15), 'ether'),  web3.utils.toWei(0.0515.toString(), 'ether'));

    // const createReceipt = await web3.eth.sendSignedTransaction(
    //   createTransaction.rawTransaction,
    // );
    // console.log(
    //   `Transaction successful with hash: ${createReceipt.transactionHash}`,
    // );

    // if (createReceipt?.transactionHash) {
    //   return {
    //     msg: 'Transaction successful',
    //     data: createReceipt.transactionHash,
    //   };
    // }
    // const data = require('os').networkInterfaces()
    // res.send(sendcoin)

    // const requestData = {
    //   data: {
    //     id: 1,
    //     method: 'qn_addressBalance',
    //     params: [`
    //     129XNpNHAmAS8e4hV3mhneotiYonWSFSMC`],
    //   },
    //   url: 'https://holy-shy-haze.bcoin.quiknode.pro/fb04bba45327ee98b6b90d50b2bc8dae6cb2b36f/',
    // };

    // const response = await axios.post(requestData.url, requestData.data, {
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    // });
    // console.log(response.data)
    // const TxCount = await web3.eth.getTransactionCount('0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73')

    // const gasPrice = await web3.eth.getGasPrice()
    //     const contract = new web3.eth.Contract(minABI, wkdContractAddress, {
    //       from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73', // default from address
    //       gasPrice: gasPrice, // default gas price in wei, 20 gwei in this case
    //       nonce: TxCount + 1
    //     });

    // console.log(await web3.eth.getTransactionCount('0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73'));
    // const  = await web3.eth.gasPrice
    // console.log()
    // const gasLimt = await contract.methods.transfer('0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF',  0.0002 * 10 ** 18).estimateGas({from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73' });  // the transaction object

    // console.log("transacti'on data", {to, amount, privatekey, fee, from });

    // console.log(gasPrice )

    // web3.eth.accounts.wallet.add('41bbbb7bd990a72bf097406b694292978a62445609cfc9b0839707276f7202c3');

    // const receipt = await contract.methods
    //   .transfer('0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF', `${0.0001 * 10 ** 18}`)
    //   .send({
    //     from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73',
    //     gas: 10 ** 8,
    //     nonce: TxCount + 1
    //   });




  } catch (error) {

    console.log("trigger smart error", error);
    // throw new HttpException(error.message, 400);

  }

  // const createTransaction = await web3.eth.accounts.signTransaction(
  //     {
  //         from: "0x15fC228Da52FDad7d486158907FE5076B473d18a",
  //         to: "0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF",
  //         value: 0.001512 * (10 ** 18),
  //         gas: '30000'
  //     },
  //     // "eea14f0346a0b7ade64245d6ca790b2f8729c1a5f49919454a81df48f4b3ef47
  // );
  // let minABI = [
  //     // balanceOf
  //     {
  //         "constant": true,
  //         "inputs": [{ "name": "_owner", "type": "address" }],
  //         "name": "balanceOf",
  //         "outputs": [{ "name": "balance", "type": "uint256" }],
  //         "type": "function"
  //     },
  //     // decimals
  //     {
  //         "constant": true,
  //         "inputs": [],
  //         "name": "decimals",
  //         "outputs": [{ "name": "", "type": "uint8" }],
  //         "type": "function"
  //     }
  // ];
  // const wkdContractAddress = "0x5344C20FD242545F31723689662AC12b9556fC3d"

  // const contract = new web3.eth.Contract(minABI, wkdContractAddress, {
  //     from, // default from address
  //     gasPrice: "200000000" // default gas price in wei, 20 gwei in this case
  // });

  // const addWallet =  web3.eth.accounts.wallet.add("eea14f0346a0b7ade64245d6ca790b2f8729c1a5f49919454a81df48f4b3ef47");
  // // Deploy transaction
  // // const createReceipt = await web3.eth.sendSignedTransaction(
  // //     createTransaction.rawTransaction
  // // );
  // console.log(
  //   addWallet, contract
  // );



  // const tx = myContract.methods.setData(2);
  // const gas = await tx.estimateGas({from: "0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF"});
  // const gasPrice = await web3.eth.getGasPrice();
  // const data = tx.encodeABI();
  // const nonce = await web3.eth.getTransactionCount("0x515b72Ed8a97F42C568D6A143232775018f133C8");
  // const txData = {
  //   from: "0x15fC228Da52FDad7d486158907FE5076B473d18a",
  //   to: "0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF",
  //   data: data,
  //   gas:gas,
  //   gasPrice,
  //   nonce, 
  // };

  // console.log(`Old data value: ${await myContract.methods.data().call()}`);
  // const receipt = await web3.eth.sendTransaction(txData);
  // console.log(`Transaction hash: ${receipt.transactionHash}`);
  // console.log(`New data value: ${await myContract.methods.data().call()}`);

  // const x = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81]


  //     const mnemonic = "face clerk skull release horse symptom dress device effort edit ill panther"
  //     if (!bip39.validateMnemonic(mnemonic, bip39.wordlists.english) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_simplified) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_traditional) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.korean) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.french) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.italian) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.spanish) && !bip39.validateMnemonic(mnemonic, bip39.wordlists.japanese)) {
  //         throw new Error("wrong mnemonic format");
  //     }

  //     const HDPATH = `m/46'/714'/0'/0/${element}`;

  //     var seed = bip39.mnemonicToSeedSync(mnemonic);
  //     const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))

  //     var child = root.derive(HDPATH);

  //     if (!child.privateKey) {

  //         throw new Error("child does not have a privateKey");
  //     }

  //     console.log("pk",child.privateKey.toString("hex"))

  //     const value = child.privateKey.toString("hex")

  //     const privateToPublic = ethUtil.privateToPublic(child._privateKey)
  //    const AddressGen ='0x' + ethUtil.publicToAddress(privateToPublic).toString('hex')
  //    const checkSum = ethUtil.toChecksumAddress(AddressGen)
  // console.log("checkSum",checkSum)

  // if (Buffer.isBuffer(value)) {
  //     words = bech32.toWords(Buffer.from(value));
  // } else {
  //     words = bech32.toWords(Buffer.from(value, type));
  // }

  // console.log(bech32.encode(prefix, words))


  // console.log(seed.toString("hex"))

  // const Web3 = require('web3');

  // async function main() {

  //     const web3 = new Web3('https://bsc-dataseed.binance.org/');
  //     // const loader = setupLoader({ provider: web3 }).web3;
  // const balance =   await  web3.eth.getBalance("0x515b72Ed8a97F42C568D6A143232775018f133C8")
  //     // const account = web3.eth.accounts.privateKeyToAccount("$private-key")
  //     // const account = Web3.eth.accounts.create();
  // //    const add =  client.createAccountWithMneomnic("hope expire space owner liquid sock friend scale tongue screen possible bar enlist above rice")
  //     console.log(parseFloat(balance) / 1000000000000000000);
  //     // generate mnemonic
  //     // getPrivateKeyFromMnemonic
  //     // genera`
  // }
  // main()
})



app.listen('8888', () => {
  console.log('Test Ground Is Listening')
})