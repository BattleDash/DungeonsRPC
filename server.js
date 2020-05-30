function readStream(str) {
    return new Promise(resolve => {
        let x = [];
        str.on("data", data => {
            x.push(data);
        });
        str.on("end", () => {
            resolve(x);
        });
    });
}
const url = require("url");
const request = require('request');
const presence = require('./presence');
module.exports = async function (req, res) {
    var urlObj = url.parse(req.url);
    let buf = await readStream(req);
    try {
        let requestBody = JSON.parse(buf.join(""));
        if (requestBody && requestBody.Events) {
            var intent = getIntent(requestBody);
            presence.updatePresence(intent);
        }
        request
            .post('https://p-mc-dungeon-mainserver-316916354.us-west-2.elb.amazonaws.com' + urlObj.path, {
                headers: {
                    'X-EntityToken': req.headers['x-entitytoken'],
                    'Content-Type': 'application/json',
                    'user-agent': req.headers["user-agent"],
                    host: "c839e.playfabapi.com"
                },
                json: requestBody
            }, (err, response, body) => {
                if (err) {
                    console.error(err);
                    res.writeHead(response.statusCode, response.statusMessage, response.headers);
                    res.write(err.toString());
                    res.end();
                }
                res.writeHead(response.statusCode, response.statusMessage, response.headers);
                res.write(JSON.stringify(body));
                res.end();
            });
    } catch (e) {
        res.end();
    }
}
function getIntent(json) {
    return {
        name: json.Events[0].Name,
        payload: json.Events[0].Payload
    }
}