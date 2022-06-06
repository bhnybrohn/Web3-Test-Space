const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {

    try {


        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://www.ebay.com/")
        await page.waitForSelector('#gh-ac')
        await page.type('#gh-ac', 'iphone')
        await page.click('input[value="Search"]')

        await page.waitForSelector('div.s-item__wrapper')

        const link = await page.$$eval('a.s-item__link', items => {
            return items.map(item => {
                return item.href
            })
        })

        const title = await page.$$eval('h3.s-item__title', items => {
            return items.map(item => {
                return item.innerText
            })
        })
        const price = await page.$$eval('span.s-item__price', items => {
            return items.map(item => {
                return item.innerText
            })
        })

        var invs = [];

        for (var i = 0, length = price.length; i < length; i++) {
            var inv = {
                price: price[i],
                title: title[i]
            };
            if (i < link.length) {
                inv.link = link[i];
            }
            invs.push(inv)
        }


        console.log(invs)
        //   const names = await page.evaluate(() => {
        //     return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
        //   })
        //   await fs.writeFile("names.txt", names.join("\r\n"))

        //   await page.click("#clickme")
        //   const clickedData = await page.$eval("#data", el => el.textContent)
        //   console.log(clickedData)

        //   const photos = await page.$$eval("img", imgs => {
        //     return imgs.map(x => x.src)
        //   })

        //   await page.type("#search-key", "blue") //input
        //   await Promise.all([page.click("#form-searchbar button"), page.waitForNavigation()])
        //   const info = await page.$eval("#message", el => el)

        //   await page.type('input[id=search-key]', 'blue');
        //   await Promise.all([await page.evaluate(() => {
        //     document.querySelector('input[type=submit]').click();
        // }), page.waitForNavigation()])

        // const info2 = await page.$eval(".product-container", el => el.outerHTML)
        //   await page.evaluate(() => {
        //       document.querySelector('input[type=submit]').click();
        //   });

        //   console.log(info2)

        //   for (const photo of photos) {
        //     const imagepage = await page.goto(photo)
        //     await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
        //   }

        await browser.close()

    } catch (error) {
        console.log(error)
    }
}

start()