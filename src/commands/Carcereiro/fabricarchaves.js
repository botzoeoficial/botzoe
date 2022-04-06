/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
require('moment-duration-format');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Fabricarchaves extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricarchave';
		this.category = 'Carcereiro';
		this.description = 'Fabrique chaves!';
		this.usage = 'fabricarchave';
		this.aliases = ['fabricar-chave', 'fabricarchaves'];

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
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.carcereiro.map(a => a.id).includes(author.id)) {
			return message.reply({
				content: 'Você precisa ser um **Carcereiro** da Cidade para fabricar uma chave!'
			});
		}

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

		if (userAuthor.fabricagem.fabricandoChaves) {
			return message.reply({
				content: `Você já está fabricando uma **chave**. Use o comando \`${prefix}fabricando\` para ver qual a **chave** que está sendo fabricada!`
			});
		}

		const chaves = require('../../json/chaves.json');

		const chavesArray = chaves.map((value, index) => ({
			img: value.img,
			chave: value.chave,
			aluminio: value.aluminio,
			borracha: value.borracha,
			prata: value.prata,
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
			.setTitle('🔑 | Fábrica de Chaves');

		chavesArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.img} - ${eu.chave} - Alumínio: \`${eu.aluminio}\` - Borracha: \`${eu.borracha}\` - Prata: \`${eu.prata}\`\n`);
		embed.setDescription(`Qual chave você deseja fabricar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			const filterSim = m => {
				return m.author.id === author.id && !isNaN(m.content);
			};

			const sim = msg.channel.createMessageCollector({
				filter: filterSim,
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

					return message.reply({
						content: 'Seleção cancelada com sucesso!'
					});
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = chavesArray.find((xis) => xis.position === selected);

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

						return message.reply({
							content: 'Número não encontrado. Por favor, envie o comando novamente!'
						});
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

						return message.reply({
							content: 'Você não possui **Alumínio** suficiente para fabricar essa chave. Por favor, escolha outra chave!'
						});
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

						return message.reply({
							content: 'Você não possui **Borracha** suficiente para fabricar essa chave. Por favor, escolha outra chave!'
						});
					} else if (!user2.inventory.find((a) => a.item === 'Prata') || user2.inventory.find((a) => a.item === 'Prata').quantia < findSelectedEvento.prata) {
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

						return message.reply({
							content: 'Você não possui **Prata** suficiente para fabricar essa chave. Por favor, escolha outra chave!'
						});
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`Qual a quantidade de chaves você deseja Fabricar?\n\nDigite \`0\` para sair.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						}).then(async (msg2) => {
							const filterSim2 = m => {
								return m.author.id === author.id && !isNaN(m.content);
							};

							const sim2 = msg2.channel.createMessageCollector({
								filter: filterSim2,
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

									return message.reply({
										content: 'Seleção cancelada com sucesso!'
									});
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

									return message.reply({
										content: 'Coloque uma quantia válida. Por favor, envie o comando novamente!'
									});
								} else {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user3.inventory.find((a) => a.item === 'Alumínio').quantia < findSelectedEvento.aluminio * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										ce2.delete();
										msg.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply({
											content: `Para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)`
										});
									} else if (user3.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										ce2.delete();
										msg.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply({
											content: `Para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`
										});
									} else if (user3.inventory.find((a) => a.item === 'Prata').quantia < findSelectedEvento.prata * Number(ce2.content)) {
										sim2.stop();
										sim.stop();
										ce2.delete();
										msg.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												fabricando: false
											}
										});

										return message.reply({
											content: `Para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`
										});
									} else {
										sim2.stop();
										sim.stop();
										ce2.delete();

										embed
											.setDescription(`Você tem certeza que quer fabricar \`x${ce2.content}\` de **${findSelectedEvento.chave}**?`);

										const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
										const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
										const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

										msg.edit({
											content: author.toString(),
											embeds: [embed],
											components: [botoes]
										}).then(async (msg3) => {
											const filter = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === author.id;

											const collectorBotoes = msg3.createMessageComponentCollector({
												filter
											});

											collectorBotoes.on('collect', async (b) => {
												switch (b.customId) {
													case 'aceitar':
														await b.deferUpdate();

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																fabricando: false
															}
														});

														let time = 0;

														if (findSelectedEvento.chave === 'Chave Micha') {
															collectorBotoes.stop();
															sim2.stop();
															sim.stop();

															if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
																time = 28800000 * Number(ce2.content);

																embed
																	.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.chave}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoChaves': true,
																		'fabricagem.chaves.tempo': Date.now(),
																		'fabricagem.chaves.quantia': Number(ce2.content),
																		'fabricagem.chaves.nome': findSelectedEvento.chave,
																		'fabricagem.chaves.emoji': findSelectedEvento.img
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

																if (user3.inventory.find((a) => a.item === 'Prata').quantia === findSelectedEvento.prata * Number(ce2.content)) {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$pull: {
																			inventory: {
																				item: 'Prata'
																			}
																		}
																	});
																} else {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id,
																		'inventory.item': 'Prata'
																	}, {
																		$set: {
																			'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - (findSelectedEvento.prata * Number(ce2.content))
																		}
																	});
																}

																setTimeout(async () => {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$set: {
																			'fabricagem.fabricandoChaves': false,
																			'fabricagem.chaves.tempo': 0,
																			'fabricagem.chaves.quantia': 0,
																			'fabricagem.chaves.nome': '',
																			'fabricagem.chaves.emoji': ''
																		}
																	});

																	const embedConfirm = new ClientEmbed(author)
																		.setTitle('Pegar Chave')
																		.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																	const buttonConfirmar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
																	const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																	message.reply({
																		content: author.toString(),
																		embeds: [embedConfirm],
																		components: [botoes2]
																	}).then(async (confirm) => {
																		const filter = (interaction) => interaction.isButton() && ['aceitar'].includes(interaction.customId) && interaction.user.id === author.id;

																		const collectorBotoes2 = confirm.createMessageComponentCollector({
																			filter
																		});

																		collectorBotoes2.on('collect', async (b) => {
																			switch (b.customId) {
																				case 'aceitar':
																					await b.deferUpdate();

																					const userMochila = await this.client.database.users.findOne({
																						userId: author.id,
																						guildId: message.guild.id
																					});

																					if (!userMochila.isMochila) {
																						message.reply({
																							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!'
																						});
																					} else if (user3.mochila.find((a) => a.item === findSelectedEvento.chave)) {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id,
																							'mochila.item': findSelectedEvento.chave
																						}, {
																							$set: {
																								'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.chave).quantia + Number(ce2.content)
																							}
																						});
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$push: {
																								mochila: {
																									item: findSelectedEvento.chave,
																									emoji: findSelectedEvento.img,
																									id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																									quantia: Number(ce2.content)
																								}
																							}
																						});
																					}

																					collectorBotoes2.stop();
																					confirm.delete();
																					return message.reply({
																						content: `Você conseguiu coletar **${findSelectedEvento.chave}** com sucesso!`
																					});
																			}
																		});
																	});
																}, time);
															} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
																time = 25200000 * Number(ce2.content);

																embed
																	.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.chave}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoChaves': true,
																		'fabricagem.chaves.tempo': Date.now(),
																		'fabricagem.chaves.quantia': Number(ce2.content),
																		'fabricagem.chaves.nome': findSelectedEvento.chave,
																		'fabricagem.chaves.emoji': findSelectedEvento.img
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

																if (user3.inventory.find((a) => a.item === 'Prata').quantia === findSelectedEvento.prata * Number(ce2.content)) {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$pull: {
																			inventory: {
																				item: 'Prata'
																			}
																		}
																	});
																} else {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id,
																		'inventory.item': 'Prata'
																	}, {
																		$set: {
																			'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - (findSelectedEvento.prata * Number(ce2.content))
																		}
																	});
																}

																setTimeout(async () => {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$set: {
																			'fabricagem.fabricandoChaves': false,
																			'fabricagem.chaves.tempo': 0,
																			'fabricagem.chaves.quantia': 0,
																			'fabricagem.chaves.nome': '',
																			'fabricagem.chaves.emoji': ''
																		}
																	});

																	const embedConfirm = new ClientEmbed(author)
																		.setTitle('Pegar Chave')
																		.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																	const buttonConfirmar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
																	const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																	message.reply({
																		content: author.toString(),
																		embeds: [embedConfirm],
																		components: [botoes2]
																	}).then(async (confirm) => {
																		const filter = (interaction) => interaction.isButton() && ['aceitar'].includes(interaction.customId) && interaction.user.id === author.id;

																		const collectorBotoes2 = confirm.createMessageComponentCollector({
																			filter
																		});

																		collectorBotoes2.on('collect', async (b) => {
																			switch (b.customId) {
																				case 'aceitar':
																					await b.deferUpdate();

																					const userMochila = await this.client.database.users.findOne({
																						userId: author.id,
																						guildId: message.guild.id
																					});

																					if (!userMochila.isMochila) {
																						message.reply({
																							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!'
																						});
																					} else if (user3.mochila.find((a) => a.item === findSelectedEvento.chave)) {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id,
																							'mochila.item': findSelectedEvento.chave
																						}, {
																							$set: {
																								'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.chave).quantia += Number(ce2.content)
																							}
																						});
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$push: {
																								mochila: {
																									item: findSelectedEvento.chave,
																									emoji: findSelectedEvento.img,
																									id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																									quantia: Number(ce2.content)
																								}
																							}
																						});
																					}

																					collectorBotoes2.stop();
																					confirm.delete();
																					return message.reply({
																						content: `Você conseguiu coletar **${findSelectedEvento.chave}** com sucesso!`
																					});
																			}
																		});
																	});
																}, time);
															} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
																time = 19080000 * Number(ce2.content);

																embed
																	.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.chave}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoChaves': true,
																		'fabricagem.chaves.tempo': Date.now(),
																		'fabricagem.chaves.quantia': Number(ce2.content),
																		'fabricagem.chaves.nome': findSelectedEvento.chave,
																		'fabricagem.chaves.emoji': findSelectedEvento.img
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

																if (user3.inventory.find((a) => a.item === 'Prata').quantia === findSelectedEvento.prata * Number(ce2.content)) {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$pull: {
																			inventory: {
																				item: 'Prata'
																			}
																		}
																	});
																} else {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id,
																		'inventory.item': 'Prata'
																	}, {
																		$set: {
																			'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - (findSelectedEvento.prata * Number(ce2.content))
																		}
																	});
																}

																setTimeout(async () => {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$set: {
																			'fabricagem.fabricandoChaves': false,
																			'fabricagem.chaves.tempo': 0,
																			'fabricagem.chaves.quantia': 0,
																			'fabricagem.chaves.nome': '',
																			'fabricagem.chaves.emoji': ''
																		}
																	});

																	const embedConfirm = new ClientEmbed(author)
																		.setTitle('Pegar Chave')
																		.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																	const buttonConfirmar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
																	const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																	message.reply({
																		content: author.toString(),
																		embeds: [embedConfirm],
																		components: [botoes2]
																	}).then(async (confirm) => {
																		const filter = (interaction) => interaction.isButton() && ['aceitar'].includes(interaction.customId) && interaction.user.id === author.id;

																		const collectorBotoes2 = confirm.createMessageComponentCollector({
																			filter
																		});

																		collectorBotoes2.on('collect', async (b) => {
																			switch (b.customId) {
																				case 'aceitar':
																					await b.deferUpdate();

																					const userMochila = await this.client.database.users.findOne({
																						userId: author.id,
																						guildId: message.guild.id
																					});

																					if (!userMochila.isMochila) {
																						message.reply({
																							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!'
																						});
																					} else if (user3.mochila.find((a) => a.item === findSelectedEvento.chave)) {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id,
																							'mochila.item': findSelectedEvento.chave
																						}, {
																							$set: {
																								'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.chave).quantia += Number(ce2.content)
																							}
																						});
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$push: {
																								mochila: {
																									item: findSelectedEvento.chave,
																									emoji: findSelectedEvento.img,
																									id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																									quantia: Number(ce2.content)
																								}
																							}
																						});
																					}

																					collectorBotoes2.stop();
																					confirm.delete();
																					return message.reply({
																						content: `Você conseguiu coletar **${findSelectedEvento.chave}** com sucesso!`
																					});
																			}
																		});
																	});
																}, time);
															} else if (Number(ce2.content) > 20) {
																time = 14400000 * Number(ce2.content);

																embed
																	.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.chave}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$set: {
																		'fabricagem.fabricandoChaves': true,
																		'fabricagem.chaves.tempo': Date.now(),
																		'fabricagem.chaves.quantia': Number(ce2.content),
																		'fabricagem.chaves.nome': findSelectedEvento.chave,
																		'fabricagem.chaves.emoji': findSelectedEvento.img
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

																if (user3.inventory.find((a) => a.item === 'Prata').quantia === findSelectedEvento.prata * Number(ce2.content)) {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$pull: {
																			inventory: {
																				item: 'Prata'
																			}
																		}
																	});
																} else {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id,
																		'inventory.item': 'Prata'
																	}, {
																		$set: {
																			'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - (findSelectedEvento.prata * Number(ce2.content))
																		}
																	});
																}

																setTimeout(async () => {
																	await this.client.database.users.findOneAndUpdate({
																		userId: author.id,
																		guildId: message.guild.id
																	}, {
																		$set: {
																			'fabricagem.fabricandoChaves': false,
																			'fabricagem.chaves.tempo': 0,
																			'fabricagem.chaves.quantia': 0,
																			'fabricagem.chaves.nome': '',
																			'fabricagem.chaves.emoji': ''
																		}
																	});

																	const embedConfirm = new ClientEmbed(author)
																		.setTitle('Pegar Chave')
																		.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

																	const buttonConfirmar = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
																	const botoes2 = new MessageActionRow().addComponents([buttonConfirmar]);

																	message.reply({
																		content: author.toString(),
																		embeds: [embedConfirm],
																		components: [botoes2]
																	}).then(async (confirm) => {
																		const filter = (interaction) => interaction.isButton() && ['aceitar'].includes(interaction.customId) && interaction.user.id === author.id;

																		const collectorBotoes2 = confirm.createMessageComponentCollector({
																			filter
																		});

																		collectorBotoes2.on('collect', async (b) => {
																			switch (b.customId) {
																				case 'aceitar':
																					await b.deferUpdate();

																					const userMochila = await this.client.database.users.findOne({
																						userId: author.id,
																						guildId: message.guild.id
																					});

																					if (!userMochila.isMochila) {
																						message.reply({
																							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!'
																						});
																					} else if (user3.mochila.find((a) => a.item === findSelectedEvento.chave)) {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id,
																							'mochila.item': findSelectedEvento.chave
																						}, {
																							$set: {
																								'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.chave).quantia += Number(ce2.content)
																							}
																						});
																					} else {
																						await this.client.database.users.findOneAndUpdate({
																							userId: author.id,
																							guildId: message.guild.id
																						}, {
																							$push: {
																								mochila: {
																									item: findSelectedEvento.chave,
																									emoji: findSelectedEvento.img,
																									id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																									quantia: Number(ce2.content)
																								}
																							}
																						});
																					}

																					collectorBotoes2.stop();
																					confirm.delete();
																					return message.reply({
																						content: `Você conseguiu coletar **${findSelectedEvento.chave}** com sucesso!`
																					});
																			}
																		});
																	});
																}, time);
															}
														}

														msg.edit({
															content: author.toString(),
															embeds: [embed],
															components: []
														});
														break;
													case 'negar':
														await b.deferUpdate();

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																fabricando: false
															}
														});

														return msg3.delete();
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

									return message.reply({
										content: 'Você demorou de mais para escolher a chave. Use o comando novamente!'
									});
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

					return message.reply({
						content: 'Você demorou demais para responder. Use o comando novamente!'
					});
				}
			});
		});
	}

};
