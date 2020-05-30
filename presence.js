var rpc = require('discord-rich-presence')('715943275214798999');
const log4js = require("log4js");

var logger = log4js.getLogger("Presence");
logger.level = "all";

var clientGameContext = {
    levelId: 0,
    difficultyId: 1,
    localPlayerCount: 1,
    startTimestamp: 0,
    OSProperties: {
        buildFlavour: 'Shipping',
        buildNumber: 0
    }
}

module.exports.updatePresence = (intent) => {
    if (!rpc) {
        logger.debug('RPC not found');
        return;
    }

    logger.info('Got Event ' + intent.name);

    if (intent.name == 'StartLevel' ||
        intent.name == 'LevelStarted' ||
        intent.name == 'NPCKilled' ||
        intent.name == 'HeartBeat' ||
        intent.name == 'PlayerLogout' ||
        (intent.name == 'Stall' && intent.payload.Properties.LevelId > 0)) {
        logger.info('Updating ClientGameContext');

        levelId = intent.payload.Properties.LevelId;

        if (intent.payload.Properties.LevelId != clientGameContext.levelId) {
            logger.info(`Detected new Level - ${getLevelName(intent.payload.Properties.LevelId)}`);
            clientGameContext.startTimestamp = Date.now();
        }

        clientGameContext = {
            levelId: intent.payload.Properties.LevelId,
            difficultyId: intent.payload.Properties.DifficultyId,
            localPlayerCount: intent.payload.Properties.LocalPlayerCount,
            startTimestamp: clientGameContext.startTimestamp,
            OSProperties: {
                buildFlavour: intent.payload.Properties.BuildFlavour,
                buildNumber: intent.payload.Properties.BuildNumber
            }
        };
    }
}

// Can only set presence every 15 seconds
setInterval(() => {
    logger.info('Updating Presence');
    rpc.updatePresence({
        details: `In ${getLevelName(clientGameContext.levelId)}`,
        state: `${clientGameContext.OSProperties.buildFlavour}-${clientGameContext.OSProperties.buildNumber}`,
        startTimestamp: clientGameContext.startTimestamp,
        largeImageKey: 'main_logo',
        largeImageText: 'lobby001',
        smallImageKey: 'snek_small',
        smallImageText: 'i am my own pillows',
        instance: false,
    });
}, 15 * 1000);

function getLevelName(levelId) {
    switch (levelId) {
        case 0:
            return "Camp";
        case 1:
            return "Squid Coast";
        case 2:
            return "Creeper Woods";
        case 3:
            return "Pumpkin Pastures";
        case 4:
            return "Soggy Swamp";
        case 5:
            return "Redstone Mines";
        case 6:
            return "Fiery Forge";
        case 7:
            return "Desert Temple";
        case 8:
            return "Cacti Canyon";
        case 9:
            return "Highblock Halls";
        default:
            return "Unknown Region";
    }
}