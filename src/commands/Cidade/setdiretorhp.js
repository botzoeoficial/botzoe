/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setdiretorhp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdiretorhp';
		this.category = 'Cidade';
		this.description = 'Adicione um Diretor do Hospital na Cidade!';
		this.usage = 'setdiretorhp <usuário>';
		this.aliases = ['set-diretorhp', 'set-diretor-hp'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = true;
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

		if (member.user.bot) return message.reply(`você não pode dar função de Diretor do Hospital para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.diretorHP === member.id) return message.reply('esse usuário já é Diretor do Hospital desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.diretorHP': member.id
			}
		});

		message.reply(`o usuário ${member} virou Diretor do Hospital desse servidor agora.`);
	}

};
