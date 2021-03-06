/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	filledBar
} = require('string-progressbar');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Casa extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'casa';
		this.category = 'Social';
		this.description = 'Veja sua Casa!';
		this.usage = 'casa';
		this.aliases = ['casas'];

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

		if (user.casas.tipo === '') {
			return message.reply({
				content: `Você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle(user.casas.nome)
			.setImage(user.casas.gif)
			.setDescription(`Você acaba de entrar na(o) sua(seu) **${user.casas.tipo}**.\n\nDeseja verificar seu baú?`);

		const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
		const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
		const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

		message.reply({
			content: author.toString(),
			embeds: [embed],
			components: [botoes]
		}).then(async (msg) => {
			const filter = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorBotoes = msg.createMessageComponentCollector({
				filter,
				time: 60000,
				max: 1
			});

			collectorBotoes.on('collect', async (b) => {
				if (b.customId === 'negar') {
					await b.deferUpdate();

					msg.delete();
					return message.reply({
						content: 'Você não quis olhar o baú da sua **casa** com sucesso!'
					});
				} else if (b.customId === 'aceitar') {
					await b.deferUpdate();

					const itens = user.casas.bau.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					const total = !user.casas.bau.length ? 0 : user.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b);

					embed.image = '';

					embed
						.setTitle('<:bau:915734866241404969> | Baú')
						.setDescription(`Estes são os itens do seu Baú.\nTotal de Itens: \`${total}\` **${filledBar(user.casas.quantiaItens, total || 0, 10)[0]}** (${Math.round(total / user.casas.quantiaItens * 100)}%)\n\n${itens || '**Sem Itens no Baú.**'}`);

					return msg.edit({
						content: author.toString(),
						embeds: [embed],
						components: []
					});
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return msg.delete();
				}
			});
		});
	}

};
