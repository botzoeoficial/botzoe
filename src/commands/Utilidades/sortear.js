/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Sortear extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'sortear';
		this.category = 'Utilidades';
		this.description = 'Sorteie entre 2 números aleatórios!';
		this.usage = 'sortear 1/50 Sorteio de teste!';
		this.aliases = ['sorteio'];

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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		author,
		args,
		prefix
	}) {
		const [num1, num2] = args
			.join('')
			.split(/\/|\s/);

		if (!num1) return message.reply(`você precisa colocar um número! Ex: \`${prefix}sortear 1/50\``);

		if (isNaN(num1)) return message.reply('o primeiro valor precisa ser um número!');

		if (!parseInt(num1)) return message.reply('o primeiro valor precisa ser um número válido!');

		if (!num2) return message.reply(`você precisa colocar um número! Ex: \`${prefix}sortear 1/50\``);

		if (isNaN(num2)) return message.reply('o segundo valor precisa ser um número!');

		if (!parseInt(num2)) return message.reply('o segundo valor precisa ser um número válido!');

		const random = Utils.randomNumber(Number(num1), Number(num2));

		const embedWin = new ClientEmbed(author)
			.setAuthor('🍀 | Sorteando um número, e...');

		const embed = new ClientEmbed(author)
			.setTitle('**🎉 PARABÉNS 🎉**')
			.setDescription(`\`O número sorteado foi o:\` **${Utils.numberFormat(random)}**!`);

		const msgLoading = await message.channel.send(author, embedWin);

		setTimeout(async () => {
			msgLoading.edit(author, embed);
		}, 7000);
	}

};
