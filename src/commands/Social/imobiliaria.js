/* eslint-disable arrow-body-style */
/* eslint-disable no-self-assign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Imobiliaria extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'imobiliaria';
		this.category = 'Social';
		this.description = 'Veja as Casas/Fazendas da Imobiliária iCasaZoe!';
		this.usage = 'imobiliaria';
		this.aliases = ['imobiliária'];

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
		const embed = new ClientEmbed(author)
			.setTitle('Bem vindo a Imobiliária iCasaZoe')
			.setDescription(`O que você deseja comprar?\n\n1️⃣ - Casas\n2️⃣ - Fazendas\n\nDigite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			const filter = (m) => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content === '0') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Imobiliária fechada com sucesso!'
					});
				} else if (ce.content === '1') {
					collector.stop();
					msg.delete();
					ce.delete();

					const casas = require('../../json/casas.json');

					let pg = 0;

					const embedCasas = new ClientEmbed(author)
						.setTitle('Imobiliária iCasaZoe')
						.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
						.setImage(casas[pg].gif);

					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
					const buttonAceitar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
					const buttonNegar = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
					const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonAceitar, buttonNegar, buttonIr]);

					message.reply({
						content: author.toString(),
						embeds: [embedCasas],
						components: [botoes]
					}).then(async (msg1) => {
						const filter2 = (interaction) => interaction.isButton() && ['aceitar', 'negar', 'ir', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

						const collectorBotoes = msg1.createMessageComponentCollector({
							filter: filter2,
							time: 60000
						});

						collectorBotoes.on('collect', async (b) => {
							if (b.customId === 'voltar') {
								await b.deferUpdate();

								if (!casas[pg - 1]) {
									pg = 0;
								} else {
									pg -= 1;
								}

								embedCasas
									.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
									.setImage(casas[pg].gif);

								msg1.edit({
									content: author.toString(),
									embeds: [embedCasas]
								});
							} else if (b.customId === 'ir') {
								await b.deferUpdate();

								if (!casas[pg + 1]) {
									pg = pg;
								} else {
									pg += 1;
								}

								embedCasas
									.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
									.setImage(casas[pg].gif);

								msg1.edit({
									content: author.toString(),
									embeds: [embedCasas]
								});
							} else if (b.customId === 'negar') {
								await b.deferUpdate();

								msg1.delete();
								return message.reply({
									content: 'Tentativa de compra de **Casa** cancelada com sucesso!'
								});
							} else if (b.customId === 'aceitar') {
								await b.deferUpdate();

								const user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								if (user.casas.tipo === casas[pg].nome) {
									msg1.delete();
									return message.reply({
										content: `Você já possui essa **Casa**! Use o comando \`${prefix}casa\`.`
									});
								}

								if (user.banco < casas[pg].valor) {
									msg1.delete();

									const embedPobre = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`Você não tem saldo suficiente para comprar essa **Casa**.\nVocê precisa de mais \`R$${Utils.numberFormat(casas[pg].valor - user.banco)},00\` no **banco** para comprar essa Casa!\n\n||Então vá trabalhar VAGABUNDO!!||`);

									return message.reply({
										content: author.toString(),
										embeds: [embedPobre]
									});
								} else {
									collector.stop();
									msg1.delete();

									const embedComprada = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`**${casas[pg].nome}** Comprada com sucesso! 🎉\n\nQual nome você deseja dar para sua **${casas[pg].nome}**?`);

									message.reply({
										content: author.toString(),
										embeds: [embedComprada]
									}).then(async (msg2) => {
										const filter3 = (m) => {
											return m.author.id === author.id;
										};

										const collector3 = msg2.channel.createMessageCollector({
											filter: filter3,
											max: 1
										});

										collector3.on('collect', async (ce1) => {
											collector3.stop();
											msg2.delete();

											message.reply({
												content: `**${casas[pg].nome}** nomeada com sucesso para \`${ce1.content}\`! Use o comando \`${prefix}casa\` para vê-la.`
											});

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													banco: user.banco -= casas[pg].valor,
													'casas.tipo': casas[pg].nome,
													'casas.nome': String(ce1.content),
													'casas.valor': casas[pg].valor,
													'casas.gif': casas[pg].gif,
													'casas.quantiaItens': Number(casas[pg].bau)
												}
											});

											return;
										});
									});
								}
							}
						});

						collectorBotoes.on('end', async (collected, reason) => {
							if (reason === 'time') {
								return msg1.delete();
							}
						});
					});
				} else if (ce.content === '2') {
					collector.stop();
					msg.delete();
					ce.delete();

					const fazendas = require('../../json/fazendas.json');

					let pg = 0;

					const embedFazendas = new ClientEmbed(author)
						.setTitle('Imobiliária iCasaZoe')
						.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
						.setImage(fazendas[pg].gif);

					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
					const buttonAceitar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
					const buttonNegar = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
					const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonAceitar, buttonNegar, buttonIr]);

					message.reply({
						content: author.toString(),
						embeds: [embedFazendas],
						components: [botoes]
					}).then(async (msg1) => {
						const filter4 = (interaction) => interaction.isButton() && ['aceitar', 'negar', 'ir', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

						const collectorBotoes = msg1.createMessageComponentCollector({
							filter: filter4,
							time: 60000
						});

						collectorBotoes.on('collect', async (b) => {
							if (b.customId === 'voltar') {
								await b.deferUpdate();

								if (!fazendas[pg - 1]) {
									pg = 0;
								} else {
									pg -= 1;
								}

								embedFazendas
									.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
									.setImage(fazendas[pg].gif);

								msg1.edit({
									content: author.toString(),
									embeds: [embedFazendas]
								});
							} else if (b.customId === 'ir') {
								await b.deferUpdate();

								if (!fazendas[pg + 1]) {
									pg = pg;
								} else {
									pg += 1;
								}

								embedFazendas
									.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
									.setImage(fazendas[pg].gif);

								msg1.edit({
									content: author.toString(),
									embeds: [embedFazendas]
								});
							} else if (b.customId === 'negar') {
								await b.deferUpdate();

								msg1.delete();
								return message.reply({
									content: 'Tentativa de compra cancelada com sucesso!'
								});
							} else if (b.customId === 'aceitar') {
								await b.deferUpdate();

								const user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								if (user.fazendas.map((a) => a.nome).includes(fazendas[pg].nome)) {
									msg1.delete();

									return message.reply({
										content: 'Você já possui essa **Fazenda** comprada. Use o comando novamente para comprar outra!'
									});
								}

								if (user.banco < fazendas[pg].valor) {
									msg1.delete();

									const embedPobre = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`Você não tem saldo suficiente para comprar essa **Fazenda**.\nVocê precisa de mais \`R$${Utils.numberFormat(fazendas[pg].valor - user.banco)},00\` no **banco** para comprar essa Fazenda!\n\n||Então vá trabalhar VAGABUNDO!!||`);

									return message.reply({
										content: author.toString(),
										embeds: [embedPobre]
									});
								} else {
									collector.stop();
									msg1.delete();

									const embedComprada = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`**${fazendas[pg].nome}** Comprada com sucesso! 🎉\n\nDigite \`${prefix}fazenda\` para vê-la.`);

									message.reply({
										content: author.toString(),
										embeds: [embedComprada]
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$push: {
											fazendas: {
												nome: fazendas[pg].nome,
												lote1: {
													bloqueado: false,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote2: {
													bloqueado: false,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote3: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote4: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote5: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												}
											}
										},
										$set: {
											banco: user.banco -= fazendas[pg].valor
										}
									});

									return;
								}
							}
						});

						collectorBotoes.on('end', async (collected, reason) => {
							if (reason === 'time') {
								return msg1.delete();
							}
						});
					});
				} else {
					collector.stop();
					msg.delete();
					ce.delete();
					return message.reply({
						content: 'Número não encontrado. Por favor, use o comando novamente!'
					});
				}
			});
		});
	}

};
