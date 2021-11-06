const {
	ShardingManager
} = require('discord.js');

const manager = new ShardingManager('./index.js', {
	totalShards: 1,
	shardList: 'auto',
	mode: 'process',
	respawn: 'true'
});

manager.spawn()
	.then(shards => {
		shards.forEach(shard => {
			shard.on('message', message => {
				console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
			});
		});
	})
	.catch(console.error);
