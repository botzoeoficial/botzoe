/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerpolicial extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerpolicial';
		this.category = 'Delegado';
		this.description = 'Remova usuários da Polícia do seu servidor!';
		this.usage = 'removerpolicial <usuário>';
		this.aliases = ['removepolicial', 'remove-policial'];

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
		args,
		prefix
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.golpeEstado.caos) return message.reply('a Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!');

		if (!server.cidade.policiais.length) return message.reply('não há mais Policiais nesse servidor para ser retirado.');

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar o usuário que é Policial.');

		const user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		if (!server.cidade.policiais.find((f) => f.id === member.id)) {
			return message.reply('esse usuário não está na Polícia do servidor.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.policiais': {
					id: member.id
				}
			}
		});

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				'policia.isPolice': false,
				'policia.revistar': 0,
				'policia.prender': 0
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
