const config = require("../config.json");

module.exports = {
	init: function() {
		if (!config.misc.mysql) {
			if (config.misc.remoteSettings) {
				console.log("Error. remoteSettings enabled but mysql disabled! Shutting down!");
				process.exit(69);
			}
		}
	},
	set: function(optionName, value) {
		if (!config.misc.remoteSettings) {
			eval(config[optionName] = value);

		} else {
			console.log(true);
		}
	},
	get: function(optionName) {
		if (!config.misc.remoteSettings) {
			return eval(`config.${optionName}`);
		} else {
			console.log(true);
		}
	}
};
