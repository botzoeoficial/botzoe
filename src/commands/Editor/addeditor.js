/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addeditor extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addeditor';
		this.category = 'Editor';
		this.description = 'Dê permissão de Editor para um usuário do seu servidor!';
		this.usage = 'addeditor <usuário>';
		this.aliases = ['add-editor'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = false;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar Editor para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.editor.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Editor do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				editor: {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou Editor desse servidor agora.`);
	}

};
