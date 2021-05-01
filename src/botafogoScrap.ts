import puppeteer from 'puppeteer'

(async () => {
    const scrapData:string[] = []

/**
     * Opening browser and a new tab
     */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0); 

   /**
    * Going to the page we want to scrap   
    */ 
    await page.goto("https://soubotafogo.bfr.com.br/#/publico/home", {waitUntil:'domcontentloaded'})

    //LOAD PAGE
    //wait page fully loaded, in case of a SPA
    await page.waitForNavigation({
        waitUntil:'networkidle2'
    })

    /**
     * Evaluating page by using the inspect and getting the data
     */
    scrapData.push(await page.evaluate(() => {

        let numSocios = document.querySelector(".sb_23")!.innerHTML;

        return numSocios
    }))

    console.log(scrapData)

    // Closing browser
    await browser.close()
})()