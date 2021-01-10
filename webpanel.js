const http = require("http");
const fs = require("fs");
const url = require("url");
const fetch = require("node-fetch");
const config = require("./static/config.json");
const port = config.port;

http.createServer((req, res) => {
	let responseCode = 404;
	let content = "404 Error";
	const urlObj = url.parse(req.url, true);
	if (urlObj.pathname === "/panel") {
		if (urlObj.query.code) {
			const accessCode = urlObj.query.code;
			const data = {
				client_id: "764355970880372746",
				client_secret: "_uDg7n_bWfA9SUfgFP41L7uawmcRkTp3",
				grant_type: "authorization_code",
				redirect_uri: config.redirect_uri,
				code: accessCode,
				scope: "identify",
			};

			fetch("https://discord.com/api/oauth2/token", {
				method: "POST",
				body: new URLSearchParams(data),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
				.then(discordRes => discordRes.json())
				.then(info => {
					return info;
				})
				.then(info => fetch("https://discord.com/api/users/@me", {
					headers: {
						authorization: `${info.token_type} ${info.access_token}`,
					},
				}))
				.then(userRes => userRes.json())
				.then(userRes => {
					if (isValidUser(userRes)) {
						responseCode = 200;
						content = fs.readFileSync("./html/panel.html");
						res.writeHead(responseCode, {
							"content-type": "text/html;charset=utf-8",
						});
				
						res.write(content);
						res.end();
					} else {
						responseCode = 403;
						content = fs.readFileSync("./html/index.html");
						res.writeHead(responseCode, {
							"content-type": "text/html;charset=utf-8",
						});
				
						res.write(content);
						res.end();
					}
				});
		}
	} else {
		if (urlObj.pathname === "/") {
			responseCode = 200;
			content = fs.readFileSync("./html/index.html");
			res.writeHead(responseCode, {
				"content-type": "text/html;charset=utf-8",
			});
		
			res.write(content);
			res.end();
		} else {
			fs.readFile(`${__dirname }/static${req.url}`, function (err,data) {
				if (err) {
					res.writeHead(404);
					res.end(JSON.stringify(err));
					return;
				}
				res.writeHead(200);
				res.end(data);
			});
		}
	}
	

	

	
})
	.listen(port);
function isValidUser(user) {
	return config.dashboardAccess.includes(user.id);
}