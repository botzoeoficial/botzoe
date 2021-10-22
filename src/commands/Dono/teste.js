const Command = require('../../structures/Command');

module.exports = class Teste extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'teste';
		this.category = 'Dono';
		this.description = 'Faça testes perigosos!';
		this.usage = 'eval <código>';
		this.aliases = ['tst', 'test'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({ message }) {
		message.channel.send('🤡');
	}

};
