/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addsaldo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addsaldo';
		this.category = 'Editor';
		this.description = 'Adicione dinheiro na conta de um usuário!';
		this.usage = 'add-saldo <usuário> <saldo>';
		this.aliases = ['add-saldo', 'addgrana', 'add-grana'];

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

		const btc = args[1];

		if (!btc) return message.reply('você precisa colocar uma quantia de saldo.');

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (isNaN(btc)) message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				banco: user.banco += Number(btc)
			}
		});

		message.reply(`saldo adicionado com sucesso para o usuário ${member}.`);
	}

};
