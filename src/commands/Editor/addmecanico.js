/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addmecanico extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addmecanico';
		this.category = 'Editor';
		this.description = 'Adicione um Mecânico no seu servidor!';
		this.usage = 'addmecanico <usuário>';
		this.aliases = ['add-mecanico', 'add-mecânico', 'addmecânico'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
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

		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.mecanico.length === 4) return message.reply('esse servidor já possui o máximo de Mecânicos.');

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar função de Mecânico para um bot.`);

		if (server.cidade.mecanico.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Mecânico do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.mecanico': {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou Mecânico desse servidor agora.`);
	}

};
