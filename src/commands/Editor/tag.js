/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Tag extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'tag';
		this.category = 'Editor';
		this.description = 'Dê uma tag para um usuário!';
		this.usage = 'tag <usuário> <tag>';
		this.aliases = ['dar-tag'];

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

		const tag = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

		if (!tag) return message.reply('você precisar mencionar uma tag logo após o usuário no comando.');

		if (tag.managed) return message.reply('você não pode dar um tag que é de um bot.');

		member.roles.add(tag.id);

		await this.client.database.users.findOneAndUpdate({
			_id: member.id
		}, {
			$push: {
				eventos: tag
			}
		});

		message.reply(`tag <@&${tag.id}> (\`${tag.id}\`) dada com sucesso para o usuário ${member}.`);
	}

};
