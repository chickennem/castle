const rp = require('request-promise');
//const $ = require('cheerio');
//const urlDepart = 'https://www.relaischateaux.com/fr/site-map/etablissements';
const cheerio = require('cheerio');

module.exports.getChefName= async function getChefName(url) {
	const option = {
		uri: url,
		transform: function (body) {
			return cheerio.load(body);
		}
	};
	var text = "France";
	var listUrlChef = [];
	try {
		let $ = await rp(option);
		$("#countryF").find('h3').each(function (i, elem) {
			if ($(this).text() == text) {
				var listeHotelFr = $(this).next().find('li').each(function (i, elem) {
					var urlHotel = String($(this).find('a').attr('href'));
					var nomHotel = offset(String($(this).find('a').first().text()));//nom hotel
					var chef = String($(this).find('a').next().attr('href'));//chef nom prénom
					if (chef.slice(34, 38) == "chef") {
						chef = chef.slice(39);
						var nomPrenom = chef.split('-');
						chef = '';
						for (let i = 0; i < nomPrenom.length - 1; i++) {
							chef = chef + nomPrenom[i] + " ";
						}
						chef = chef + nomPrenom[nomPrenom.length - 1];
		

					} else {
						chef = "";
					}
					if (chef != "") {

						listUrlChef.push({ urlHotel, chef, nomHotel });
					}
				});
			}
		});
	
	}
	catch (error) {
		console.log(error);
	}
//	for (var i = 0; i < listeUrlChef.length; i++) { console.log(listeUrlChef[i]); }
	return listUrlChef;
}

function offset(nom) {
	nom = nom.slice(45);
	var size = nom.length * (-1);
	nom = nom.slice(size, -41);
	return nom;
}
