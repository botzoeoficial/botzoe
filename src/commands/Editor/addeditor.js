/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addeditor extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addeditor';
		this.category = 'Editor';
		this.description = 'Dê permissão de Editor para um usuário do seu servidor!';
		this.usage = 'addeditor <usuário>';
		this.aliases = ['add-editor'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
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

		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args
	}) {
		if (!message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ter permissão \`Administrador\` do servidor para usar esse comando!`
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
				content: 'Um bot nunca será Editor do servidor.'
			});
		}

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.editor.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Editor do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				editor: {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} tornou-se Editor desse servidor com sucesso.`
		});
	}

};
