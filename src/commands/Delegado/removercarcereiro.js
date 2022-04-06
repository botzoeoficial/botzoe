/* eslint-disable max-len */
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

		if (!server.cidade.carcereiro.length) {
			return message.reply({
				content: 'Não há mais Carcereiros nesse servidor para ser retirado.'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar o usuário que é Carcereiro.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um Bot nunca será Carcereiro do Servidor.'
			});
		}

		if (member.id === server.cidade.delegado) {
			return message.reply({
				content: 'Um Delegado nunca será **Carcereiro** do servidor.'
			});
		}

		if (!server.cidade.carcereiro.find((f) => f.id === member.id)) {
			return message.reply({
				content: 'Esse usuário não está na lista de Carcereiros do servidor.'
			});
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

		return message.reply({
			content: `O usuário ${member} saiu do cargo de Carcereiro desse servidor com sucesso.`
		});
	}

};
