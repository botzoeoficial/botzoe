const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Ping extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'ping';
		this.category = 'Utilidades';
		this.description = 'Veja o ping do bot!';
		this.usage = 'ping';
		this.aliases = ['pong', 'latência'];

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
		author
	}) {
		const pingEmbed = new ClientEmbed(author)
			.setAuthor('🏓 | Pingando...');

		message.channel.send(author, pingEmbed).then((resultMessage) => {
			const ping = resultMessage.createdTimestamp - message.createdTimestamp;

			const ping2 = new ClientEmbed(author)
				.setTitle('🏓 | Pong!')
				.setDescription(`**📡 | Shard:** \`${message.guild.shardID}\`\n**⏱️ | Latência do BOT:** \`${ping}ms\`\n**⚡ | Latência da API:** \`${this.client.ws.ping}ms\``);

			resultMessage.edit(author, ping2);
		});
	}

};
