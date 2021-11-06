/* eslint-disable complexity */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Fabricarmunicao extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricarmunicao';
		this.category = 'Crime';
		this.description = 'Fabrique munições!';
		this.usage = 'fabricarmunicao';
		this.aliases = ['fabricar-municao', 'fabricarmunição'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = true;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = true;
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

		if (userAuthor.fabricagem.fabricandoMunicao) return message.reply(`você já está fabricando algumas **munições**. Use o comando \`${prefix}fabricando\` para ver qual a **munição** que está sendo fabricada!`);

		const municoes = require('../../json/municoes.json');

		const municoesArray = municoes.map((value, index) => ({
			img: value.img,
			municao: value.municao,
			aluminio: value.aluminio,
			borracha: value.borracha,
			cobre: value.cobre,
			position: index
		}));

		const emojis = {
			0: '0️⃣',
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '1️⃣0️⃣',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🔫 | Fábrica de Munições');

		municoesArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.img} - ${eu.municao} - Alumínio: \`${eu.aluminio}\` - Borracha: \`${eu.borracha}\` - Cobre: \`${eu.cobre}\`\n`);
		embed.setDescription(`Qual munição você deseja fabricar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then(async (msg) => {
			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();
					return message.channel.send(`${author}, seleção cancelada com sucesso!`);
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = municoesArray.find((xis) => xis.position === selected);

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!findSelectedEvento) {
						message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Alumínio') || user2.inventory.find((a) => a.item === 'Alumínio').quantia < findSelectedEvento.aluminio) {
						message.reply('você não possui **Alumínio** suficiente para fabricar essa munição. Por favor, escolha outra munição!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Borracha') || user2.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha) {
						message.reply('você não possui **Borracha** suficiente para fabricar essa munição. Por favor, escolha outra munição!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Cobre') || user2.inventory.find((a) => a.item === 'Cobre').quantia < findSelectedEvento.cobre) {
						message.reply('você não possui **Cobre** suficiente para fabricar essa munição. Por favor, escolha outra munição!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`Qual a quantidade de munições você deseja Fabricar?\n**OBS: Cada Fabricação vem 5 Projéteis.**\n\nDigite \`0\` para sair.`);

						msg.edit(author, embed).then(async (msg2) => {
							const sim2 = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
								time: 300000
							});

							sim2.on('collect', async (ce2) => {
								if (Number(ce2.content) === 0) {
									msg2.delete();
									sim2.stop();
									return message.channel.send(`${author}, seleção cancelada com sucesso!`);
								} else if (parseInt(ce2.content) && parseInt(ce2.content) < 0) {
									message.reply('coloque uma quantia válida. Por favor, envie o número novamente!').then(ba => ba.delete({
										timeout: 6000
									}));
									ce2.delete();
								} else {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user3.inventory.find((a) => a.item === 'Alumínio').quantia < findSelectedEvento.aluminio * Number(ce2.content)) {
										message.reply(`para fabricar essa munição \`${ce2.content}\` vezes, você irá precisar de:\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nCobre: \`x${findSelectedEvento.cobre * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Cobre').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha * Number(ce2.content)) {
										message.reply(`para fabricar essa munição \`${ce2.content}\` vezes, você irá precisar de:\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nCobre: \`x${findSelectedEvento.cobre * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Cobre').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alúminio').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Cobre').quantia < findSelectedEvento.cobre * Number(ce2.content)) {
										message.reply(`para fabricar essa munição \`${ce2.content}\` vezes, você irá precisar de:\nCobre: \`x${findSelectedEvento.cobre * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Cobre').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`);
										ce2.delete();
									} else {
										sim2.stop();
										ce2.delete();

										embed
											.setDescription(`Você tem certeza que quer fabricar \`x${ce2.content}\` de **${findSelectedEvento.municao}**?`);

										msg.edit(author, embed).then(async (msg3) => {
											await msg3.react('✅');
											await msg3.react('❌');

											const sim3 = msg3.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
												time: 60000,
												max: 1
											});

											const não3 = msg3.createReactionCollector((r, u) => r.emoji.name === '❌' && u.id === author.id, {
												time: 60000,
												max: 1
											});

											sim3.on('collect', async () => {
												sim3.stop();
												não3.stop();
												msg3.reactions.removeAll();

												let time = 0;

												if (findSelectedEvento.municao === 'Munição Metralhadora') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 28800000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
														time = 25200000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
														time = 19800000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 14400000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.municao === 'Munição Pistola') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 18000000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
														time = 14400000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
														time = 12600000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 7200000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.municao === 'Munição KNT') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 36000000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 9) {
														time = 28800000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 9 && Number(ce2.content) <= 20) {
														time = 18000000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 14400000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.municoes}**\nQuantia: \`x${ce2.content}\` (**${Number(ce2.content * 5)} Projéteis**)\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoMunicao': true,
																'fabricagem.municoes.tempo': Date.now(),
																'fabricagem.municoes.quantia': Number(ce2.content),
																'fabricagem.municoes.nome': findSelectedEvento.municao,
																'fabricagem.municoes.emoji': findSelectedEvento.img
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Alumínio'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Alumínio').quantia - findSelectedEvento.aluminio
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Borracha'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Borracha').quantia - findSelectedEvento.borracha
															}
														});

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Cobre'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Cobre').quantia - findSelectedEvento.cobre
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Munição')
																.setDescription(`${author}, sua **${findSelectedEvento.municao}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.municao)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.municao
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.municao).quantia + Number(ce2.content * 5)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.municao,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content * 5)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoMunicao': false,
																				'fabricagem.municoes.tempo': 0,
																				'fabricagem.municoes.quantia': 0,
																				'fabricagem.municoes.nome': '',
																				'fabricagem.municoes.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												}

												msg.edit(author, embed);
											});

											não3.on('collect', async () => {
												msg.delete();
											});

											sim3.on('end', async (collected, reason) => {
												if (reason === 'time') {
													msg.delete();
												}
											});

											não3.on('end', async (collected, reason) => {
												if (reason === 'time') {
													msg.delete();
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
									return message.reply('você demorou de mais para escolher a arma. Use o comando novamente!');
								}
							});
						});
					}
				}
			});
		});
	}

};
