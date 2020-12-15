const config = require("../config.json");
require("dotenv").config();
var mysql = require("mysql");
var sql;
module.exports = {
	init: function() {
		if (!config.misc.mysql) {
			if (config.misc.remoteSettings) {
				console.log("[cfg] Error. remoteSettings enabled but mysql disabled! Shutting down!");
				process.exit(69);
			} else {
				console.log("[cfg] ready");
			}
			
		} else {
			if (config.misc.remoteSettings) {
				
				let con = mysql.createConnection({
					host: process.env.SQL_HOST,
					user: process.env.SQL_USER,
					password: process.env.SQL_PASS,
					database: process.env.SQL_DB
				});
		
				sql = "CREATE TABLE settings (cfg VARCHAR(255), cfgvalue VARCHAR(255))";
				con.query(sql, function (err, result) {
					if (err) {
						if(err.code == "ER_TABLE_EXISTS_ERROR") {
							console.log("[cfg] Table already exists");
						} else {
							console.log(err);
							console.log("[cfg] Table creation failed.");
						}
					} else {
						console.log("[cfg] Table created");
					}
				});
				con.end();
				console.log("[cfg] ready");
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
			let con = mysql.createConnection({
				host: process.env.SQL_HOST,
				user: process.env.SQL_USER,
				password: process.env.SQL_PASS,
				database: process.env.SQL_DB
			});
	
			sql = `SELECT * FROM settings WHERE cfg = ${optionName}`;
			con.query(sql, function (err, result) {
				if (err) {
					console.log("fuck");
					console.log(err);
					if (optionName != "misc.owner") {
						sql = `INSERT INTO settings(cfg, cfgvalue) VALUES (${optionName}, ${eval(`config.${optionName}`)})`;
						
					} else {
						
						sql = `INSERT INTO settings(cfg, cfgvalue) VALUES (${optionName}, "${eval(`config.${optionName}`)}")`;
					}
					con.query(sql, function (err, result) {
						if (err) {
							console.log("fuck");
							console.log(err);
						} else {
							console.log(result);
						}
					});
				} else {
					console.log(result);
				}
			});
		}
	}
};
