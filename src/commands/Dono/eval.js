/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
const Command = require('../../structures/Command');
const {
	inspect
} = require('util');

module.exports = class Eval extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'eval';
		this.category = 'Dono';
		this.description = 'Faça testes perigosos!';
		this.usage = 'eval <código>';
		this.aliases = ['evl', 'e'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		args
	}) {
		let code = args.join(' ');

		const user = (id) =>
			this.client.users.cache.find((user) => user.id === id);

		code = code.replace(/^`{3}(js)?|`{3}$/g, '');
		code = code.replace(/<@!?(\d{16,18})>/g, 'user($1)');

		let result;

		try {
			const evaled = await eval(code);

			result = inspect(evaled, {
				depth: 0
			});
		} catch (error) {
			result = error.toString();
		}

		result = result.replace(/_user\((\d{16,18})\)/g, '<@$1>');

		message.channel.send(result, {
			code: 'js'
		});
	}

};
