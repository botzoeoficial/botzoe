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
	}
	async run({
		message,
		prefix,
		author
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (!user.cadastrado) return message.reply(`você não está cadastrado no servidor! Cadastre-se usando o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author);

		if (user.banco <= 0) return message.reply('você não tem dinheiro para sacar do banco.');

		embed.setDescription(`💵 | Você sacou **R$${Utils.numberFormat(Number(user.banco))},00** do banco com sucesso.`);

		message.channel.send(author, embed);

		await this.client.database.users.findOneAndUpdate({
			_id: author.id
		}, {
			$set: {
				saldo: user.saldo += user.banco,
				banco: user.banco = 0
			}
		});
	}

};
