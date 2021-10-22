/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerestrela extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerestrela';
		this.category = 'Editor';
		this.description = 'Retire uma estrela de um usuário!';
		this.usage = 'remover-estrela <usuário>';
		this.aliases = ['remover-estrela', 'removeestrela'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
	}
	async run({
		message,
		prefix,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user) return message.reply('não achei esse usuário no meu **banco de dados**.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		if (!user.estrelas.length) return message.reply('esse usuário não possui nenhuma estrela para ser retirada.');

		await this.client.database.users.findOneAndUpdate({
			_id: member.id
		}, {
			$pull: {
				estrelas: '⭐'
			}
		});

		message.reply(`estrela retirada com sucesso do usuário ${member}.`);
	}

};
