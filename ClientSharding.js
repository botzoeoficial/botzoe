/* eslint-disable no-process-env */
const {
	ShardingManager
} = require('discord.js');

const manager = new ShardingManager('./index.js', {
	totalShards: 'auto',
	mode: 'process',
	respawn: true,
	token: process.env.TOKEN
});

manager.on('shardCreate', async (shard) => {
	console.log(`Shard [${shard.id}] ligada com sucesso.`);
});

manager.spawn();
