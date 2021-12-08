/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addxp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addxp';
		this.category = 'Dono';
		this.description = 'Adicione xp na conta de um usuário!';
		this.usage = 'add-xp <usuário> <quantia>';
		this.aliases = ['add-xp'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
		this.editor = false;
		this.adm = false;

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

		const xp = args[1];

		if (!xp) return message.reply('você precisa colocar uma quantia de xp.');

		if (!parseInt(xp)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(xp) <= 0) return message.reply('a quantia a ser adicionada precisa ser maior que **0**.');

		if (parseInt(xp) > (user.level + 1) * 6000) return message.reply(`a quantia de xp precisa ser abaixo de **${(user.level + 1) * 6000}**`);

		if (isNaN(xp)) return message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				xp: user.xp += Number(xp)
			}
		});

		message.reply(`xp adicionado com sucesso para o usuário ${member}.`);
	}

};
