/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setdonofavela extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdonofavela';
		this.category = 'Cidade';
		this.description = 'Seta o dono da favela!';
		this.usage = 'setdonofavela <usuário>';
		this.aliases = ['set-donofavela', 'adddonofavela'];

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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
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

		if (member.user.bot) return message.reply(`você não pode dar a função de Dono da Favela para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.donoFavela === member.id) return message.reply('esse usuário já é Dono da Favela desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				cidade: {
					donoFavela: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou o Dono da Favela desse servidor agora.`);
	}

};
