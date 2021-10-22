/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const Utils = require('../../utils/Util');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Depall extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'depositarall';
		this.category = 'Economia';
		this.description = 'Coloque todo o dinheiro no banco!';
		this.usage = 'depall';
		this.aliases = ['depall'];

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

		if (user.saldo <= 0) return message.reply('você não tem dinheiro para depositar no banco.');

		embed.setDescription(`💵 | Você depositou **R$${Utils.numberFormat(Number(user.saldo))},00** no banco com sucesso.`);

		message.channel.send(author, embed);

		await this.client.database.users.findOneAndUpdate({
			_id: author.id
		}, {
			$set: {
				banco: user.banco += user.saldo,
				saldo: user.saldo = 0
			}
		});
	}

};