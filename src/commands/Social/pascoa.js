/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Pascoa extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pascoa';
		this.category = 'Social';
		this.description = 'Veja a quantia de ovos de páscoa que um usuário tem!';
		this.usage = 'pascoa [usuário]';
		this.aliases = ['páscoa', 'ovos', 'ovo'];

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
			// .setDescription(`**EVENTO TERMINADO!**\n\nObrigado a todos que participaram do evento!`)
			.setTitle(`🐇 Ovos de Páscoa de ${member.user.tag}`)
			.addField('<:ovo_1:949360699992326254> | Ovo Comum:', `ㅤㅤ\`${Utils.numberFormat(user.ovos.comuns)}\``)
			.addField('<:ovo_2:949360699971366933> | Ovo Lendário:', `ㅤㅤ\`${Utils.numberFormat(user.ovos.lendarios)}\``)
			.addField('💯 | Total:', `ㅤㅤ\`${Utils.numberFormat(user.ovos.comuns + user.ovos.lendarios)}\``)
			.addField('Prazo de coleta dos Ovos de Páscoa:', '04/03/2022 à 17/04/2022.')
			.addField('Prazo de Troca:', 'Você poderá Trocar seus ovos a partir do dia 18/04/2022 à 19/04/2022.');

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
