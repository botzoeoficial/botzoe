/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Investimentobtc extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'investimentobtc';
		this.category = 'Vip';
		this.description = 'Veja o seu investimento de bitcoin!';
		this.usage = 'investimentobtc';
		this.aliases = ['investimento-btc'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = true;
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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.cooldown.bitcoin <= 0) return message.reply(`você não tem um investimento de bitcoin em andamento! Use o comando \`${prefix}investirbtc\`.`);

		if ((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin) > 0) {
			const faltam = ms((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin));

			const embed = new ClientEmbed(author)
				.setTitle('<:btc:908786996535787551> BITCOIN')
				.setDescription(`📈 | Seu investimento de **${user.investimento.investido}** BitCoins, ainda está em andamento.\nRestam: \`${faltam.days}\` dias, \`${faltam.hours}\` horas, \`${faltam.minutes}\` minutos e \`${faltam.seconds}\` segundos.\n\n**Você receberá:** \`${user.investimento.dobro}\` bitcoins.`);

			return message.channel.send(author, embed);
		}
	}

};
