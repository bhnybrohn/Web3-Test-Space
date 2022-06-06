const bitcoin = require('bitcoinjs-lib')
const axios = require('axios')
const request = require('request')


class Bitcoin {

    async getFee() {
        // const blockCypherUrl = "https://api.blockcypher.com/v1/btc/main"
        try {

            //   const response = await axios.get(blockCypherUrl)


            return{
                "notice": "",
                "unspent_outputs": [
                {
                "tx_hash_big_endian": "3148f32b36737bccab475f5cb2b27e09aa048b83c66f9eb5b8357d9beddc3c9c",
                "tx_hash": "9c3cdced9b7d35b8b59e6fc6838b04aa097eb2b25c5f47abcc7b73362bf34831",
                "tx_output_n": 0,
                "script": "76a9147b440b761ad1668a43940ca1fae9d8aff3d17e8188ac",
                "value": 1208961,
                "value_hex": "127281",
                "confirmations": 346,
                "tx_index": 5497126992965542
                }
                ]
                }
        } catch (error) {
            console.log(error);
        }
    }


    getAddress(privateKey) {
        const keyPair = bitcoin.ECPair.fromWIF(privateKey, this.network)
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
        return address
    }

    getBalance(address) {
        return new Promise((resolve, reject) => {
            request.get(`https://blockchain.info/q/addressbalance/${address}`, (err, res, body) => {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })
    }

    async getUTXO(address) {
        // return new Promise((resolve, reject) => {
        //     request.get(`https://blockchain.info/unspent?cors=true&active=${address}`, (err, res, body) => {
        //         if(err){
        //             reject(err)
        //         }
        //         resolve(body)
        //     })
        // })
        // const UnspentUrl = `https://blockchain.info/unspent?active=${address}`
        try {

            //   const response = await axios.get(UnspentUrl)
            return {
                "notice": "",
                "unspent_outputs": [
                    {
                        "tx_hash_big_endian": "28eb43ce6b9ed426430f37488373698a4e24bac873546e26138fa9bcd4301144",
                        "tx_hash": "441130d4bca98f13266e5473c8ba244e8a69738348370f4326d49e6bce43eb28",
                        "tx_output_n": 27,
                        "script": "76a914343d3949cfbdceeedafc351193cb7d8dbfc1df5288ac",
                        "value": 1132880,
                        "value_hex": "114950",
                        "confirmations": 5,
                        "tx_index": 2394899980195121
                    }
                ]
            }

        } catch (error) {
            console.log(error)
        }
    }

    getTransaction(txid) {
        return new Promise((resolve, reject) => {
            request.get(`https://blockchain.info/rawtx/${txid}`, (err, res, body) => {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })
    }

    getTransactionInfo(txid) {
        return new Promise((resolve, reject) => {
            request.get(`https://blockchain.info/rawtx/${txid}?format=json`, (err, res, body) => {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })
    }
    satoshiToBTC(value) {

        return Math.floor(value * 100000000)

    }

    async sendBitcoin(data) {

        const mnemonic = "morning layer flock recipe dial lens exile fragile else dilemma learn tone"
        const index = 9

        const n_outputs = 1.5
        const getFess = await this.getFee()
        const UnspentOutputs = await this.getUTXO(data.senderAddress)
        //   console.log(UnspentOutputs, getFess)

        const n_inputs = UnspentOutputs.unspent_outputs.length;

        const low = getFess.low_fee_per_kb / 1000;
        // dynamic fee
        const fee = Math.floor((n_inputs * 148 + n_outputs * 34 + 10) * low);

        console.log(fee)

        const privatekey = data.privatekey
        const url = 'https://blockchain.info/unspent?active=' + `${data.senderAddress}`;
        console.log(privatekey)

        //    request.get(url, async(err, res, body)=>{
        //        if(!err && res.statusCode === 200){
        const json = {
            "notice": "",
            "unspent_outputs": [
            {
            "tx_hash_big_endian": "3148f32b36737bccab475f5cb2b27e09aa048b83c66f9eb5b8357d9beddc3c9c",
            "tx_hash": "9c3cdced9b7d35b8b59e6fc6838b04aa097eb2b25c5f47abcc7b73362bf34831",
            "tx_output_n": 0,
            "script": "76a9147b440b761ad1668a43940ca1fae9d8aff3d17e8188ac",
            "value": 1208961,
            "value_hex": "127281",
            "confirmations": 346,
            "tx_index": 5497126992965542
            }
            ]
            }
        //            console.log(json.unspent_outputs)

               const value = json.unspent_outputs
          .map((value) => {
            return value.value;
          })
          .reduce((a, b) => a + b, 0);

        // const value = 1132880

        const unspentHash = json.unspent_outputs.map((hash) => {
            const hashOut = {
                hash: hash.tx_hash_big_endian,
                output: hash.tx_output_n,
                value: hash.value,
            };
            return hashOut;
        });

        console.log(unspentHash);

        const fee_amount = value - this.satoshiToBTC(data.fee);
        console.log(fee_amount, this.satoshiToBTC(data.fee));

        // const returningAmount = fee_amount - this.satoshiToBTC(data.amount);
        // console.log(returningAmount);

        // building transaction
        const txb = new bitcoin.TransactionBuilder(bitcoin.networks.bitcoin);
        const keyPair = bitcoin.ECPair.fromWIF(privatekey);


        for (let i = 0, k = unspentHash.length; i < k; i++) {
            txb.addInput(unspentHash[i].hash, unspentHash[i].output);
        }

   console.log(fee_amount)
        txb.addOutput(
            `${data.receiverAddress}`,
            fee_amount,
        );

        console.log('Here, returningAmount <= 0');

        for (let i = 0, k = unspentHash.length; i < k; i++) {
            txb.sign(i, keyPair, null, null, unspentHash[i].value);
        }
        const tx = txb.build(); // build to hash

        console.log(tx.toHex());


    }

    //    })


}

module.exports = {
    Bitcoin
}