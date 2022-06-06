const scrapingbee = require('scrapingbee');
const axios = require('axios')

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient('MTXGEL7CJD0831OBRZF5I6O6G64XHTX9JQTRCQWLNYXXFAIW6EZ94YR2JQ53B8WSO7CDYT0I77AOESLH');
  var response = await client.get({
    url: url,
    params: {
        // // Block ads on the page you want to scrape
        // block_ads: false,
        // // Block images and CSS on the page you want to scrape
        // block_ressources: true,
        // // Premium proxy geolocation
        // country_code: '',
        // // Control the device the request will be sent from
        // device: 'desktop',
        // Use some data extraction rules
   
        // // JavaScript scenario to execute (clicking on button, scrolling ...)
        js_scenario: {
            "instructions": [
                {"wait_for": "#gh-ac"},
                {"fill": ["#gh-ac", "value"]},
                {"click": "#gh-btn"},
                {"wait_for": ".s-item"},
            ]
        },
        extract_rules: { title: '.s-item__title' },
        // // Wrap response in JSON
        json_response: true,
        // // Use premium proxies to bypass difficult to scrape websites (10-25 credits/request)
        // premium_proxy: false,
        // // Execute JavaScript code with a Headless Browser (5 credits/request)
        // render_js: true,
        // // Return the original HTML before the JavaScript rendering
        // return_page_source: false,
        // // Return page screenshot as a png image
        // screenshot: false,
        // // Take a full page screenshot without the window limitation
        // screenshot_full_page: false,
        // // Transparently return the same HTTP code of the page requested.
        // transparent_status_code: false,
        // // Wait, in miliseconds, before returning the response
        // wait: 0,
        // // Wait for CSS selector before returning the response, ex ".title"
        wait_for: '.s-item__title',
        // // Set the browser window width in pixel
        // window_width: 1920,
        // // Set the browser window height in pixel
        // window_height: 1080,
    },
  })
  return response
}

get('https://www.ebay.com/').then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
}).catch((e) => console.log('A problem occurs : ' + e.response.data));

