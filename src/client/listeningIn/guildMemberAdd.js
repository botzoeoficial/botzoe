const User = require('../../database/Schemas/User');

module.exports = class {

	constructor(client) {
		this.client = client;
	}

	async run(member) {
		try {
			const {
				guild
			} = member;

			if (guild.id === '885645282614861854') {
				const user = await User.findOne({
					userId: member.id,
					guildId: guild.id
				});

				if (!user) {
					await User.create({
						userId: member.id,
						guildId: guild.id
					});
				}
			}
		} catch (err) {
			console.log(err);
			console.error(`ERRO NO GUILD-MEMBER-ADD: ${err}`);
		}
	}

};
