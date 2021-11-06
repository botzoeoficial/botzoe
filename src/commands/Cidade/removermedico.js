/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerpolicial extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerpolicial';
		this.category = 'Cidade';
		this.description = 'Remova usuários da Polícia do seu servidor!';
		this.usage = 'removerpolicial <usuário>';
		this.aliases = ['removepolicial', 'remove-policial'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = true;
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

		if (!server.cidade.medicos.length) return message.reply('não há mais Médicos nesse servidor para ser retirado.');

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar o usuário que é Médico.');

		if (!server.cidade.medicos.find((f) => f.id === member.id)) {
			return message.reply('esse usuário não está na equipe Médica do servidor.');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.medicos': {
					id: member.id
				}
			}
		});

		message.reply('usuário removido com sucesso.');
	}

};
