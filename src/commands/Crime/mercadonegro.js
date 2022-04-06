/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable no-case-declarations */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable complexity */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Mercadonegro extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'mercadonegro';
		this.category = 'Crime';
		this.description = 'Veja a lista de produtos a venda no Mercado Negro!';
		this.usage = 'mercadonegro';
		this.aliases = ['deepweb', 'darkweb'];

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
		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (userAuthor.inventory.length > 0) {
			if (userAuthor.inventory.find((a) => a.item === 'Bolso')) {
				if (userAuthor.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
					return message.reply({
						content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
					});
				}
			} else if (!userAuthor.inventory.find((a) => a.item === 'Bolso')) {
				if (userAuthor.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
					return message.reply({
						content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
					});
				}
			}
		}

		const confirm = new ClientEmbed(author)
			.setTitle('🏴‍☠️ | Mercado Negro')
			.setDescription(`Você deseja **realmente** ver o Mercado Negro?`);

		const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
		const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
		const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

		const as = await message.reply({
			content: author.toString(),
			embeds: [confirm],
			components: [botoes]
		});

		const filter = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === author.id;

		const collectorBotoes = as.createMessageComponentCollector({
			filter,
			max: 1
		});

		collectorBotoes.on('collect', async (b) => {
			switch (b.customId) {
				case 'negar':
					await b.deferUpdate();

					as.delete();
					return message.reply({
						content: '**Mercado Negro** fechado com sucesso!'
					});

				case 'aceitar':
					await b.deferUpdate();

					as.delete();

					const server = await this.client.database.guilds.findOne({
						_id: message.guild.id
					});

					const mapProdutos = server.mercadoNegro.map((value, index) => ({
						nome: value.nome,
						quantia: value.quantia,
						preco: value.preco,
						dono: value.dono,
						tempo: value.tempo,
						tempo2: value.tempo2,
						emoji: value.emoji,
						id: value.id,
						comprado: value.comprado,
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

					let pagina = 0;

					const embed = new ClientEmbed(author)
						.setTitle('🏴‍☠️ | Mercado Negro');

					mapProdutos.slice(pagina * 10, pagina * 10 + 10).forEach((eu) => {
						const faltam = ms(eu.tempo - (Date.now() - eu.tempo2));

						embedMessage += `${emojis[eu.position + 1]} - **${eu.nome}** - \`x${eu.quantia}\` - R$${Utils.numberFormat(eu.preco)},00 - <@${eu.dono}> - ${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s\n`;
					});

					embed.setDescription(`Estes são os Itens disponíveis no Mercado Negro neste momento:\nDigite o número do item que você deseja comprar.\n\n${!server.mercadoNegro.length ? '**Sem Itens no Mercado Negro no momento!**\n' : embedMessage}\nClique no \`❌\` para fechar o **Mercado Negro**.`);

					const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
					const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
					const buttonFechar = new MessageButton().setCustomId('fechar').setEmoji('❌').setStyle('PRIMARY');
					const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonFechar, buttonIr]);

					const escolha = await message.reply({
						content: author.toString(),
						embeds: [embed],
						components: [botoes]
					});

					const filter2 = (interaction) => interaction.isButton() && ['voltar', 'ir', 'fechar'].includes(interaction.customId) && interaction.user.id === author.id;

					const collectorEscolhas = escolha.createMessageComponentCollector({
						filter: filter2,
						time: 120000
					});

					const filterSim = m => {
						return m.author.id === author.id && !isNaN(m.content);
					};

					const sim = message.channel.createMessageCollector({
						filter: filterSim,
						time: 120000,
						max: 1
					});

					collectorEscolhas.on('collect', async (b) => {
						switch (b.customId) {
							case 'voltar':
								await b.deferUpdate();

								if (pagina <= 0) {
									pagina = 0;
								} else {
									pagina--;
								}

								const server2 = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const mapProdutos2 = server2.mercadoNegro.map((value, index) => ({
									nome: value.nome,
									quantia: value.quantia,
									preco: value.preco,
									dono: value.dono,
									tempo: value.tempo,
									tempo2: value.tempo2,
									emoji: value.emoji,
									id: value.id,
									comprado: value.comprado,
									position: index
								}));

								let embedMessage2 = '';

								const emojis2 = {
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

								const embed2 = new ClientEmbed(author)
									.setTitle('🏴‍☠️ | Mercado Negro');

								mapProdutos2.slice(pagina * 10, pagina * 10 + 10).forEach((eu) => {
									const faltam = ms(eu.tempo - (Date.now() - eu.tempo2));

									embedMessage2 += `${emojis2[eu.position + 1]} - **${eu.nome}** - \`x${eu.quantia}\` - R$${Utils.numberFormat(eu.preco)},00 - <@${eu.dono}> - ${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s\n`;
								});

								embed2.setDescription(`Estes são os Itens disponíveis no Mercado Negro neste momento:\nDigite o número do item que você deseja comprar.\n\n${!server.mercadoNegro.length ? '**Sem Itens no Mercado Negro no momento!**\n' : embedMessage2}\nClique no \`❌\` para fechar o **Mercado Negro**.`);

								escolha.edit({
									content: author.toString(),
									embeds: [embed2]
								});
								break;
							case 'ir':
								await b.deferUpdate();

								if (pagina !== ~~(mapProdutos.length / 10)) {
									pagina++;
								}

								const server22 = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const mapProdutos22 = server22.mercadoNegro.map((value, index) => ({
									nome: value.nome,
									quantia: value.quantia,
									preco: value.preco,
									dono: value.dono,
									tempo: value.tempo,
									tempo2: value.tempo2,
									emoji: value.emoji,
									id: value.id,
									comprado: value.comprado,
									position: index
								}));

								let embedMessage22 = '';

								const emojis22 = {
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

								const embed22 = new ClientEmbed(author)
									.setTitle('🏴‍☠️ | Mercado Negro');

								mapProdutos22.slice(pagina * 10, pagina * 10 + 10).forEach((eu) => {
									const faltam = ms(eu.tempo - (Date.now() - eu.tempo2));

									embedMessage22 += `${emojis22[eu.position + 1]} - **${eu.nome}** - \`x${eu.quantia}\` - R$${Utils.numberFormat(eu.preco)},00 - <@${eu.dono}> - ${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s\n`;
								});

								embed22.setDescription(`Estes são os Itens disponíveis no Mercado Negro neste momento:\nDigite o número do item que você deseja comprar.\n\n${!server.mercadoNegro.length ? '**Sem Itens no Mercado Negro no momento!**\n' : embedMessage22}\nClique no \`❌\` para fechar o **Mercado Negro**.`);

								escolha.edit({
									content: author.toString(),
									embeds: [embed22]
								});
								break;
							case 'fechar':
								await b.deferUpdate();

								sim.stop();
								await escolha.delete();
								return message.reply({
									content: '**Mercado Negro** fechado com sucesso!'
								});
						}
					});

					sim.on('collect', async (ce) => {
						const selected2 = Number(ce.content - 1);
						const findSelectedEvento2 = mapProdutos.find((xis) => xis.position === selected2);

						const mercado = await this.client.database.guilds.findOne({
							_id: message.guild.id
						});

						if (!findSelectedEvento2) {
							sim.stop();
							ce.delete();
							escolha.delete();

							return message.reply({
								content: 'Número não encontrado. Por favor, use o comando novamente!'
							});
						} else if (!mercado.mercadoNegro.find((a) => a.nome === findSelectedEvento2.nome)) {
							sim.stop();
							ce.delete();
							escolha.delete();

							return message.reply({
								content: 'Esse produto não está mais no **Mercado Negro**. Alguém deve ter comprado ele primeiro que você!'
							});
						} else if (findSelectedEvento2.dono === author.id) {
							sim.stop();
							ce.delete();
							escolha.delete();

							return message.reply({
								content: 'Você não pode comprar seu próprio produto!'
							});
						} else {
							sim.stop();
							ce.delete();

							const faltam = ms(findSelectedEvento2.tempo - (Date.now() - findSelectedEvento2.tempo2));

							embed.setDescription(`Você deseja comprar o item?`);
							embed.addField(`Produto:`, findSelectedEvento2.nome);
							embed.addField(`Quantia:`, `\`x${findSelectedEvento2.quantia}\``);
							embed.addField(`Preço:`, `R$${Utils.numberFormat(findSelectedEvento2.preco)},00`);
							embed.addField(`Quem colocou:`, `<@${findSelectedEvento2.dono}>`);
							embed.addField(`Tempo restante:`, `${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s`);

							escolha.delete();

							const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
							const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

							const msg2 = await message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							});

							const filter3 = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorBotoes = msg2.createMessageComponentCollector({
								filter: filter3,
								max: 1
							});

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'negar':
										await b.deferUpdate();

										sim.stop();
										msg2.delete();
										return message.reply({
											content: 'Compra cancelada com sucesso!'
										});
									case 'aceitar':
										await b.deferUpdate();

										const user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										const mercado2 = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										if (!user.isMochila) {
											msg2.delete();

											return message.reply({
												content: 'Você não tem uma **Mochila**. Vá até Loja > Utilidades e Compre uma!'
											});
										} else if (user.banco < findSelectedEvento2.preco) {
											msg2.delete();

											return message.reply({
												content: 'Você não tem esse saldo todo no **banco** para comprar este produto!'
											});
										} else if (!mercado2.mercadoNegro.find((a) => a.nome === findSelectedEvento2.nome)) {
											msg2.delete();

											return message.reply({
												content: 'Esse produto não está mais no **Mercado Negro**. Alguém deve ter comprado ele primeiro que você!'
											});
										} else {
											embed.setDescription(`Produto Comprado com Sucesso!`);
											embed.fields = [];

											const user2 = await this.client.database.users.findOne({
												userId: findSelectedEvento2.dono,
												guildId: message.guild.id
											});

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													banco: user.banco -= findSelectedEvento2.preco
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: findSelectedEvento2.dono,
												guildId: message.guild.id
											}, {
												$set: {
													banco: user2.banco += findSelectedEvento2.preco
												}
											});

											if (findSelectedEvento2.nome === 'Chave Micha' || findSelectedEvento2.nome === 'Maconha' || findSelectedEvento2.nome === 'Cocaína' || findSelectedEvento2.nome === 'LSD' || findSelectedEvento2.nome === 'Metanfetamina' || findSelectedEvento2.nome === 'Munição Metralhadora' || findSelectedEvento2.nome === 'Munição Pistola' || findSelectedEvento2.nome === 'Munição KNT' || findSelectedEvento2.nome === 'Ak-47' || findSelectedEvento2.nome === 'UMP' || findSelectedEvento2.nome === 'MP5' || findSelectedEvento2.nome === 'ACR' || findSelectedEvento2.nome === 'KNT-308' || findSelectedEvento2.nome === 'Desert Eagle' || findSelectedEvento2.nome === 'Revolver 38' || findSelectedEvento2.nome === 'G18' || findSelectedEvento2.nome === 'Máscara' || findSelectedEvento2.nome === 'Porte de Armas' || findSelectedEvento2.nome === 'Algemas') {
												if (user.mochila.find((a) => a.item === findSelectedEvento2.nome)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'mochila.item': findSelectedEvento2.nome
													}, {
														$set: {
															'mochila.$.quantia': user.mochila.find((a) => a.item === findSelectedEvento2.nome).quantia + findSelectedEvento2.quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: findSelectedEvento2.nome,
																emoji: findSelectedEvento2.emoji,
																id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: findSelectedEvento2.quantia
															}
														}
													});
												}
											} else if (findSelectedEvento2.nome !== 'Chave Micha' || findSelectedEvento2.nome !== 'Maconha' || findSelectedEvento2.nome !== 'Cocaína' || findSelectedEvento2.nome !== 'LSD' || findSelectedEvento2.nome !== 'Metanfetamina' || findSelectedEvento2.nome !== 'Munição Metralhadora' || findSelectedEvento2.nome !== 'Munição Pistola' || findSelectedEvento2.nome !== 'Munição KNT' || findSelectedEvento2.nome !== 'Ak-47' || findSelectedEvento2.nome !== 'UMP' || findSelectedEvento2.nome !== 'MP5' || findSelectedEvento2.nome !== 'ACR' || findSelectedEvento2.nome !== 'KNT-308' || findSelectedEvento2.nome !== 'Desert Eagle' || findSelectedEvento2.nome !== 'Revolver 38' || findSelectedEvento2.nome !== 'G18' || findSelectedEvento2.nome !== 'Máscara' || findSelectedEvento2.nome !== 'Porte de Armas' || findSelectedEvento2.nome !== 'Algemas') {
												if (user.inventory.find((a) => a.item === findSelectedEvento2.nome)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': findSelectedEvento2.nome
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === findSelectedEvento2.nome).quantia + findSelectedEvento2.quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$push: {
															inventory: {
																item: findSelectedEvento2.nome,
																emoji: findSelectedEvento2.emoji,
																id: findSelectedEvento2.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
																quantia: findSelectedEvento2.quantia
															}
														}
													});
												}
											}

											await this.client.database.guilds.findOneAndUpdate({
												_id: message.guild.id
											}, {
												$pull: {
													mercadoNegro: {
														nome: findSelectedEvento2.nome
													}
												}
											});

											return msg2.edit({
												content: author.toString(),
												embeds: [embed],
												components: []
											});
										}
								}
							});
						}
					});

					sim.on('end', async (collected, reason) => {
						if (reason === 'time') {
							sim.stop();
							return escolha.delete();
						}
					});
			}
		});
	}

};
