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
	}
	async run({
		message,
		args,
		prefix,
		author
	}) {
		const member = this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.member;

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user) return message.reply('não achei esse usuário no meu **banco de dados**.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`Bitcoins do(a) ${member.user.tag}`)
			.addField('🪙 Bitcoins:', `ㅤㅤ${Utils.numberFormat(user.bitcoin)}`);

		message.channel.send(author, embed);
	}

};
