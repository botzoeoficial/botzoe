const User = require('../../database/Schemas/User');

module.exports = class {

	constructor(client) {
		this.client = client;
	}

	async run(member) {
		const { guild } = member;

		const user = await User.findOne({
			userId: member.id,
			guildId: guild.id
		});

		if (!user) return;

		if (user.marry.has) {
			await User.findOneAndUpdate({
				userId: user.marry.user,
				guildId: guild.id
			}, {
				$set: {
					'marry.user': 'Ninguém.',
					'marry.has': false,
					'cooldown.gf': 0,
					'cooldown.fe': 0
				}
			});
		}

		if (user.familia.length >= 0) {
			await User.findOneAndUpdate({
				userId: user.marry.user,
				guildId: guild.id
			}, {
				$set: {
					familia: []
				}
			});
		}

		await User.findOneAndDelete({
			userId: member.id,
			guildId: guild.id
		});
	}

};
