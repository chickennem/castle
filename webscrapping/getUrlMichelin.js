const rp = require('request-promise');
const cheerio = require('cheerio');


 module.exports.getUrlName = async function getUrlName(url) {
     const option = { //explorer la webpage
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
   
    var listUrlResto = [];
    var listChef = [];
    try {
        let $ = await rp(option);
        var container = $('.poi-card-link').each(function () {//la classe qui contient le lien
            var temp = ($(this).attr('href'));//le lien vers la page de chaque resto
          // console.log(container)
            listUrlResto.push("https://restaurant.michelin.fr" + temp);
        });

        for (var i = 0; i < listUrlResto.length; i++) {
            var nomChef =await getChefName(listUrlResto[i]);
            listChef.push(nomChef);
        }
    }
    catch (error) {
        console.log(error);
    }

     return listChef;
}

async function getChefName(url) {
    const option = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    let chef;
    try {
        let $ = await rp(option);
        chef = $('.field--name-field-chef').find('div').children().text();
        var nomPrenom = chef.split(','); //on split pour avoir un string
        chef = '';
        for (let i = 0; i < nomPrenom.length - 1; i++) {
            chef = chef + nomPrenom[i] + " ";

        }
        chef = chef + nomPrenom[nomPrenom.length - 1];
        chef = chef.toLowerCase();

    }
    catch (error) {
        console.log(error);
    }

    return chef;
}
