/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addbitcoin extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addbitcoin';
		this.category = 'Dono';
		this.description = 'Adicione bitcoins na conta de um usuário!';
		this.usage = 'add-bitcoin <usuário> <saldo>';
		this.aliases = ['add-bitcoin'];

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

		const btc = args[1];

		if (!btc) return message.reply('você precisa colocar uma quantia de bitcoins.');

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(btc) <= 0) return message.reply('a quantia a ser adicionada precisa ser maior que **0**.');

		if (isNaN(btc)) return message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				bitcoin: user.bitcoin += Number(btc)
			}
		});

		message.reply(`bitcoins adicionado com sucesso para o usuário ${member}.`);
	}

};
