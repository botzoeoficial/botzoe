/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const Utils = require('../../utils/Util');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Sacarall extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'sacarall';
		this.category = 'Economia';
		this.description = 'Retire todo o dinheiro do banco!';
		this.usage = 'sacarall';
		this.aliases = ['sacar-all'];

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
		author
	}) {
		let user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.cadastrado) return message.reply(`você não está cadastrado no servidor! Cadastre-se usando o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author);

		if (user.banco <= 0) return message.reply('você não tem dinheiro para sacar do banco.');

		user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		embed.setDescription(`💵 | Você sacou **R$${Utils.numberFormat(Number(user.banco))},00** do banco com sucesso.`);

		message.channel.send(author, embed);

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				saldo: user.saldo += user.banco,
				banco: user.banco = 0
			}
		});
	}

};
