/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Caixote extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'caixote';
		this.category = 'Social';
		this.description = 'Veja seu caixote';
		this.usage = 'caixote';
		this.aliases = [];

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
		author,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		const itens = user.caixote.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const total = !user.caixote.length ? 0 : user.caixote.map((a) => a.quantia).reduce((a, b) => a + b);

		const embed = new ClientEmbed(author)
			.setTitle(`**Caixote de:** ${member.user.tag}`)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setDescription(`***Total de Itens:*** \`${total}\`\n\n${itens || 'Caixote Vazio.'}`);

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
