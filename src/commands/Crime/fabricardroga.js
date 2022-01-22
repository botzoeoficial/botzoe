/* eslint-disable no-shadow */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
require('moment-duration-format');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Fabricardroga extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricardroga';
		this.category = 'Crime';
		this.description = 'Fabrique drogas!';
		this.usage = 'fabricardroga';
		this.aliases = ['fabricar-droga', 'fabricardrogas'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
		this.donoArmas = false;
		this.donoDrogas = true;
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
		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				fabricando: true
			}
		});

		if (userAuthor.fabricagem.fabricandoDroga) return message.reply(`você já está fabricando uma **droga**. Use o comando \`${prefix}fabricando\` para ver qual a **droga** que está sendo fabricada!`);

		const drogas = require('../../json/drogas.json');

		const drogasArray = drogas.map((value, index) => ({
			img: value.img,
			droga: value.droga,
			aluminio: value.aluminio,
			borracha: value.borracha,
			plastico: value.plastico,
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
			.setTitle('🌱 | Fábrica de Drogas');

		drogasArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.img} - ${eu.droga} - Alumínio: \`${eu.aluminio}\` - Borracha: \`${eu.borracha}\` - Plástico: \`${eu.plastico}\`\n`);
		embed.setDescription(`Qual droga você deseja fabricar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then(async (msg) => {
			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
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
							fabricando: false
						}
					});

					return message.reply(`seleção cancelada com sucesso!`);
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = drogasArray.find((xis) => xis.position === selected);

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!findSelectedEvento) {
						sim.stop();
						msg.delete();
						ce.delete();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								fabricando: false
							}
						});

						return message.reply('número não encontrado. Por favor, envie o comando novamente!').then(ba => ba.delete({
							timeout: 6000
						}));
					} else if (!user2.inventory.find((a) => a.item === 'Alumínio') || user2.inventory.find((a) => a.item === 'Alumínio').quantia < findSelectedEvento.aluminio) {
						sim.stop();
						msg.delete();
						ce.delete();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								fabricando: false
							}
						});

						return message.reply('você não possui **Alumínio** suficiente para fabricar essa droga!').then(ba => ba.delete({
							timeout: 6000
						}));
					} else if (!user2.inventory.find((a) => a.item === 'Borracha') || user2.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha) {
						sim.stop();
						msg.delete();
						ce.delete();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								fabricando: false
							}
						});

						return message.reply('você não possui **Borracha** suficiente para fabricar essa droga!').then(ba => ba.delete({
							timeout: 6000
						}));
					} else if (!user2.inventory.find((a) => a.item === 'Plástico') || user2.inventory.find((a) => a.item === 'Plástico').quantia < findSelectedEvento.plastico) {
						sim.stop();
						msg.delete();
						ce.delete();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								fabricando: false
							}
						});

						return message.reply('você não possui **Plástico** suficiente para fabricar essa droga!').then(ba => ba.delete({
							timeout: 6000
						}));
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`Qual a quantidade de drogas você deseja Fabricar?\n\nDigite \`0\` para sair.`);

						msg.edit(author, embed).then(async (msg2) => {
							const sim2 = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									sim2.stop();
									sim.stop();
									msg2.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											fabricando: false
										}
									});

									return message.reply(`seleção cancelada com sucesso!`);
								} else if (parseInt(ce2.content) && parseInt(ce2.content) < 0) {
									sim2.stop();
									sim.stop();
									msg2.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											fabricando: false
										}
									});

									return message.reply('coloque uma quantia válida. Por favor, envie o comando novamente!').then(ba => ba.delete({
										timeout: 6000
									}));
								} else {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user3.inventory.find((a) => a.item === 'Alumínio').quantia < findSelectedEvento.aluminio * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										msg.delete();
										ce2.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply(`para fabricar essa droga \`${ce2.content}\` vezes, você irá precisar de:\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPlástico: \`x${findSelectedEvento.plastico * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Plástico').quantia}\`||)`);
									} else if (user3.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										msg.delete();
										ce2.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply(`para fabricar essa droga \`${ce2.content}\` vezes, você irá precisar de:\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPlástico: \`x${findSelectedEvento.plastico * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Plástico').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`);
									} else if (user3.inventory.find((a) => a.item === 'Plástico').quantia < findSelectedEvento.plastico * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										msg.delete();
										ce2.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply(`para fabricar essa droga \`${ce2.content}\` vezes, você irá precisar de:\nPlástico: \`x${findSelectedEvento.plastico * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Plástico').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`);
									} else {
										sim.stop();
										sim2.stop();
										ce2.delete();

										embed
											.setDescription(`Você tem certeza que quer fabricar \`x${ce2.content} KG\` de **${findSelectedEvento.droga}**?`);

										const buttonSim = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
										const buttonNao = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
										const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

										msg.edit(author, {
											embed: embed,
											components: [botoes]
										}).then(async (msg3) => {
											const collectorBotoes = msg3.createButtonCollector((button) => button.clicker.user.id === author.id, {
												max: 1
											});

											collectorBotoes.on('collect', async (b) => {
												if (b.id === 'negar') {
													b.reply.defer();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															fabricando: false
														}
													});

													return msg3.delete();
												} else if (b.id === 'aceitar') {
													b.reply.defer();

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$set: {
															fabricando: false
														}
													});

													let time = 0;

													if (findSelectedEvento.droga === 'Maconha') {
														collectorBotoes.stop();
														sim2.stop();
														sim.stop();

														if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
															time = 43200000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
															time = 21600000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
															time = 16200000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 20) {
															time = 10800000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														}
													} else if (findSelectedEvento.droga === 'Cocaína') {
														collectorBotoes.stop();
														sim2.stop();
														sim.stop();

														if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
															time = 54000000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
															time = 30600000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
															time = 21600000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 20) {
															time = 16200000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														}
													} else if (findSelectedEvento.droga === 'LSD') {
														collectorBotoes.stop();
														sim2.stop();
														sim.stop();

														if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
															time = 1050000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
															time = 36000000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
															time = 30600000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 20) {
															time = 21600000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														}
													} else if (findSelectedEvento.droga === 'Metanfetamina') {
														collectorBotoes.stop();
														sim2.stop();
														sim.stop();

														if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
															time = 72000000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
															time = 43200000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
															time = 37800000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														} else if (Number(ce2.content) > 20) {
															time = 28800000 * Number(ce2.content);

															embed
																.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.droga}**\nQuantia: \`x${ce2.content} KG\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$set: {
																	'fabricagem.fabricandoDroga': true,
																	'fabricagem.drogas.tempo': Date.now(),
																	'fabricagem.drogas.quantia': Number(ce2.content),
																	'fabricagem.drogas.nome': findSelectedEvento.droga,
																	'fabricagem.drogas.emoji': findSelectedEvento.img
																}
															});

															if (user3.inventory.find((a) => a.item === 'Alumínio').quantia === findSelectedEvento.aluminio * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Alumínio'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Alumínio'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - (findSelectedEvento.aluminio * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Borracha').quantia === findSelectedEvento.borracha * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Borracha'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Borracha'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - (findSelectedEvento.borracha * Number(ce2.content))
																	}
																});
															}

															if (user3.inventory.find((a) => a.item === 'Plástico').quantia === findSelectedEvento.plastico * Number(ce2.content)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$pull: {
																		inventory: {
																			item: 'Plástico'
																		}
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'inventory.item': 'Plástico'
																}, {
																	$set: {
																		'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Plástico').quantia - (findSelectedEvento.plastico * Number(ce2.content))
																	}
																});
															}

															setTimeout(async () => {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoDroga': false,
																		'fabricagem.drogas.tempo': 0,
																		'fabricagem.drogas.quantia': 0,
																		'fabricagem.drogas.nome': '',
																		'fabricagem.drogas.emoji': ''
																	}
																});

																const embedConfirm = new ClientEmbed(author)
																	.setTitle('Pegar Droga')
																	.setDescription(`${author}, sua droga **${findSelectedEvento.droga}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																const buttonConfirmar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
																const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																message.channel.send(author, {
																	embed: embedConfirm,
																	components: [botoes2]
																}).then(async (confirm) => {
																	const collectorBotoes2 = confirm.createButtonCollector((button) => button.clicker.user.id === author.id);

																	collectorBotoes2.on('collect', async (b) => {
																		if (b.id === 'aceitar') {
																			b.reply.defer();

																			const userMochila = await this.client.database.users.findOne({
																				userId: author.id,
																				guildId: message.guild.id
																			});

																			if (!userMochila.isMochila) {
																				message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																			} else if (user3.mochila.find((a) => a.item === findSelectedEvento.droga)) {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id,
																					'mochila.item': findSelectedEvento.droga
																				}, {
																					$set: {
																						'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.droga).quantia += Number(ce2.content)
																					}
																				});
																			} else {
																				await this.client.database.users.findOneAndUpdate({
																					userId: author.id,
																					guildId: message.guild.id
																				}, {
																					$push: {
																						mochila: {
																							item: findSelectedEvento.droga,
																							emoji: findSelectedEvento.img,
																							id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																							quantia: Number(ce2.content)
																						}
																					}
																				});
																			}

																			collectorBotoes2.stop();
																			confirm.delete();
																			return message.reply(`você conseguiu coletar **${findSelectedEvento.droga}** com sucesso!`);
																		}
																	});
																});
															}, time);
														}
													}

													msg.edit(author, {
														embed: embed,
														components: []
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
									msg2.delete();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											fabricando: false
										}
									});

									return message.reply('você demorou de mais para escolher a droga. Use o comando novamente!');
								}
							});
						});
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
							fabricando: false
						}
					});

					return message.reply('você demorou demais para responder. Use o comando novamente!');
				}
			});
		});
	}

};
