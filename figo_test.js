const axios = require('axios')
const { AES, enc } = require('crypto-js')

const uuid = require("uuid-random");
const txid = uuid()

FIGO_PAYMENT_SK = "SK_LIVE_ffef65ce668e875c9dcfaef50cc5890dfe2280c487376bcf9a27610507ee7569"
FIGO_PAYMENT_PK = "PK_LIVE_d5bdf8b2ba15abbcccc4a8c437caf90a26021489631dc7c39d5d57d5dadfcd64"
FIGO_PAYMENT_ENCRYTION = "d8539a358bd112efdbe102dbd7df72468ba02a5134ed2e5f"
FIGO_PAYMENT_WEBHOOK = ''
FIGO_COLLECTION_ENDPOINT = "https://api.figopayment.com/api/v1/service/bills/item/pay"
FIGO_PAYMENT_TIME = 30

const Ks = FIGO_PAYMENT_SK + FIGO_PAYMENT_PK + txid
const token = AES.encrypt(Ks, FIGO_PAYMENT_ENCRYTION).toString();

const figoRequestDetails = {
    method: 'POST',
    url: FIGO_COLLECTION_ENDPOINT,
    headers: {
        "api-key": token,
        "public-key": FIGO_PAYMENT_PK,
        "reference-id": txid
    },
    data:{
        "division": "C",
        "paymentItem": "424",
        "billerId": "glong",
        "productId": "424",
        "amount": "100",
        "billId": "08159147316",
        "category":"AIRTIME"
    }


}
				 console.log(figoRequestDetails)
 axios(figoRequestDetails).then(data=>console.log(data.data.data)).catch((err)=>console.log(err.response.data))
