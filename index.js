const sudo = require('sudo-prompt');
const fs = require('fs');
const log4js = require("log4js");
const readline = require('readline');

var logger = log4js.getLogger("Hosts");
logger.level = "all";

var hosts = fs.readFileSync('C:\\Windows\\System32\\drivers\\etc\\hosts', 'utf8');

var lines = hosts.split('\r\n');
if (lines.includes('127.0.0.1       C839E.playfabapi.com')) {
    require('./web');
} else {
    lines.push('127.0.0.1       C839E.playfabapi.com');
    try {
        fs.writeFileSync('C:\\Windows\\System32\\drivers\\etc\\hosts', lines.join('\r\n'));
    } catch (e) {
        (async () => {
            var ans = await askHosts();
            if (!ans) {
                logger.error('Since hosts are incorrect, server cannot proceed.');
                return process.exit(0);
            }
            sudo.exec('node index',
              err => {
                if (err) {
                    logger.error('We need Windows Authorization to edit a system file like Hosts, since you chose no, we can\'t proceed.');
                    return process.exit(0);
                }
                logger.info('Updated Hosts file to redirect requests to this server, proceeding...');
                require('./web');
              }
            );
        })();
    }
}

function askHosts() {
    return new Promise(async resolve => {
        logger.warn('We couldn\'t find the required settings in your system hosts file to redirect Minecraft Dungeons\' requests to this server. Should we automatically modify Hosts? [y/n]');
        var ans = await askQuestion();
        if (ans == 'y' || ans == 'n' || ans == 'yes' || ans == 'no') {
            resolve(ans == 'y' || ans == 'yes');
        } else {
            resolve(await askHosts());
        }
    });
}

function askQuestion() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question("", ans => {
        rl.close();
        resolve(ans);
    }));
}