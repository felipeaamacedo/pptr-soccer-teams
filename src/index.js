const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage()


    await page.goto("https://soubotafogo.bfr.com.br/#/publico/home", {
        waitUntil: 'domcontentloaded',
    })

    const data = await page.evaluate(()=>{

        let numSocios = document.querySelector(".sb_23").innerHTML;

        return {
            numSocios
        }
    })

    console.log(data)


    await browser.close()
})