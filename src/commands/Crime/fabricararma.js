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

module.exports = class Fabricararma extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricararma';
		this.category = 'Crime';
		this.description = 'Fabrique armas!';
		this.usage = 'fabricararma';
		this.aliases = ['fabricar-arma', 'fabricararmas'];

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
		this.donoArmas = true;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteArma = true;
		this.ajudanteDroga = false;
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

		if (userAuthor.fabricagem.fabricandoArma) return message.reply(`você já está fabricando uma **arma**. Use o comando \`${prefix}fabricando\` para ver qual a **arma** que está sendo fabricada!`);

		const armas = require('../../json/armas.json');

		const armasArray = armas.map((value, index) => ({
			img: value.img,
			arma: value.arma,
			aluminio: value.aluminio,
			borracha: value.borracha,
			ferro: value.ferro,
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
			.setTitle('🔫 | Fábrica de Armas');

		armasArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.img} - ${eu.arma} - Alumínio: \`${eu.aluminio}\` - Borracha: \`${eu.borracha}\` - Ferro: \`${eu.ferro}\`\n`);
		embed.setDescription(`Qual arma você deseja fabricar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

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
					const findSelectedEvento = armasArray.find((xis) => xis.position === selected);

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
						message.reply('você não possui **Alumínio** suficiente para fabricar essa arma. Por favor, escolha outra arma!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Borracha') || user2.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha) {
						message.reply('você não possui **Borracha** suficiente para fabricar essa arma. Por favor, escolha outra arma!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Ferro') || user2.inventory.find((a) => a.item === 'Ferro').quantia < findSelectedEvento.ferro) {
						message.reply('você não possui **Ferro** suficiente para fabricar essa arma. Por favor, escolha outra arma!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`Qual a quantidade de armas você deseja Fabricar?\n\nDigite \`0\` para sair.`);

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
										message.reply(`para fabricar essa arma \`${ce2.content}\` vezes, você irá precisar de:\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nFerro: \`x${findSelectedEvento.ferro * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Ferro').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha * Number(ce2.content)) {
										message.reply(`para fabricar essa arma \`${ce2.content}\` vezes, você irá precisar de:\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nFerro: \`x${findSelectedEvento.ferro * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Ferro').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alúminio').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Ferro').quantia < findSelectedEvento.ferro * Number(ce2.content)) {
										message.reply(`para fabricar essa arma \`${ce2.content}\` vezes, você irá precisar de:\nFerro: \`x${findSelectedEvento.ferro * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Ferro').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`);
										ce2.delete();
									} else {
										sim2.stop();
										ce2.delete();

										embed
											.setDescription(`Você tem certeza que quer fabricar \`x${ce2.content}\` da arma **${findSelectedEvento.arma}**?`);

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

												if (findSelectedEvento.arma === 'Ak-47') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 10800000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 7200000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 5400000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 3600000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'UMP') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 50000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'MP5') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 150000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'ACR') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 180000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'KNT-308') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 240000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 180000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'Desert Eagle') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 45000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'Revolver 38') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 180000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 120000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													}
												} else if (findSelectedEvento.arma === 'G18') {
													if (Number(ce2.content) >= 1 && Number(ce2.content) <= 5) {
														time = 90000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 5 && Number(ce2.content) <= 10) {
														time = 60000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 10 && Number(ce2.content) <= 20) {
														time = 45000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	}
																});
															});
														}, time);
													} else if (Number(ce2.content) > 20) {
														time = 30000 * Number(ce2.content);

														embed
															.setDescription(`Você está Fabricando:\n**${findSelectedEvento.img} - ${findSelectedEvento.arma}**\nQuantia: \`x${ce2.content}\`\n\nQue ficará pronto em: ${moment.duration(time).format('M [meses] d [dias] h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}`);

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																'fabricagem.fabricandoArma': true,
																'fabricagem.armas.tempo': Date.now(),
																'fabricagem.armas.quantia': Number(ce2.content),
																'fabricagem.armas.nome': findSelectedEvento.arma,
																'fabricagem.armas.emoji': findSelectedEvento.img
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
															'inventory.item': 'Ferro'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Ferro').quantia - findSelectedEvento.ferro
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

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Arma')
																.setDescription(`${author}, sua arma **${findSelectedEvento.arma}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id);

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
																	} else if (user3.mochila.find((a) => a.item === findSelectedEvento.arma)) {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id,
																			'mochila.item': findSelectedEvento.arma
																		}, {
																			$set: {
																				'mochila.$.quantia': user3.mochila.find((a) => a.item === findSelectedEvento.arma).quantia + Number(ce2.content)
																			}
																		});

																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
																			}
																		});
																	} else {
																		await this.client.database.users.findOneAndUpdate({
																			userId: author.id,
																			guildId: message.guild.id
																		}, {
																			$push: {
																				mochila: {
																					item: findSelectedEvento.arma,
																					emoji: findSelectedEvento.img,
																					id: findSelectedEvento.img.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																					quantia: Number(ce2.content)
																				}
																			},
																			$set: {
																				'fabricagem.fabricandoArma': false,
																				'fabricagem.armas.tempo': 0,
																				'fabricagem.armas.quantia': 0,
																				'fabricagem.armas.nome': '',
																				'fabricagem.armas.emoji': ''
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
