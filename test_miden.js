const MIDEN_CLIENT_ID = "XENERR03823AAFA050415983A2B84D250A1051"
const MIDEN_CLIENT_SECRET = "!bMi@ME2sLf02KsO!R$n3Ee?a3-r1H"
const MIDEN_UNIQUE_KEY = "099bda8c-52c1-40ef-bb03-d2dc3c3f57d9"
const MIDEN_BASE_URL = "https://sandbox-api.midencards.io/miden"
const MIDEN_AUTH_TOKEN_URL = 'https://identityserver.myapiservices.net/connect/token'
const MIDEN_ENCODER = "*c3RhY2thYnVzZS5jb20="
const OPENCAGE_API = "f278f54eebf640cd94d8ce1a76afb92d"
var tokenUrl = MIDEN_AUTH_TOKEN_URL
var clientId = MIDEN_CLIENT_ID
var clientSecret = MIDEN_CLIENT_SECRET
const { base64encode } = require('nodejs-base64')
const pm = {
    environment: {}
}

pm.environment["authorization"] = "MidenAuth " + base64encode(clientId)

var timest = Math.round((new Date()).getTime() / 1000);

pm.environment["reference"] = timest.toString() + timest.toString()

var txnRef = timest.toString() + timest.toString();

txnRef = txnRef.substring(0, 12);

pm.environment["trxnRef"] = txnRef

//console.log(pm.environment.get("reference"));
var baseUrl = MIDEN_BASE_URL
pm.environment["signature"] = getSignature()
// console.log(pm.environment.get("signature"));

function getUrl() {
    var url = pm.request.url.toString();
    url = url.replace("{{baseUrl}}", "");
    var newUrl = baseUrl + url;
    console.log("New Url " + newUrl);
    return newUrl;
}

function getSignature() {
    let ref = pm.environment["reference"]
    var url = getUrl();
    var httpVerb = pm.request.method;
    var encodeUrl = encodeURIComponent(url);
    var signValue = httpVerb + "&" + encodeUrl + "&" + ref + "&" + clientId + "&" + clientSecret;
    console.log(signValue);
    var hashValue = SHA1(signValue);
    console.log(hashValue);
    return base64encode(hashValue)

}

/**
* Secure Hash Algorithm (SHA1)
* http://www.webtoolkit.info/
**/
function SHA1(msg) {
    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };
    function lsb_hex(val) {
        var str = '';
        var i;
        var vh;
        var vl;
        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
    function cvt_hex(val) {
        var str = '';
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }
    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}





// const echoUrlEncodeBody = {
//     url: tokenUrl,
//     method: 'POST',
//     header: 'Content-Type:application/json',
//     body: {

//         mode: 'urlencoded',
//         urlencoded: [
//             { key: "client_id", value: clientId },
//             { key: "client_secret", value: clientSecret },
//             { key: "audience", value: "CardsAPI" },
//             { key: "grant_type", value: "client_credentials" },
//         ]
//     }
// };

// var getToken = true;

// if (!pm.environment.get('accessTokenExpiry') ||
//     !pm.environment.get('currentAccessToken')) {
//     console.log('Token or expiry date are missing')
// } else if (pm.environment.get('accessTokenExpiry') <= (new Date()).getTime()) {
//     console.log('Token is expired')
// } else {
//     getToken = false;
//     console.log('Token and expiry date are all good');
// }

// if (getToken === true) {
//     pm.sendRequest(echoUrlEncodeBody, function (err, res) {
//         console.log(err ? err : res.json());
//         if (err === null) {
//             console.log('Saving the token and expiry date')
//             var responseJson = res.json();
//             pm.environment.set('currentAccessToken', responseJson.access_token)
//             pm.environment.set("accessToken", "Bearer " + responseJson.access_token);

//             var expiryDate = new Date();
//             expiryDate.setSeconds(expiryDate.getSeconds() + responseJson.expires_in);
//             pm.environment.set('accessTokenExpiry', expiryDate.getTime());
//         }
//     });
// }

const axios = require('axios');
let data = '';

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: MIDEN_BASE_URL + '/api/v1/wallet/balances',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'MidenAuthorization': pm.environment["authorization"],
        'Reference': pm.environment["reference"],
        'Signature': pm.environment["Signature"],
        'UniqueKey': MIDEN_UNIQUE_KEY,
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJDODA2Qzc1NjQ5OUQyNDVGNkEwRTFEQkU0RDUwQjA4QTYzMDU1QjlSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6InZJQnNkV1NaMGtYMm9PSGI1TlVMQ0tZd1ZiayJ9.eyJuYmYiOjE2ODM1MzM5NzYsImV4cCI6MTY4MzUzNzU3NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eXNlcnZlci5teWFwaXNlcnZpY2VzLm5ldCIsImF1ZCI6IkNhcmRBUElzIiwiY2xpZW50X2lkIjoiWEVORVJSMDM4MjNBQUZBMDUwNDE1OTgzQTJCODREMjUwQTEwNTEiLCJqdGkiOiJDODFEN0Y5OUMwNTI4Nzk1NUQ5M0ZCN0VDMkYzM0IxNiIsImlhdCI6MTY4MzUzMzk3Niwic2NvcGUiOlsiQ2FyZEFQSXMiXX0.hLfAdJ4l6hM8QQppaC1yiKe5uDema2BqA0GjmgEVdSqsgsgsG6nJQx_h2CTpH445dbqSFaDv6x5N9_XkfKSUa7KXhyhltApRRWV-xBcu0DcD0ztSB2YLPLD8FItMYQ_JXvxh14FhR3qkGKFGNmMSpgLil_yVow0yYvPrgwo8HEa-ur3uqUmMGYaHrxPxd2VzX-wIkl7dre0tHjB3ULjCWgLuUBrB11bLEJ9N9Ef6NVHp_nRF0QhguFTSbTAcgGL2pHEMDPD2QNuTZqUpwFv7VJS_RIS9933BoHh63juaqnOD46yRkpG3oH8D_AOplXWJaNdu8LTPp1w2Iz4bOd7wcA'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
