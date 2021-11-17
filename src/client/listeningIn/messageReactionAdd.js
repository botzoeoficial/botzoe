/* eslint-disable max-len */
const ClientEmbed = require('../../structures/ClientEmbed');

/* eslint-disable handle-callback-err */
module.exports = class Ready {

	constructor(client) {
		this.client = client;
	}

	async run(reaction, user) {
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;

		await this.client.database.guilds.findOne({
			'cidade.impeachment.message': reaction.message.id
		}, async (err, data) => {
			if (!data) return;

			data.cidade.impeachment.quantia += 1;

			const msg = await this.client.channels.cache.get(data.cidade.impeachment.channel).messages.fetch(data.cidade.impeachment.message);

			if (data.cidade.impeachment.quantia >= 20) {
				const embedTerminado = new ClientEmbed(this.client.user)
					.setTitle('<:Urna:895779255491911740> | Impeachment')
					.setDescription(`A voz do povo é a voz de Deus!\n\nA população estava insatisfeita com o péssimo trabalho de <@${data.cidade.governador}> como Prefeito, e então resolveram tirar ele do cargo através da votação popular.\n\nPara eleger um novo Prefeito, use o comando \`${data.prefix}novaeleicao\`.`);

				data.cidade.governador = '';
				data.cidade.tempoGovernador = 0;
				data.cidade.impeachment.quantia = 0;
				data.cidade.impeachment.channel = '';
				data.cidade.impeachment.message = '';
				data.cidade.impeachment.emoji = '';
				data.cidade.impeachment.existe = false;
				data.save();

				msg.edit(embedTerminado);
				msg.reactions.removeAll();
				return;
			}

			data.save();

			setTimeout(async () => {
				if (data.cidade.impeachment.quantia < 20) {
					data.cidade.impeachment.quantia = 0;
					data.cidade.impeachment.channel = '';
					data.cidade.impeachment.message = '';
					data.cidade.impeachment.emoji = '';
					data.cidade.impeachment.existe = false;

					const embedTerminado = new ClientEmbed(this.client.user)
						.setTitle('<:Urna:895779255491911740> | Impeachment')
						.setDescription(`O **Impeachment** não conseguiu dar certo, pois não chegou a **20** votos para <@${data.cidade.governador}> sair da função de Prefeito.\n\nEntão ele irá continuar sendo Prefeito da Cidade até um novo **Impeachment**.`);

					msg.edit(embedTerminado);
					msg.reactions.removeAll();
					return;
				}
			}, 18000000);
		});
	}

};
