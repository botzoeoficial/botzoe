/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Saldo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'saldo';
		this.category = 'Economia';
		this.description = 'Veja o saldo de alguém!';
		this.usage = 'saldo [usuário]';
		this.aliases = ['coins', 'money', 'atm'];

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
			.setTitle(`🎄 Saldo de ${member.user.tag}`)
			.addField('💵 | Carteira:', `R$${Utils.numberFormat(user.saldo)},00`)
			.addField('🏦 | Banco:', `R$${Utils.numberFormat(user.banco)},00`);

		message.channel.send(author, embed);
	}

};
