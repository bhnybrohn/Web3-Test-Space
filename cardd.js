const axios = require('axios')
//const {
//    MIDEN_AUTH_TOKEN_URL,
//    MIDEN_BASE_URL,
//    MIDEN_CLIENT_ID,
//    MIDEN_CLIENT_SECRET,
//    MIDEN_UNIQUE_KEY,
//    OPENCAGE_API
//} = require('../constants/env_constants')
// import CryptoJS, {SHA256, enc} from 'crypto-js';
const { SHA1, enc } = require('crypto-js')
const querystring = require('querystring');
const base64 = require("nodejs-base64-encode");
const NodeGeocoder = require('node-geocoder');

const MIDEN_CLIENT_ID = "XENERR03823AAFA050415983A2B84D250A1051"
const MIDEN_CLIENT_SECRET = "!bMi@ME2sLf02KsO!R$n3Ee?a3-r1H"
const MIDEN_UNIQUE_KEY = "099bda8c-52c1-40ef-bb03-d2dc3c3f57d9"
const MIDEN_BASE_URL = "https://sandbox-api.midencards.io/miden"
const MIDEN_AUTH_TOKEN_URL = 'https://identityserver.myapiservices.net/connect/token'
const MIDEN_ENCODER = "*c3RhY2thYnVzZS5jb20="
const OPENCAGE_API = "f278f54eebf640cd94d8ce1a76afb92d"

class VirtualCard {
    generateReference(size) {
        return [...Array(size)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
    }

    async getToken() {
        try {
            const data = new URLSearchParams();
            data.append('grant_type', 'client_credentials');
            data.append('scope', 'CardAPIs');

            const config = {
                method: 'POST',
                url: MIDEN_AUTH_TOKEN_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: MIDEN_CLIENT_ID,
                    password: MIDEN_CLIENT_SECRET
                },
                data
            }
            console.log(config)
            const response = await axios(config)
            console.log("1", response.data)
            return response.data.access_token
        } catch (e) {
            // console.log("[++]", e.message)
            return e.response.data.error
        }
    }

    async buildSignature(method, path, ref) {

        const signature = method + '&' + encodeURIComponent((MIDEN_BASE_URL + path)) + '&' +
            ref + '&'
            + MIDEN_CLIENT_ID + '&' + MIDEN_CLIENT_SECRET;

        const digest = this.SHA1(signature);
        return this.stringToBase64(digest)
    }
    SHA1(msg) {
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

    stringToBase64(string) {
        const buffer = Buffer.from(string, 'utf-8');
        return buffer.toString('base64');
    }

    async getHeader(method, path) {
        const ref = this.generateReference(20).toUpperCase()
        return {
            // method: method,
            // url: MIDEN_BASE_URL + path,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'MidenAuthorization': "MidenAuth" + " " + this.stringToBase64(MIDEN_CLIENT_ID),
            'Reference': ref,
            'Signature': await this.buildSignature(method, path, ref),
            'UniqueKey': MIDEN_UNIQUE_KEY,
            'Authorization': "Bearer " + await this.getToken()

        }

    }
    // getSignature() {
    //     let ref = pm.environment["reference"]
    //     var url = getUrl();
    //     var httpVerb = pm.request.method;
    //     var encodeUrl = encodeURIComponent(url);
    //     var signValue = httpVerb + "&" + encodeUrl + "&" + ref + "&" + clientId + "&" + clientSecret;
    //     console.log(signValue);
    //     var hashValue = SHA1(signValue);
    //     console.log(hashValue);
    //     return base64encode(hashValue)

    // }
    async CordToText(location_string) {
        try {
            const address_string = location_string.split(',')
            const options = {
                provider: 'opencage',
                httpAdapter: 'https',
                apiKey: OPENCAGE_API,
                formatter: null
            };
            const geocoder = NodeGeocoder(options);
            const location_object = await geocoder.reverse({ lat: address_string[0], lon: address_string[1] })
            const address = location_object.data[0].streetNumber + "," + location_object.data[0].streetName + "," + location_object.data[0].county
            return address

        } catch (error) {
            console.log("[+]", e.message)
            return e.response.data.error
        }


    }
    async issueCard(user, idType, idNumber) {
        try {

            const data = {
                "firstName": "Toluwanimi",
                "lastName": "Ogunbiyi",
                "phone": "+2348092000376",
                "address1": "13 Ireakari street",
                "address2": "Unilorin Boys hostel",
                "city": "ilorin",
                "state": "Kwara",
                "zipcode": "00000",
                "country": "NG",
                "idNumber": "PASSPORT",
                "idType": "123456789",
                "customerBvn": "",
                "initialBalance": 10,
                "cardBrand": "Visa"
            }
            console.log(data)
            const path = "/api/v1/cards/issue"
            const header = await this.getHeader('POST', path)
            const requestConfig = {
                method: 'POST',
                url: MIDEN_BASE_URL + path,
                headers: {
                    ...header
                },
                data,
            }
            console.log(requestConfig)
            const response = await axios(requestConfig)
            console.log(response.data)
            return {
                issue_card_response: response.data,
                header
            }

        } catch (e) {
            console.log("[+]", e.response.data)
            return e.message
        }
    }
    async toggleCardStatus(cardId, cardStatus) {
        try {
            const data = {
                "cardId": cardId,
                "activated": cardStatus
            }
            const path = "/api/v1/cards/activate-deactivate"
            const header = this.getHeader('PATCH', path)
            console.log(data, header)
            const requestConfig = {
                method: 'PATCH',
                url: MIDEN_BASE_URL + path,
                headers: {
                    ...header
                },
                data,
            }
            const response = await axios(requestConfig)
            console.log(response)
            return {
                toggle_card_card_response: response.data,
                header
            }

        } catch (error) {
            console.log("[+]", e)
            return e.response.data.error
        }
    }
    async fundCard(fundAmount, cardId) {
        try {
            const data = {
                "cardId": cardId,
                "amount": fundAmount
            }
            const path = "/api/v1/cards/topup"
            const header = this.getHeader('PATCH', path)
            console.log(data, header)
            const requestConfig = {
                method: 'PATCH',
                url: MIDEN_BASE_URL + path,
                headers: {
                    ...header
                },
                data,
            }
            const response = await axios(requestConfig)
            return {
                fund_response: response.data,
                header
            }

        } catch (error) {
            console.log("[+]", e.message)
            return e.response.data.error
        }

    }
    async blockCard(cardId) {
        try {
            const data = {
                "cardId": cardId,
                "amount": fundAmount
            }
            const path = `/api/v1/cards/terminate/${cardId}`
            const header = this.getHeader('PATCH', path)
            console.log(data, header)
            const requestConfig = {
                method: 'PATCH',
                url: MIDEN_BASE_URL + path,
                headers: {
                    ...header
                },
            }
            const response = await axios(requestConfig)
            return {
                block_card_response: response.data,
                header
            }

        } catch (error) {
            console.log("[+]", e.message)
            return e.response.data.error
        }
    }
    async cardDetails(cardId) {
        try {

            const path = `/api/v1/cards/details/${cardId}/false`
            const header = this.getHeader('get', path)
            console.log(data, header)
            const requestConfig = {
                method: 'get',
                url: MIDEN_BASE_URL + path,
                headers: {
                    ...header
                },
            }
            const response = await axios(requestConfig)
            return {
                card_details_response: response.data,
                header
            }

        } catch (error) {
            console.log("[+]", e.message)
            return e.response.data.error
        }
    }
}
const y = new VirtualCard()
console.log(y.issueCard().then((data) => { console.log(data) }).catch((e) => { console.log(e) }))