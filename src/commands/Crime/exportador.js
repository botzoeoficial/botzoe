/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Exportador extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'exportador';
		this.category = 'Crime';
		this.description = 'Veja se o exportador de drogas está na cidade!';
		this.usage = 'exportador';
		this.aliases = ['exportador-drogas'];

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

		const embed = new ClientEmbed(author)
			.setTitle('Exportador de Drogas')
			.setDescription(server.exportador.precisandoDroga === 'Nenhuma Droga' ? 'O Exportador não está na Cidade.' : `O Exportador de Drogas está precisando de **${server.exportador.precisandoQuantia}KG** de **${server.exportador.precisandoDroga}**, para levar a Europa.`)
			.addField('Tempo para ir embora:', Utils.convertMS(server.exportador.irEmbora))
			.addField('Quantidade que falta para a exportação:', `${server.exportador.quantiaQueFalta}/${server.exportador.precisandoQuantia}`);

		message.channel.send(author, embed);
	}

};
