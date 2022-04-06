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
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		const btc = args[1];

		if (!btc) {
			return message.reply({
				content: 'Você precisa colocar uma quantia de bitcoins.'
			});
		}

		if (!parseInt(btc)) {
			return message.reply({
				content: 'Você precisa colocar uma quantia válida.'
			});
		}

		if (parseInt(btc) <= 0) {
			return message.reply({
				content: 'A quantia a ser adicionada precisa ser maior que **0**.'
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
				bitcoin: user.bitcoin += Number(btc)
			}
		});

		return message.reply({
			content: `Bitcoins adicionado com sucesso para o usuário ${member}.`
		});
	}

};
