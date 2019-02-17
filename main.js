const rp = require('request-promise');
const cheerio = require('cheerio');
const castle = require('./castle');
const michelin = require('./michelin');
const allPrices = require('./GetPrices');
var fs = require('fs');
const url = 'https://www.relaischateaux.com/fr/site-map/etablissements';


Main();

async function Main() {
    /*var tab = jsonToTab('./endResult.json'); // ligne pour lire un fichier JSON
    console.log(tab);*/


    var NomChefMichelin = await michelin.getAllNames();
    var NomHotelChefCastle = await castle.getChefName(url);
   // console.log(allNomHotelChefCastle);

    console.log(NomChefMichelin);
    console.log(NomHotelChefCastle);
    var EtablissementsEtoile = Compare(NomHotelChefCastle, NomChefMichelin);
   // console.log(tri);
    var PricesAndUrlAndChef = await allPrices.getAllPrices(EtablissementsEtoile);
    console.log(allPricesAndUrlAndChef);
    WriteJson(PricesAndUrlAndChef, 'HotelRestoEtoile.json');
}
function WriteJson(tab, file) {
    console.log("Get ready !!!")
    var str = JSON.stringify(tab);
    fs.writeFile(file, str, function (err) {
        if (err) throw err;
        console.log('Done!');
    });
}

function Compare(tab1, tab2) {
    let Resultat = [];
    for (let i = 0; i < tab1.length; i++) {
        for (let j = 0; j < tab2.length; j++) {
            if (tab1[i].chef == tab2[j]) {
                Resultat.push(tab1[i]);
            }
        }
    }

    return Resultat;
}
/*
function jsonToTab(file) {
    var result = fs.readFileSync(file);
    result = result.toString();
    var tabResult = JSON.parse(result);
    return tabResult;
}*/