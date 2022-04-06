/* eslint-disable arrow-body-style */
/* eslint-disable no-case-declarations */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

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
		author,
		prefix,
		args
	}) {
		const shop = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		const userLoja = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (userLoja.loja.aberta) {
			const embedLoja = new ClientEmbed(author)
				.setTitle('🛒 | Loja Aberta')
				.setDescription(`Você abriu a **Loja** recentemente... Clique no link abaixo para ir até ela, logo após clique no :x: para fechá-la e abri-la usando o comando \`${prefix}loja\` novamente.\n\nLink: ||https://discord.com/channels/${message.guild.id}/${userLoja.loja.canal}/${userLoja.loja.mensagem}||`);

			return message.reply({
				content: author.toString(),
				embeds: [embedLoja]
			});
		}

		if (!args[0] || args[0] !== 'agro') {
			const embed = new ClientEmbed(author)
				.setTitle(`LOJINHA DA ${this.client.user.username}`)
				.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
				.setThumbnail(this.client.user.displayAvatarURL())
				.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
				.addField('🍗 | Comidas:', `Clique em 🍗`, true)
				.addField('🧁 | Doces:', `Clique em 🧁`, true)
				.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
				.addField('👮 | Polícia:', `Clique em 👮`, true)
				.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
				.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

			const buttonBebidas = new MessageButton().setCustomId('bebidas').setEmoji('🥂').setStyle('PRIMARY');
			const buttonComidas = new MessageButton().setCustomId('comidas').setEmoji('🍗').setStyle('PRIMARY');
			const buttonDoces = new MessageButton().setCustomId('doces').setEmoji('🧁').setStyle('PRIMARY');
			const buttonUtilidades = new MessageButton().setCustomId('utilidades').setEmoji('🛠️').setStyle('PRIMARY');
			const buttonPolicia = new MessageButton().setCustomId('policia').setEmoji('👮').setStyle('PRIMARY');
			const buttonBitcoin = new MessageButton().setCustomId('bitcoin').setEmoji('908786996535787551').setStyle('PRIMARY');
			const buttonFecharLoja = new MessageButton().setCustomId('fechar_loja').setEmoji('❌').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonBebidas, buttonComidas, buttonDoces, buttonUtilidades, buttonPolicia]);
			const botoes2 = new MessageActionRow().addComponents([buttonBitcoin, buttonFecharLoja]);

			message.reply({
				content: author.toString(),
				embeds: [embed],
				components: [botoes, botoes2]
			}).then(async (msg) => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'loja.aberta': true,
						'loja.canal': msg.channel.id,
						'loja.mensagem': msg.id
					}
				});

				const filter = (interaction) => interaction.isButton() && ['bebidas', 'comidas', 'doces', 'utilidades', 'policia', 'bitcoin', 'fechar_loja'].includes(interaction.customId) && interaction.user.id === author.id;

				const collector = msg.createMessageComponentCollector({
					filter,
					time: 120000
				});

				collector.on('collect', async (b) => {
					switch (b.customId) {
						case 'bebidas':
							await b.deferUpdate();

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							const loja2 = shop.loja;

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja as bebidas que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja2.bebidas.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							const buttonAgua = new MessageButton().setCustomId('agua').setEmoji('897849546409906228').setStyle('PRIMARY');
							const buttonSuco = new MessageButton().setCustomId('suco').setEmoji('897849547294916638').setStyle('PRIMARY');
							const buttonRefrigerante = new MessageButton().setCustomId('refrigerante').setEmoji('891034945085120572').setStyle('PRIMARY');
							const buttonCafe = new MessageButton().setCustomId('cafe').setEmoji('897849547244593162').setStyle('PRIMARY');
							const buttonEnergetico = new MessageButton().setCustomId('energetico').setEmoji('891035343262990366').setStyle('PRIMARY');
							const buttonCerveja = new MessageButton().setCustomId('cerveja').setEmoji('897849547085217822').setStyle('PRIMARY');
							const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
							const bebidas1 = new MessageActionRow().addComponents([buttonAgua, buttonSuco, buttonRefrigerante, buttonCafe, buttonEnergetico]);
							const bebidas2 = new MessageActionRow().addComponents([buttonCerveja, buttonVoltar]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [bebidas1, bebidas2]
							});

							const filter2 = (interaction) => interaction.isButton() && ['agua', 'suco', 'refrigerante', 'cafe', 'energetico', 'cerveja', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorBebidas = msg.createMessageComponentCollector({
								filter: filter2,
								time: 120000
							});

							collectorBebidas.on('collect', async (b) => {
								if (b.customId === 'agua') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar.`
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[0].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[0].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[0].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[0].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[0].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[0].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[0].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[0].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'suco') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[1].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[1].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[1].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[1].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[1].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[1].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[1].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[1].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'refrigerante') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[2].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[2].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[2].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[2].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[2].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[2].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[2].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[2].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'cafe') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[3].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[3].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[3].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[3].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[3].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[3].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[3].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[3].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'energetico') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[4].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[4].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[4].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[4].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[4].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[4].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[4].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[4].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'cerveja') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja2.bebidas[5].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja2.bebidas[5].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja2.bebidas[5].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.bebidas[5].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja2.bebidas[5].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja2.bebidas[5].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja2.bebidas[5].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja2.bebidas[5].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[5].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja2.bebidas[5].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja2.bebidas[5].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'voltar') {
									await b.deferUpdate();
									collectorBebidas.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorBebidas.on('end', async (collected, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'comidas':
							await b.deferUpdate();

							const loja3 = shop.loja;

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja as comidas que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja3.comidas.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							const buttonSanduiche = new MessageButton().setCustomId('sanduiche').setEmoji('897849546695147551').setStyle('PRIMARY');
							const buttonPizza = new MessageButton().setCustomId('pizza').setEmoji('897849547089399848').setStyle('PRIMARY');
							const buttonBatataFrita = new MessageButton().setCustomId('batatafrita').setEmoji('897849547957612574').setStyle('PRIMARY');
							const buttonMistoQuente = new MessageButton().setCustomId('mistoquente').setEmoji('897849547143913472').setStyle('PRIMARY');
							const buttonCarne = new MessageButton().setCustomId('carne').setEmoji('897849547538186300').setStyle('PRIMARY');
							const buttonTacos = new MessageButton().setCustomId('tacos').setEmoji('897849547206840410').setStyle('PRIMARY');
							const buttonMiojo = new MessageButton().setCustomId('miojo').setEmoji('897849546783223829').setStyle('PRIMARY');
							const buttonVoltar2 = new MessageButton().setCustomId('voltar2').setEmoji('⬅️').setStyle('PRIMARY');
							const comidas1 = new MessageActionRow().addComponents([buttonSanduiche, buttonPizza, buttonBatataFrita, buttonMistoQuente, buttonCarne]);
							const comidas2 = new MessageActionRow().addComponents([buttonTacos, buttonMiojo, buttonVoltar2]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [comidas1, comidas2]
							});

							const filter3 = (interaction) => interaction.isButton() && ['sanduiche', 'pizza', 'batatafrita', 'mistoquente', 'carne', 'tacos', 'miojo', 'voltar2'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorComidas = msg.createMessageComponentCollector({
								filter: filter3,
								time: 120000
							});

							collectorComidas.on('collect', async (b) => {
								if (b.customId === 'sanduiche') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[0].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[0].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[0].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[0].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[0].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[0].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[0].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[0].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'pizza') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[1].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[1].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[1].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[1].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[1].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[1].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[1].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[1].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'batatafrita') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[2].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[2].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[2].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[2].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[2].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[2].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[2].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[2].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'mistoquente') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[3].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[3].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[3].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[3].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[3].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[3].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[3].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[3].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'carne') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[4].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[4].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[4].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[4].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[4].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[4].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[4].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[4].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'tacos') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[5].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[5].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[5].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[5].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[5].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[5].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[5].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[5].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[5].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[5].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[5].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'miojo') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja3.comidas[6].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja3.comidas[6].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja3.comidas[6].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.comidas[6].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja3.comidas[6].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja3.comidas[6].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja3.comidas[6].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja3.comidas[6].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[6].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja3.comidas[6].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja3.comidas[6].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'voltar2') {
									await b.deferUpdate();
									collectorComidas.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorComidas.on('end', async (b, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'doces':
							await b.deferUpdate();

							const loja4 = shop.loja;

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja os docinhos que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja4.doces.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							const buttonRosquinha = new MessageButton().setCustomId('rosquinha').setEmoji('897849546992930867').setStyle('PRIMARY');
							const buttonChocolate = new MessageButton().setCustomId('chocolate').setEmoji('897849546804174848').setStyle('PRIMARY');
							const buttonPipoca = new MessageButton().setCustomId('pipoca').setEmoji('897849547215212584').setStyle('PRIMARY');
							const buttonBolo = new MessageButton().setCustomId('bolo').setEmoji('897849546913247292').setStyle('PRIMARY');
							const buttonCookie = new MessageButton().setCustomId('cookie').setEmoji('897849546720305175').setStyle('PRIMARY');
							const buttonVoltar3 = new MessageButton().setCustomId('voltar3').setEmoji('⬅️').setStyle('PRIMARY');
							const doces1 = new MessageActionRow().addComponents([buttonRosquinha, buttonChocolate, buttonPipoca, buttonBolo, buttonCookie]);
							const doces2 = new MessageActionRow().addComponents([buttonVoltar3]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [doces1, doces2]
							});

							const filter4 = (interaction) => interaction.isButton() && ['rosquinha', 'chocolate', 'pipoca', 'bolo', 'cookie', 'voltar3'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorDoces = msg.createMessageComponentCollector({
								filter: filter4,
								time: 120000
							});

							collectorDoces.on('collect', async (b) => {
								if (b.customId === 'rosquinha') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja4.doces[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja4.doces[0].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja4.doces[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja4.doces[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja4.doces[0].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja4.doces[0].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja4.doces[0].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja4.doces[0].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[0].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja4.doces[0].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja4.doces[0].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'chocolate') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja4.doces[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja4.doces[1].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja4.doces[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja4.doces[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja4.doces[1].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja4.doces[1].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja4.doces[1].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja4.doces[1].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[1].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja4.doces[1].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja4.doces[1].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'pipoca') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja4.doces[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja4.doces[2].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja4.doces[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja4.doces[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja4.doces[2].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja4.doces[2].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja4.doces[2].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja4.doces[2].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[2].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja4.doces[2].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja4.doces[2].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'bolo') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja4.doces[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja4.doces[3].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja4.doces[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja4.doces[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja4.doces[3].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja4.doces[3].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja4.doces[3].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja4.doces[3].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[3].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja4.doces[3].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja4.doces[3].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'cookie') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja4.doces[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja4.doces[4].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja4.doces[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja4.doces[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja4.doces[4].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja4.doces[4].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja4.doces[4].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja4.doces[4].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[4].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja4.doces[4].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja4.doces[4].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'voltar3') {
									await b.deferUpdate();
									collectorDoces.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorDoces.on('end', async (b, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'utilidades':
							await b.deferUpdate();

							const loja5 = shop.loja;

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja os itens utéis que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja5.utilidades.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							const buttonRemedio = new MessageButton().setCustomId('remedio').setEmoji('897849546862919740').setStyle('PRIMARY');
							const buttonVaraDePesca = new MessageButton().setCustomId('varadepesca').setEmoji('891297733774819328').setStyle('PRIMARY');
							const buttonMascara = new MessageButton().setCustomId('mascara').setEmoji('898324362279669851').setStyle('PRIMARY');
							const buttonMochila = new MessageButton().setCustomId('mochila').setEmoji('899007409006215188').setStyle('PRIMARY');
							const buttonPorteDeArmas = new MessageButton().setCustomId('portedearmas').setEmoji('899766443757928489').setStyle('PRIMARY');
							const buttonTransferir = new MessageButton().setCustomId('transferir').setEmoji('900544627097108531').setStyle('PRIMARY');
							const buttonVoltar4 = new MessageButton().setCustomId('voltar4').setEmoji('⬅️').setStyle('PRIMARY');
							const utilidades1 = new MessageActionRow().addComponents([buttonRemedio, buttonVaraDePesca, buttonMascara, buttonMochila, buttonPorteDeArmas]);
							const utilidades2 = new MessageActionRow().addComponents([buttonTransferir, buttonVoltar4]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [utilidades1, utilidades2]
							});

							const filter5 = (interaction) => interaction.isButton() && ['remedio', 'varadepesca', 'mascara', 'mochila', 'portedearmas', 'transferir', 'voltar4'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorUtilidades = msg.createMessageComponentCollector({
								filter: filter5,
								time: 120000
							});

							collectorUtilidades.on('collect', async (b) => {
								if (b.customId === 'remedio') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									const itens = user.inventory;

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									if (itens.find((a) => a.item === loja5.utilidades[0].item)) {
										if (itens.find((a) => a.item === loja5.utilidades[0].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **Remédio** no inventário!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja5.utilidades[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 1) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **2**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja5.utilidades[0].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja5.utilidades[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja5.utilidades[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja5.utilidades[0].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja5.utilidades[0].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja5.utilidades[0].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja5.utilidades[0].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja5.utilidades[0].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja5.utilidades[0].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															inventory: {
																item: loja5.utilidades[0].item,
																emoji: loja5.utilidades[0].emoji,
																id: loja5.utilidades[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja5.utilidades[0].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'varadepesca') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const itens = user.inventory;

									if (itens.find((a) => a.item === loja5.utilidades[1].item)) {
										if (itens.find((a) => a.item === loja5.utilidades[1].item).quantia === 5) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **Varas de Pesca** no inventário!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja5.utilidades[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 5) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **6**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja5.utilidades[1].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja5.utilidades[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja5.utilidades[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja5.utilidades[1].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja5.utilidades[1].preco
													}
												});

												if (user.inventory.find((a) => a.item === loja5.utilidades[1].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': loja5.utilidades[1].item
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === loja5.utilidades[1].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja5.utilidades[1].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															inventory: {
																item: loja5.utilidades[1].item,
																emoji: loja5.utilidades[1].emoji,
																id: loja5.utilidades[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja5.utilidades[1].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'mascara') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja5.utilidades[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja5.utilidades[2].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja5.utilidades[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja5.utilidades[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja5.utilidades[2].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja5.utilidades[2].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja5.utilidades[2].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja5.utilidades[2].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja5.utilidades[2].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja5.utilidades[2].preco * Number(ce.content)
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
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja5.utilidades[2].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'mochila') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									if (user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você já possui uma **Mochila**!'
										});
									}

									if (user.saldo < loja5.utilidades[3].preco) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||'
										});
									} else {
										message.reply({
											content: `Você comprou \`x1\` **${loja5.utilidades[3].item}(s)** com sucesso!`
										});

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja5.utilidades[3].preco
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
								} else if (b.customId === 'portedearmas') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.level < 2) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ser level **2** para comprar um Porte de Armas!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item!'
										});
									}

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									if (user.mochila.find((a) => a.item === loja5.utilidades[4].item)) {
										if (user.mochila.find((a) => a.item === loja5.utilidades[4].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **Porte de Armas** na mochila!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja5.utilidades[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 1) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **2**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja5.utilidades[4].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja5.utilidades[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja5.utilidades[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja5.utilidades[4].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja5.utilidades[4].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja5.utilidades[4].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja5.utilidades[4].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja5.utilidades[4].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja5.utilidades[4].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: loja5.utilidades[4].item,
																emoji: loja5.utilidades[4].emoji,
																id: loja5.utilidades[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja5.utilidades[4].preco * Number(ce.content),
															porteDeArmas: 0
														}
													});

													user.save();

													setTimeout(async () => {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$set: {
																porteDeArmas: Date.now()
															}
														});
													}, 1000 * 60);
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'transferir') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												msg.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
												});
											}
										}
									}

									message.reply({
										content: `Quantas(os) **${loja5.utilidades[5].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja5.utilidades[5].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja5.utilidades[5].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja5.utilidades[5].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja5.utilidades[5].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja5.utilidades[5].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja5.utilidades[5].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja5.utilidades[5].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja5.utilidades[5].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja5.utilidades[5].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: loja5.utilidades[5].item,
																emoji: loja5.utilidades[5].emoji,
																id: loja5.utilidades[5].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja5.utilidades[5].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'voltar4') {
									await b.deferUpdate();
									collectorUtilidades.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorUtilidades.on('end', async (b, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'policia':
							await b.deferUpdate();

							const loja6 = shop.loja;

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja os itens da Polícia que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja6.pm.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							const buttonAlgemas = new MessageButton().setCustomId('algemas').setEmoji('898326104413188157').setStyle('PRIMARY');
							const buttonMp5 = new MessageButton().setCustomId('mp5').setEmoji('901117948180168724').setStyle('PRIMARY');
							const buttonG18 = new MessageButton().setCustomId('g18').setEmoji('901117282003075072').setStyle('PRIMARY');
							const buttonMunicaoPistola = new MessageButton().setCustomId('pistola').setEmoji('905653668643241985').setStyle('PRIMARY');
							const buttonMunicaoMetralhadora = new MessageButton().setCustomId('metralhadora').setEmoji('905653521846784080').setStyle('PRIMARY');
							const buttonVoltar5 = new MessageButton().setCustomId('voltar5').setEmoji('⬅️').setStyle('PRIMARY');
							const policia1 = new MessageActionRow().addComponents([buttonAlgemas, buttonMp5, buttonG18, buttonMunicaoPistola, buttonMunicaoMetralhadora]);
							const policia2 = new MessageActionRow().addComponents([buttonVoltar5]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [policia1, policia2]
							});

							const filter6 = (interaction) => interaction.isButton() && ['algemas', 'mp5', 'g18', 'pistola', 'metralhadora', 'voltar5'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorPolicia = msg.createMessageComponentCollector({
								filter: filter6,
								time: 120000
							});

							collectorPolicia.on('collect', async (b) => {
								if (b.customId === 'algemas') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const server2 = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
										return message.reply({
											content: 'Você não é Policial ou Delegado do servidor para comprar este item!'
										});
									}

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja6.pm[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja6.pm[0].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja6.pm[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja6.pm[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja6.pm[0].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja6.pm[0].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja6.pm[0].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja6.pm[0].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[0].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja6.pm[0].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: loja6.pm[0].item,
																emoji: loja6.pm[0].emoji,
																id: loja6.pm[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja6.pm[0].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'mp5') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const server2 = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
										return message.reply({
											content: 'Você não é Policial ou Delegado do servidor para comprar este item!'
										});
									}

									const itens = user.mochila;

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									if (itens.find((a) => a.item === loja6.pm[1].item)) {
										if (itens.find((a) => a.item === loja6.pm[1].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **MP5** na mochila!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja6.pm[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 1) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **2**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => a.delete(), 8000);
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja6.pm[1].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja6.pm[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja6.pm[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja6.pm[1].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja6.pm[1].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja6.pm[1].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja6.pm[1].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[1].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja6.pm[1].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: loja6.pm[1].item,
																emoji: loja6.pm[1].emoji,
																id: loja6.pm[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja6.pm[1].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'g18') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const server2 = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
										return message.reply({
											content: 'Você não é Policial ou Delegado do servidor para comprar este item!'
										});
									}

									const itens = user.mochila;

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									if (itens.find((a) => a.item === loja6.pm[2].item)) {
										if (itens.find((a) => a.item === loja6.pm[2].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **G18** no inventário!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja6.pm[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 1) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **2**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => a.delete(), 8000);
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja6.pm[2].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja6.pm[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja6.pm[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja6.pm[2].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja6.pm[2].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja6.pm[2].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja6.pm[2].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[2].item).quantia += Number(ce.content),
															saldo: user.saldo -= loja6.pm[2].preco * Number(ce.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: loja6.pm[2].item,
																emoji: loja6.pm[2].emoji,
																id: loja6.pm[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: Number(ce.content)
															}
														},
														$set: {
															saldo: user.saldo -= loja6.pm[2].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'pistola') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const server2 = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
										return message.reply({
											content: 'Você não é Policial ou Delegado do servidor para comprar este item!'
										});
									}

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja6.pm[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja6.pm[3].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja6.pm[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja6.pm[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content * 5)}\` **${loja6.pm[3].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja6.pm[3].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja6.pm[3].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja6.pm[3].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[3].item).quantia += Number(ce.content * 5),
															saldo: user.saldo -= loja6.pm[3].preco * Number(ce.content)
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
																quantia: Number(ce.content * 5)
															}
														},
														$set: {
															saldo: user.saldo -= loja6.pm[3].preco * Number(ce.content)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'metralhadora') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (!user.isMochila) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!'
										});
									}

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const server2 = await this.client.database.guilds.findOne({
										_id: message.guild.id
									});

									if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
										return message.reply({
											content: 'Você não é Policial ou Delegado do servidor para comprar este item!'
										});
									}

									if (user.mochila.length > 0) {
										if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Sua **mochila** está cheia. Use algum item, para liberar espaço!'
											});
										}
									}

									message.reply({
										content: `Quantas(os) **${loja6.pm[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
									}).then(async (as) => {
										const filterCollector = m => {
											return m.author.id === author.id && !isNaN(m.content);
										};

										const collectorMessage = as.channel.createMessageCollector({
											filter: filterCollector,
											time: 60000
										});

										collectorMessage.on('collect', async (ce) => {
											const user3 = await this.client.database.users.findOne({
												userId: author.id,
												guildId: message.guild.id
											});

											if (isNaN(ce.content)) {
												ce.delete();
												message.reply({
													content: 'Você precisa colocar um valor válido.'
												}).then((b) => setTimeout(() => b.delete(), 8000));
											} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
												ce.delete();
												message.reply({
													content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else if (Number(ce.content) === 0) {
												collectorMessage.stop();
												ce.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Compra cancelada com sucesso!'
												});
											} else if (user3.saldo < loja6.pm[4].preco * Number(ce.content)) {
												ce.delete();
												message.reply({
													content: `Você precisa de **R$${Utils.numberFormat(loja6.pm[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja6.pm[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
												}).then((a) => setTimeout(() => a.delete(), 8000));
											} else {
												ce.delete();
												collectorMessage.stop();

												message.reply({
													content: `Você comprou \`x${Number(ce.content)}\` **${loja6.pm[4].item}(s)** com sucesso!`
												});
												as.delete();

												const server = await this.client.database.guilds.findOne({
													_id: message.guild.id
												});

												await this.client.database.guilds.findOneAndUpdate({
													_id: message.guild.id
												}, {
													$set: {
														bank: server.bank += loja6.pm[4].preco
													}
												});

												if (user.mochila.find((a) => a.item === loja6.pm[4].item)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': loja6.pm[4].item
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[4].item).quantia += Number(ce.content * 5),
															saldo: user.saldo -= loja6.pm[4].preco * Number(ce.content)
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
																quantia: Number(ce.content * 5)
															}
														},
														$set: {
															saldo: user.saldo -= loja6.pm[4].preco * Number(ce.content * 5)
														}
													});

													user.save();
												}
											}
										});

										collectorMessage.on('end', async (collected, reason) => {
											if (reason === 'time') {
												as.delete();

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'loja.aberta': false
													}
												});

												return message.reply({
													content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
												});
											}
										});
									});
								} else if (b.customId === 'voltar5') {
									await b.deferUpdate();
									collectorPolicia.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorPolicia.on('end', async (b, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'bitcoin':
							await b.deferUpdate();

							const loja7 = shop.loja;

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': true,
									'loja.canal': msg.channel.id,
									'loja.mensagem': msg.id
								}
							});

							embed.fields = [];

							embed
								.setTitle(`LOJINHA DA ${this.client.user.username}`)
								.setDescription('Veja os itens de BitCoins que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja7.bitcoin.forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **<:btc:908786996535787551> ${Utils.numberFormat(est.preco)}**`, `Descrição: ${est.desc}`);
							});

							const buttonBolso = new MessageButton().setCustomId('bolso').setEmoji('908780753884696706').setStyle('PRIMARY');
							const buttonColete = new MessageButton().setCustomId('colete').setEmoji('919034790940921906').setStyle('PRIMARY');
							const buttonVoltar6 = new MessageButton().setCustomId('voltar6').setEmoji('⬅️').setStyle('PRIMARY');
							const bitcoin1 = new MessageActionRow().addComponents([buttonBolso, buttonColete, buttonVoltar6]);

							msg.edit({
								content: author.toString(),
								embeds: [embed],
								components: [bitcoin1]
							});

							const filter7 = (interaction) => interaction.isButton() && ['bolso', 'colete', 'voltar6'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorBitcoin = msg.createMessageComponentCollector({
								filter: filter7,
								time: 120000
							});

							collectorBitcoin.on('collect', async (b) => {
								if (b.customId === 'bolso') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const itens = user.inventory;

									if (itens.find((a) => a.item === loja7.bitcoin[0].item)) {
										if (itens.find((a) => a.item === loja7.bitcoin[0].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **Bolso** no seu inventário!'
											});
										}
									} else if (user.bitcoin < loja7.bitcoin[0].preco) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não tem BitCoin suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||'
										});
									} else {
										message.reply({
											content: `Você comprou \`x1\` **${loja7.bitcoin[0].item}(s)** com sucesso!`
										});

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja7.bitcoin[0].preco
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												inventory: {
													item: loja7.bitcoin[0].item,
													emoji: loja7.bitcoin[0].emoji,
													id: loja7.bitcoin[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: 1
												}
											},
											$set: {
												bitcoin: user.bitcoin -= loja7.bitcoin[0].preco
											}
										});
									}
								} else if (b.customId === 'colete') {
									await b.deferUpdate();

									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.prisao.isPreso) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não pode comprar esse item, pois você está **preso**!'
										});
									}

									const itens = user.inventory;

									if (itens.find((a) => a.item === loja7.bitcoin[1].item)) {
										if (itens.find((a) => a.item === loja7.bitcoin[1].item).quantia === 1) {
											msg.delete();

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'loja.aberta': false
												}
											});

											return message.reply({
												content: 'Você já tem o máximo de **Colete à Prova de Balas** no seu inventário!'
											});
										}
									} else if (user.bitcoin < loja7.bitcoin[1].preco) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você não tem BitCoin suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||'
										});
									} else {
										message.reply({
											content: `Você comprou \`x1\` **${loja7.bitcoin[1].item}(s)** com sucesso!`
										});

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja7.bitcoin[1].preco
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												inventory: {
													item: loja7.bitcoin[1].item,
													emoji: loja7.bitcoin[1].emoji,
													id: loja7.bitcoin[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: 1
												}
											},
											$set: {
												bitcoin: user.bitcoin -= loja7.bitcoin[1].preco
											}
										});
									}
								} else if (b.customId === 'voltar6') {
									await b.deferUpdate();
									collectorBitcoin.stop();

									embed.fields = [];

									embed
										.setTitle(`LOJINHA DA ${this.client.user.username}`)
										.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
										.setThumbnail(this.client.user.displayAvatarURL())
										.addField('🥂 | Bebidas:', `Clique em 🥂`, true)
										.addField('🍗 | Comidas:', `Clique em 🍗`, true)
										.addField('🧁 | Doces:', `Clique em 🧁`, true)
										.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
										.addField('👮 | Polícia:', `Clique em 👮`, true)
										.addField('<:btc:908786996535787551> | BitCoin:', `Clique em <:btc:908786996535787551>`, true)
										.addField('🌱 | Agro:', `Use o comando: \`${prefix}loja agro\``, true);

									return msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: [botoes, botoes2]
									}).catch(() => null);
								}
							});

							collectorBitcoin.on('end', async (b, reason) => {
								if (reason === 'time') {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'loja.aberta': false
										}
									});

									msg.edit({
										content: author.toString(),
										embeds: [embed],
										components: []
									});
									return;
								}
							});
							break;
						case 'fechar_loja':
							await b.deferUpdate();

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': false
								}
							});

							message.reply({
								content: '🛒 | **Loja** fechada com sucesso!'
							});

							return msg.delete();
					}
				});

				collector.on('end', async (collected, reason) => {
					if (reason === 'time') {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'loja.aberta': false
							}
						});

						return msg.edit({
							content: author.toString(),
							embeds: [embed],
							components: []
						});
					}
				});
			});
		} else if (args[0] === 'agro' || args[0] === 'Agro') {
			const embed = new ClientEmbed(author)
				.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
				.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
				.setThumbnail(this.client.user.displayAvatarURL())
				.addField('🌱 | Sementes:', `Clique em 🌱`, true)
				.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
				.addField('💴 | Vender:', `Clique em 💴`, true);

			const buttonSementes = new MessageButton().setCustomId('sementes').setEmoji('🌱').setStyle('PRIMARY');
			const buttonUtilidades = new MessageButton().setCustomId('utilidades').setEmoji('🛠️').setStyle('PRIMARY');
			const buttonVendas = new MessageButton().setCustomId('vendas').setEmoji('💴').setStyle('PRIMARY');
			const buttonFecharLoja = new MessageButton().setCustomId('fechar_loja').setEmoji('❌').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonSementes, buttonUtilidades, buttonVendas, buttonFecharLoja]);

			const msgTeste = await message.reply({
				content: author.toString(),
				embeds: [embed],
				components: [botoes]
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'loja.aberta': true,
					'loja.canal': msgTeste.channel.id,
					'loja.mensagem': msgTeste.id
				}
			});

			const filter = (interaction) => interaction.isButton() && ['sementes', 'utilidades', 'vendas', 'fechar_loja'].includes(interaction.customId) && interaction.user.id === author.id;

			const collector = msgTeste.createMessageComponentCollector({
				filter,
				time: 120000
			});

			collector.on('collect', async (b) => {
				if (b.customId === 'sementes') {
					await b.deferUpdate();

					const loja2 = shop.loja;

					embed.fields = [];

					let pagina = 0;

					embed
						.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
						.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja2.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonMaca = new MessageButton().setCustomId('maca').setEmoji('911706991783735306').setStyle('PRIMARY');
					const buttonBanana = new MessageButton().setCustomId('banana').setEmoji('911706991297187851').setStyle('PRIMARY');
					const buttonLaranja = new MessageButton().setCustomId('laranja').setEmoji('911706992056365176').setStyle('PRIMARY');
					const buttonLimao = new MessageButton().setCustomId('limao').setEmoji('911706991217496075').setStyle('PRIMARY');
					const buttonPera = new MessageButton().setCustomId('pera').setEmoji('911706991796301874').setStyle('PRIMARY');
					const buttonMorango = new MessageButton().setCustomId('morango').setEmoji('911706991280410755').setStyle('PRIMARY');
					const buttonTomate = new MessageButton().setCustomId('tomate').setEmoji('911706991599173653').setStyle('PRIMARY');
					const buttonAbacaxi = new MessageButton().setCustomId('abacaxi').setEmoji('911706991804678144').setStyle('PRIMARY');
					const buttonMelao = new MessageButton().setCustomId('melao').setEmoji('911706991766933574').setStyle('PRIMARY');
					const buttonManga = new MessageButton().setCustomId('manga').setEmoji('911706991594995732').setStyle('PRIMARY');
					const buttonPessego = new MessageButton().setCustomId('pessego').setEmoji('911706991632736316').setStyle('PRIMARY');
					const buttonCereja = new MessageButton().setCustomId('cereja').setEmoji('911706991934734406').setStyle('PRIMARY');
					const buttonMelancia = new MessageButton().setCustomId('melancia').setEmoji('911706991808884776').setStyle('PRIMARY');
					const buttonCafe = new MessageButton().setCustomId('cafe').setEmoji('911706991615950898').setStyle('PRIMARY');
					const buttonMilho = new MessageButton().setCustomId('milho').setEmoji('911706992400298056').setStyle('PRIMARY');
					const buttonArroz = new MessageButton().setCustomId('arroz').setEmoji('911706991670493214').setStyle('PRIMARY');
					const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const buttonFechar = new MessageButton().setCustomId('fechar').setEmoji('❌').setStyle('PRIMARY');
					const sementes1 = new MessageActionRow().addComponents([buttonMaca, buttonBanana, buttonLaranja, buttonLimao]);
					const sementes2 = new MessageActionRow().addComponents([buttonPera, buttonMorango, buttonTomate, buttonAbacaxi]);
					const sementes3 = new MessageActionRow().addComponents([buttonMelao, buttonManga, buttonPessego, buttonCereja]);
					const sementes4 = new MessageActionRow().addComponents([buttonMelancia, buttonCafe, buttonMilho, buttonArroz]);
					const ir = new MessageActionRow().addComponents([buttonIr, buttonFechar]);
					const voltar = new MessageActionRow().addComponents([buttonVoltar, buttonFechar]);

					msgTeste.edit({
						content: author.toString(),
						embeds: [embed],
						components: [sementes1, sementes2, ir]
					});

					const filter2 = (interaction) => interaction.isButton() && ['maca', 'banana', 'laranja', 'limao', 'pera', 'morango', 'tomate', 'abacaxi', 'melao', 'manga', 'pessego', 'cereja', 'melancia', 'cafe', 'milho', 'arroz', 'ir', 'voltar', 'fechar'].includes(interaction.customId) && interaction.user.id === author.id;

					const collectorSementes = msgTeste.createMessageComponentCollector({
						filter: filter2,
						time: 120000
					});

					collectorSementes.on('collect', async (b) => {
						if (b.customId === 'maca') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}
							message.reply({
								content: `Quantas(os) **${loja2.sementes[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[0].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[0].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[0].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[0].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[0].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[0].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[0].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[0].item,
														emoji: loja2.sementes[0].emoji,
														id: loja2.sementes[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[0].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'banana') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[1].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[1].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[1].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[1].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[1].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[1].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[1].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[1].item,
														emoji: loja2.sementes[1].emoji,
														id: loja2.sementes[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[1].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'laranja') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[2].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[2].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[2].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[2].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[2].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[2].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[2].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[2].item,
														emoji: loja2.sementes[2].emoji,
														id: loja2.sementes[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[2].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'limao') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[3].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[3].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[3].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[3].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[3].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[3].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[3].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[3].item,
														emoji: loja2.sementes[3].emoji,
														id: loja2.sementes[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[3].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'pera') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[4].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[4].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[4].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[4].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[4].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[4].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[4].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[4].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[4].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[4].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[4].item,
														emoji: loja2.sementes[4].emoji,
														id: loja2.sementes[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[4].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'morango') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[5].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[5].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[5].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[5].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[5].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[5].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[5].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[5].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[5].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[5].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[5].item,
														emoji: loja2.sementes[5].emoji,
														id: loja2.sementes[5].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[5].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'tomate') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[6].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[6].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[6].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[6].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[6].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[6].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[6].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[6].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[6].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[6].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[6].item,
														emoji: loja2.sementes[6].emoji,
														id: loja2.sementes[6].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[6].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'abacaxi') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[7].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[7].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[7].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[7].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[7].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[7].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[7].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[7].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[7].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[7].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[7].item,
														emoji: loja2.sementes[7].emoji,
														id: loja2.sementes[7].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[7].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'ir') {
							await b.deferUpdate();

							if (pagina !== ~~(loja2.sementes.length / 10)) {
								pagina++;
							}

							const loja3 = shop.loja;

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja3.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [sementes3, sementes4, voltar]
							});
						} else if (b.customId === 'voltar') {
							await b.deferUpdate();

							if (pagina <= 0) {
								pagina = 0;
							} else {
								pagina--;
							}

							const loja4 = shop.loja;

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja4.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [sementes1, sementes2, ir]
							});
						} else if (b.customId === 'melao') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[8].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[8].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[8].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[8].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[8].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[8].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[8].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[8].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[8].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[8].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[8].item,
														emoji: loja2.sementes[8].emoji,
														id: loja2.sementes[8].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[8].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'manga') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[9].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[9].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[9].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[9].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[9].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[9].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[9].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[9].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[9].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[9].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[9].item,
														emoji: loja2.sementes[9].emoji,
														id: loja2.sementes[9].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[9].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'pessego') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[10].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[10].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[10].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[10].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[10].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[10].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[10].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[10].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[10].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[10].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[10].item,
														emoji: loja2.sementes[10].emoji,
														id: loja2.sementes[10].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[10].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'cereja') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[11].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[11].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[11].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[11].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[11].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[11].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[11].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[11].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[11].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[11].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[11].item,
														emoji: loja2.sementes[11].emoji,
														id: loja2.sementes[11].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[11].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'melancia') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[12].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[12].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[12].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[12].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[12].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[12].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[12].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[12].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[12].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[12].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[12].item,
														emoji: loja2.sementes[12].emoji,
														id: loja2.sementes[12].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[12].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'cafe') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[13].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[13].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[13].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[13].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[13].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[13].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[13].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[13].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[13].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[13].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[13].item,
														emoji: loja2.sementes[13].emoji,
														id: loja2.sementes[13].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[13].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'milho') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[14].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[14].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[14].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[14].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[14].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[14].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[14].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[14].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[14].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[14].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[14].item,
														emoji: loja2.sementes[14].emoji,
														id: loja2.sementes[14].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[14].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'arroz') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja2.sementes[15].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja2.sementes[15].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja2.sementes[15].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja2.sementes[15].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja2.sementes[15].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja2.sementes[15].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[15].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[15].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[15].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja2.sementes[15].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja2.sementes[15].item,
														emoji: loja2.sementes[15].emoji,
														id: loja2.sementes[15].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[15].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'fechar') {
							await b.deferUpdate();
							collectorSementes.stop();

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
								.setThumbnail(this.client.user.displayAvatarURL())
								.addField('🌱 | Sementes:', `Clique em 🌱`, true)
								.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
								.addField('💴 | Vender:', `Clique em 💴`, true);

							return msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).catch(() => null);
						}
					});

					collectorSementes.on('end', async (collected, reason) => {
						if (reason === 'time') {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': false
								}
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: []
							});
							return;
						}
					});
				} else if (b.customId === 'utilidades') {
					await b.deferUpdate();

					const loja3 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
						.setDescription('Veja as Utilidades Agro que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja3.utilidadesAgro.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonAdubo = new MessageButton().setCustomId('adubo').setEmoji('898326104782299166').setStyle('PRIMARY');
					const buttonFertilizante = new MessageButton().setCustomId('fertilizante').setEmoji('898326105126215701').setStyle('PRIMARY');
					const buttonIrrigacao = new MessageButton().setCustomId('irrigacao').setEmoji('898326105361113099').setStyle('PRIMARY');
					const buttonTrator = new MessageButton().setCustomId('trator').setEmoji('911776845144416287').setStyle('PRIMARY');
					// const buttonAgricultor = new MessageButton().setCustomId('agricultor').setEmoji('911776844724969532').setStyle('PRIMARY');
					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const utilidades1 = new MessageActionRow().addComponents([buttonAdubo, buttonFertilizante, buttonIrrigacao, buttonTrator, buttonVoltar]);

					msgTeste.edit({
						content: author.toString(),
						embeds: [embed],
						components: [utilidades1]
					});

					const filter3 = (interaction) => interaction.isButton() && ['adubo', 'fertilizante', 'irrigacao', 'trator', 'agricultor', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

					const collectorUtilidades = msgTeste.createMessageComponentCollector({
						filter: filter3,
						time: 120000
					});

					collectorUtilidades.on('collect', async (b) => {
						if (b.customId === 'adubo') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja3.utilidadesAgro[0].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja3.utilidadesAgro[0].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja3.utilidadesAgro[0].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[0].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[0].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja3.utilidadesAgro[0].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[0].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[0].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[0].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja3.utilidadesAgro[0].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja3.utilidadesAgro[0].item,
														emoji: loja3.utilidadesAgro[0].emoji,
														id: loja3.utilidadesAgro[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[0].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'fertilizante') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja3.utilidadesAgro[1].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja3.utilidadesAgro[1].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja3.utilidadesAgro[1].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[1].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[1].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja3.utilidadesAgro[1].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[1].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[1].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[1].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja3.utilidadesAgro[1].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja3.utilidadesAgro[1].item,
														emoji: loja3.utilidadesAgro[1].emoji,
														id: loja3.utilidadesAgro[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[1].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'irrigacao') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja3.utilidadesAgro[2].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja3.utilidadesAgro[2].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja3.utilidadesAgro[2].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[2].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[2].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja3.utilidadesAgro[2].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[2].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[2].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[2].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja3.utilidadesAgro[2].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja3.utilidadesAgro[2].item,
														emoji: loja3.utilidadesAgro[2].emoji,
														id: loja3.utilidadesAgro[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[2].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'trator') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msgTeste.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
										});
									}
								}
							}

							message.reply({
								content: `Quantas(os) **${loja3.utilidadesAgro[3].item}(s)** você deseja comprar?\nOBS: Digite \`0\` para cancelar. `
							}).then(async (as) => {
								const filterCollector = m => {
									return m.author.id === author.id && !isNaN(m.content);
								};

								const collectorMessage = as.channel.createMessageCollector({
									filter: filterCollector,
									time: 60000
								});

								collectorMessage.on('collect', async (ce) => {
									const user3 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (isNaN(ce.content)) {
										ce.delete();
										message.reply({
											content: 'Você precisa colocar um valor válido.'
										}).then((b) => setTimeout(() => b.delete(), 8000));
									} else if (Number(ce.content) < 0 || Number(ce.content) > 100) {
										ce.delete();
										message.reply({
											content: 'Você precisa enviar uma quantia válida e maior que **0** e menor que **100**. Por favor, envie a quantia novamente no chat!'
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else if (Number(ce.content) === 0) {
										collectorMessage.stop();
										ce.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									} else if (user3.saldo < loja3.utilidadesAgro[3].preco * Number(ce.content)) {
										ce.delete();
										message.reply({
											content: `Você precisa de **R$${Utils.numberFormat(loja3.utilidadesAgro[3].preco * Number(ce.content))}** para comprar \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[3].item}(s)**. Por favor, envie a quantia novamente no chat!`
										}).then((a) => setTimeout(() => a.delete(), 8000));
									} else {
										ce.delete();
										collectorMessage.stop();

										message.reply({
											content: `Você comprou \`x${Number(ce.content)}\` **${loja3.utilidadesAgro[3].item}(s)** com sucesso!`
										});
										as.delete();

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank += loja3.utilidadesAgro[3].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[3].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[3].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[3].item).quantia += Number(ce.content),
													saldo: user.saldo -= loja3.utilidadesAgro[3].preco * Number(ce.content)
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													inventory: {
														item: loja3.utilidadesAgro[3].item,
														emoji: loja3.utilidadesAgro[3].emoji,
														id: loja3.utilidadesAgro[3].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
														quantia: Number(ce.content)
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[3].preco * Number(ce.content)
												}
											});

											user.save();
										}
									}
								});

								collectorMessage.on('end', async (collected, reason) => {
									if (reason === 'time') {
										as.delete();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'loja.aberta': false
											}
										});

										return message.reply({
											content: 'Você demorou demais para enviar a quantia. Use o comando novamente!'
										});
									}
								});
							});
						} else if (b.customId === 'agricultor') {
							await b.deferUpdate();

							//  const user = await this.client.database.users.findOne({
							//  	userId: author.id,
							//  	guildId: message.guild.id
							//  });

							//  if (user3.saldo < loja3.utilidadesAgro[4].preco) {
							//  	return message.reply('você não tem saldo suficiente para comprar o Agricultor! ||"SEU(A) POBRE!!!!!"||');
							//  } else {
							//  	message.reply({ content: `Você comprou o item \`Agricultor\` com sucesso!`).then((a) => a.delete(), 7000);

							//  	const server = await this.client.database.guilds.findOne({
							//  		_id: message.guild.id
							//  	});

							//  	await this.client.database.guilds.findOneAndUpdate({
							//  		_id: message.guild.id
							//  	}, {
							//  		$set: {
							//  			bank: server.bank += loja3.utilidadesAgro[4].preco
							//  		}
							//  	});

							//  	if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[4].item)) {
							//  		await this.client.database.users.findOneAndUpdate({
							//  			userId: author.id,
							//  			guildId: message.guild.id,
							//  			'inventory.item': loja3.utilidadesAgro[4].item
							//  		}, {
							//  			$set: {
							//  				'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[4].item).quantia + 1,
							//  				saldo: user.saldo -= loja3.utilidadesAgro[4].preco
							//  			}
							//  		});
							//  	} else {
							//  		await this.client.database.users.findOneAndUpdate({
							//  			userId: author.id,
							//  			guildId: message.guild.id
							//  		}, {
							//  			$push: {
							//  				inventory: {
							//  					item: loja3.utilidadesAgro[4].item,
							//  					emoji: loja3.utilidadesAgro[4].emoji,
							//  					id: loja3.utilidadesAgro[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
							//  					quantia: 1
							//  				}
							//  			},
							//  			$set: {
							//  				saldo: user.saldo -= loja3.utilidadesAgro[4].preco
							//  			}
							//  		});

							//  		user.save();
							//  	}

							//  	return;
							//  }

							return message.reply('**AGRICULTOR EM MANUTENÇÃO!**');
						} else if (b.customId === 'voltar') {
							await b.deferUpdate();
							collectorUtilidades.stop();

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
								.setThumbnail(this.client.user.displayAvatarURL())
								.addField('🌱 | Sementes:', `Clique em 🌱`, true)
								.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
								.addField('💴 | Vender:', `Clique em 💴`, true);

							return msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).catch(() => null);
						}
					});

					collectorUtilidades.on('end', async (collected, reason) => {
						if (reason === 'time') {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': false
								}
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: []
							});
							return;
						}
					});
				} else if (b.customId === 'vendas') {
					await b.deferUpdate();

					const loja4 = shop.loja;

					embed.fields = [];

					let pagina = 0;

					embed
						.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
						.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja4.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item.replace('Semente de ', '')}:`, `Venda: **R$${Utils.numberFormat(est.venda)},00**`, true);
					});

					const buttonMaca = new MessageButton().setCustomId('maca').setEmoji('911706991783735306').setStyle('PRIMARY');
					const buttonBanana = new MessageButton().setCustomId('banana').setEmoji('911706991297187851').setStyle('PRIMARY');
					const buttonLaranja = new MessageButton().setCustomId('laranja').setEmoji('911706992056365176').setStyle('PRIMARY');
					const buttonLimao = new MessageButton().setCustomId('limao').setEmoji('911706991217496075').setStyle('PRIMARY');
					const buttonPera = new MessageButton().setCustomId('pera').setEmoji('911706991796301874').setStyle('PRIMARY');
					const buttonMorango = new MessageButton().setCustomId('morango').setEmoji('911706991280410755').setStyle('PRIMARY');
					const buttonTomate = new MessageButton().setCustomId('tomate').setEmoji('911706991599173653').setStyle('PRIMARY');
					const buttonAbacaxi = new MessageButton().setCustomId('abacaxi').setEmoji('911706991804678144').setStyle('PRIMARY');
					const buttonMelao = new MessageButton().setCustomId('melao').setEmoji('911706991766933574').setStyle('PRIMARY');
					const buttonManga = new MessageButton().setCustomId('manga').setEmoji('911706991594995732').setStyle('PRIMARY');
					const buttonPessego = new MessageButton().setCustomId('pessego').setEmoji('911706991632736316').setStyle('PRIMARY');
					const buttonCereja = new MessageButton().setCustomId('cereja').setEmoji('911706991934734406').setStyle('PRIMARY');
					const buttonMelancia = new MessageButton().setCustomId('melancia').setEmoji('911706991808884776').setStyle('PRIMARY');
					const buttonCafe = new MessageButton().setCustomId('cafe').setEmoji('911706991615950898').setStyle('PRIMARY');
					const buttonMilho = new MessageButton().setCustomId('milho').setEmoji('911706992400298056').setStyle('PRIMARY');
					const buttonArroz = new MessageButton().setCustomId('arroz').setEmoji('911706991670493214').setStyle('PRIMARY');
					const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const buttonFechar = new MessageButton().setCustomId('fechar').setEmoji('❌').setStyle('PRIMARY');
					const sementes1 = new MessageActionRow().addComponents([buttonMaca, buttonBanana, buttonLaranja, buttonLimao]);
					const sementes2 = new MessageActionRow().addComponents([buttonPera, buttonMorango, buttonTomate, buttonAbacaxi]);
					const sementes3 = new MessageActionRow().addComponents([buttonMelao, buttonManga, buttonPessego, buttonCereja]);
					const sementes4 = new MessageActionRow().addComponents([buttonMelancia, buttonCafe, buttonMilho, buttonArroz]);
					const ir = new MessageActionRow().addComponents([buttonIr, buttonFechar]);
					const voltar = new MessageActionRow().addComponents([buttonVoltar, buttonFechar]);

					msgTeste.edit({
						content: author.toString(),
						embeds: [embed],
						components: [sementes1, sementes2, ir]
					});

					const filter2 = (interaction) => interaction.isButton() && ['maca', 'banana', 'laranja', 'limao', 'pera', 'morango', 'tomate', 'abacaxi', 'melao', 'manga', 'pessego', 'cereja', 'melancia', 'cafe', 'milho', 'arroz', 'ir', 'voltar', 'fechar'].includes(interaction.customId) && interaction.user.id === author.id;

					const collectorSementes = msgTeste.createMessageComponentCollector({
						filter: filter2,
						time: 120000
					});

					collectorSementes.on('collect', async (b) => {
						if (b.customId === 'maca') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[0].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[0].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[0].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[0].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[0].item.replace('Semente de ', '')).quantia * loja4.sementes[0].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[0].item.replace('Semente de ', '')).quantia * loja4.sementes[0].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[0].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'banana') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[1].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[1].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[1].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[1].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[1].item.replace('Semente de ', '')).quantia * loja4.sementes[1].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[1].item.replace('Semente de ', '')).quantia * loja4.sementes[1].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[1].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'laranja') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[2].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[2].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[2].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[2].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[2].item.replace('Semente de ', '')).quantia * loja4.sementes[2].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[2].item.replace('Semente de ', '')).quantia * loja4.sementes[2].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[2].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'limao') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[3].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[3].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[3].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[3].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[3].item.replace('Semente de ', '')).quantia * loja4.sementes[3].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[3].item.replace('Semente de ', '')).quantia * loja4.sementes[3].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[3].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'pera') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[4].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[4].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[4].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[4].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[4].item.replace('Semente de ', '')).quantia * loja4.sementes[4].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[4].item.replace('Semente de ', '')).quantia * loja4.sementes[4].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[4].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'morango') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[5].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[5].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[5].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[5].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[5].item.replace('Semente de ', '')).quantia * loja4.sementes[5].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[5].item.replace('Semente de ', '')).quantia * loja4.sementes[5].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[5].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'tomate') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[6].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[6].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[6].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[6].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[6].item.replace('Semente de ', '')).quantia * loja4.sementes[6].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[6].item.replace('Semente de ', '')).quantia * loja4.sementes[6].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[6].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'abacaxi') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[7].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[7].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[7].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[7].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[7].item.replace('Semente de ', '')).quantia * loja4.sementes[7].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[7].item.replace('Semente de ', '')).quantia * loja4.sementes[7].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[7].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'ir') {
							await b.deferUpdate();

							if (pagina !== ~~(loja4.sementes.length / 10)) {
								pagina++;
							}

							const loja3 = shop.loja;

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja3.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item.replace('Semente de ', '')}:`, `Venda: **R$${Utils.numberFormat(est.venda)},00**`, true);
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [sementes3, sementes4, voltar]
							});
						} else if (b.customId === 'voltar') {
							await b.deferUpdate();

							if (pagina <= 0) {
								pagina = 0;
							} else {
								pagina--;
							}

							const loja5 = shop.loja;

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
								.setThumbnail(this.client.user.displayAvatarURL());

							loja5.sementes.slice(pagina * 8, pagina * 8 + 8).forEach((est) => {
								embed.addField(`${est.emoji} | ${est.item.replace('Semente de ', '')}:`, `Venda: **R$${Utils.numberFormat(est.venda)},00**`, true);
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [sementes1, sementes2, ir]
							});
						} else if (b.customId === 'melao') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[8].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[8].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[8].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[8].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[8].item.replace('Semente de ', '')).quantia * loja4.sementes[8].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[8].item.replace('Semente de ', '')).quantia * loja4.sementes[8].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[8].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'manga') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[9].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[9].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[9].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[9].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[9].item.replace('Semente de ', '')).quantia * loja4.sementes[9].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[9].item.replace('Semente de ', '')).quantia * loja4.sementes[9].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[9].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'pessego') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[10].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[10].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[10].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[10].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[10].item.replace('Semente de ', '')).quantia * loja4.sementes[10].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[10].item.replace('Semente de ', '')).quantia * loja4.sementes[10].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[10].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'cereja') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[11].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[11].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[11].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[11].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[11].item.replace('Semente de ', '')).quantia * loja4.sementes[11].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[11].item.replace('Semente de ', '')).quantia * loja4.sementes[11].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[11].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'melancia') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[12].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[12].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[12].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[12].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[12].item.replace('Semente de ', '')).quantia * loja4.sementes[12].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[12].item.replace('Semente de ', '')).quantia * loja4.sementes[12].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[12].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'cafe') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[13].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[13].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[13].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[13].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[13].item.replace('Semente de ', '')).quantia * loja4.sementes[13].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[13].item.replace('Semente de ', '')).quantia * loja4.sementes[13].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[13].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'milho') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[14].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[14].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[14].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[14].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[14].item.replace('Semente de ', '')).quantia * loja4.sementes[14].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[14].item.replace('Semente de ', '')).quantia * loja4.sementes[14].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[14].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'arroz') {
							await b.deferUpdate();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.caixote.find((a) => a.item === loja4.sementes[15].item.replace('Semente de ', ''))) {
								return message.reply({
									content: `Você não possui **${loja4.sementes[15].item.replace('Semente de ', '')}** no seu caixote. Use \`${prefix}caixote\` para ver suas frutas!`
								});
							} else {
								message.reply({
									content: `Você vendeu \`x${user.caixote.find((a) => a.item === loja4.sementes[15].item.replace('Semente de ', '')).quantia}\` **${loja4.sementes[15].item.replace('Semente de ', '')}** por **R$${Utils.numberFormat(Number(user.caixote.find((a) => a.item === loja4.sementes[15].item.replace('Semente de ', '')).quantia * loja4.sementes[15].venda))}**.`
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										saldo: user.saldo += user.caixote.find((a) => a.item === loja4.sementes[15].item.replace('Semente de ', '')).quantia * loja4.sementes[15].venda
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										caixote: {
											item: loja4.sementes[15].item.replace('Semente de ', '')
										}
									}
								});
							}
						} else if (b.customId === 'fechar') {
							await b.deferUpdate();
							collectorSementes.stop();

							embed.fields = [];

							embed
								.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
								.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
								.setThumbnail(this.client.user.displayAvatarURL())
								.addField('🌱 | Sementes:', `Clique em 🌱`, true)
								.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
								.addField('💴 | Vender:', `Clique em 💴`, true);

							return msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).catch(() => null);
						}
					});

					collectorSementes.on('end', async (collected, reason) => {
						if (reason === 'time') {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'loja.aberta': false
								}
							});

							msgTeste.edit({
								content: author.toString(),
								embeds: [embed],
								components: []
							});
							return;
						}
					});
				} else if (b.customId === 'fechar_loja') {
					await b.deferUpdate();

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'loja.aberta': false
						}
					});

					message.reply({
						content: '🌱 | **Loja Agro** fechada com sucesso!'
					});

					return msgTeste.delete();
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'loja.aberta': false
						}
					});

					return msgTeste.edit({
						content: author.toString(),
						embeds: [embed],
						components: []
					});
				}
			});
		}
	}

};
