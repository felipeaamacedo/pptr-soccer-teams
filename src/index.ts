import puppeteer from 'puppeteer'

(async () => {
    const data: {teamName:string, website:string, cssSelector:string[]}[] = [
        { 
            teamName: "Botafogo", 
            website: "https://soubotafogo.bfr.com.br/#/publico/home", 
            cssSelector: [".sb_23"] 
        },
        { 
            teamName: "Santos", 
            website: "https://sociorei.com/", 
            cssSelector: ["body > app-root > div > app-header > header > div > div > app-counter > div > div > div.counter"] 
        },
        {   
            teamName: "Vasco", 
            website: "https://sociogigante.com/", 
            cssSelector: [
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)", 
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)", 
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)", 
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)", 
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1)",
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1)"
            ]
        }
    ]
    const scrapData:{teamName:string, nuMembers:string}[] = []

    /**
     * Opening browser and a new tab
     */
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });
    const page = await browser.newPage()
    const timeout = 5000

    for (let i:number = 0; i < data.length; i++){
        /**
        * Going to the page we want to scrap   
        */ 
        await page.goto(data[i].website, {
            waitUntil:'domcontentloaded'
        })

        //LOAD PAGE
        // wait for the selector to be shown in the page, then more 5sec for the javascript code to run so that we have the number of team members.
        console.log(`Waiting for ${data[i].website} CSS Selector to load`)
        await page.waitForSelector(data[i].cssSelector[0])


        console.log(`Waiting ${timeout} ms for the Javascript page code to run`)
        await page.waitForTimeout(timeout)

        /**
         * Evaluating page by using the inspect and getting the data
         */

        console.log(`Inspecting page to scrap the number of team members`)
        let scrap:string[]=[]
        for(let j=0; j< data[i].cssSelector.length; j++){
            scrap.push(
                await page.evaluate((selector) => {
                var numSocios = document.querySelector(selector)!.innerHTML;
                return numSocios
                }, data[i].cssSelector[0])
            )
        }

        const teamName:string = data[i].teamName
        const nuMembers:string = scrap[0]
        // const nuMembers:string = scrap.reduce(function (total, num){
            // return total + num
        // })

        console.log(`pushing team name and number of team members into output data`)
        scrapData.push({ teamName, nuMembers })
        console.log(scrapData)
    }
    console.log('---------------------------') 
    console.log('DATA SCRAPED') 
    console.log('---------------------------') 
    console.log(scrapData)

    // Closing browser
    await browser.close()
})()