/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addmecanico extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addmecanico';
		this.category = 'Editor';
		this.description = 'Adicione um Mecânico no seu servidor!';
		this.usage = 'addmecanico <usuário>';
		this.aliases = ['add-mecanico', 'add-mecânico', 'addmecânico'];

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

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		if (server.cidade.mecanico.length === 5) {
			return message.reply({
				content: 'Esse servidor já possui o máximo de Mecânicos.'
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
				content: 'Um bot nunca irá ser Mecânico desse servidor.'
			});
		}

		if (server.cidade.mecanico.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Mecânico do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.mecanico': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Mecânico desse servidor com sucesso.`
		});
	}

};
