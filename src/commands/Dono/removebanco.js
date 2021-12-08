/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removebanco extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerbanco';
		this.category = 'Dono';
		this.description = 'Remova usuários cadastrados no banco!';
		this.usage = 'remover-banco <ID>';
		this.aliases = ['remover-banco', 'removebanco'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.banco.length) return message.reply('não há usuários cadastrados no banco no momento para ser retirado.');

		const nome = args.slice(0).join(' ');

		if (!nome) return message.reply('você precisa colocar o ID do usuário do banco.');

		if (!server.banco.find((f) => f.id === nome)) {
			return message.reply('não existe um usuário com ID no banco.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				banco: {
					id: nome
				}
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
