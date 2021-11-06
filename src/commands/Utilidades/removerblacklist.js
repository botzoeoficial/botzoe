/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerblacklist extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerblacklist';
		this.category = 'Utilidades';
		this.description = 'Remova algum usuário da blacklist!';
		this.usage = 'remover-blacklist <id do usuário>';
		this.aliases = ['remover-blacklist'];

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
		prefix,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.blacklist.length) return message.reply('não há usuários cadastrados na blacklist no momento para retirar alguém.');

		const id = args.slice(0).join(' ');

		if (!id) return message.reply(`você precisa colocar o ID de um usuário da blacklist. Use o comando \`${prefix}blacklist\` para ver os IDS disponíveis.`);

		if (!server.blacklist.find((f) => f.id === id)) {
			return message.reply('não existe um usuário com com esse ID na **blacklist**.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				blacklist: {
					id: id
				}
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
