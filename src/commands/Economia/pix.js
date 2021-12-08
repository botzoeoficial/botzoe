/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Pix extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pix';
		this.category = 'Economia';
		this.description = 'Transfira dinheiro para um usuário!';
		this.usage = 'pix <usuário> <saldo>';
		this.aliases = ['transferir'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
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
		args,
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		const user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const btc = args[1];

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(btc) <= 0 || parseInt(btc) > 500000) return message.reply('a quantia a ser adicionada precisa ser maior que **R$0,00** e menor que **R$500.00,00**.');

		if (isNaN(btc)) return message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		if (user.saldo <= 0) return message.reply('sua carteira está negativa ou está zerada, portanto, não dá para transferir dinheiro.');

		if (parseInt(btc) > user.saldo) return message.reply('você não tem esse saldo todo na carteira para ser transferido.');

		const embed = new ClientEmbed(author)
			.setTitle('🏦 Transferência')
			.setDescription(`💵 | Você transferiu \`R$${Utils.numberFormat(Number(btc))},00\` para ${member} com sucesso!`);

		message.channel.send(author, embed);

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				saldo: user.saldo -= Number(btc)
			}
		});

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				banco: user2.banco += Number(btc)
			}
		});
	}

};
