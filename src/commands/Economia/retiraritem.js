/* eslint-disable arrow-body-style */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Retiraritem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'retiraritem';
		this.category = 'Economia';
		this.description = 'Retire um item do seu inventário ou da sua Mochila!';
		this.usage = 'retiraritem';
		this.aliases = ['retirar-item', 'descartaritem', 'descartar', 'dropar', 'droparitem'];

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
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.fabricando) {
			return message.reply({
				content: 'Você está fabricando algo, por tanto, não é possível retirar algum item do inventário!'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('Retirar Item')
			.setDescription(`De onde você deseja retirar seu item?\n\n**1️⃣ - Inventário**\n**2️⃣ - Mochila**\n\nDigite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			const filter = m => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (r) => {
				if (Number(r.content) === 0) {
					collector.stop();
					r.delete();
					msg.delete();
				} else if (isNaN(r.content)) {
					message.reply({
						content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite o número novamente!'
					}).then((a) => setTimeout(() => a.delete(), 6000));
					r.delete();
				} else if (!parseInt(r.content)) {
					message.reply({
						content: 'Você precisa colocar um número válido. Digite o número novamente!'
					}).then((a) => setTimeout(() => a.delete(), 6000));
					r.delete();
				} else if (Number(r.content) === 1) {
					collector.stop();

					const itens = user.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					const embedInv = new ClientEmbed(author)
						.setTitle(`Retirar Item do Inventário`)
						.setDescription(itens || '**Inventário Vazio.**');

					msg.delete();
					message.reply({
						content: author.toString(),
						embeds: [embedInv]
					}).then(async (msg2) => {
						for (const emoji of user.inventory.filter((a) => !['Bolso', 'Colete à Prova de Balas'].includes(a.item)).map((es) => es.id)) await msg2.react(emoji);

						const filter2 = (reaction, user3) => {
							return user.inventory.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;
						};

						const objeto = require('../../json/inventario.json');

						msg2.awaitReactions({
							filter: filter2,
							max: 1
						}).then(async (collected) => {
							const itemEmoji = objeto[collected.first().emoji.id];

							if (user.inventory.find((x) => x.item === itemEmoji).quantia > 1) {
								message.reply({
									content: `Quanto(a)(s) **${itemEmoji}(s)** você deseja retirar do seu **Inventário**?`
								}).then(async (msg3) => {
									const filter3 = m => {
										return m.author.id === author.id;
									};

									const collector2 = msg3.channel.createMessageCollector({
										filter: filter3,
										time: 60000
									});

									collector2.on('collect', async (r2) => {
										if (isNaN(r2.content)) {
											message.reply({
												content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite a quantia novamente!'
											}).then((a) => setTimeout(() => a.delete(), 6000));
											r2.delete();
										} else if (Number(r2.content) <= 0) {
											message.reply({
												content: 'Você precisa colocar uma quantia **maior** que 0. Digite a quantia novamente!'
											}).then((a) => setTimeout(() => a.delete(), 6000));
											r2.delete();
										} else if (Number(r2.content) > user.inventory.find((a) => a.item === itemEmoji).quantia) {
											message.reply({
												content: 'Você não tem toda essa quantia para ser retirada. Digite a quantia novamente!'
											}).then((a) => setTimeout(() => a.delete(), 6000));
											r2.delete();
										} else {
											collector2.stop();

											msg2.delete();
											message.reply({
												content: `Você retirou **${Number(r2.content)}** \`${itemEmoji}(s)\` do seu Inventário com sucesso!`
											});

											if (Number(r2.content) === user.inventory.find((a) => a.item === itemEmoji).quantia) {
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
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'inventory.item': itemEmoji
												}, {
													$set: {
														'inventory.$.quantia': user.inventory.find((a) => a.item === itemEmoji).quantia -= Number(r2.content)
													}
												});
											}

											user.save();
											return;
										}
									});

									collector2.on('end', async (collected2, reason) => {
										if (reason === 'time') {
											collector2.stop();
											msg3.delete();
											return message.reply({
												content: 'Você demorou demais para responder. Use o comando novamente!'
											});
										}
									});
								});
							} else {
								msg2.delete();
								message.reply({
									content: `Você retirou 1 \`${itemEmoji}\` do seu Inventário com sucesso!`
								});

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

								user.save();
								return;
							}
						});
					});
				} else if (Number(r.content) === 2) {
					if (!user.isMochila) {
						collector.stop();
						return message.reply({
							content: 'Você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!'
						});
					} else {
						collector.stop();

						const itens = user.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

						const embedMochila = new ClientEmbed(author)
							.setTitle(`Retirar Item da Mochila`)
							.setDescription(itens || '**Mochila Vazia.**');

						msg.delete();
						message.reply({
							content: author.toString(),
							embeds: [embedMochila]
						}).then(async (msg3) => {
							for (const emoji of user.mochila.filter((a) => !['Porte de Armas'].includes(a.item)).map((es) => es.id)) await msg3.react(emoji);

							const filter4 = (reaction, user3) => {
								return user.mochila.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;
							};

							const objeto = require('../../json/mochila.json');

							msg3.awaitReactions({
								filter: filter4,
								max: 1
							}).then(async (collected) => {
								const itemEmoji = objeto[collected.first().emoji.id];

								if (user.mochila.find((x) => x.item === itemEmoji).quantia > 1) {
									message.reply({
										content: `Quanto(a)(s) **${itemEmoji}(s)** você deseja retirar da sua **Mochila**?`
									}).then(async (msg4) => {
										collector.stop();

										const filter5 = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collector2 = msg4.channel.createMessageCollector({
											filter: filter5,
											time: 60000
										});

										collector2.on('collect', async (r2) => {
											if (Number(r2.content) <= 0) {
												message.reply({
													content: 'Você precisa colocar uma quantia **maior** que 0. Digite a quantia novamente!'
												}).then((a) => setTimeout(() => a.delete(), 6000));
												r2.delete();
											} else if (isNaN(r2.content)) {
												message.reply({
													content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite a quantia novamente!'
												}).then((a) => setTimeout(() => a.delete(), 6000));
												r2.delete();
											} else if (Number(r2.content) > user.mochila.find((a) => a.item === itemEmoji).quantia) {
												message.reply({
													content: 'Você não tem toda essa quantia para ser retirada. Digite a quantia novamente!'
												}).then((a) => setTimeout(() => a.delete(), 6000));
												r2.delete();
											} else {
												collector2.stop();

												msg3.delete();
												message.reply({
													content: `Você retirou **${Number(r2.content)}** \`${itemEmoji}(s)\` da sua Mochila com sucesso!`
												});

												if (Number(r2.content) === user.mochila.find((a) => a.item === itemEmoji).quantia) {
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
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': itemEmoji
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === itemEmoji).quantia -= Number(r2.content)
														}
													});
												}

												user.save();
												return;
											}
										});

										collector2.on('end', async (collected2, reason) => {
											if (reason === 'time') {
												collector2.stop();
												msg3.delete();
												return message.reply({
													content: 'Você demorou demais para responder. Use o comando novamente!'
												});
											}
										});
									});
								} else {
									message.reply({
										content: `Você retirou 1 \`${itemEmoji}\` da sua Mochila com sucesso!`
									});

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

									user.save();
									return;
								}
							});
						});
					}
				} else if (Number(r.content) !== 1 && Number(r.content) !== 2) {
					r.delete();
					message.reply({
						content: 'Número não encontrado. Digite o número novamente!'
					});
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					collector.stop();
					return message.reply({
						content: 'Você demorou demais para escolher de onde você deseja retirar seu item. Use o comando novamente!'
					});
				}
			});
		});
	}

};
