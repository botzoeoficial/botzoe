/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Retirarbau extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'retirarbau';
		this.category = 'Social';
		this.description = 'Retire um item do seu baú!';
		this.usage = 'retirarbau';
		this.aliases = ['retirar-bau'];

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

		if (user.fabricando) {
			return message.reply({
				content: 'Você está fabricando algo, por tanto, não é possível retirar algum item do baú!'
			});
		}

		if (user.casas.tipo === '') {
			return message.reply({
				content: `Você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('Retirar do Baú')
			.setDescription(`Você deseja retirar e adicionar o item aonde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			const filter = (m) => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 30000
			});

			collector.on('collect', async (ce) => {
				if (ce.content === '0') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Cancelado com sucesso.'
					});
				} else if (ce.content === '1') {
					ce.delete();
					collector.stop();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itensInvFilter = user2.casas.bau.filter((a) => ['Água', 'Suco', 'Refrigerante', 'Café', 'Energético', 'Cerveja', 'Sanduíche', 'Pizza', 'Batata Frita', 'Misto Quente', 'Carne', 'Tacos', 'Miojo', 'Rosquinha', 'Chocolate', 'Pipoca', 'Bolo', 'Cookie', 'Remédio', 'Vara de Pesca', 'Transferir', 'Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator', 'Agricultor', 'Alumínio', 'Borracha', 'Caulim', 'Cobre', 'Ferro', 'Plástico', 'Prata', 'Colete à Prova de Balas'].includes(a.item));

					const itensMap = itensInvFilter.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Inventário?\n\n${itensMap || '**Você não possui item de Inventário no baú.**'}`);

					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then(async (msg1) => {
						if (!itensMap) return;

						for (const emoji of itensInvFilter.map((es) => es.id)) await msg1.react(emoji);

						const filter = (reaction, user3) => {
							return itensInvFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;
						};

						const sim = msg1.createReactionCollector({
							filter,
							time: 60000,
							max: 1
						});

						const objeto = require('../../json/inventario.json');

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							const user4 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user4.inventory.length > 0) {
								if (user4.inventory.find((a) => a.item === 'Bolso')) {
									if (user4.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msg1.delete();

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user4.inventory.find((a) => a.item === 'Bolso')) {
									if (user4.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msg1.delete();

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para o Inventário?`);

							msg.edit({
								content: author.toString(),
								embeds: [embed]
							}).then(async (msg2) => {
								const filter2 = (m) => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const resposta = msg2.channel.createMessageCollector({
									filter: filter2,
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: 'Você precisa enviar uma quantia válida maior que **0**. Por favor, use o comando novamente!'
										});
									} else if (Number(ce2.content) > user4.casas.bau.find((a) => a.item === itemEmoji).quantia) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: `Você não possui tudo isso de \`${itemEmoji}\`. Por favor, use o comando novamente!`
										});
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply({
											content: `Você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para seu Inventário com sucesso!`
										});

										if (Number(ce2.content) === user4.casas.bau.find((a) => a.item === itemEmoji).quantia) {
											if (user4.inventory.find((a) => a.item === itemEmoji)) {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'inventory.item': itemEmoji
												}, {
													$set: {
														'inventory.$.quantia': user4.inventory.find((a) => a.item === itemEmoji).quantia += user4.casas.bau.find((a) => a.item === itemEmoji).quantia
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$push: {
														inventory: {
															item: itemEmoji,
															emoji: user4.casas.bau.find((a) => a.item === itemEmoji).emoji,
															id: user4.casas.bau.find((a) => a.item === itemEmoji).id,
															quantia: user4.casas.bau.find((a) => a.item === itemEmoji).quantia
														}
													}
												});
											}

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$pull: {
													'casas.bau': {
														item: itemEmoji
													}
												}
											});
										} else {
											if (user4.inventory.find((a) => a.item === itemEmoji)) {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'inventory.item': itemEmoji
												}, {
													$set: {
														'inventory.$.quantia': user4.inventory.find((a) => a.item === itemEmoji).quantia += Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$push: {
														inventory: {
															item: itemEmoji,
															emoji: user4.casas.bau.find((a) => a.item === itemEmoji).emoji,
															id: user4.casas.bau.find((a) => a.item === itemEmoji).id,
															quantia: Number(ce2.content)
														}
													}
												});
											}

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'casas.bau.item': itemEmoji
											}, {
												$set: {
													'casas.bau.$.quantia': user4.casas.bau.find((a) => a.item === itemEmoji).quantia -= Number(ce2.content)
												}
											});

											return;
										}
									}
								});

								resposta.on('end', async (collected, reason) => {
									if (reason === 'time') {
										msg.delete();
										return message.reply({
											content: 'Você demorou demais para responder. Use o comando novamente!'
										});
									}
								});
							});
						});

						sim.on('end', async (collected, reason) => {
							if (reason === 'time') {
								msg.delete();
								return message.reply({
									content: 'Você demorou demais para escolher. Use o comando novamente!'
								});
							}
						});
					});
				} else if (ce.content === '2') {
					ce.delete();
					collector.stop();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!user2.isMochila) {
						collector.stop();
						msg.delete();
						return message.reply({
							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e Compre uma!'
						});
					}

					const itensMochilaFilter = user2.casas.bau.filter((a) => ['Máscara', 'Porte de Armas', 'Algemas', 'MP5', 'G18', 'Munição Pistola', 'Munição Metralhadora', 'Ak-47', 'UMP', 'ACR', 'KNT-308', 'Desert Eagle', 'Revolver 38', 'Chave Micha', 'Maconha', 'Cocaína', 'LSD', 'Metanfetamina', 'Munição KNT'].includes(a.item));

					const itensMap = itensMochilaFilter.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar na Mochila?\n\n${itensMap || '**Você não possui item de Mochila no baú.**'}`);

					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then(async (msg1) => {
						if (!itensMap) return;

						for (const emoji of itensMochilaFilter.map((es) => es.id)) await msg1.react(emoji);

						const filter = (reaction, user3) => {
							return itensMochilaFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;
						};

						const sim = msg1.createReactionCollector({
							filter,
							time: 60000,
							max: 1
						});

						const objeto = require('../../json/mochila.json');

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji2 = objeto[collected.emoji.id];

							const user5 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user5.mochila.length > 0) {
								if (user5.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									msg1.delete();

									return message.reply({
										content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
									});
								}
							}

							embed.setDescription(`Qual a quantidade de **${itemEmoji2}** você deseja enviar para a Mochila?`);

							msg.edit({
								content: author.toString(),
								embeds: [embed]
							}).then(async (msg2) => {
								const filter3 = (m) => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const resposta = msg2.channel.createMessageCollector({
									filter: filter3,
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: 'Você precisa enviar uma quantia válida maior que **0**. Por favor, use o comando novamente!'
										});
									} else if (Number(ce2.content) > user5.casas.bau.find((a) => a.item === itemEmoji2).quantia) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: `Você não possui tudo isso de \`${itemEmoji2}\`. Por favor, use o comando novamente!`
										});
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply({
											content: `Você enviou **x${Number(ce2.content)}** \`${itemEmoji2}\` para sua Mochila com sucesso!`
										});

										if (Number(ce2.content) === user5.casas.bau.find((a) => a.item === itemEmoji2).quantia) {
											if (user5.mochila.find((a) => a.item === itemEmoji2)) {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'mochila.item': itemEmoji2
												}, {
													$set: {
														'mochila.$.quantia': user5.mochila.find((a) => a.item === itemEmoji2).quantia += user5.casas.bau.find((a) => a.item === itemEmoji2).quantia
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$push: {
														mochila: {
															item: itemEmoji2,
															emoji: user5.casas.bau.find((a) => a.item === itemEmoji2).emoji,
															id: user5.casas.bau.find((a) => a.item === itemEmoji2).id,
															quantia: user5.casas.bau.find((a) => a.item === itemEmoji2).quantia
														}
													}
												});
											}

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$pull: {
													'casas.bau': {
														item: itemEmoji2
													}
												}
											});
										} else {
											if (user5.mochila.find((a) => a.item === itemEmoji2)) {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'mochila.item': itemEmoji2
												}, {
													$set: {
														'mochila.$.quantia': user5.mochila.find((a) => a.item === itemEmoji2).quantia += Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$push: {
														mochila: {
															item: itemEmoji2,
															emoji: user5.casas.bau.find((a) => a.item === itemEmoji2).emoji,
															id: user5.casas.bau.find((a) => a.item === itemEmoji2).id,
															quantia: Number(ce2.content)
														}
													}
												});
											}

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'casas.bau.item': itemEmoji2
											}, {
												$set: {
													'casas.bau.$.quantia': user5.casas.bau.find((a) => a.item === itemEmoji2).quantia -= Number(ce2.content)
												}
											});

											return;
										}
									}
								});

								resposta.on('end', async (collected, reason) => {
									if (reason === 'time') {
										msg.delete();
										return message.reply({
											content: 'Você demorou demais para responder. Use o comando novamente!'
										});
									}
								});
							});
						});

						sim.on('end', async (collected, reason) => {
							if (reason === 'time') {
								msg.delete();
								return message.reply({
									content: 'Você demorou demais para escolher. Use o comando novamente!'
								});
							}
						});
					});
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					return message.reply({
						content: 'Você demorou demais para responder. Use o comando novamente!'
					});
				}
			});
		});
	}

};
