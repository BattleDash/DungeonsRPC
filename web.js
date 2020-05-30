const http = require("http");
const https = require("https");
const fs = require("fs");
const logger = require('log4js').getLogger("Server");
logger.level = "all";
http.createServer((req, res) => {
    res.writeHead(302, {
        Location: `https://${req.headers.host}${req.url}`
    });
    res.end();
}).listen(80);
let certs = {
    web: {
        key: fs.readFileSync("localhost-key.pem"),
        cert: fs.readFileSync("localhost.pem")
    }
}
const server = https.createServer({
    key: certs.web.key,
    cert: certs.web.cert
}, (req, res) => {
    require("./server")(req, res);
});
server.listen(443, () => {
    logger.info('Listening on 443');
});