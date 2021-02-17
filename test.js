
const cfg = require("./utilities/config.js");
async function tester() {
	cfg.init();
	//console.log(await cfg.get("misc.owner"));

	cfg.set("misc.owner", ["708333380525228082", "125644326037487616"]);
	
}
tester();
var ipcountry = require("./utilities/ipcountry");

ipcountry.getCountry("84.240.100.113")
	.then(countryCode => console.log(countryCode));
