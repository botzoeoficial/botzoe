/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Mecanicos extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'mecanicos';
		this.category = 'Cidade';
		this.description = 'Veja os Mecânicos do servidor!';
		this.usage = 'mecanicos';
		this.aliases = ['mecânicos'];

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
			.setTitle('🧑‍🔧 | Mecânicos da Cidade!')
			.setDescription(`Aqui você verá todos os **Mecânicos** da cidade!\n\n${!server.cidade.mecanico.length ? 'Este servidor não possui nenhum **Mecânico** ainda!' : server.cidade.mecanico.map((a, i) => `\`${i + 1}º)\` <@${a.id}>`).join('\n')}`);

		return message.channel.send(author, embed);
	}

};
