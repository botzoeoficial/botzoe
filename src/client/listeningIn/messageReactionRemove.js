/* eslint-disable handle-callback-err */
module.exports = class Ready {

	constructor(client) {
		this.client = client;
	}

	async run(reaction, user) {
		try {
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();
			if (user.bot) return;

			await this.client.database.guilds.findOne({
				'cidade.impeachment.message': reaction.message.id
			}, async (err, data) => {
				if (!data) return;

				data.cidade.impeachment.quantia -= 1;
				await data.save();
			});
		} catch (err) {
			console.log(err);
			console.error(`ERRO NO MESSAGE-REACTION-REMOVE: ${err}`);
		}
	}

};
