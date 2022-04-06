/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addmedico extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addmedico';
		this.category = 'Cidade';
		this.description = 'Adicione um Médico no seu servidor!';
		this.usage = 'addmedico <usuário>';
		this.aliases = ['add-medico'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = true;
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
		args,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.governador !== author.id && server.cidade.diretorHP !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser o \`Prefeito\` ou \`Diretor do Hospital\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		if (server.cidade.medicos.length === 10) {
			return message.reply({
				content: 'Esse servidor já possui o máximo de Médicos.'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um bot nunca será Médico do servidor.'
			});
		}

		if (server.cidade.medicos.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Médico do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.medicos': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Médico desse servidor com sucesso.`
		});
	}

};
