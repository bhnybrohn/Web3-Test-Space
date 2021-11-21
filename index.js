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

const web3 = new Web3('https://bsc-dataseed.binance.org/');
const wkdContractAddress = "0x5344C20FD242545F31723689662AC12b9556fC3d";
let minABI = [
    // transfer
    {
      'constant': false,
      'inputs': [
        {
          'name': '_to',
          'type': 'address'
        },
        {
          'name': '_value',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'type': 'function'
    }
  ]
const binance = new Binance().options({
    APIKEY: BINANCE_APIKEY,
    APISECRET: BINANCE_APISECRET
  })
app.get('/testground', async (req, res) => {

var block = await web3.eth.getBlock("latest");
var gasLimit = block.gasLimit;

try {

const TxCount = await web3.eth.getTransactionCount('0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73')
const gasPrice = await web3.eth.getGasPrice()
    const contract = new web3.eth.Contract(minABI, wkdContractAddress, {
      from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73', // default from address
      gasPrice: gasPrice, // default gas price in wei, 20 gwei in this case
      nonce: TxCount + 1
    });

// console.log(await web3.eth.getTransactionCount('0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73'));
    // const  = await web3.eth.gasPrice
    // console.log()
const gasLimt = await contract.methods.transfer('0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF',  0.0002 * 10 ** 18).estimateGas({from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73' });  // the transaction object

    // console.log("transacti'on data", {to, amount, privatekey, fee, from });
   
    console.log(gasPrice )

    web3.eth.accounts.wallet.add('41bbbb7bd990a72bf097406b694292978a62445609cfc9b0839707276f7202c3');

    const receipt = await contract.methods
      .transfer('0x4C682f66fAa20728B7E1C8790BCe6a5338B9E8CF', `${0.0001 * 10 ** 18}`)
      .send({
        from:'0xAe2cCE6804ecb48680f42B8506d8Eb8831Aa4c73',
        gas: 10 ** 8,
        nonce: TxCount + 1
      });

      
    if (receipt) {
      console.log("hash", receipt);
    //   return {
    //     msg: "Transaction submitted",
    //     data: receipt,
    //   };
    }
  } catch (error) {

    console.log("trigger smart error", error.message);
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