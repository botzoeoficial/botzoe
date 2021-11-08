/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addcarcereiro extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addcarcereiro';
		this.category = 'Delegado';
		this.description = 'Adicione um Carcereiro na sua cidade!';
		this.usage = 'addcarcereiro <usuário>';
		this.aliases = ['add-carcereiro'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = true;
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
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar função de Carcereiro para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.carcereiro.length === 5) return message.reply('esse servidor já possui o máximo de Carcereiros.');

		if (server.cidade.carcereiro.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Carcereiro do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.carcereiro': {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou Carcereiro desse servidor agora.`);
	}

};
