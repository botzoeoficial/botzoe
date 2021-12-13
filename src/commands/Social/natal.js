/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Natal extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'natal';
		this.category = 'Social';
		this.description = 'Veja a quantia de presentes que um usuário tem!';
		this.usage = 'natal [usuário]';
		this.aliases = ['presentes', 'feliznatal'];

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

		if (!user) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		const embed = new ClientEmbed(author)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`🎄 Presentes de ${member.user.tag}`)
			.addField('🎁 | Presentes:', `ㅤㅤ\`${Utils.numberFormat(user.presentes)}\``)
			.addField('Prazo de coleta de Presentes:', '10/12/2021 à 25/12/2021')
			.addField('Prazo de Troca:', 'Você poderá Trocar seus presentes no site da Zoe, de 25/12/2021 à 05/01/2022.');

		message.channel.send(author, embed);
	}

};