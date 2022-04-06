/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addxp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addxp';
		this.category = 'Dono';
		this.description = 'Adicione xp na conta de um usuário!';
		this.usage = 'add-xp <usuário> <quantia>';
		this.aliases = ['add-xp'];

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

		if (member.user.bot) {
			return message.reply({
				content: 'Você não pode dar **XP** para um bot.'
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

		const xp = args[1];

		if (!xp) {
			return message.reply({
				content: 'Você precisa colocar uma quantia de XP.'
			});
		}

		if (!parseInt(xp)) {
			return message.reply({
				content: 'Você precisa colocar uma quantia válida.'
			});
		}

		if (parseInt(xp) <= 0) {
			return message.reply({
				content: 'A quantia a ser adicionada precisa ser maior que **0**.'
			});
		}

		if (parseInt(xp) > (user.level + 1) * 6000) {
			return message.reply({
				content: `A quantia de XP precisa ser abaixo de **${(user.level + 1) * 6000}**`
			});
		}

		if (isNaN(xp)) {
			return message.reply({
				content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				xp: user.xp += Number(xp)
			}
		});

		return message.reply({
			content: `XP adicionado com sucesso para o usuário ${member}.`
		});
	}

};
