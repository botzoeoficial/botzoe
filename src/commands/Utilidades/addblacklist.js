/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Addblacklist extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addblacklist';
		this.category = 'Utilidades';
		this.description = 'Coloque algum usuário na blacklist do servidor!';
		this.usage = 'add-blacklist <usuário> <id do usuário> <saldo do usuário> <motivo>';
		this.aliases = ['add-blacklist'];

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
		prefix,
		author,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.blacklist.length >= 20) {
			return message.reply({
				content: 'Este servidor já possui o máximo de usuários na blacklist.'
			});
		}

		const user = args[0];

		if (!user) {
			return message.reply({
				content: 'Você precisa mencionar o nome do usuário junto com o comando.'
			});
		}

		const id = args[1];

		if (!id) {
			return message.reply({
				content: 'Você precisa colocar o ID do usuário logo após o nome dele.'
			});
		}

		if (!parseInt(id)) {
			return message.reply({
				content: 'O ID do usuário precisa ser números, não letras.'
			});
		}

		if (server.blacklist.map((fs) => fs.id).includes(id)) {
			return message.reply({
				content: 'Esse usuário já está na blacklist.'
			});
		}

		const coins = args[2];

		if (!coins) {
			return message.reply({
				content: `Você precisa colocar o saldo do usuário logo após o ID dele.\n**OBS: Coloque o saldo dessa forma: \`154930\`.**`
			});
		}

		if (!parseInt(coins)) {
			return message.reply({
				content: 'O saldo do usuário precisa ser números, não letras.'
			});
		}

		const reason = args.slice(3).join(' ');

		if (!reason) {
			return message.reply({
				content: 'Você precisa colocar o motivo logo após o saldo dele.'
			});
		}

		if (reason.length > 1024) {
			return message.reply({
				content: 'O motivo da blacklist só pode ter no máximo **1024** letras.'
			});
		}

		message.reply({
			content: `Usuário adicionado na **blacklist** com sucesso. Use o comando \`${prefix}blacklist\` para ver as informações dele lá.`
		});

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				blacklist: {
					nick: user,
					id: id,
					saldo: Number(coins),
					adicionado: author.id,
					motivo: reason
				}
			}
		});

		return;
	}

};
