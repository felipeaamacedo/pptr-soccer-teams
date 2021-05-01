const puppeteer = require('puppeteer');

(async () => { 
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	
	await page.goto('https://statusinvest.com.br/fundos-imobiliarios/mall11', {waitUntil: 'domcontentloaded'})
	
	const assetStatusInvest = await page.evaluateHandle(()=>{
		return {
		    price: document.querySelector('strong[class="value"]').innerHTML
		}						   
	})

    console.log(assetStatusInvest)

	await browser.close()
})