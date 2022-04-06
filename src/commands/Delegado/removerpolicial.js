/* eslint-disable max-len */
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
		this.governador = true;
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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.governador !== author.id && server.cidade.delegado !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser o \`Prefeito\` ou \`Delegado\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		if (!server.cidade.policiais.length) {
			return message.reply({
				content: 'Não há mais Policiais nesse servidor para ser retirado.'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar o usuário que é Policial.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um Bot nunca será **Policial** do servidor.'
			});
		}

		if (member.id === server.cidade.delegado) {
			return message.reply({
				content: 'Um Delegado nunca será **Policial** do servidor.'
			});
		}

		const user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		if (!server.cidade.policiais.find((f) => f.id === member.id)) {
			return message.reply({
				content: 'Esse usuário não está na Polícia do servidor.'
			});
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

		return message.reply({
			content: `O usuário ${member} saiu do cargo de Policial desse servidor com sucesso.`
		});
	}

};
