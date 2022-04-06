/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removersaldo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removersaldo';
		this.category = 'Dono';
		this.description = 'Remova dinheiro da conta de um usuário!';
		this.usage = 'remover-saldo <usuário> <saldo>';
		this.aliases = ['remover-saldo', 'removesaldo'];

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
		args,
		author
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no meu **banco de dados**.'
			});
		}

		const btc = args[1];

		if (!btc) {
			return message.reply({
				content: 'Você precisa colocar uma quantia de saldo.'
			});
		}

		if (!parseInt(btc)) {
			return message.reply({
				content: 'Você precisa colocar uma quantia válida.'
			});
		}

		if (parseInt(btc) <= 0) {
			return message.reply({
				content: 'A quantia a ser removida precisa ser maior que **0**.'
			});
		}

		if (user.saldo <= 0) {
			return message.reply({
				content: 'Esse usuário não há saldo para ser retirado.'
			});
		}

		if (parseInt(btc) > user.saldo) {
			return message.reply({
				content: 'Esse usuário não tem essa quantia toda para ser retirada.'
			});
		}

		if (isNaN(btc)) {
			return message.reply({
				content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				saldo: user.saldo -= Number(btc)
			}
		});

		message.reply({
			content: `Saldo retirado com sucesso do usuário ${member}.`
		});
	}

};
