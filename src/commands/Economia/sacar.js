/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const Utils = require('../../utils/Util');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Sacar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'sacar';
		this.category = 'Economia';
		this.description = 'Retire dinheiro do banco!';
		this.usage = 'sacar <quantia>';
		this.aliases = ['retirar'];

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

		if (!user.cadastrado) return message.reply(`você não está cadastrado no servidor! Cadastre-se usando o comando: \`${prefix}cadastrar\`.`);

		const btc = args[0];

		const embed = new ClientEmbed(author);

		if (!btc) return message.reply('você precisa colocar uma quantia de dinheiro para sacar.');

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(btc) <= 0) return message.reply('a quantia a ser removida precisa ser maior que **0**.');

		if (isNaN(btc)) return message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		if (user.banco <= 0) return message.reply('você não tem dinheiro para sacar do banco.');

		if (parseInt(btc) > user.banco) return message.reply('você não tem essa quantia toda para ser retirada.');

		embed.setDescription(`💵 | Você sacou **R$${Utils.numberFormat(Number(btc))},00** do banco com sucesso.`);

		message.channel.send(author, embed);

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				saldo: user.saldo += Number(btc),
				banco: user.banco -= Number(btc)
			}
		});
	}

};
