/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Auxilio extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'auxilio';
		this.category = 'Economia';
		this.description = 'Pegue o dinheiro do Auxílio Emergencial!';
		this.usage = 'auxilio';
		this.aliases = ['auxílio'];

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

		const timeout = 3600000;

		if (timeout - (Date.now() - user.cooldown.auxilio) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.auxilio));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const random = Utils.randomNumber(200, 600);

			const embed = new ClientEmbed(author)
				.setTitle('AUXÍLIO EMERGENCIAL')
				.setDescription(`💵 | Você recebeu do Governo **R$${Utils.numberFormat(random)},00** do seu Auxílio Emergêncial.`);

			message.channel.send(author, embed);

			await this.client.database.users.findOneAndUpdate({
				_id: author.id
			}, {
				$set: {
					saldo: user.saldo += Number(random),
					'cooldown.auxilio': Date.now()
				}
			});
		}
	}

};
