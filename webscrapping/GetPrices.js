const rp = require('request-promise');
const cheerio = require('cheerio');
//const minPriceHotel = require('./minPriceHotel');

 module.exports.getAllPrices =async function getAllPrices(tableauURL) {


    var allPrice = [];
    try {
        for (var i = 0; i < tableauURL.length; i++) {
            var chef = tableauURL[i].chef;
            var prix = await getPriceHotel(tableauURL[i].urlHotel);
            var nom = tableauURL[i].nomHotel;
            var url = tableauURL[i].urlHotel;
      
            if (prix != 0) {
                allPrice.push({ nom, url, chef, prix });
            }
            //console.log(Price);

        }
    }
    catch (error) {
        console.log(error);
    }

    return allPrice;
}
async function getPriceHotel(url) {
    const option = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    let prix;
    try {
        let $ = await rp(option);
        if (String($('.priceTag').children().children().first().attr("class")) != "priceLabel") {
            prix = $('.price').text();
        }
        else {
            prix = 0;
        }
    }
    catch (error) {
        console.log(error);
    }
    return prix;
}
