import puppeteer from 'puppeteer'

(async () => {
    const data: {website:string, cssSelector:string[]}[] = [
        { website: "https://soubotafogo.bfr.com.br/#/publico/home", cssSelector: [".sb_23"] },
        { website: "https://sociorei.com/", cssSelector: ["body > app-root > div > app-header > header > div > div > app-counter > div > div > div.counter"] }
    ]
    const scrapData:string[] = []

    /**
     * Opening browser and a new tab
     */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });
    const page = await browser.newPage()

    for (let i:number = 0; data.length - 1; i++){
        /**
        * Going to the page we want to scrap   
        */ 
        await page.goto(data[i].website, {
            waitUntil:'domcontentloaded'
        })

        console.log(data[i].cssSelector[0])
        //LOAD PAGE
        // wait page fully loaded, in case of a SPA
        await page.waitForNavigation({
            waitUntil:'load'
        })

        // await page.waitForSelector(data[i].cssSelector[0])

        /**
         * Evaluating page by using the inspect and getting the data
         */
        console.log(data[i].cssSelector[0])
        let scrap = await page.evaluate((selector) => {
            var numSocios = document.querySelector(selector)!.innerHTML;
            return numSocios
        }, data[i].cssSelector[0])

        scrapData.push(scrap)
        console.log(scrapData)
    }


    // Closing browser
    await browser.close()
})()