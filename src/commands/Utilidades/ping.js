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
	}
	async run({
		message,
		author
	}) {
		const ping = new ClientEmbed(author)
			.setTitle('🏓 | Pong!')
			.setDescription(`Ping do bot em: \`${this.client.ws.ping}\`ms`);

		message.channel.send(author, ping);
	}

};
