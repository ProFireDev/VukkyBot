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
		config.set(args[0], args[1]);
		message.channel.send(`I set ${args[0]} to ${args[1]}!`);
	},
};
