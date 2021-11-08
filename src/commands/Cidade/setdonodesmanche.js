/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setdonodesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdonodesmanche';
		this.category = 'Cidade';
		this.description = 'Seta quem vai comandar o Desmanche!';
		this.usage = 'setdonodesmanche <usuário>';
		this.aliases = ['set-donodesmanche', 'set-dono-desmanche'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
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

		if (member.user.bot) return message.reply(`você não pode dar a função de Dono do Desmanche para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.donoDesmanche === member.id) return message.reply('esse usuário já é Dono do Desmanche desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				cidade: {
					donoDesmanche: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou o Dono do Desmanche desse servidor agora.`);
	}

};
