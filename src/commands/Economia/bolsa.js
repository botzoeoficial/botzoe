/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Bolsa extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'bolsa';
		this.category = 'Economia';
		this.description = 'Veja a porcentagem da bolsa de valores!';
		this.usage = 'bolsa';
		this.aliases = ['bolsa-de-valores'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const timeout = 1200000;

		if (timeout - (Date.now() - server.bolsa.tempo) > 0) {
			const faltam = ms(timeout - (Date.now() - server.bolsa.tempo));

			const embed = new ClientEmbed(author)
				.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/891826029415510056/gettyimages-1186283017-1-1.jpg?width=905&height=603')
				.setTitle('📈 | **Bolsa de Valores - Zoe Investing**')
				.addField('📉 | Valor da Bolsa', `\`${server.bolsa.valor}.0%\``)
				.setColor('#1cfc03')
				.addField('🕑 | Tempo para Atualização da Bolsa', `${faltam.minutes}m ${faltam.seconds}s\n\n***Faça um Bom Investimento!***`);

			return message.channel.send(author, embed);
		}
	}

};
