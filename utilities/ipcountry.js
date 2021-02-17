const fetch = require("node-fetch");
module.exports = {
	getCountry: function(addr) {
		let countryCode;
		let everythingIsFine = new Promise((resolve, reject) => {
			fetch(`http://ip-api.com/json/${addr}?fields=countryCode`)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					resolve(json);
				});
		});
		return everythingIsFine;
	}

};