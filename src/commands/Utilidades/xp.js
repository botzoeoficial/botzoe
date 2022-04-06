/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Xp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'xp';
		this.category = 'Utilidades';
		this.description = 'Veja o xp/level de alguém!';
		this.usage = 'xp [usuário]';
		this.aliases = ['experiencia'];

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
		args,
		author
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

		const embed = new ClientEmbed(author)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`Level do(a) ${member.user.tag}`)
			.setDescription(`📈 **Level:** ${user.level}\n🆙 **XP:** ${user.xp}/${(user.level + 1) * 6000} XP\n❌ **Faltam:** ${((user.level + 1) * 6000) - user.xp} XP para o próximo level`);

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
