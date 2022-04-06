/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const Utils = require('../../utils/Util');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Depositar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'depositar';
		this.category = 'Economia';
		this.description = 'Coloque dinheiro no banco!';
		this.usage = 'depositar <quantia>';
		this.aliases = ['dep'];

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

		// if (518400000 - (Date.now() - user.payBank.cooldown) < 0) {
		// 	return message.reply({
		// 		content: `Você precisa pagar o **Banco** antes de fazer isso! Use o comando \`${prefix}pagarbanco\`.`
		// 	});
		// }

		const btc = args[0];

		const embed = new ClientEmbed(author);

		if (!btc) {
			return message.reply({
				content: 'Você precisa colocar uma quantia de dinheiro para depositar.'
			});
		}

		if (!parseInt(btc)) {
			return message.reply({
				content: 'Você precisa colocar uma quantia válida.'
			});
		}

		if (parseInt(btc) <= 0) {
			return message.reply({
				content: 'A quantia a ser depositada precisa ser maior que **0**.'
			});
		}

		if (isNaN(btc)) {
			return message.reply({
				content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
			});
		}

		if (user.saldo <= 0) {
			return message.reply({
				content: 'Você não tem dinheiro para depositar no banco.'
			});
		}

		if (parseInt(btc) > user.saldo) {
			return message.reply({
				content: 'Você não tem essa quantia toda para ser depositada.'
			});
		}

		embed.setDescription(`💵 | Você depositou **R$${Utils.numberFormat(Number(btc))},00** no banco com sucesso.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		});

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				saldo: user.saldo -= Number(btc),
				banco: user.banco += Number(btc)
			}
		});

		return;
	}

};
