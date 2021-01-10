const embeds = require("../utilities/embeds");
const config = require("../utilities/config.js");

module.exports = {
	name: "settings",
	description: "Change the settings of VukkyBot!",
	botPermissions: ["EMBED_LINKS"],
	userPermissions: ["ADMINISTRATOR"],
	cooldown: 0,
	aliases: ["config", "conf", "cfg"],
	async execute(message, args) {
		if(args[0] == "get") {
			let result = await config.get(args[1]);
			if(result == undefined) return message.channel.send(embeds.errorEmbed(`\`${args[1]}\` doesn't seem to exist!`));
			message.channel.send(result);
		}
	},
};
