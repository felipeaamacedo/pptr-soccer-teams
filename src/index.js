const puppeteer = require('puppeteer');


(async ()=>{
    const browser = await puppeteer.launch({ 
        headless: false,
        slowMo: 250,
    });
    const page = await browser.newPage()
    await page.goto("https://sociorei.com/", {waitUntil: 'domcontentloaded'})

    const data = await page.evaluateHandle(()=>{
        // const numSocios = document.querySelector('body > main > section > div.container.sb_25.ng-scope > h2 > span.sb_23.ng-binding').innerHTML
        return{ 
            socioRei: document.querySelector(".app-header > div:nth-child(0)").innerHTML
        }
    })

    await browser.close()
})