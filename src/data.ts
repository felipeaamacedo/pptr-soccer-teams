export const data: {teamName:string, website:string, cssSelector:string[]}[] = [
        { 
            teamName: "Botafogo", 
            website: "https://soubotafogo.bfr.com.br/#/publico/home", 
            cssSelector: [
                ".sb_23",
            ] 
        },
        { 
            teamName: "Santos", 
            website: "https://sociorei.com/", 
            cssSelector: [
                "body > app-root > div > app-header > header > div > div > app-counter > div > div > div.counter",
            ] 
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
                ".header-row-1-right > app-scoreboard:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1)",
            ]
        },{
            teamName:"Flamengo",
            website: "https://www.nrnoficial.com.br/",
            cssSelector: [
                "body > app-root > div.app > app-header > header > div > section > div > div.text-socios > span.number",
            ]
        }
    ]