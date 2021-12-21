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

		if (user.casas.tipo === '') return message.reply(`você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`);

		const embed = new ClientEmbed(author)
			.setTitle('Adicionar no Baú')
			.setDescription(`Você deseja adicionar o item de onde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then(async (msg) => {
			const collector = msg.channel.createMessageCollector((m) => m.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content === '0') {
					collector.stop();
					msg.delete();
					return message.reply('cancelado com sucesso.');
				} else if (ce.content === '1') {
					collector.stop();
					ce.delete();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itens = user2.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Baú?\n\n${itens || '**Inventário Vazio.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						if (!user2.inventory.length) return;

						for (const emoji of user2.inventory.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => user2.inventory.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

						const objeto = {
							'897849546409906228': 'Água',
							'897849547294916638': 'Suco',
							'891034945085120572': 'Refrigerante',
							'897849547244593162': 'Café',
							'891035343262990366': 'Energético',
							'897849547085217822': 'Cerveja',
							'897849546695147551': 'Sanduíche',
							'897849547089399848': 'Pizza',
							'897849547957612574': 'Batata Frita',
							'897849547143913472': 'Misto Quente',
							'897849547538186300': 'Carne',
							'897849547206840410': 'Tacos',
							'897849546783223829': 'Miojo',
							'897849546992930867': 'Rosquinha',
							'897849546804174848': 'Chocolate',
							'897849547215212584': 'Pipoca',
							'897849546913247292': 'Bolo',
							'897849546720305175': 'Cookie',
							'897849546862919740': 'Remédio',
							'891297733774819328': 'Vara de Pesca',
							'898324362279669851': 'Máscara',
							'899007409006215188': 'Mochila',
							'899766443757928489': 'Porte de Armas',
							'900544627097108531': 'Transferir',
							'898326104413188157': 'Algemas',
							'901117948180168724': 'MP5',
							'901117282003075072': 'G18',
							'905653668643241985': 'Munição Pistola',
							'905653521846784080': 'Munição Metralhadora',
							'908780753884696706': 'Bolso',
							'911706991783735306': 'Semente de Maçã',
							'911706991297187851': 'Semente de Banana',
							'911706992056365176': 'Semente de Laranja',
							'911706991217496075': 'Semente de Limão',
							'911706991796301874': 'Semente de Pêra',
							'911706991280410755': 'Semente de Morango',
							'911706991599173653': 'Semente de Tomate',
							'911706991804678144': 'Semente de Abacaxi',
							'911706991766933574': 'Semente de Melão',
							'911706991594995732': 'Semente de Manga',
							'911706991632736316': 'Semente de Pêssego',
							'911706991934734406': 'Semente de Cereja',
							'911706991808884776': 'Semente de Melancia',
							'911706991615950898': 'Semente de Café',
							'911706992400298056': 'Semente de Milho',
							'911706991670493214': 'Semente de Arroz',
							'898326104782299166': 'Adubo',
							'898326105126215701': 'Fertilizante',
							'898326105361113099': 'Irrigação',
							'911776845144416287': 'Aluguel Trator',
							'911776844724969532': 'Agricultor',
							'901118225520136243': 'Ak-47',
							'901117871764144200': 'UMP',
							'901118143735402536': 'ACR',
							'901118040245149736': 'KNT-308',
							'901117192110739516': 'Desert Eagle',
							'901117447065702501': 'Revolver 38',
							'900544510365405214': 'Chave Micha',
							'898326104866177084': 'Maconha',
							'901118422774071326': 'Cocaína',
							'901118376951304262': 'LSD',
							'901118279530217552': 'Metanfetamina',
							'905653583171706980': 'Munição KNT',
							'918835445780074507': 'Alumínio',
							'918835444794400799': 'Borracha',
							'918835445700378684': 'Caulim',
							'918835446040133652': 'Cobre',
							'918835445746532412': 'Ferro',
							'918835445838774322': 'Plástico',
							'918835445939458088': 'Prata'
						};

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							if (user2.casas.bau.length > 0) {
								if (user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b) >= user2.casas.quantiaItens) {
									sim.stop();
									msg1.delete();

									return message.reply(`seu **baú** está cheio. Use o comando \`${prefix}retirarbau\`!`).then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para o Baú?`);

							msg.edit(author, embed).then(async (msg2) => {
								const resposta = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply('você precisa enviar uma quantia válida maior que **0*. Por favor, use o comando novamente!');
									} else if (Number(ce2.content) > user2.inventory.find((a) => a.item === itemEmoji).quantia) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply(`você não possui tudo isso de \`${itemEmoji}\`. Por favor, use o comando novamente!`);
									} else if (Number(ce2.content) >= user2.casas.quantiaItens) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply(`você precisa colocar uma quantia de até **${user2.casas.quantiaItens - user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b)}**. Por favor, use o comando novamente!`);
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply(`você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para o Baú da(o) sua(seu) **${user2.casas.tipo}** com sucesso!`);

										if (user2.inventory.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user2.inventory.find((a) => a.item === itemEmoji).quantia) {
												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia + Number(ce2.content)
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
														'inventory.$.quantia': user2.inventory.find((a) => a.item === itemEmoji).quantia - Number(ce2.content)
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
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia + user2.inventory.find((a) => a.item === itemEmoji).quantia
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
						return message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e Compre uma!');
					}

					collector.stop();
					ce.delete();

					const itens = user2.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Baú?\n\n${itens || '**Mochila Vazia.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						if (!user2.mochila.length) return;

						for (const emoji of user2.mochila.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => user2.mochila.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

						const objeto = {
							'897849546409906228': 'Água',
							'897849547294916638': 'Suco',
							'891034945085120572': 'Refrigerante',
							'897849547244593162': 'Café',
							'891035343262990366': 'Energético',
							'897849547085217822': 'Cerveja',
							'897849546695147551': 'Sanduíche',
							'897849547089399848': 'Pizza',
							'897849547957612574': 'Batata Frita',
							'897849547143913472': 'Misto Quente',
							'897849547538186300': 'Carne',
							'897849547206840410': 'Tacos',
							'897849546783223829': 'Miojo',
							'897849546992930867': 'Rosquinha',
							'897849546804174848': 'Chocolate',
							'897849547215212584': 'Pipoca',
							'897849546913247292': 'Bolo',
							'897849546720305175': 'Cookie',
							'897849546862919740': 'Remédio',
							'891297733774819328': 'Vara de Pesca',
							'898324362279669851': 'Máscara',
							'899007409006215188': 'Mochila',
							'899766443757928489': 'Porte de Armas',
							'900544627097108531': 'Transferir',
							'898326104413188157': 'Algemas',
							'901117948180168724': 'MP5',
							'901117282003075072': 'G18',
							'905653668643241985': 'Munição Pistola',
							'905653521846784080': 'Munição Metralhadora',
							'908780753884696706': 'Bolso',
							'911706991783735306': 'Semente de Maçã',
							'911706991297187851': 'Semente de Banana',
							'911706992056365176': 'Semente de Laranja',
							'911706991217496075': 'Semente de Limão',
							'911706991796301874': 'Semente de Pêra',
							'911706991280410755': 'Semente de Morango',
							'911706991599173653': 'Semente de Tomate',
							'911706991804678144': 'Semente de Abacaxi',
							'911706991766933574': 'Semente de Melão',
							'911706991594995732': 'Semente de Manga',
							'911706991632736316': 'Semente de Pêssego',
							'911706991934734406': 'Semente de Cereja',
							'911706991808884776': 'Semente de Melancia',
							'911706991615950898': 'Semente de Café',
							'911706992400298056': 'Semente de Milho',
							'911706991670493214': 'Semente de Arroz',
							'898326104782299166': 'Adubo',
							'898326105126215701': 'Fertilizante',
							'898326105361113099': 'Irrigação',
							'911776845144416287': 'Aluguel Trator',
							'911776844724969532': 'Agricultor',
							'901118225520136243': 'Ak-47',
							'901117871764144200': 'UMP',
							'901118143735402536': 'ACR',
							'901118040245149736': 'KNT-308',
							'901117192110739516': 'Desert Eagle',
							'901117447065702501': 'Revolver 38',
							'900544510365405214': 'Chave Micha',
							'898326104866177084': 'Maconha',
							'901118422774071326': 'Cocaína',
							'901118376951304262': 'LSD',
							'901118279530217552': 'Metanfetamina',
							'905653583171706980': 'Munição KNT',
							'918835445780074507': 'Alumínio',
							'918835444794400799': 'Borracha',
							'918835445700378684': 'Caulim',
							'918835446040133652': 'Cobre',
							'918835445746532412': 'Ferro',
							'918835445838774322': 'Plástico',
							'918835445939458088': 'Prata'
						};

						sim.on('collect', async (collected) => {
							if (user2.casas.bau.length > 0) {
								if (user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b) >= user2.casas.quantiaItens) {
									sim.stop();
									msg1.delete();

									return message.reply(`seu **baú** está cheio. Use o comando \`${prefix}retirarbau\`!`).then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para o Baú?`);

							msg.edit(author, embed).then(async (msg2) => {
								const resposta = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										message.reply('você precisa enviar uma quantia válida e maior que **0*. Por favor, envie a quantia novamente no chat!');
									} else if (Number(ce2.content) > user2.mochila.find((a) => a.item === itemEmoji).quantia) {
										message.reply(`você não possui tudo isso de \`${itemEmoji}\`. Por favor, envie a quantia novamente no chat!`);
									} else if (Number(ce2.content) >= user2.casas.quantiaItens) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply(`você precisa colocar uma quantia de até **${user2.casas.quantiaItens - user2.casas.bau.map((a) => a.quantia).reduce((a, b) => a + b)}**. Por favor, use o comando novamente!`);
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply(`você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para o Baú da(o) sua(seu) **${user2.casas.tipo}** com sucesso!`);

										if (user2.mochila.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user2.mochila.find((a) => a.item === itemEmoji).quantia) {
												if (user2.casas.bau.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'casas.bau.item': itemEmoji
													}, {
														$set: {
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia + Number(ce2.content)
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
														'mochila.$.quantia': user2.mochila.find((a) => a.item === itemEmoji).quantia - Number(ce2.content)
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
															'casas.bau.$.quantia': user2.casas.bau.find((a) => a.item === itemEmoji).quantia + user2.mochila.find((a) => a.item === itemEmoji).quantia
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
					return message.reply('número não encontrado. Por favor, use o comando novamente!');
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.reply('você demorou demais para escolher. Use o comando novamente!');
				}
			});
		});
	}

};
