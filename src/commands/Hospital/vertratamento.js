/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	filledBar
} = require('string-progressbar');

module.exports = class Vertratamento extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'vertratamento';
		this.category = 'Hospital';
		this.description = 'Veja como está indo seu tratamento no Hospital!';
		this.usage = 'vertratamento';
		this.aliases = ['ver-tratamento'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = false;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.hp.tratamento) {
			return message.reply({
				content: 'Você não está em **tratamento hospitalar**.'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('🩸 | Tratamento')
			.setDescription('Seu **Tratamento Hospitalar** está em andamento.')
			.addField('💓  •  Vida:', `HP - **${filledBar(100, user.hp.vida, 10)[0]}** ${user.hp.vida}%`)
			.addField('⌛  •  Terminará:', 'Seu tratamento terminará quando chegar a **100%**.');

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
