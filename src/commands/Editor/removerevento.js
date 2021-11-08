/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerevento extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerevento';
		this.category = 'Editor';
		this.description = 'Remova os eventos já realizados do seu servidor!';
		this.usage = 'remove-evento <evento>';
		this.aliases = ['removeevento', 'remove-evento'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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

		if (!server.eventos.length) return message.reply('não há eventos cadastrados no momento para retirar algum.');

		const nome = args.slice(0).join(' ');

		if (!nome) return message.reply('você precisa colocar o nome do evento.');

		if (!server.eventos.find((f) => f.nome === nome)) {
			return message.reply('não existe um evento com esse nome na **lista de eventos**.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				eventos: {
					nome: nome
				}
			}
		});

		message.reply('evento removido com sucesso.');
	}

};
