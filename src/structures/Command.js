/* eslint-disable no-empty-function */
module.exports = class Command {

	constructor(client) {
		this.client = client;

		this.name = 'Sem nome.';
		this.category = 'Sem categoria.';
		this.description = 'Sem descrição.';
		this.usage = 'Sem modo de uso.';
		this.aliases = [];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}

	async run() {}

};
