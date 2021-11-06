/* eslint-disable no-return-assign */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Eventos extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'eventos';
		this.category = 'Utilidades';
		this.description = 'Veja os eventos que irão acontecer!';
		this.usage = 'eventos';
		this.aliases = ['evento'];

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const eventosArray = server.eventos.map((value, index) => ({
			nome: value.nome,
			tag: value.tag,
			date: value.date,
			hour: value.hour,
			position: index
		}));

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🎉 | Eventos Disponíveis:');

		eventosArray.forEach((eu) => embedMessage += `**Evento:** ${eu.nome} | **Data:** ${eu.date} | **Hora:** ${eu.hour} | **Tag:** <@&${eu.tag}>\n`);
		embed.setDescription(!server.eventos.length ? 'Não há eventos cadastrados no momento.' : `${embedMessage}`);

		message.channel.send(author, embed);
	}

};
