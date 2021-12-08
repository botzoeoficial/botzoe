/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addmedico extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addmedico';
		this.category = 'Cidade';
		this.description = 'Adicione um Médico na sua cidade!';
		this.usage = 'addmedico <usuário>';
		this.aliases = ['add-medico'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = true;
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

		if (server.cidade.golpeEstado.caos) return message.reply('a Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!');

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar função de Médico para um bot.`);

		if (server.cidade.medicos.length === 10) return message.reply('esse servidor já possui o máximo de Médicos.');

		if (server.cidade.medicos.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Médico do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.medicos': {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} virou Médico desse servidor agora.`);
	}

};
