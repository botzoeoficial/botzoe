/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Bitcoin extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'bitcoin';
		this.category = 'Economia';
		this.description = 'Veja o bitcoin de alguém!';
		this.usage = 'bitcoin [usuário]';
		this.aliases = ['bitcoins', 'btc'];

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
			.setTitle(`Bitcoins do(a) ${member.user.tag}`)
			.addField('<:btc:908786996535787551> Bitcoins:', `ㅤㅤ${Utils.numberFormat(user.bitcoin)}`);

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
