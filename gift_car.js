//const {
//    EZPIN_CLIENT_ID,
//    EZPIN_TOKEN,
//    EZPIN_BASEURL
//} = require('../../../constants/env_constants')
const axios = require('axios')
const fs = require('fs');

const EZPIN_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzayI6ImVlZDMyY2ExLWIwYjEtNDljNC04YjMzLTc5ZDc2NjNjZGUzZCJ9.4zBdzTEtZyH82QszHwod0qcPwpKvRP2GZJLA2IOVpY8"
const EZPIN_CLIENT_ID = 1577897
const EZPIN_BASEURL = "https://api.ezpaypin.com"

class Ezpin {
    constructor() {
        this.BASE_URL = EZPIN_BASEURL
        this.AUTH_KEY = ""
    }

    static generateReference(size) {

        return [...Array(size)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
    }

    async get_auth() {
        try {

            const url = this.BASE_URL + "/vendors/v2/auth/token/"
            const requestConfig = {
                url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {
                    client_id: EZPIN_CLIENT_ID,
                    secret_key: EZPIN_TOKEN
                }
            }
            const response = await axios(requestConfig)
            return response.data.access


        } catch (error) {
            console.log("[+]", error.response)
            return false
        }
    }

    async catalog() {
        try {

            if (!this.AUTH_KEY) {
                await this.get_auth()
            }
            console.log("Key", this.AUTH_KEY)

            const url = this.BASE_URL + "/vendors/v2/catalogs/"
            const requestConfig = {
                url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + " " + await this.get_auth()
                }
            }


            const response = await axios(requestConfig)

            if (response.data.results.length > 0) {
                const normalizedX = response.data.results.map(item => {
                    if (item.description) {
                        const descriptionObject = JSON.parse(item.description);
                        const normalizedDescription = descriptionObject.content.map(content => {
                            return {
                                title: content.title,
                                description: content.description,
                                type: content.type
                            };
                        });

                        return {...item, description: normalizedDescription};
                    } else {
                        return item;
                    }
                });
                return normalizedX
            }
            return {}


        } catch (error) {
            console.log("[+]", error.response.data)
            return false
        }
    }

    async catalogAvailabilty(sku, item_count = 1, price) {
        try {

            if (!this.AUTH_KEY) {
                await this.get_auth()
            }
            console.log(this.BASE_URL)

            const url = this.BASE_URL + `/vendors/v2/catalogs/${sku}/availability/?item_count=${item_count}&price=${price}`
            const requestConfig = {
                url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + " " + await this.get_auth()
                }
            }

            const response = await axios(requestConfig)
            console.log(response)

            return response.data

        } catch (error) {
            console.log("[+]", error)
            return false
        }
    }

    async order(sku, amount, recipient, uuid) {
        try {

            const order_data = {
                "sku": sku,
                "quantity": 1,
                "pre_order": false,
                "price": amount,
                "delivery_type": 1,
                "destination": recipient,
                "terminal_id": "",
                "terminal_pin": "",
                "reference_code": uuid
            }

            if (!this.AUTH_KEY) {
                await this.get_auth()
            }

            const url = this.BASE_URL + `/vendors/v2/orders/`
            const requestConfig = {
                url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + " " + await this.get_auth()
                },
                data: order_data
            }

            const response = await axios(requestConfig)
            return response.data

        } catch (error) {
            _logger.error(`TP ==> ${JSON.stringify(error.response.data)},  `)
            console.log("[+]", error.response.data)
            return false
        }
    }

    //order
    //order_details
}



const readtoWrite = (data_) => {
    console.log(data_.length)
    const rawData = fs.readFileSync('g_js.json', 'utf-8');
    const loadedData = JSON.parse(rawData);


    for (const gift of loadedData) {
        if(typeof(gift) !== "string"){
            
            const cards = gift.categories.map(item => item.toLowerCase());
            gift.cards = []
            
            data_.forEach((card) => {
                
                const search_element = card.categories[0].name.toLowerCase()
                
//                console.log(cards.some(element => search_element.includes(element)), search_element)
                let currentItem
                
                const itemExists = cards.some((item)=>{
                    currentItem = item
                    return search_element.includes(item)
                })
                console.log(currentItem, search_element)
                if (itemExists) {
                            if (!gift.cards.some(obj => obj["card_name"].toLowerCase() === currentItem.toLowerCase())
                        ) {

                                const element = {
                                    card_name:  currentItem,
                                    has_components: true,
                                    components: []
                                }
                                element.components.push(card)
                                gift.cards.push(element)

                            } else if (gift.cards.some(obj => obj["card_name"] ===  currentItem.toLowerCase())) {

                                const cards = gift.cards.find(obj => obj.card_name.toLowerCase() ===  currentItem.toLowerCase());
                                if (cards) {
                                    cards.components.push(card)
                                }
                            }
                    }
                
                
            
            })
        }
        
    }
    loadedData[0] = new Date();

    fs.writeFileSync('g_js.json', JSON.stringify(loadedData, null, 2), 'utf-8');
}
//readtoWrite(data_)


const cls = new Ezpin()
cls.catalog()
  .then((data) => readtoWrite(data))
  .catch((err) => {
      console.log('err');
      console.log(err);
  });


