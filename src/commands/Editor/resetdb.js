/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Resetdb extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'resetdb';
		this.category = 'Editor';
		this.description = 'Resete os dados de todos os usuários do servidor atual!';
		this.usage = 'resetdb';
		this.aliases = ['resetar-db'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = true;

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
		if (!message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		const membersServer = await this.client.database.users.find({
			guildId: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle(`Resetar ${this.client.user.username} no Servidor.`)
			.setDescription(`Este Comando irá resetar os dados de **todos os usários neste servidor**, fazendo com que tudo comece do Zero.\n\nVocê tem certeza que deseja resetar?`);

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
				if (b.customId === 'aceitar') {
					await b.deferUpdate();
					msg.delete();

					message.reply({
						content: `Você deletou os dados de todos os usuários do servidor **${message.guild.name}** com sucesso!`
					});

					await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id
					}, {
						$set: {
							'cidade.impeachment.existe': false,
							'cidade.impeachment.cooldown': 0,
							'cidade.impeachment.message': '',
							'cidade.impeachment.emoji': '',
							'cidade.impeachment.channel': '',
							'cidade.impeachment.quantia': 0,
							'cidade.eleicao.existe': false,
							'cidade.eleicao.cooldown': 0,
							'cidade.eleicao.message': '',
							'cidade.eleicao.channel': '',
							'cidade.golpeEstado.existe': false,
							'cidade.golpeEstado.cooldown': 0,
							'cidade.golpeEstado.message': '',
							'cidade.golpeEstado.channel': '',
							'cidade.golpeEstado.caos': false,
							'cidade.governador': '',
							'cidade.delegado': '',
							'cidade.policiais': [],
							'cidade.carcereiro': [],
							'cidade.diretorHP': '',
							'cidade.medicos': '',
							'cidade.alterarBolsa': 0,
							'cidade.setDelegado': 0,
							'cidade.folgaPolicia': 0,
							'cidade.folgaPoliciaRemove': 0,
							'cidade.donoFavela': '',
							'cidade.donoFabricadeArmas': [],
							'cidade.donoFabricadeDrogas': [],
							'cidade.donoDesmanche': '',
							'cidade.donoLavagem': '',
							'cidade.ajudanteDesmanche': [],
							'cidade.ajudanteLavagem': [],
							'cidade.mecanico': [],
							'cidade.tempoGovernador': 0,
						}
					});

					for (var i = 0; i < membersServer.length; i++) {
						return await this.client.database.users.findOneAndDelete({
							userId: membersServer[i].userId,
							guildId: message.guild.id
						});
					}
				} else if (b.customId === 'negar') {
					await b.deferUpdate();

					return msg.delete();
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply({
						content: 'Você demorou demais para escolher. Use o comando novamente!'
					});
				}
			});
		});
	}

};
