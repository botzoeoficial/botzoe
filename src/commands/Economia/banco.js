const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');

module.exports = class Banco extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'banco';
		this.category = 'Economia';
		this.description = 'Veja o saldo do banco do servidor!';
		this.usage = 'banco';
		this.aliases = ['bank'];

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
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle(`Banco Central ${message.guild.name}`)
			.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/905147390204444692/195488.png')
			.addField('Valor Atual:', `R$${Utils.numberFormat(server.bank)},00`);

		const timeout = 518400000;

		if (timeout - (Date.now() - user.payBank.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - user.payBank.cooldown));

			embed.addField('Próximo Pagamento:', `${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s`);
		} else {
			embed.addField('Próximo Pagamento:', `Use o comando: \`${prefix}pagarbanco\`.`);
		}

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
