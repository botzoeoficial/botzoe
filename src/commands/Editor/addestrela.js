/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addestrela extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addestrela';
		this.category = 'Editor';
		this.description = 'Dê uma estrela para um usuário!';
		this.usage = 'add-estrela <usuário>';
		this.aliases = ['add-estrela'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
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
		prefix,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$push: {
				estrelas: '⭐'
			}
		});

		message.reply(`estrela adicionada com sucesso para o usuário ${member}.`);
	}

};
