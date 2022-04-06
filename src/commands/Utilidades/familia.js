/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-operators */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Familia extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'familia';
		this.category = 'Utilidades';
		this.description = 'Veja sua família!';
		this.usage = 'familia';
		this.aliases = ['family'];

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

		if (!user.marry.has) {
			return message.reply({
				content: `Você não está casado! Use o comando \`${prefix}casar\`.`
			});
		}

		let pagina = 0;

		const embed = new ClientEmbed(author)
			.setTitle(`Família de: ${author.username} e ${await this.client.users.fetch(user.marry.user).then((x) => x.username)}`);

		if (user.familia.length <= 0) {
			embed.setDescription('Família sem filhos.');
			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			user.familia.slice(pagina * 12, pagina * 12 + 12).forEach((est) => {
				embed.addField(`Nome: ${est.nome}`, `Idade: ${est.idade}\nGênero: ${est.genero}`, true);
			});

			embed.setFooter({
				text: `Página: ${pagina}/${~~(user.familia.length / 12)}`,
				iconURL: author.displayAvatarURL({
					dynamic: true,
					format: 'png'
				})
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
						.setTitle(`Família de: ${author.username} e ${await this.client.users.fetch(user.marry.user).then((x) => x.username)}`);

					user.familia.slice(pagina * 12, pagina * 12 + 12).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Idade: ${est.idade}\nGênero: ${est.genero}`, true);
					});

					embed2.setFooter({
						text: `Página: ${pagina}/${~~(user.familia.length / 12)}`,
						iconURL: author.displayAvatarURL({
							dynamic: true,
							format: 'png'
						})
					});

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				} else if (b.customId === 'ir') {
					await b.deferUpdate();

					if (pagina !== ~~(user.familia.length / 12)) {
						pagina++;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`Família de: ${author.username} e ${await this.client.users.fetch(user.marry.user).then((x) => x.username)}`);

					user.familia.slice(pagina * 12, pagina * 12 + 12).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Idade: ${est.idade}\nGênero: ${est.genero}`, true);
					});

					embed2.setFooter({
						text: `Página: ${pagina}/${~~(user.familia.length / 12)}`,
						iconURL: author.displayAvatarURL({
							dynamic: true,
							format: 'png'
						})
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
