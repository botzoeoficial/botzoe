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
		this.editor = true;
		this.adm = true;

		this.vip = false;
	}
	async run({
		message,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.length) return message.reply('não há Editores nesse servidor.');

		const nome = args.slice(0).join(' ');

		if (!nome) return message.reply('você precisa colocar o ID do usuário que é Editor.');

		if (!server.editor.find((f) => f.id === nome)) {
			return message.reply('não existe um usuário com esse ID que seja Editor desse servidor.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				editor: {
					id: nome
				}
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
