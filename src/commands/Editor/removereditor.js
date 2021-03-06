/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removereditor extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removereditor';
		this.category = 'Editor';
		this.description = 'Remova Editores do seu servidor!';
		this.usage = 'removereditor <usuário>';
		this.aliases = ['removeeditor', 'remove-editor'];

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

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.length) {
			return message.reply({
				content: 'Não há Editores nesse servidor.'
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
				content: 'Um bot nunca irá ser Editor desse servidor.'
			});
		}

		if (!server.editor.find((f) => f.id === member.id)) {
			return message.reply({
				content: 'Esse usuário não é Editor do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				editor: {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} saiu do cargo de Editor desse servidor com sucesso.`
		});
	}

};
