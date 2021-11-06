const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Impostobancario extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'impostobancário';
		this.category = 'Social';
		this.description = 'Veja o tempo que falta para você pagar o banco!';
		this.usage = 'impostobancario';
		this.aliases = ['imposto-bancario', 'imposto-bancário', 'impostobancario'];

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
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle(`Banco Central ${message.guild.name}`)
			.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/905147390204444692/195488.png');

		const timeout = 300000;

		if (timeout - (Date.now() - user.payBank.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - user.payBank.cooldown));

			embed.addField('Próximo Pagamento:', `${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s`);
		} else {
			embed.addField('Próximo Pagamento:', `Use o comando: \`${prefix}pagarbanco\`.`);
		}

		message.channel.send(author, embed);
	}

};
