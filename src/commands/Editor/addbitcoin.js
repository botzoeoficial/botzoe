/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addbitcoin extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addbitcoin';
		this.category = 'Editor';
		this.description = 'Adicione bitcoins na conta de um usuário!';
		this.usage = 'add-bitcoin <usuário> <saldo>';
		this.aliases = ['add-bitcoin'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
	}
	async run({
		message,
		prefix,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user) return message.reply('não achei esse usuário no meu **banco de dados**.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const btc = args[1];

		if (!btc) return message.reply('você precisa colocar uma quantia de bitcoins.');

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(btc) <= 0) return message.reply('a quantia a ser adicionada precisa ser maior que **0**.');

		await this.client.database.users.findOneAndUpdate({
			_id: member.id
		}, {
			$set: {
				bitcoin: user.bitcoin += Number(btc)
			}
		});

		message.reply(`bitcoins adicionado com sucesso para o usuário ${member}.`);
	}

};
