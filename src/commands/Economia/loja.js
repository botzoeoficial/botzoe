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
			.addField('🛠️ | Utilidades:', `Clique em \`🛠️\``);

		message.channel.send(author, embed).then(async (msg) => {
			await msg.react('🥂');
			await msg.react('🍗');
			await msg.react('🧁');
			await msg.react('🛠️');

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
					await as.react('🥤');
					await as.react('🧃');
					await as.react('891034945085120572');
					await as.react('☕');
					await as.react('891035343262990366');
					await as.react('🍻');

					const agua = as.createReactionCollector((r, u) => r.emoji.name === '🥤' && u.id === author.id, {
						time: 120000
					});

					const suco = as.createReactionCollector((r, u) => r.emoji.name === '🧃' && u.id === author.id, {
						time: 120000
					});

					const refrigerante = as.createReactionCollector((r, u) => r.emoji.id === '891034945085120572' && u.id === author.id, {
						time: 120000
					});

					const cafe = as.createReactionCollector((r, u) => r.emoji.name === '☕' && u.id === author.id, {
						time: 120000
					});

					const energetico = as.createReactionCollector((r, u) => r.emoji.id === '891035343262990366' && u.id === author.id, {
						time: 120000
					});

					const cerveja = as.createReactionCollector((r, u) => r.emoji.name === '🍻' && u.id === author.id, {
						time: 120000
					});

					agua.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Água\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[0].item,
										emoji: loja2.bebidas[0].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[0].preco
								}
							});
						}
					});

					suco.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Suco\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[1].item,
										emoji: loja2.bebidas[1].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[1].preco
								}
							});
						}
					});

					refrigerante.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Refrigerante\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[2].item,
										emoji: loja2.bebidas[2].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[2].preco
								}
							});
						}
					});

					cafe.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Café\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[3].item,
										emoji: loja2.bebidas[3].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[3].preco
								}
							});
						}
					});

					energetico.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Energético\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[4].item,
										emoji: loja2.bebidas[4].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[4].preco
								}
							});
						}
					});

					cerveja.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja2.bebidas[5].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Cerveja\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja2.bebidas[5].item,
										emoji: loja2.bebidas[5].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja2.bebidas[5].preco
								}
							});
						}
					});

					cerveja.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍻').remove();
						}
					});

					energetico.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891035343262990366').remove();
						}
					});

					cafe.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('☕').remove();
						}
					});

					refrigerante.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891034945085120572').remove();
						}
					});

					suco.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🧃').remove();
						}
					});

					agua.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🥤').remove();
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
					await as.react('🍔');
					await as.react('🍕');
					await as.react('🍟');
					await as.react('🥪');
					await as.react('🥩');
					await as.react('🌮');
					await as.react('🍜');

					const hamburguer = as.createReactionCollector((r, u) => r.emoji.name === '🍔' && u.id === author.id, {
						time: 120000
					});

					const pizza = as.createReactionCollector((r, u) => r.emoji.name === '🍕' && u.id === author.id, {
						time: 120000
					});

					const batata = as.createReactionCollector((r, u) => r.emoji.name === '🍟' && u.id === author.id, {
						time: 120000
					});

					const misto = as.createReactionCollector((r, u) => r.emoji.name === '🥪' && u.id === author.id, {
						time: 120000
					});

					const carne = as.createReactionCollector((r, u) => r.emoji.name === '🥩' && u.id === author.id, {
						time: 120000
					});

					const taco = as.createReactionCollector((r, u) => r.emoji.name === '🌮' && u.id === author.id, {
						time: 120000
					});

					const lamen = as.createReactionCollector((r, u) => r.emoji.name === '🍜' && u.id === author.id, {
						time: 120000
					});

					hamburguer.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Sanduíche\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[0].item,
										emoji: loja3.comidas[0].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[0].preco
								}
							});
						}
					});

					pizza.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Pizza\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[1].item,
										emoji: loja3.comidas[1].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[1].preco
								}
							});
						}
					});

					batata.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Batata\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[2].item,
										emoji: loja3.comidas[2].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[2].preco
								}
							});
						}
					});

					misto.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Misto Quente\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[3].item,
										emoji: loja3.comidas[3].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[3].preco
								}
							});
						}
					});

					carne.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Carne\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[4].item,
										emoji: loja3.comidas[4].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[4].preco
								}
							});
						}
					});

					taco.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[5].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Taco\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[5].item,
										emoji: loja3.comidas[5].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[5].preco
								}
							});
						}
					});

					lamen.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja3.comidas[6].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Lamén\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja3.comidas[6].item,
										emoji: loja3.comidas[6].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja3.comidas[6].preco
								}
							});
						}
					});

					lamen.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍜').remove();
						}
					});

					taco.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🌮').remove();
						}
					});

					carne.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🥩').remove();
						}
					});

					misto.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🥪').remove();
						}
					});

					batata.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍟').remove();
						}
					});

					pizza.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍕').remove();
						}
					});

					hamburguer.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍔').remove();
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
					await as.react('🍩');
					await as.react('🍫');
					await as.react('🍿');
					await as.react('🍰');
					await as.react('🍪');

					const rosquinha = as.createReactionCollector((r, u) => r.emoji.name === '🍩' && u.id === author.id, {
						time: 120000
					});

					const chocolate = as.createReactionCollector((r, u) => r.emoji.name === '🍫' && u.id === author.id, {
						time: 120000
					});

					const pipoca = as.createReactionCollector((r, u) => r.emoji.name === '🍿' && u.id === author.id, {
						time: 120000
					});

					const bolo = as.createReactionCollector((r, u) => r.emoji.name === '🍰' && u.id === author.id, {
						time: 120000
					});

					const cookie = as.createReactionCollector((r, u) => r.emoji.name === '🍪' && u.id === author.id, {
						time: 120000
					});

					rosquinha.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja4.doces[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Rosquinha\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja4.doces[0].item,
										emoji: loja4.doces[0].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja4.doces[0].preco
								}
							});
						}
					});

					chocolate.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja4.doces[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Chocolate\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja4.doces[1].item,
										emoji: loja4.doces[1].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja4.doces[1].preco
								}
							});
						}
					});

					pipoca.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja4.doces[2].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Pipoca\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja4.doces[2].item,
										emoji: loja4.doces[2].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja4.doces[2].preco
								}
							});
						}
					});

					bolo.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja4.doces[3].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Bolo\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja4.doces[3].item,
										emoji: loja4.doces[3].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja4.doces[3].preco
								}
							});
						}
					});

					cookie.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						if (user.saldo < loja4.doces[4].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Cookie\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja4.doces[4].item,
										emoji: loja4.doces[4].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja4.doces[4].preco
								}
							});
						}
					});

					cookie.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍪').remove();
						}
					});

					bolo.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍰').remove();
						}
					});

					pipoca.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍿').remove();
						}
					});

					chocolate.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍫').remove();
						}
					});

					rosquinha.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('🍩').remove();
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
					await as.react('💊');
					await as.react('891297733774819328');

					const remedio = as.createReactionCollector((r, u) => r.emoji.name === '💊' && u.id === author.id, {
						time: 120000
					});

					const vara = as.createReactionCollector((r, u) => r.emoji.id === '891297733774819328' && u.id === author.id, {
						time: 120000
					});

					remedio.on('collect', async () => {
						const user = await this.client.database.users.findOne({
							_id: author.id
						});

						const itens = user.inventory;

						const quantidadeNoInventarioDe = (i) => itens.filter(({
							item
						}) => item === i).length;

						if (quantidadeNoInventarioDe('Remédio') === 1) {
							return message.reply(`você já tem o máximo de **Remédio** no inventário!`).then((b) => b.delete({
								timeout: 20000
							}));
						} else if (user.saldo < loja5.utilidades[0].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Remédio\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja5.utilidades[0].item,
										emoji: loja5.utilidades[0].emoji
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
							_id: author.id
						});

						const itens = user.inventory;

						const quantidadeNoInventarioDe = (i) => itens.filter(({
							item
						}) => item === i).length;

						if (quantidadeNoInventarioDe('Vara de Pesca') === 5) {
							return message.reply(`você já tem o máximo de **Varas de Pesca** no inventário!`).then((b) => b.delete({
								timeout: 20000
							}));
						} else if (user.saldo < loja5.utilidades[1].preco) {
							return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
						} else {
							message.reply(`você comprou o item \`Vara de Pesca\` com sucesso!`).then((b) => b.delete({
								timeout: 20000
							}));

							await this.client.database.users.findOneAndUpdate({
								_id: author.id
							}, {
								$push: {
									inventory: {
										item: loja5.utilidades[1].item,
										emoji: loja5.utilidades[1].emoji
									}
								},
								$set: {
									saldo: user.saldo -= loja5.utilidades[1].preco
								}
							});
						}
					});

					vara.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('891297733774819328').remove();
						}
					});

					remedio.on('end', async (collected, reason) => {
						if (reason === 'time') {
							as.reactions.cache.get('💊').remove();
						}
					});
				});
			});
		});
	}

};
