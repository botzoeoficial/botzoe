/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Deleteuser extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'deleteuser';
		this.category = 'Editor';
		this.description = 'Delete um usuário do banco de dados!';
		this.usage = 'deleteuser <usuário>';
		this.aliases = ['deletar-usuario'];

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
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user) return message.reply('não achei esse usuário no meu **banco de dados**.');

		message.reply(`usuário ${member} (\`${member.id}\`) deletado do banco de dados com sucesso.`);

		if (user.marry.has) {
			await this.client.database.users.findOneAndUpdate({
				_id: user.marry.user
			}, {
				$set: {
					'marry.user': 'Ninguém.',
					'marry.has': false,
					'cooldown.gf': 0,
					'cooldown.fe': 0
				}
			});
		}

		if (user.familia.length >= 0) {
			await this.client.database.users.findOneAndUpdate({
				_id: user.marry.user
			}, {
				$set: {
					familia: []
				}
			});
		}

		await this.client.database.users.findOneAndDelete({
			_id: member.id
		});
	}

};