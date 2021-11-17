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

module.exports = class Fabricarchaves extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricarchave';
		this.category = 'Crime';
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

		if (!server.cidade.carcereiro.map(a => a.id).includes(author.id)) return message.reply('você precisa ser um **Carcereiro** do servidor para fábricar uma chave!');

		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (userAuthor.fabricagem.fabricandoChaves) return message.reply(`você já está fabricando uma **chave**. Use o comando \`${prefix}fabricando\` para ver qual a **chave** que está sendo fabricada!`);

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

		const embed = new ClientEmbed(author)
			.setTitle('🔑 | Fábrica de Chaves');

		chavesArray.forEach((eu) => embedMessage += `${eu.position + 1} - ${eu.img} - ${eu.chave} - Alumínio: \`${eu.aluminio}\` - Borracha: \`${eu.borracha}\` - Prata: \`${eu.prata}\`\n`);
		embed.setDescription(`Qual chave você deseja fabricar?\n\n${embedMessage}\nDigite \`0\` para sair.`);

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
					const findSelectedEvento = chavesArray.find((xis) => xis.position === selected);

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
						message.reply('você não possui **Alumínio** suficiente para fabricar essa chave. Por favor, escolha outra chave!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Borracha') || user2.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha) {
						message.reply('você não possui **Borracha** suficiente para fabricar essa chave. Por favor, escolha outra chave!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else if (!user2.inventory.find((a) => a.item === 'Prata') || user2.inventory.find((a) => a.item === 'Prata').quantia < findSelectedEvento.prata) {
						message.reply('você não possui **Prata** suficiente para fabricar essa chave. Por favor, escolha outra chave!').then(ba => ba.delete({
							timeout: 6000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`Qual a quantidade de chaves você deseja Fabricar?\n\nDigite \`0\` para sair.`);

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
										message.reply(`para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Borracha').quantia < findSelectedEvento.borracha * Number(ce2.content)) {
										message.reply(`para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alúminio').quantia}\`||)`);
										ce2.delete();
									} else if (user3.inventory.find((a) => a.item === 'Prata').quantia < findSelectedEvento.prata * Number(ce2.content)) {
										message.reply(`para fabricar essa chave \`${ce2.content}\` vezes, você irá precisar de:\nPrata: \`x${findSelectedEvento.prata * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Prata').quantia}\`||)\nBorracha: \`x${findSelectedEvento.borracha * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Borracha').quantia}\`||)\nAlumínio: \`x${findSelectedEvento.aluminio * Number(ce2.content)}\` (||Você só tem \`x${user3.inventory.find((a) => a.item === 'Alumínio').quantia}\`||)`);
										ce2.delete();
									} else {
										sim2.stop();
										ce2.delete();

										embed
											.setDescription(`Você tem certeza que quer fabricar \`x${ce2.content}\` de **${findSelectedEvento.chave}**?`);

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

												if (findSelectedEvento.chave === 'Chave Micha') {
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
															'inventory.item': 'Prata'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - findSelectedEvento.prata
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Chave')
																.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
																	max: 1
																});

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
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
																			},
																			$set: {
																				'fabricagem.fabricandoChaves': false,
																				'fabricagem.chaves.tempo': 0,
																				'fabricagem.chaves.quantia': 0,
																				'fabricagem.chaves.nome': '',
																				'fabricagem.chaves.emoji': ''
																			}
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
															'inventory.item': 'Prata'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - findSelectedEvento.prata
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Chave')
																.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
																	max: 1
																});

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
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
																			},
																			$set: {
																				'fabricagem.fabricandoChaves': false,
																				'fabricagem.chaves.tempo': 0,
																				'fabricagem.chaves.quantia': 0,
																				'fabricagem.chaves.nome': '',
																				'fabricagem.chaves.emoji': ''
																			}
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
															'inventory.item': 'Prata'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - findSelectedEvento.prata
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Chave')
																.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
																	max: 1
																});

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
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
																			},
																			$set: {
																				'fabricagem.fabricandoChaves': false,
																				'fabricagem.chaves.tempo': 0,
																				'fabricagem.chaves.quantia': 0,
																				'fabricagem.chaves.nome': '',
																				'fabricagem.chaves.emoji': ''
																			}
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
															'inventory.item': 'Prata'
														}, {
															$set: {
																'inventory.$.quantia': user3.inventory.find((a) => a.item === 'Prata').quantia - findSelectedEvento.prata
															}
														});

														setTimeout(async () => {
															const embedConfirm = new ClientEmbed(author)
																.setTitle('Pegar Chave')
																.setDescription(`${author}, sua **${findSelectedEvento.chave}** está pronta para ser recolhida!\n\nClique na reação (✅) abaixo para pegar!`);

															message.channel.send(author, embedConfirm).then(async (confirm) => {
																await confirm.react('✅');

																const confirmar = confirm.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
																	max: 1
																});

																confirmar.on('collect', async () => {
																	if (!user3.isMochila) {
																		message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
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
																			},
																			$set: {
																				'fabricagem.fabricandoChaves': false,
																				'fabricagem.chaves.tempo': 0,
																				'fabricagem.chaves.quantia': 0,
																				'fabricagem.chaves.nome': '',
																				'fabricagem.chaves.emoji': ''
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

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();
					return message.reply('você demorou demais para responder. Use o comando novamente!');
				}
			});
		});
	}

};
