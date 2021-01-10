const embeds = require("../utilities/embeds");
const config = require("../utilities/config.js");

module.exports = {
	name: "settings",
	aliases: ["config", "conf", "cfg"],
	description: "Change the settings of VukkyBot!",
	botPermissions: ["EMBED_LINKS"],
	userPermissions: ["ADMINISTRATOR"],
	cooldown: 0,
	async execute(message, args) {
		if(args[0] == "get") {
			message.channel.send(await config.get(args[0]));
		}
	},
};
