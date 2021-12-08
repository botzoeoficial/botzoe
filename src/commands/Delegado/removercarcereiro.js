/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removercarcereiro extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removercarcereiro';
		this.category = 'Delegado';
		this.description = 'Remova usuários Carcereiros do seu servidor!';
		this.usage = 'removercarcereiro <usuário>';
		this.aliases = ['removecarcereiro', 'remove-carcereiro'];

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
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.golpeEstado.caos) return message.reply('a Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!');

		if (!server.cidade.carcereiro.length) return message.reply('não há mais Carcereiros nesse servidor para ser retirado.');

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar o usuário que é Carcereiro.');

		if (!server.cidade.carcereiro.find((f) => f.id === member.id)) {
			return message.reply('esse usuário não está na lista de Carcereiros do servidor.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.carcereiro': {
					id: member.id
				}
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
