const axios = require("axios");

const scrapeCrowdcast = async () => {
    try {
        const { data } = await axios.get("https://app.scrapingbee.com/api/v1", {
            params: {
                api_key: 'MTXGEL7CJD0831OBRZF5I6O6G64XHTX9JQTRCQWLNYXXFAIW6EZ94YR2JQ53B8WSO7CDYT0I77AOESLH',
                url: "https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=whittier+peoms+first+edition&_sacat=0",
                // Wait for there to be at least one
                // non-empty .event-tile element
                // js_scenario: {
                //     "instructions": [
                //         {"wait_for": "#gh-ac"},
                //         {"fill": ["#gh-ac", "value"]},
                //         {"click": "#gh-btn"},
                //         {"wait_for": ".s-item"},
                //     ]
                // },
                wait_for: ".s-item",
                extract_rules: {
                    // all_title: {
                    //      selector: ".s-item__title", 
                    //      type: "list",
                        
                    //      price:{
                    //          title: ".s-item__price"
                    //      }

                    //      },
              
                      webinars: {
                        // Lets create a list with data
                        // extracted from the .event-tile element
                        selector: ".s-item",
                        type: "list",
                        // Each object in the list should
                        output: {
                          // have a title lifted from
                          // the .event-tile__title element
                          title: ".s-item__price",
                          price: ".s-item__title",
                          image :{
                                selector: ".s-item__image-img",
                                output: '@src'
                          }
                          // and a path lifted from
                          // the href attribute of the first link element

                        //   link: {
                        //     selector: "a",
                        //     output: "@href",
                        //   },
                        //   style: {
                        //     selector: ".hero",
                        //     output: "@style",
                        //   },
                        },
                      },
                },
            },
        });

        return data;
    } catch (error) {
        throw new Error("ScrapingBee Error: " + error.message, { cause: error });
    }
}
scrapeCrowdcast().then(function (response) {
    console.log(response);
}
).catch(function (error) {
    console.log(error);
}
);