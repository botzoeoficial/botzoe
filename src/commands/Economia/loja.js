/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Loja extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'loja';
		this.category = 'Economia';
		this.description = 'Veja os itens da loja!';
		this.usage = 'loja';
		this.aliases = ['shop'];

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
		const shop = await this.client.database.shop.findOne({
			_id: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle(`LOJINHA DA ${this.client.user.username}`)
			.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField('🥂 | Bebidas:', `Clique em \`🥂\``)
			.addField('🍗 | Comidas:', `Clique em \`🍗\``)
			.addField('🧁 | Doces:', `Clique em \`🧁\``)
			.addField('🛠️ | Utilidades:', `Clique em \`🛠️\``)
			.addField('👮 | Polícia:', `Clique em \`👮\``);

		message.channel.send(author, embed).then(async (msg) => {
			await msg.react('🥂');
			await msg.react('🍗');
			await msg.react('🧁');
			await msg.react('🛠️');
			await msg.react('👮');

			const bebidas = msg.createReactionCollector((r, u) => r.emoji.name === '🥂' && u.id === author.id, {
				max: 1
			});

			const comidas = msg.createReactionCollector((r, u) => r.emoji.name === '🍗' && u.id === author.id, {
				max: 1
			});

			const doces = msg.createReactionCollector((r, u) => r.emoji.name === '🧁' && u.id === author.id, {
				max: 1
			});

			const utilidades = msg.createReactionCollector((r, u) => r.emoji.name === '🛠️' && u.id === author.id, {
				max: 1
			});

			const policia = msg.createReactionCollector((r, u) => r.emoji.name === '👮' && u.id === author.id, {
				max: 1
			});

			bebidas.on('collect', async () => {
				msg.reactions.removeAll();

				const loja2 = shop.loja;

				embed.fields = [];

				embed
					.setTitle(`LOJINHA DA ${this.client.user.username}`)
					.setDescription('Veja as bebidas que tenho disponíveis na minha lojinha:')
					.setThumbnail(this.client.user.displayAvatarURL());

				loja2.bebidas.forEach((est) => {
					embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
				});

				msg.edit(author, embed).then(async (as) => {
					await as.react('897849546409906228');
					await as.react('897849547294916638');
					await as.react('891034945085120572');
					await as.react('897849547244593162');
					await as.react('891035343262990366');
					await as.react('897849547085217822');

					const agua = as.createReactionCollector((r, u) => r.emoji.id === '897849546409906228' && u.id === author.id, {
						time: 120000
					});

					const suco = as.createReactionCollector((r, u) => r.emoji.id === '897849547294916638' && u.id === author.id, {
						time: 120000
					});

					const refrigerante = as.createReactionCollector((r, u) => r.emoji.id === '891034945085120572' && u.id === author.id, {
						time: 120000
					});

					const cafe = as.createReactionCollector((r, u) => r.emoji.id === '897849547244593162' && u.id === author.id, {
						time: 120000
					});

					const energetico = as.createReactionCollector((r, u) => r.emoji.id === '891035343262990366' && u.id === author.id, {
						time: 120000
					});

					const cerveja = as.createReactionCollector((r, u) => r.emoji.id === '897849547085217822' && u.id === author.id, {
						time: 120000
					});

					agua.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Água\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[0].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[0].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[0].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[0].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[0].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[0].item,
											emoji: loja2.bebidas[0].emoji,
											id: loja2.bebidas[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[0].preco
									}
								});

								user.save();
							}
						}
					});

					suco.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Suco\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[1].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[1].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[1].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[1].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[1].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[1].item,
											emoji: loja2.bebidas[1].emoji,
											id: loja2.bebidas[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[1].preco
									}
								});

								user.save();
							}
						}
					});

					refrigerante.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Refrigerante\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[2].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[2].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[2].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[2].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[2].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[2].item,
											emoji: loja2.bebidas[2].emoji,
											id: loja2.bebidas[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[2].preco
									}
								});

								user.save();
							}
						}
					});

					cafe.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Café\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[3].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[3].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[3].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[3].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[3].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[3].item,
											emoji: loja2.bebidas[3].emoji,
											id: loja2.bebidas[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[3].preco
									}
								});

								user.save();
							}
						}
					});

					energetico.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Energético\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[4].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[4].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[4].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[4].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[4].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[4].item,
											emoji: loja2.bebidas[4].emoji,
											id: loja2.bebidas[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[4].preco
									}
								});

								user.save();
							}
						}
					});

					cerveja.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja2.bebidas[5].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Cerveja\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja2.bebidas[5].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja2.bebidas[5].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja2.bebidas[5].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[5].item).quantia + 1,
										saldo: user.saldo -= loja2.bebidas[5].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja2.bebidas[5].item,
											emoji: loja2.bebidas[5].emoji,
											id: loja2.bebidas[5].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja2.bebidas[5].preco
									}
								});

								user.save();
							}
						}
					});

					cerveja.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547085217822').remove();
						}
					});

					energetico.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891035343262990366').remove();
						}
					});

					cafe.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547244593162').remove();
						}
					});

					refrigerante.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891034945085120572').remove();
						}
					});

					suco.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547294916638').remove();
						}
					});

					agua.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546409906228').remove();
						}
					});
				});
			});

			comidas.on('collect', async () => {
				msg.reactions.removeAll();

				const loja3 = shop.loja;

				embed.fields = [];

				embed
					.setTitle(`LOJINHA DA ${this.client.user.username}`)
					.setDescription('Veja as comidas que tenho disponíveis na minha lojinha:')
					.setThumbnail(this.client.user.displayAvatarURL());

				loja3.comidas.forEach((est) => {
					embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
				});

				msg.edit(author, embed).then(async (as) => {
					await as.react('897849546695147551');
					await as.react('897849547089399848');
					await as.react('897849547957612574');
					await as.react('897849547143913472');
					await as.react('897849547538186300');
					await as.react('897849547206840410');
					await as.react('897849546783223829');

					const hamburguer = as.createReactionCollector((r, u) => r.emoji.id === '897849546695147551' && u.id === author.id, {
						time: 120000
					});

					const pizza = as.createReactionCollector((r, u) => r.emoji.id === '897849547089399848' && u.id === author.id, {
						time: 120000
					});

					const batata = as.createReactionCollector((r, u) => r.emoji.id === '897849547957612574' && u.id === author.id, {
						time: 120000
					});

					const misto = as.createReactionCollector((r, u) => r.emoji.id === '897849547143913472' && u.id === author.id, {
						time: 120000
					});

					const carne = as.createReactionCollector((r, u) => r.emoji.id === '897849547538186300' && u.id === author.id, {
						time: 120000
					});

					const taco = as.createReactionCollector((r, u) => r.emoji.id === '897849547206840410' && u.id === author.id, {
						time: 120000
					});

					const lamen = as.createReactionCollector((r, u) => r.emoji.id === '897849546783223829' && u.id === author.id, {
						time: 120000
					});

					hamburguer.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Sanduíche\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[0].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[0].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[0].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[0].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[0].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[0].item,
											emoji: loja3.comidas[0].emoji,
											id: loja3.comidas[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[0].preco
									}
								});

								user.save();
							}
						}
					});

					pizza.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Pizza\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[1].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[1].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[1].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[1].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[1].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[1].item,
											emoji: loja3.comidas[1].emoji,
											id: loja3.comidas[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[1].preco
									}
								});

								user.save();
							}
						}
					});

					batata.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Batata\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[2].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[2].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[2].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[2].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[2].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[2].item,
											emoji: loja3.comidas[2].emoji,
											id: loja3.comidas[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[2].preco
									}
								});

								user.save();
							}
						}
					});

					misto.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Misto Quente\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[3].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[3].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[3].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[3].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[3].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[3].item,
											emoji: loja3.comidas[3].emoji,
											id: loja3.comidas[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[3].preco
									}
								});

								user.save();
							}
						}
					});

					carne.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Carne\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[4].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[4].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[4].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[4].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[4].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[4].item,
											emoji: loja3.comidas[4].emoji,
											id: loja3.comidas[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[4].preco
									}
								});

								user.save();
							}
						}
					});

					taco.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[5].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Taco\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[5].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[5].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[5].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[5].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[5].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[5].item,
											emoji: loja3.comidas[5].emoji,
											id: loja3.comidas[5].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[5].preco
									}
								});

								user.save();
							}
						}
					});

					lamen.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja3.comidas[6].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Lamén\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja3.comidas[6].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja3.comidas[6].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja3.comidas[6].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[6].item).quantia + 1,
										saldo: user.saldo -= loja3.comidas[6].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja3.comidas[6].item,
											emoji: loja3.comidas[6].emoji,
											id: loja3.comidas[6].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja3.comidas[6].preco
									}
								});

								user.save();
							}
						}
					});

					lamen.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546783223829').remove();
						}
					});

					taco.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547206840410').remove();
						}
					});

					carne.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547538186300').remove();
						}
					});

					misto.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547143913472').remove();
						}
					});

					batata.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547957612574').remove();
						}
					});

					pizza.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547089399848').remove();
						}
					});

					hamburguer.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546695147551').remove();
						}
					});
				});
			});

			doces.on('collect', async () => {
				msg.reactions.removeAll();

				const loja4 = shop.loja;

				embed.fields = [];

				embed
					.setTitle(`LOJINHA DA ${this.client.user.username}`)
					.setDescription('Veja os docinhos que tenho disponíveis na minha lojinha:')
					.setThumbnail(this.client.user.displayAvatarURL());

				loja4.doces.forEach((est) => {
					embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
				});

				msg.edit(author, embed).then(async (as) => {
					await as.react('897849546992930867');
					await as.react('897849546804174848');
					await as.react('897849547215212584');
					await as.react('897849546913247292');
					await as.react('897849546720305175');

					const rosquinha = as.createReactionCollector((r, u) => r.emoji.id === '897849546992930867' && u.id === author.id, {
						time: 120000
					});

					const chocolate = as.createReactionCollector((r, u) => r.emoji.id === '897849546804174848' && u.id === author.id, {
						time: 120000
					});

					const pipoca = as.createReactionCollector((r, u) => r.emoji.id === '897849547215212584' && u.id === author.id, {
						time: 120000
					});

					const bolo = as.createReactionCollector((r, u) => r.emoji.id === '897849546913247292' && u.id === author.id, {
						time: 120000
					});

					const cookie = as.createReactionCollector((r, u) => r.emoji.id === '897849546720305175' && u.id === author.id, {
						time: 120000
					});

					rosquinha.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja4.doces[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Rosquinha\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja4.doces[0].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja4.doces[0].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja4.doces[0].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[0].item).quantia + 1,
										saldo: user.saldo -= loja4.doces[0].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja4.doces[0].item,
											emoji: loja4.doces[0].emoji,
											id: loja4.doces[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja4.doces[0].preco
									}
								});

								user.save();
							}
						}
					});

					chocolate.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja4.doces[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Chocolate\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja4.doces[1].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja4.doces[1].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja4.doces[1].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[1].item).quantia + 1,
										saldo: user.saldo -= loja4.doces[1].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja4.doces[1].item,
											emoji: loja4.doces[1].emoji,
											id: loja4.doces[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja4.doces[1].preco
									}
								});

								user.save();
							}
						}
					});

					pipoca.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja4.doces[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Pipoca\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja4.doces[2].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja4.doces[2].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja4.doces[2].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[2].item).quantia + 1,
										saldo: user.saldo -= loja4.doces[2].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja4.doces[2].item,
											emoji: loja4.doces[2].emoji,
											id: loja4.doces[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja4.doces[2].preco
									}
								});

								user.save();
							}
						}
					});

					bolo.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja4.doces[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Bolo\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja4.doces[3].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja4.doces[3].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja4.doces[3].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[3].item).quantia + 1,
										saldo: user.saldo -= loja4.doces[3].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja4.doces[3].item,
											emoji: loja4.doces[3].emoji,
											id: loja4.doces[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja4.doces[3].preco
									}
								});

								user.save();
							}
						}
					});

					cookie.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.saldo < loja4.doces[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Cookie\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja4.doces[4].preco
								}
							});

							if (user.inventory.find((a) => a.item === loja4.doces[4].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': loja4.doces[4].item
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[4].item).quantia + 1,
										saldo: user.saldo -= loja4.doces[4].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja4.doces[4].item,
											emoji: loja4.doces[4].emoji,
											id: loja4.doces[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja4.doces[4].preco
									}
								});

								user.save();
							}
						}
					});

					cookie.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546720305175').remove();
						}
					});

					bolo.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546913247292').remove();
						}
					});

					pipoca.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849547215212584').remove();
						}
					});

					chocolate.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546804174848').remove();
						}
					});

					rosquinha.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546992930867').remove();
						}
					});
				});
			});

			utilidades.on('collect', async () => {
				msg.reactions.removeAll();

				const loja5 = shop.loja;

				embed.fields = [];

				embed
					.setTitle(`LOJINHA DA ${this.client.user.username}`)
					.setDescription('Veja os itens utéis que tenho disponíveis na minha lojinha:')
					.setThumbnail(this.client.user.displayAvatarURL());

				loja5.utilidades.forEach((est) => {
					embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
				});

				msg.edit(author, embed).then(async (as) => {
					await as.react('897849546862919740');
					await as.react('891297733774819328');
					await as.react('898324362279669851');
					await as.react('899007409006215188');
					await as.react('899766443757928489');

					const remedio = as.createReactionCollector((r, u) => r.emoji.id === '897849546862919740' && u.id === author.id, {
						time: 120000
					});

					const vara = as.createReactionCollector((r, u) => r.emoji.id === '891297733774819328' && u.id === author.id, {
						time: 120000
					});

					const mascara = as.createReactionCollector((r, u) => r.emoji.id === '898324362279669851' && u.id === author.id, {
						time: 120000
					});

					const mochila = as.createReactionCollector((r, u) => r.emoji.id === '899007409006215188' && u.id === author.id, {
						time: 120000
					});

					const porte = as.createReactionCollector((r, u) => r.emoji.id === '899766443757928489' && u.id === author.id, {
						time: 120000
					});

					mochila.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (user.isMochila) return message.reply('você já possui uma **Mochila**!');

						if (user.saldo < loja5.utilidades[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||').then((b) => b.delete({
								timeout: 20000
							}));
						} else {
							message.reply(`você comprou o item \`Mochila\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja5.utilidades[3].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									saldo: user.saldo -= loja5.utilidades[3].preco,
									isMochila: true
								}
							});
						}
					});

					porte.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.level < 2) return message.reply('você precisa ser level **2** para comprar um Porte de Armas!');

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item!');

						if (user.mochila.find((a) => a.item === loja5.utilidades[4].item)) {
							if (user.mochila.find((a) => a.item === loja5.utilidades[4].item).quantia === 1) {
								return message.reply(`você já tem o máximo de **Porte de Armas** na mochila!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja5.utilidades[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||').then((b) => b.delete({
								timeout: 20000
							}));
						} else {
							message.reply(`você comprou o item \`Porte de Armas\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja5.utilidades[4].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									mochila: {
										item: loja5.utilidades[4].item,
										emoji: loja5.utilidades[4].emoji,
										id: loja5.utilidades[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja5.utilidades[4].preco
								}
							});
						}
					});

					remedio.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						const itens = user.inventory;

						if (itens.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (itens.find((a) => a.item === loja5.utilidades[0].item)) {
							if (itens.find((a) => a.item === loja5.utilidades[0].item).quantia === 1) {
								return message.reply(`você já tem o máximo de **Remédio** no inventário!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja5.utilidades[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Remédio\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja5.utilidades[0].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: loja5.utilidades[0].item,
										emoji: loja5.utilidades[0].emoji,
										id: loja5.utilidades[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja5.utilidades[0].preco
								}
							});
						}
					});

					vara.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) === 200) {
							return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
								timeout: 5000
							}));
						}

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						const itens = user.inventory;

						if (itens.find((a) => a.item === loja5.utilidades[1].item)) {
							if (itens.find((a) => a.item === loja5.utilidades[1].item).quantia === 5) {
								return message.reply(`você já tem o máximo de **Varas de Pesca** no inventário!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja5.utilidades[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Vara de Pesca\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja5.utilidades[1].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: loja5.utilidades[1].item,
										emoji: loja5.utilidades[1].emoji,
										id: loja5.utilidades[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja5.utilidades[1].preco
								}
							});
						}
					});

					mascara.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

						if (user.saldo < loja5.utilidades[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Máscara\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja5.utilidades[2].preco
								}
							});

							if (user.mochila.find((a) => a.item === loja5.utilidades[2].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': loja5.utilidades[2].item
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === loja5.utilidades[2].item).quantia + 1,
										saldo: user.saldo -= loja5.utilidades[2].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja5.utilidades[2].item,
											emoji: loja5.utilidades[2].emoji,
											id: loja5.utilidades[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja5.utilidades[2].preco
									}
								});

								user.save();
							}
						}
					});

					vara.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891297733774819328').remove();
						}
					});

					remedio.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('897849546862919740').remove();
						}
					});

					mascara.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('898324362279669851').remove();
						}
					});

					mochila.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('899007409006215188').remove();
						}
					});

					porte.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('899766443757928489').remove();
						}
					});
				});
			});

			policia.on('collect', async () => {
				msg.reactions.removeAll();

				const loja6 = shop.loja;

				embed.fields = [];

				embed
					.setTitle(`LOJINHA DA ${this.client.user.username}`)
					.setDescription('Veja os itens da Polícia que tenho disponíveis na minha lojinha:')
					.setThumbnail(this.client.user.displayAvatarURL());

				loja6.pm.forEach((est) => {
					embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
				});

				msg.edit(author, embed).then(async (as) => {
					await as.react('898326104413188157');
					await as.react('901117948180168724');
					await as.react('901117282003075072');
					await as.react('905653668643241985');
					await as.react('905653521846784080');

					const algemas = as.createReactionCollector((r, u) => r.emoji.id === '898326104413188157' && u.id === author.id, {
						time: 120000
					});

					const mp5 = as.createReactionCollector((r, u) => r.emoji.id === '901117948180168724' && u.id === author.id, {
						time: 120000
					});

					const g18 = as.createReactionCollector((r, u) => r.emoji.id === '901117282003075072' && u.id === author.id, {
						time: 120000
					});

					const municaoPistola = as.createReactionCollector((r, u) => r.emoji.id === '905653668643241985' && u.id === author.id, {
						time: 120000
					});

					const municaoMetralhadora = as.createReactionCollector((r, u) => r.emoji.id === '905653521846784080' && u.id === author.id, {
						time: 120000
					});

					algemas.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para comprar este item!');

						const itens = user.mochila;

						if (itens.find((a) => a.item === loja6.pm[0].item)) {
							if (itens.find((a) => a.item === loja6.pm[0].item).quantia === 1) {
								return message.reply(`você já tem o máximo de **Algemas** na sua mochila!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja6.pm[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Algemas\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja6.pm[0].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									mochila: {
										item: loja6.pm[0].item,
										emoji: loja6.pm[0].emoji,
										id: loja6.pm[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja6.pm[0].preco
								}
							});
						}
					});

					mp5.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para comprar este item!');

						const itens = user.mochila;

						if (itens.find((a) => a.item === loja6.pm[1].item)) {
							if (itens.find((a) => a.item === loja6.pm[1].item).quantia === 1) {
								return message.reply(`você já tem o máximo de **MP5** na mochila!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja6.pm[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou uma \`MP5\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja6.pm[1].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									mochila: {
										item: loja6.pm[1].item,
										emoji: loja6.pm[1].emoji,
										id: loja6.pm[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja6.pm[1].preco
								}
							});
						}
					});

					g18.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para comprar este item!');

						const itens = user.mochila;

						if (itens.find((a) => a.item === loja6.pm[2].item)) {
							if (itens.find((a) => a.item === loja6.pm[2].item).quantia === 1) {
								return message.reply(`você já tem o máximo de **G18** no inventário!`).then((b) => b.delete({
									timeout: 20000
								}));
							}
						} else if (user.saldo < loja6.pm[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou a arma \`G18\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja6.pm[2].preco
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									mochila: {
										item: loja6.pm[2].item,
										emoji: loja6.pm[2].emoji,
										id: loja6.pm[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: 1
									}
								},
								$set: {
									saldo: user.saldo -= loja6.pm[2].preco
								}
							});
						}
					});

					municaoPistola.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para comprar este item!');

						if (user.saldo < loja6.pm[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou \`Munição Pistola\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja6.pm[3].preco
								}
							});

							if (user.mochila.find((a) => a.item === loja6.pm[3].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': loja6.pm[3].item
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[3].item).quantia + (1 * 5),
										saldo: user.saldo -= loja6.pm[3].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja6.pm[3].item,
											emoji: loja6.pm[3].emoji,
											id: loja6.pm[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1 * 5
										}
									},
									$set: {
										saldo: user.saldo -= loja6.pm[3].preco
									}
								});
							}
						}
					});

					municaoMetralhadora.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

						if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para comprar este item!');

						if (user.saldo < loja6.pm[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou \`Munição Metralhadora\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									bank: server.bank + loja6.pm[4].preco
								}
							});

							if (user.mochila.find((a) => a.item === loja6.pm[4].item)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': loja6.pm[4].item
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[4].item).quantia + (1 * 5),
										saldo: user.saldo -= loja6.pm[4].preco
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja6.pm[4].item,
											emoji: loja6.pm[4].emoji,
											id: loja6.pm[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1 * 5
										}
									},
									$set: {
										saldo: user.saldo -= loja6.pm[4].preco
									}
								});
							}
						}
					});

					algemas.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('898326104413188157').remove();
						}
					});

					mp5.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('901117948180168724').remove();
						}
					});

					g18.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('901117282003075072').remove();
						}
					});

					municaoPistola.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('905653668643241985').remove();
						}
					});

					municaoMetralhadora.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('905653521846784080').remove();
						}
					});
				});
			});
		});
	}

};
