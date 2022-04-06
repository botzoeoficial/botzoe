/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
moment.locale('pt-br');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Hospital extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'hospital';
		this.category = 'Hospital';
		this.description = 'Veja como está o Hospital do servidor!';
		this.usage = 'hospital';
		this.aliases = [];

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		let pagina = 0;

		const embed = new ClientEmbed(author)
			.setTitle(`🏥 | HOSPITAL ${message.guild.name}`)
			.setDescription(`Esta é a lista de espera dos pacientes para atendimento.`);

		if (server.hospital.length <= 0) {
			embed.setDescription('**SEM PACIENTES NO HOSPITAL!**');

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			embed.addFields(
				await Promise.all(server.hospital.slice(pagina * 5, pagina * 5 + 5).map(async est => ({
					name: `${(await this.client.users.fetch(est.usuario)).username} - *Entrada no Hospital:*`,
					value: `\`\`\`\n${moment(est.entrada).format('L LTS')} (${moment(est.entrada).fromNow()})\`\`\``
				})))
			);

			const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
			const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonIr]);

			const escolha = await message.reply({
				content: author.toString(),
				embeds: [embed],
				components: [botoes]
			});

			const filter = (interaction) => interaction.isButton() && ['ir', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorEscolhas = escolha.createMessageComponentCollector({
				filter,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				if (b.customId === 'voltar') {
					await b.deferUpdate();

					if (pagina <= 0) {
						pagina = 0;
					} else {
						pagina--;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`🏥 | HOSPITAL ${message.guild.name}`)
						.setDescription(`Esta é a lista de espera dos pacientes para atendimento.`);

					embed2.addFields(
						await Promise.all(server.hospital.slice(pagina * 5, pagina * 5 + 5).map(async est => ({
							name: `${(await this.client.users.fetch(est.usuario)).username} - *Entrada no Hospital:*`,
							value: `\`\`\`\n${moment(est.entrada).format('L LTS')} (${moment(est.entrada).fromNow()})\`\`\``
						})))
					);

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				} else if (b.customId === 'ir') {
					await b.deferUpdate();

					if (pagina !== ~~(server.hospital.length / 5)) {
						pagina++;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`🏥 | HOSPITAL ${message.guild.name}`)
						.setDescription(`Esta é a lista de espera dos pacientes para atendimento.`);

					embed2.addFields(
						await Promise.all(server.hospital.slice(pagina * 5, pagina * 5 + 5).map(async est => ({
							name: `${(await this.client.users.fetch(est.usuario)).username} - *Entrada no Hospital:*`,
							value: `\`\`\`\n${moment(est.entrada).format('L LTS')} (${moment(est.entrada).fromNow()})\`\`\``
						})))
					);

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				}
			});
		}
	}

};
