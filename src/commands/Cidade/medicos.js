/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Medicos extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'medicos';
		this.category = 'Cidade';
		this.description = 'Veja quem são os Médicos da cidade!';
		this.usage = 'medicos';
		this.aliases = ['médicos', 'enfermeiros'];

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
		author,
		prefix
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle('🏥 | Médicos da Cidade!')
			.setDescription(`Aqui você verá o **Diretor do Hospital** e **Médicos** da Cidade!`)
			.addField('👨‍⚕️ | Diretor do HP:', server.cidade.diretorHP === '' ? `Essa cidade não possui **Diretor do Hospital** ainda! Use o comando \`${prefix}setdiretorhp\`.` : `<@${server.cidade.diretorHP}>`)
			.addField('🩺 | Médicos:', !server.cidade.medicos.length ? `Essa cidade não possui **médicos** ainda! Use o comando \`${prefix}addmedico\`.` : server.cidade.medicos.map((a) => `<@${a.id}>`).join('\n'));

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
