/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Minerar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'minerar';
		this.category = 'Economia';
		this.description = 'Minere bitcoins!';
		this.usage = 'minerar';
		this.aliases = ['explorar'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const timeout = 18000000;

		if (timeout - (Date.now() - user.cooldown.minerar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.minerar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('MINERAÇÃO')
				.setDescription(`💻 | Você minerou \`1\` bitcoin 🪙`);

			message.channel.send(author, embed);

			await this.client.database.users.findOneAndUpdate({
				_id: author.id
			}, {
				$set: {
					bitcoin: user.bitcoin += 1,
					'cooldown.minerar': Date.now()
				}
			});
		}
	}

};
