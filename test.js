
const cfg = require("./utilities/config.js");
async function tester() {
	cfg.init();
	console.log(await cfg.get("misc.owner"));
	cfg.set("misc.owner", )
}
tester();