/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Entradahospital extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'entradahospital';
		this.category = 'Hospital';
		this.description = 'Entre na fila de espera do Hospital em busca de cura!';
		this.usage = 'entrada-hospital';
		this.aliases = ['entrada-hospital'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.hospital.find((a) => a.usuario === author.id)) {
			return message.reply({
				content: `Você já está na fila de espera do **Hospital ${message.guild.name}**! Aguarde um Médico atendê-lo.`
			});
		}

		if (user.hp.vida >= 50) {
			return message.reply({
				content: `Você não está ferido! Use \`${prefix}vida\` para ver sua vida atual.`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle(`🏥 | HOSPITAL ${message.guild.name}`)
			.setDescription(`Você deu entrada no **Hospital ${message.guild.name}**, aguarde um médico para ser atendido.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		});

		return await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				hospital: {
					usuario: author.id,
					entrada: Date.now()
				}
			}
		});
	}

};
