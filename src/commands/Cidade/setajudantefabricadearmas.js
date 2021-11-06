/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setajudantefabricadearmas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setajudantefabricadearmas';
		this.category = 'Cidade';
		this.description = 'Setar um Ajudante da Fábrica de Armas!';
		this.usage = 'setajudantefabricadearmas <usuário>';
		this.aliases = ['addajudantefabricadearmas', 'set-ajudante-fabrica-armas'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
		this.donoArmas = true;
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
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar a função de Ajudante da Fábrica de Armas para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.ajudanteArmas.length === 1) return message.reply('este servidor já possui o máximo de Ajudantes para a Fábrica de Armas.');

		if (server.cidade.ajudanteArmas.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Ajudante da Fábrica de Armas do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				cidade: {
					ajudanteArmas: {
						id: member.id
					}
				}
			}
		});

		message.reply(`o usuário ${member} virou Ajudante da Fábrica de Armas desse servidor agora.`);
	}

};
