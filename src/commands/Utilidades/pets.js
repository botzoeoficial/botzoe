/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Pets extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pets';
		this.category = 'Utilidades';
		this.description = 'Veja seus pets!';
		this.usage = 'pets';
		this.aliases = ['animais'];

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

		let pagina = 0;

		const embed = new ClientEmbed(author)
			.setTitle(`Pets de: ${author.username}`);

		if (user.pets.length <= 0) {
			embed.setDescription(`${author}, você não tem pets! Use o comando \`${prefix}adotar\`.`);
			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
				embed.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
			});

			const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
			const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonIr]);

			const escolha = await message.reply({
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
						.setTitle(`Pets de: ${author.username}`);

					user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
					});

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				} else if (b.customId === 'ir') {
					await b.deferUpdate();

					if (pagina !== ~~(user.pets.length / 6)) {
						pagina++;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`Pets de: ${author.username}`);

					user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
					});

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				}
			});
		}
	}

};
