/* eslint-disable arrow-body-style */
/* eslint-disable no-inline-comments */
/* eslint-disable id-length */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-depth */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Cadastraritem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cadastraritem';
		this.category = 'Crime';
		this.description = 'Cadastre um item no Mercado Negro!';
		this.usage = 'cadastraritem';
		this.aliases = ['cadastrar-item', 'vender', 'venderitem'];

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
		const userVenda = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (userVenda.cadastrandoItem) {
			return message.reply({
				content: `Você usou o comando \`${prefix}vender\` ou \`${prefix}cadastraritem\` e deixou ele rodando. Digite \`0\` para cancelar ele e usar esse comando novamente!`
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				cadastrandoItem: true
			}
		});

		const arrayCategorias = [{
			categoria: 'Drogas'
		}, {
			categoria: 'Armas'
		}, {
			categoria: 'Munição'
		}, {
			categoria: 'Carros'
		}, {
			categoria: 'Chaves'
		}, {
			categoria: 'Minérios'
		}, {
			categoria: 'Disfarces'
		}, {
			categoria: 'Kit Tunagem'
		}];

		const mapCategorias = arrayCategorias.map((value, index) => ({
			categoria: value.categoria,
			position: index
		}));

		let embedMessage = '';

		const emojis = {
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '🔟',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣',
			21: '2️⃣1️⃣',
			22: '2️⃣2️⃣',
			23: '2️⃣3️⃣',
			24: '2️⃣4️⃣',
			25: '2️⃣5️⃣',
			26: '2️⃣6️⃣',
			27: '2️⃣7️⃣',
			28: '2️⃣8️⃣',
			29: '2️⃣9️⃣',
			30: '3️⃣0️⃣'
		};

		const embed = new ClientEmbed(author)
			.setTitle('🏴‍☠️ | Mercado Negro');

		mapCategorias.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **${eu.categoria}**\n`);
		embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			const filter2 = (m) => {
				return m.author.id === author.id && !isNaN(m.content);
			};

			const sim = msg.channel.createMessageCollector({
				filter: filter2,
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							cadastrandoItem: false
						}
					});

					return message.reply({
						content: 'Seleção cancelada com sucesso!'
					});
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = mapCategorias.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						sim.stop();
						msg.delete();
						ce.delete();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								cadastrandoItem: false
							}
						});

						return message.reply({
							content: 'Número não encontrado. Por favor, use o comando novamente!'
						});
					} else if (findSelectedEvento.position === 0) {
						ce.delete();
						sim.stop();

						const drogasArray = [{
							nome: 'Maconha',
							emoji: '<:maconha:898326104866177084>'
						}, {
							nome: 'Cocaína',
							emoji: '<:Cocaina:901118422774071326>'
						}, {
							nome: 'LSD',
							emoji: '<:Lsddroga:901118376951304262>'
						}, {
							nome: 'Metanfetamina',
							emoji: '<:Metanfetamina:901118279530217552>'
						}];

						const mapDrogas = drogasArray.map((value, index) => ({
							droga: value.nome,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapDrogas.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.droga}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									ce2.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapDrogas.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.droga)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.mochila.find((a) => a.item === findSelectedEvento2.droga)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.droga}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.mochila.find((a) => a.item === findSelectedEvento2.droga).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.droga}\` na sua **mochila**. Por favor, envie o comando novamente!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) <= 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});


																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			ce5.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.droga}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.mochila.find((x) => x.item === findSelectedEvento2.droga)) {
																					if (user3.mochila.find((x) => x.item === findSelectedEvento2.droga).quantia > 1) {
																						if (Number(ce3.content) === user3.mochila.find((x) => x.item === findSelectedEvento2.droga).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									mochila: {
																										item: findSelectedEvento2.droga
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'mochila.item': findSelectedEvento2.droga
																							}, {
																								$set: {
																									'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento2.droga).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								mochila: {
																									item: findSelectedEvento2.droga
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.droga,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.droga);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.mochila.find((x) => x.item === findSelectedEvento2.droga)) {
																							if (user5.mochila.find((x) => x.item === findSelectedEvento2.droga).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'mochila.item': findSelectedEvento2.droga
																								}, {
																									$set: {
																										'mochila.$.quantia': user5.mochila.find((a) => a.item === findSelectedEvento2.droga).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										mochila: {
																											item: findSelectedEvento2.droga,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									mochila: {
																										item: findSelectedEvento2.droga,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.droga
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			sim2.stop();
																			sim.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 1) {
						ce.delete();
						sim.stop();

						const armasArray = [{
							arma: 'Ak-47',
							emoji: '<:AK47:901118225520136243>'
						}, {
							arma: 'UMP',
							emoji: '<:UMP:901117871764144200>'
						}, {
							arma: 'MP5',
							emoji: '<:Mp5:901117948180168724>'
						}, {
							arma: 'ACR',
							emoji: '<:Acr:901118143735402536>'
						}, {
							arma: 'KNT-308',
							emoji: '<:KNT308:901118040245149736>'
						}, {
							arma: 'Desert Eagle',
							emoji: '<:deserteagle:901117192110739516>'
						}, {
							arma: 'Revolver 38',
							emoji: '<:Revolver38:901117447065702501>'
						}, {
							arma: 'G18',
							emoji: '<:G18:901117282003075072>'
						}];

						const mapArmas = armasArray.map((value, index) => ({
							arma: value.arma,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapArmas.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.arma}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapArmas.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.arma)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.mochila.find((a) => a.item === findSelectedEvento2.arma)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.arma}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.mochila.find((a) => a.item === findSelectedEvento2.arma).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.arma}\` na sua **mochila**. Por favor, envie o comando novamente!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) < 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});

																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.arma}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.mochila.find((x) => x.item === findSelectedEvento2.arma)) {
																					if (user3.mochila.find((x) => x.item === findSelectedEvento2.arma).quantia > 1) {
																						if (Number(ce3.content) === user3.mochila.find((x) => x.item === findSelectedEvento2.arma).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									mochila: {
																										item: findSelectedEvento2.arma
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'mochila.item': findSelectedEvento2.arma
																							}, {
																								$set: {
																									'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento2.arma).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								mochila: {
																									item: findSelectedEvento2.arma
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.arma,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.arma);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.mochila.find((x) => x.item === findSelectedEvento2.arma)) {
																							if (user5.mochila.find((x) => x.item === findSelectedEvento2.arma).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'mochila.item': findSelectedEvento2.arma
																								}, {
																									$set: {
																										'mochila.$.quantia': user5.mochila.find((a) => a.item === findSelectedEvento2.arma).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										mochila: {
																											item: findSelectedEvento2.arma,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									mochila: {
																										item: findSelectedEvento2.arma,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.arma
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 2) {
						ce.delete();
						sim.stop();

						const municaoArray = [{
							municao: 'Munição Metralhadora',
							emoji: '<:balaassalto:905653521846784080>'
						}, {
							municao: 'Munição Pistola',
							emoji: '<:bala:905653668643241985>'
						}, {
							municao: 'Munição KNT',
							emoji: '<:balasniper:905653583171706980>'
						}];

						const mapMunicao = municaoArray.map((value, index) => ({
							municao: value.municao,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapMunicao.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.municao}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapMunicao.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.municao)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.mochila.find((a) => a.item === findSelectedEvento2.municao)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.municao}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.mochila.find((a) => a.item === findSelectedEvento2.municao).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.municao}\` na sua **mochila**. Por favor, envie o comando novamente!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) < 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});

																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.municao}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.mochila.find((x) => x.item === findSelectedEvento2.municao)) {
																					if (user3.mochila.find((x) => x.item === findSelectedEvento2.municao).quantia > 1) {
																						if (Number(ce3.content) === user3.mochila.find((x) => x.item === findSelectedEvento2.municao).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									mochila: {
																										item: findSelectedEvento2.municao
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'mochila.item': findSelectedEvento2.municao
																							}, {
																								$set: {
																									'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento2.municao).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								mochila: {
																									item: findSelectedEvento2.municao
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.municao,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.municao);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.mochila.find((x) => x.item === findSelectedEvento2.municao)) {
																							if (user5.mochila.find((x) => x.item === findSelectedEvento2.municao).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'mochila.item': findSelectedEvento2.municao
																								}, {
																									$set: {
																										'mochila.$.quantia': user5.mochila.find((a) => a.item === findSelectedEvento2.municao).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										mochila: {
																											item: findSelectedEvento2.municao,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									mochila: {
																										item: findSelectedEvento2.municao,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.municao
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 4) {
						ce.delete();
						sim.stop();

						const chaveArray = [{
							chave: 'Chave Micha',
							emoji: '<:ChaveMicha:900544510365405214>'
						}];

						const mapChave = chaveArray.map((value, index) => ({
							chave: value.chave,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapChave.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.chave}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapChave.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.chave)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.mochila.find((a) => a.item === findSelectedEvento2.chave)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.chave}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.mochila.find((a) => a.item === findSelectedEvento2.chave).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.chave}\` na sua **mochila**. Por favor, envie o comando novamente!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) < 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});

																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.chave}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.mochila.find((x) => x.item === findSelectedEvento2.chave)) {
																					if (user3.mochila.find((x) => x.item === findSelectedEvento2.chave).quantia > 1) {
																						if (Number(ce3.content) === user3.mochila.find((x) => x.item === findSelectedEvento2.chave).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									mochila: {
																										item: findSelectedEvento2.chave
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'mochila.item': findSelectedEvento2.chave
																							}, {
																								$set: {
																									'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento2.chave).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								mochila: {
																									item: findSelectedEvento2.chave
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.chave,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.chave);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.mochila.find((x) => x.item === findSelectedEvento2.chave)) {
																							if (user5.mochila.find((x) => x.item === findSelectedEvento2.chave).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'mochila.item': findSelectedEvento2.chave
																								}, {
																									$set: {
																										'mochila.$.quantia': user5.mochila.find((a) => a.item === findSelectedEvento2.chave).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										mochila: {
																											item: findSelectedEvento2.chave,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									mochila: {
																										item: findSelectedEvento2.chave,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.chave
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 5) {
						ce.delete();
						sim.stop();

						const minerioArray = [{
							minerio: 'Alumínio',
							emoji: '<:aluminiumpaper:918835445780074507>'
						}, {
							minerio: 'Borracha',
							emoji: '<:eraser:918835444794400799>'
						}, {
							minerio: 'Caulim',
							emoji: '<:landslide:918835445700378684>'
						}, {
							minerio: 'Cobre',
							emoji: '<:copperwire:918835446040133652>'
						}, {
							minerio: 'Ferro',
							emoji: '<:beam:918835445746532412>'
						}, {
							minerio: 'Plástico',
							emoji: '<:plasticbag:918835445838774322>'
						}, {
							minerio: 'Prata',
							emoji: '<:silver:918835445939458088>'
						}];

						const mapMinerio = minerioArray.map((value, index) => ({
							minerio: value.minerio,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapMinerio.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.minerio}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									ce2.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapMinerio.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.minerio)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.inventory.find((a) => a.item === findSelectedEvento2.minerio)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.minerio}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.inventory.find((a) => a.item === findSelectedEvento2.minerio).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.minerio}\` no seu **inventário**!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) < 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});

																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			ce5.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.minerio}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.inventory.find((x) => x.item === findSelectedEvento2.minerio)) {
																					if (user3.inventory.find((x) => x.item === findSelectedEvento2.minerio).quantia > 1) {
																						if (Number(ce3.content) === user3.inventory.find((x) => x.item === findSelectedEvento2.minerio).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									inventory: {
																										item: findSelectedEvento2.minerio
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'inventory.item': findSelectedEvento2.minerio
																							}, {
																								$set: {
																									'inventory.$.quantia': user3.inventory.find((a) => a.item === findSelectedEvento2.minerio).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								inventory: {
																									item: findSelectedEvento2.minerio
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.minerio,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.minerio);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.inventory.find((x) => x.item === findSelectedEvento2.minerio)) {
																							if (user5.inventory.find((x) => x.item === findSelectedEvento2.minerio).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'inventory.item': findSelectedEvento2.minerio
																								}, {
																									$set: {
																										'inventory.$.quantia': user5.inventory.find((a) => a.item === findSelectedEvento2.minerio).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										inventory: {
																											item: findSelectedEvento2.minerio,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									inventory: {
																										item: findSelectedEvento2.minerio,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.minerio
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 6) {
						ce.delete();
						sim.stop();

						const disfarceArray = [{
							item: 'Máscara',
							emoji: '<:mascara:898324362279669851>'
						}];

						const mapDisfarce = disfarceArray.map((value, index) => ({
							item: value.item,
							emoji: value.emoji,
							position: index
						}));

						let embedMessage2 = '';

						mapDisfarce.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} - ${eu.emoji} - **${eu.item}**\n`);
						embed.setDescription(`Qual desses itens você deseja Cadastrar?\n\n${embedMessage2}\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg1) => {
							const filter3 = (m) => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg1.channel.createMessageCollector({
								filter: filter3,
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg.delete();
									ce2.delete();
									sim2.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
								} else {
									const selected2 = Number(ce2.content - 1);
									const findSelectedEvento2 = mapDisfarce.find((xis) => xis.position === selected2);

									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const server = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!findSelectedEvento2) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Número não encontrado. Por favor, use o comando novamente!'
										});
									} else if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === findSelectedEvento2.item)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: 'Você já possui esse produto no Mercado Negro. Por favor, use o comando novamente!'
										});
									} else if (!user2.mochila.find((a) => a.item === findSelectedEvento2.item)) {
										msg.delete();
										ce2.delete();
										sim2.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												cadastrandoItem: false
											}
										});

										return message.reply({
											content: ':x: | Você não possui este produto para vender.'
										});
									} else {
										ce2.delete();
										sim2.stop();
										msg.delete();

										embed.setDescription(`Qual a quantidade de **${findSelectedEvento2.item}** que você deseja vender?\n\nDigite \`0\` para sair.`);

										message.reply({
											content: author.toString(),
											embeds: [embed]
										}).then(async (msg2) => {
											const filter4 = (m) => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector = msg2.channel.createMessageCollector({
												filter: filter4,
												time: 60000
											});

											collector.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												}

												if (Number(ce3.content) < 0 || isNaN(ce3.content)) {
													collector.stop();
													ce3.delete();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Coloque uma quantia válida. Por favor, use o comando novamente!'
													});
												} else if (user2.mochila.find((a) => a.item === findSelectedEvento2.item).quantia < Number(ce3.content)) {
													collector.stop();
													msg2.delete();
													ce3.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: `:x: | Você não possui toda essa quantia de \`${findSelectedEvento2.item}\` na sua **mochila**. Por favor, envie o comando novamente!`
													});
												} else {
													ce3.delete();
													collector.stop();
													msg2.delete();

													embed.setDescription(`Qual o preço total que você deseja por no seu produto?\n\nDigite \`0\` para sair.`);

													message.reply({
														content: author.toString(),
														embeds: [embed]
													}).then(async (msg3) => {
														const filter5 = (m) => {
															return m.author.id === author.id && !isNaN(m.content);
														};

														const collector2 = msg3.channel.createMessageCollector({
															filter: filter5,
															time: 60000
														});

														collector2.on('collect', async (ce4) => {
															if (Number(ce4.content) === 0) {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Seleção cancelada com sucesso!'
																});
															}

															if (Number(ce4.content) < 0 || isNaN(ce4.content)) {
																collector.stop();
																ce4.delete();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Coloque um preço válido. Por favor, use o comando novamente!'
																});
															} else {
																collector2.stop();
																ce4.delete();
																msg3.delete();

																const tempoArray = [{
																	tempo: '5 minutos',
																	milisegundos: 300000
																}, {
																	tempo: '10 minutos',
																	milisegundos: 600000
																}, {
																	tempo: '20 minutos',
																	milisegundos: 1200000
																}, {
																	tempo: '30 minutos',
																	milisegundos: 1800000
																}, {
																	tempo: '45 minutos',
																	milisegundos: 2700000
																}, {
																	tempo: '1 hora',
																	milisegundos: 3600000
																}, {
																	tempo: '2 horas',
																	milisegundos: 7200000
																}, {
																	tempo: '5 horas',
																	milisegundos: 18000000
																}, {
																	tempo: '10 horas',
																	milisegundos: 36000000
																}];

																const mapTempo = tempoArray.map((value, index) => ({
																	tempo: value.tempo,
																	milisegundos: value.milisegundos,
																	position: index
																}));

																let embedMessage3 = '';

																mapTempo.forEach((eu) => embedMessage3 += `${emojis[eu.position + 1]} - ${eu.tempo}\n`);
																embed.setDescription(`Por quanto tempo você deseja adicionar seu produto?\n\n${embedMessage3}\nDigite \`0\` para sair.`);

																message.reply({
																	content: author.toString(),
																	embeds: [embed]
																}).then(async (msg4) => {
																	const filter6 = (m) => {
																		return m.author.id === author.id && !isNaN(m.content);
																	};

																	const sim3 = msg4.channel.createMessageCollector({
																		filter: filter6,
																		time: 300000
																	});

																	sim3.on('collect', async (ce5) => {
																		if (Number(ce5.content) === 0) {
																			msg4.delete();
																			sim3.stop();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Seleção cancelada com sucesso!'
																			});
																		} else {
																			const selected3 = Number(ce5.content - 1);
																			const findSelectedEvento3 = mapTempo.find((xis) => xis.position === selected3);

																			if (!findSelectedEvento3) {
																				msg4.delete();
																				ce5.delete();
																				sim3.stop();

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				return message.reply({
																					content: 'Número não encontrado. Por favor, use o comando novamente!'
																				});
																			} else {
																				msg4.delete();

																				embed.fields = [];

																				embed.setDescription(`✅ | Seu produto foi cadastrado com sucesso!\n\nDigite \`${prefix}mercadonegro\` para conferir seu produto.`);
																				embed.addField(`Produto:`, `**${findSelectedEvento2.item}**`, true);
																				embed.addField(`Quantia:`, `\`x${ce3.content}\``, true);
																				embed.addField(`Preço:`, `**R$${Utils.numberFormat(Number(ce4.content))},00**`, true);
																				embed.addField(`Tempo no Mercado:`, `**${findSelectedEvento3.tempo}**`);

																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$set: {
																						cadastrandoItem: false
																					}
																				});

																				message.reply({
																					content: author.toString(),
																					embeds: [embed]
																				});
																				sim3.stop();
																				ce5.delete();

																				const user3 = await this.client.database.users.findOne({
																					userId: author.id,
																					guildId: message.guild.id
																				});

																				if (user3.mochila.find((x) => x.item === findSelectedEvento2.item)) {
																					if (user3.mochila.find((x) => x.item === findSelectedEvento2.item).quantia > 1) {
																						if (Number(ce3.content) === user3.mochila.find((x) => x.item === findSelectedEvento2.item).quantia) {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$pull: {
																									mochila: {
																										item: findSelectedEvento2.item
																									}
																								}
																							});
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id,
																								'mochila.item': findSelectedEvento2.item
																							}, {
																								$set: {
																									'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento2.item).quantia -= Number(ce3.content)
																								}
																							});
																						}
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$pull: {
																								mochila: {
																									item: findSelectedEvento2.item
																								}
																							}
																						});
																					}
																				}

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						mercadoNegro: {
																							nome: findSelectedEvento2.item,
																							quantia: Number(ce3.content),
																							preco: Number(ce4.content),
																							dono: author.id,
																							tempo: findSelectedEvento3.milisegundos,
																							tempo2: Date.now(),
																							emoji: findSelectedEvento2.emoji,
																							id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							comprado: false
																						}
																					}
																				});

																				return setTimeout(async () => {
																					const produto = await this.client.database.guilds.findOne({
																						_id: message.guild.id
																					});

																					const findProduto = produto.mercadoNegro.find((a) => a.nome === findSelectedEvento2.item);

																					if (!findProduto) return;

																					if (!findProduto.comprado) {
																						const user5 = await this.client.database.users.findOne({
																							userId: author.id,
																							guildId: message.guild.id
																						});

																						if (user5.mochila.find((x) => x.item === findSelectedEvento2.item)) {
																							if (user5.mochila.find((x) => x.item === findSelectedEvento2.item).quantia > 1) {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id,
																									'mochila.item': findSelectedEvento2.item
																								}, {
																									$set: {
																										'mochila.$.quantia': user5.mochila.find((a) => a.item === findSelectedEvento2.item).quantia += Number(ce3.content)
																									}
																								});
																							} else {
																								await this.client.database.users.findOneAndUpdate({
																									userId: author.id,
																									guildId: message.guild.id
																								}, {
																									$push: {
																										mochila: {
																											item: findSelectedEvento2.item,
																											emoji: findSelectedEvento2.emoji,
																											id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																											quantia: Number(ce3.content)
																										}
																									}
																								});
																							}
																						} else {
																							await this.client.database.users.findOneAndUpdate({
																								userId: author.id,
																								guildId: message.guild.id
																							}, {
																								$push: {
																									mochila: {
																										item: findSelectedEvento2.item,
																										emoji: findSelectedEvento2.emoji,
																										id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																										quantia: Number(ce3.content)
																									}
																								}
																							});
																						}

																						await this.client.database.guilds.findOneAndUpdate({
																							_id: message.guild.id
																						}, {
																							$pull: {
																								mercadoNegro: {
																									nome: findSelectedEvento2.item
																								}
																							}
																						});
																					}
																				}, findSelectedEvento3.milisegundos);
																			}
																		}
																	});

																	sim3.on('end', async (collected, reason) => {
																		if (reason === 'time') {
																			sim3.stop();
																			msg4.delete();

																			await this.client.database.users.findOneAndUpdate({
																				userId: author.id,
																				guildId: message.guild.id
																			}, {
																				$set: {
																					cadastrandoItem: false
																				}
																			});

																			return message.reply({
																				content: 'Você demorou demais para escolher o tempo de duração do produto. Use o comando novamente!'
																			});
																		}
																	});
																});
															}
														});

														collector2.on('end', async (collected, reason) => {
															if (reason === 'time') {
																collector2.stop();
																msg3.delete();

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		cadastrandoItem: false
																	}
																});

																return message.reply({
																	content: 'Você demorou demais para mandar o preço do produto. Use o comando novamente!'
																});
															}
														});
													});
												}
											});

											collector.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													msg2.delete();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															cadastrandoItem: false
														}
													});

													return message.reply({
														content: 'Você demorou demais para mandar a quantia que deseja cadastrar. Use o comando novamente!'
													});
												}
											});
										});
									}
								}
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();
									msg.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											cadastrandoItem: false
										}
									});

									return message.reply({
										content: 'Você demorou demais para escolher o item que deseja cadastrar. Use o comando novamente!'
									});
								}
							});
						});
					} else if (findSelectedEvento.position === 7) { // em breve kit tunagem
						ce.delete();
						sim.stop();
						embed.setDescription(`**EM BREVE!**`);
						msg.edit({
							content: author.toString(),
							embeds: [embed]
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								cadastrandoItem: false
							}
						});

						return;
					} else if (findSelectedEvento.position === 3) { // em breve carros
						ce.delete();
						sim.stop();
						embed.setDescription(`**EM BREVE!**`);
						msg.edit({
							content: author.toString(),
							embeds: [embed]
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								cadastrandoItem: false
							}
						});

						return;
					}
				}
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							cadastrandoItem: false
						}
					});

					return message.reply({
						content: 'Você demorou demais para escolher a categoria. Use o comando novamente!'
					});
				}
			});
		});
	}

};
