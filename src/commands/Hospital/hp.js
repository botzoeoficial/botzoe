/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	filledBar
} = require('string-progressbar');

module.exports = class Hp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'hp';
		this.category = 'Hospital';
		this.description = 'Veja o seu HP!';
		this.usage = 'hp';
		this.aliases = ['vida', 'life'];

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

		const embed = new ClientEmbed(author)
			.addField('💓  •  Esta é sua vida no momento:', `HP - **${filledBar(100, user.hp.vida, 10)[0]}** ${user.hp.vida}%`)
			.addField('🩹  •  Ferido:', user.hp.vida < 50 ? 'Sim.' : 'Não.');

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
