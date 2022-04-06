/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Addbau extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addbau';
		this.category = 'Social';
		this.description = 'Adicione itens no baú da sua Casa!';
		this.usage = 'addbau';
		this.aliases = ['add-bau'];

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
				content: 'Você está fabricando algo, por tanto, não é possível adicionar algum item no baú!'
			});
		}

		if (user.casas.tipo === '') {
			return message.reply({
				content: `Você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('Adicionar no Baú')
			.setDescription(`Você deseja adicionar o item de onde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

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
						content: 'Cancelado com sucesso.'
					});
				} else if (ce.content === '1') {
					collector.stop();
					ce.delete();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itens = user2.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Baú?\n\n${itens || '**Inventário Vazio.**'}`);

					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then(async (msg1) => {
						if (!user2.inventory.length) return;

						for (const emoji of user2.inventory.filter((a) => !['Bolso', 'Colete à Prova de Balas'].includes(a.item)).map((es) => es.id)) await msg1.react(emoji);

						const filter2 = (reactionFilter, userFilter) => {
							return user2.inventory.map((es) => es.id).includes(reactionFilter.emoji.id) && userFilter.id === author.id;
						};

						const sim = msg1.createReactionCollector({
							filter: filter2
						});

						const objeto = require('../../json/inventario.json');

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							if (user2.casas.bau.length > 0) {
								if (user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b) >= user2.casas.quantiaItens) {
									sim.stop();
									msg1.delete();

									return message.reply({
										content: `Seu **baú** está cheio. Use o comando \`${prefix}retirarbau\`!`
									});
								}
							}

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para o Baú?`);

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
									if (isNaN(ce2.content)) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**. Por favor, use o comando novamente!'
										});
									} else if (Number(ce2.content) <= 0) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: 'Você precisa enviar uma quantia válida maior que **0**. Por favor, use o comando novamente!'
										});
									} else if (Number(ce2.content) > user2.inventory.find((a) => a.item === itemEmoji).quantia) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: `Você não possui tudo isso de \`${itemEmoji}\`. Por favor, use o comando novamente!`
										});
									} else if (Number(ce2.content) >= user2.casas.quantiaItens) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: `Você precisa colocar uma quantia de até **${user2.casas.quantiaItens - user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b)}**. Por favor, use o comando novamente!`
										});
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply({
											content: `Você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para o Baú da(o) sua(seu) **${user2.casas.tipo}** com sucesso!`
										});

										if (user2.inventory.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user2.inventory.find((a) => a.item === itemEmoji).quantia) {
												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia += Number(ce2.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															'casas.bau': {
																item: itemEmoji,
																emoji: user2.inventory.find((a) => a.item === itemEmoji).emoji,
																id: user2.inventory.find((a) => a.item === itemEmoji).id,
																quantia: Number(ce2.content)
															}
														}
													});
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'inventory.item': itemEmoji
												}, {
													$set: {
														'inventory.$.quantia': user2.inventory.find((a) => a.item === itemEmoji).quantia -= Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$pull: {
														inventory: {
															item: itemEmoji
														}
													}
												});

												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia += user2.inventory.find((a) => a.item === itemEmoji).quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															'casas.bau': {
																item: itemEmoji,
																emoji: user2.inventory.find((a) => a.item === itemEmoji).emoji,
																id: user2.inventory.find((a) => a.item === itemEmoji).id,
																quantia: user2.inventory.find((a) => a.item === itemEmoji).quantia
															}
														}
													});
												}
											}
										}
									}
								});
							});

							return;
						});
					});
				} else if (ce.content === '2') {
					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!user2.isMochila) {
						collector.stop();
						ce.delete();
						return message.reply({
							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e Compre uma!'
						});
					}

					collector.stop();
					ce.delete();

					const itens = user2.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Baú?\n\n${itens || '**Mochila Vazia.**'}`);

					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then(async (msg1) => {
						if (!user2.mochila.length) return;

						for (const emoji of user2.mochila.filter((a) => !['Porte de Armas'].includes(a.item)).map((es) => es.id)) await msg1.react(emoji);

						const filter2 = (reactionFilter, userFilter) => {
							return user2.mochila.map((es) => es.id).includes(reactionFilter.emoji.id) && userFilter.id === author.id;
						};

						const sim = msg1.createReactionCollector({
							filter: filter2
						});

						const objeto = require('../../json/mochila.json');

						sim.on('collect', async (collected) => {
							if (user2.casas.bau.length > 0) {
								if (user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b) >= user2.casas.quantiaItens) {
									sim.stop();
									msg1.delete();

									return message.reply({
										content: `Seu **baú** está cheio. Use o comando \`${prefix}retirarbau\`!`
									});
								}
							}

							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para o Baú?`);

							msg.edit({
								content: author.toString(),
								embeds: [embed]
							}).then(async (msg2) => {
								const filter3 = (m) => {
									return m.author.id === author.id;
								};

								const resposta = msg2.channel.createMessageCollector({
									filter: filter3,
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (isNaN(ce2.content)) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**. Por favor, use o comando novamente!'
										});
									} else if (Number(ce2.content) <= 0) {
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0**. Por favor, envie a quantia novamente no chat!'
										});
									} else if (Number(ce2.content) > user2.mochila.find((a) => a.item === itemEmoji).quantia) {
										message.reply({
											content: `Você não possui tudo isso de \`${itemEmoji}\`. Por favor, envie a quantia novamente no chat!`
										});
									} else if (Number(ce2.content) >= user2.casas.quantiaItens) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply({
											content: `Você precisa colocar uma quantia de até **${user2.casas.quantiaItens - user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b)}**. Por favor, use o comando novamente!`
										});
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply({
											content: `Você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para o Baú da(o) sua(seu) **${user2.casas.tipo}** com sucesso!`
										});

										if (user2.mochila.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user2.mochila.find((a) => a.item === itemEmoji).quantia) {
												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia += Number(ce2.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															'casas.bau': {
																item: itemEmoji,
																emoji: user2.mochila.find((a) => a.item === itemEmoji).emoji,
																id: user2.mochila.find((a) => a.item === itemEmoji).id,
																quantia: Number(ce2.content)
															}
														}
													});
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'mochila.item': itemEmoji
												}, {
													$set: {
														'mochila.$.quantia': user2.mochila.find((a) => a.item === itemEmoji).quantia -= Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$pull: {
														mochila: {
															item: itemEmoji
														}
													}
												});

												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia += user2.mochila.find((a) => a.item === itemEmoji).quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															'casas.bau': {
																item: itemEmoji,
																emoji: user2.mochila.find((a) => a.item === itemEmoji).emoji,
																id: user2.mochila.find((a) => a.item === itemEmoji).id,
																quantia: user2.mochila.find((a) => a.item === itemEmoji).quantia
															}
														}
													});
												}
											}
										}
									}
								});
							});

							return;
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

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Você demorou demais para escolher. Use o comando novamente!'
					});
				}
			});
		});
	}

};
