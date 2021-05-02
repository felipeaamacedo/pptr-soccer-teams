import puppeteer from 'puppeteer'
import fs from 'fs'
import * as clubData from './data'

(async () => {
    /**
     * Getting input data from ./data.ts
     */
    const data = clubData.data

    const scrapData:{teamName:string, nuMembers:string}[] = []

    /**
     * Opening browser and a new tab
     */
    const browser = await puppeteer.launch({
        headless: false,
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
        console.log(`WORK: Waiting for ${data[i].website} CSS Selector to load`)
        await page.waitForSelector(data[i].cssSelector[0])


        console.log(`WORK: Waiting ${timeout} ms for the Javascript page code to run`)
        await page.waitForTimeout(timeout)

        /**
         * Evaluating page by using the inspect and getting the data
         */

        console.log(`WORK: Inspecting page to scrap the number of team members`)
        let scrap:string[]=[]
        for(let j=0; j< data[i].cssSelector.length; j++){
            scrap.push(
                await page.evaluate((selector) => {
                    var numSocios = document.querySelector(selector)!.innerHTML;
                    return numSocios
                }, data[i].cssSelector[j])
            )
        }

        const teamName:string = data[i].teamName

        // MANAGE SCRAP INTO A STRING NUMBER
        
        console.log(`WORK: Reducing ${data[i].teamName} scraped data into a single string`)
        const scrapedMembers:string = scrap.reduce(function (total, num){
            return total + num
        })

        console.log(`WORK: Spliting ${data[i].teamName} reduced data to take out "dot" separators, and reducing the result`)
        const nuMembersWithoutDotSeparation:string[] = scrapedMembers.split('.')
        const nuMembersWithSpaceSeparation:string = nuMembersWithoutDotSeparation.reduce(function(total, num){
            return total + num
        })

        console.log(`WORK: Spliting again ${data[i].teamName} reduced data to take out "space" separators, and applying final reduce of data`)
        const nuMembersWithOutSpaceSeparation:string[] = nuMembersWithSpaceSeparation.split(' ')
        const nuMembers:string = nuMembersWithOutSpaceSeparation.reduce(function(total, num){
            return total + num
        })

        //FINISH SCRAP DATA INTO STRING NUMBER


        console.log(`WORK: Pushing team name and number of team members into output data`)
        scrapData.push({ teamName, nuMembers })
        console.log(scrapData)
    }
    console.log('---------------------------') 
    console.log('DATA SCRAPED') 
    console.log('---------------------------') 
    console.log(scrapData)


    /**
    * Creating file formated to work on excel 
    */
    let filePath:string = '../outputs/scrapResult.txt'
    console.log(`Checking if file exists at "${filePath}"`)

    if(fs.existsSync(filePath)){
        console.log(`File exists at ${filePath} and it is being deleted!`)
        fs.unlink(filePath, (err)=>{
            if(err) throw err;
            console.log(`"${filePath}" was deleted!`)
        })
    }else{
        console.log(`PERFECT! File does not exist.`);
    }

    console.log(`Creating new file at "${filePath}"`)
    let scrapDataFile = fs.createWriteStream(filePath, {
        flags:'a'  // "a" means append, old data will be preserved
    })

    //Creating table heading
    scrapDataFile.write('TEAM NAME, NUMBER OF TEAM MEMBERS \r\n')

    //Looping table content
    for(let i=0; i<scrapData.length; i++){
        scrapDataFile.write(`${scrapData[i].teamName}, ${scrapData[i].nuMembers} \r\n`)
    }

    // Closing browser
    await browser.close()
})()