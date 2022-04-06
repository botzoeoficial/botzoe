/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const fetch = require('node-fetch');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Dançar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'dançar';
		this.category = 'Social';
		this.description = 'Dance com alguém!';
		this.usage = 'dançar <usuário>';
		this.aliases = ['dancar'];

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
		args,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) {
			return message.reply({
				content: `Você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`
			});
		}

		const timeout = 180000;

		if (timeout - (Date.now() - user.cooldown.dancar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.dancar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) {
				return message.reply({
					content: 'Você precisa mencionar um usuário!'
				});
			}

			if (member.id === author.id) {
				return message.reply({
					content: 'Você não pode dançar com você mesmo!'
				});
			}

			if (member.user === member.user.bot) {
				return message.reply({
					content: 'Você não pode dançar com um bot!'
				});
			}

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2) {
				return message.reply({
					content: 'Não achei esse usuário no **banco de dados** desse servidor.'
				});
			}

			const embed = new ClientEmbed(author)
				.setTitle('👯 | PEDIDO DE DANÇA')
				.setThumbnail(author.displayAvatarURL({
					dynamic: true,
					format: 'png'
				}))
				.setDescription(`${member}, o(a) usuário(a) ${author} está te chamando para dançar!!\n\nVocê aceita?\n✅ - Sim\n❌ - Não`);

			const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
			const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

			message.reply({
				content: member.toString(),
				embeds: [embed],
				components: [botoes]
			}).then(async (confirm) => {
				const filterCollector = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === member.id;

				const collectorBotoes = confirm.createMessageComponentCollector({
					filter: filterCollector,
					time: 30000,
					max: 1
				});

				collectorBotoes.on('collect', async (b) => {
					if (b.customId === 'aceitar') {
						await b.deferUpdate();

						const body = await fetch('https://purrbot.site/api/img/sfw/dance/gif').then((res) => res.json());

						const embedSim = new ClientEmbed(author)
							.setDescription(`**${author} dançou com ${member}!**`)
							.setImage(body.link);

						message.reply({
							content: `${author.toString()} e ${member.toString()}`,
							embeds: [embedSim]
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.dancar': Date.now()
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'humores.estressado': user.humores.estressado + 30,
								'humores.bravo': user.humores.bravo + 30,
								'humores.fome': user.humores.fome - 40,
								'humores.sede': user.humores.sede - 20,
								'humores.desanimado': user.humores.desanimado + 20,
								'humores.cansado': user.humores.cansado - 40,
								'humores.solitario': user.humores.solitario + 50,
								'humores.triste': user.humores.triste + 40
							}
						});

						return confirm.delete();
					} else if (b.customId === 'negar') {
						await b.deferUpdate();

						message.reply({
							content: `O(a) usuário(a) ${member.toString()} recusou seu pedido de dança!`
						});

						return confirm.delete();
					}
				});

				collectorBotoes.on('end', async (collected, reason) => {
					if (reason === 'time') {
						message.reply({
							content: `O(a) usuário(a) ${member.toString()} demorou demais para responder seu pedido. Use o comando novamente!`
						});

						return confirm.delete();
					}
				});
			});
		}
	}

};
