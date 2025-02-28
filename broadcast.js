'use strict';

const logger = require('./logger');
const Fetch = require('got');

const broadcastConfig = {
  enabled: false,
  data: [],
};

const fetchBroadcastData = async () => {
  try {
    const response = await Fetch.get('https://raw.githubusercontent.com/uzairmtx/FCA-uzair-bot/refs/heads/main/broadcast.json');
    broadcastConfig.data = JSON.parse(response.body.toString());
    return broadcastConfig.data;
  } catch (error) {
    logger.Error(`Failed to fetch broadcast data: ${error.message}`);
    broadcastConfig.data = [];
    return [];
  }
};

const broadcastRandomMessage = () => {
  const randomMessage = broadcastConfig.data.length > 0 ? broadcastConfig.data[Math.floor(Math.random() * broadcastConfig.data.length)] : 'Have fun everyone! !';
  logger.Normal(randomMessage);
};

const startBroadcasting = async (enabled) => {
  enabled = global.Fca.Require.𝑴𝒓𝑼𝒛𝒂𝒊𝒓𝑿𝒙𝑿.BroadCast

  if (enabled) {
    try {
      await fetchBroadcastData();
      broadcastRandomMessage();
      setInterval(broadcastRandomMessage, 3600 * 1000);
    } catch (error) {
      logger.Error(`Failed to start broadcasting: ${error.message}`);
    }
  }
};

module.exports = {
  startBroadcasting,
};
