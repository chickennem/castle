const rp = require('request-promise');
const $ = require('cheerio');
const getUrlMichelin = require('./getUrlMichelin');


 module.exports.getAllNames = async function getAllNames() {

    const listChef = [];
    const listUrl = [];
    for (var i = 1; i < 36; i++) {//on prend les urls de chaque page
        listUrl.push("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-" + i + "?indirect=278")
    }

    try {

        for (var i = 0; i < listUrl.length; i++) {
            var nomChef = await getUrlMichelin.getUrlName(listUrl[i]);
            for (let j = 0; j < nomChef.length; j++) {

                listChef.push(nomChef[j]);
            }
            console.log(i+" " +listChef[i]);

        }
    }
    catch (error) {
        console.log(error);
    }

    return listChef;
}
