/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removermissao extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removermissao';
		this.category = 'Editor';
		this.description = 'Remova as missões já cumpridas do seu servidor!';
		this.usage = 'remover-missao <nome da missão>';
		this.aliases = ['remover-missao', 'removemissao'];

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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
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

		if (!server.missoes.length) return message.reply('não há missões cadastradas no momento para retirar alguma.');

		const nome = args.slice(0).join(' ');

		if (!nome) return message.reply('você precisa colocar o nome da missão.');

		if (!server.missoes.find((f) => f.nome === nome)) {
			return message.reply('não existe uma missão com esse nome na **lista de missões**.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				missoes: {
					nome: nome
				}
			}
		});

		message.reply('missão removida com sucesso.');
	}

};
