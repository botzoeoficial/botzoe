/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addpolicial extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addpolicial';
		this.category = 'Delegado';
		this.description = 'Adicione um policial na sua cidade!';
		this.usage = 'addpolicial <usuário>';
		this.aliases = ['add-policial'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
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
		prefix
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar função de Policial para um bot.`);

		const user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.policiais.length === 10) return message.reply('esse servidor já possui o máximo de Policiais.');

		if (server.cidade.policiais.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Policial do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.policiais': {
					id: member.id
				}
			}
		});

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				'policia.isPolice': true
			}
		});

		message.reply(`o usuário ${member} virou Policial desse servidor agora.`);
	}

};
