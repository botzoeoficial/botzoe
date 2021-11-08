/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerdelegado extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerdelegado';
		this.category = 'Cidade';
		this.description = 'Remova o Delegado do seu servidor!';
		this.usage = 'removerdelegado <usuário>';
		this.aliases = ['remover-delegado', 'removedelegado'];

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
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`um bot não nunca irá ser Delegado da cidade.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.delegado !== member.id) return message.reply('esse usuário não é o Delegado desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				cidade: {
					delegado: ''
				}
			}
		});

		message.reply('usuário removido do cargo Delegado com sucesso.');
	}

};
