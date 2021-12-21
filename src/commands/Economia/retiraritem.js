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

		const embed = new ClientEmbed(author)
			.setTitle('Retirar Item')
			.setDescription(`De onde você deseja retirar seu item?\n\n**1️⃣ - Inventário**\n**2️⃣ - Mochila**\n\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then((msg) => {
			const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (r) => {
				if (Number(r.content) === 0) {
					collector.stop();
					r.delete();
					msg.delete();
				} else if (isNaN(r.content)) {
					message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite o número novamente!').then((a) => a.delete({
						timeout: 6000
					}));
					r.delete();
				} else if (!parseInt(r.content)) {
					message.reply('você precisa colocar um número válido. Digite o número novamente!').then((a) => a.delete({
						timeout: 6000
					}));
					r.delete();
				} else if (Number(r.content) === 1) {
					collector.stop();

					const itens = user.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					const embedInv = new ClientEmbed(author)
						.setTitle(`Retirar Item do Inventário`)
						.setThumbnail(author.displayAvatarURL({
							dynamic: true
						}))
						.setDescription(itens || '**Inventário Vazio.**');

					msg.delete();
					message.channel.send(author, embedInv).then(async (msg2) => {
						for (const emoji of user.inventory.map((es) => es.id)) await msg2.react(emoji);

						const filter = (reaction, user3) => user.inventory.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;

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

						msg2.awaitReactions(filter, {
							max: 1
						}).then(async (collected) => {
							const itemEmoji = objeto[collected.first().emoji.id];

							if (user.inventory.find((x) => x.item === itemEmoji).quantia > 1) {
								message.reply(`quanto(a)(s) **${itemEmoji}(s)** você deseja retirar do seu **Inventário**?`).then(async (msg3) => {
									const collector2 = msg3.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
										time: 60000
									});

									collector2.on('collect', async (r2) => {
										if (Number(r2.content) <= 0) {
											message.reply('você precisa colocar uma quantia **maior** que 0. Digite a quantia novamente!').then((a) => a.delete({
												timeout: 6000
											}));
											r2.delete();
										} else if (isNaN(r2.content)) {
											message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite a quantia novamente!').then((a) => a.delete({
												timeout: 6000
											}));
											r2.delete();
										} else if (Number(r2.content) > user.inventory.find((a) => a.item === itemEmoji).quantia) {
											message.reply('você não tem toda essa quantia para ser retirada. Digite a quantia novamente!').then((a) => a.delete({
												timeout: 6000
											}));
											r2.delete();
										} else {
											collector2.stop();

											msg2.delete();
											message.channel.send(`${author}, você retirou **${Number(r2.content)}** \`${itemEmoji}(s)\` do seu Inventário com sucesso!`);

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
														'inventory.$.quantia': user.inventory.find((a) => a.item === itemEmoji).quantia - Number(r2.content)
													}
												});
											}

											user.save();
										}
									});

									collector2.on('end', async (collected2, reason) => {
										if (reason === 'time') {
											collector2.stop();
											msg3.delete();
											return message.reply('você demorou demais para responder. Use o comando novamente!');
										}
									});
								});
							} else {
								msg2.delete();
								message.channel.send(`${author}, você retirou 1 \`${itemEmoji}\` do seu Inventário com sucesso!`);

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
							}
						});
					});
				} else if (Number(r.content) === 2) {
					if (!user.isMochila) {
						collector.stop();
						return message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e compre uma!');
					} else {
						collector.stop();

						const itens = user.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

						const embedMochila = new ClientEmbed(author)
							.setTitle(`Retirar Item da Mochila`)
							.setThumbnail(author.displayAvatarURL({
								dynamic: true
							}))
							.setDescription(itens || '**Mochila Vazia.**');

						msg.delete();
						message.channel.send(author, embedMochila).then(async (msg3) => {
							for (const emoji of user.mochila.map((es) => es.id)) await msg3.react(emoji);

							const filter = (reaction, user3) => user.mochila.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;

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

							msg3.awaitReactions(filter, {
								max: 1
							}).then(async (collected) => {
								const itemEmoji = objeto[collected.first().emoji.id];

								if (user.mochila.find((x) => x.item === itemEmoji).quantia > 1) {
									message.reply(`quanto(a)(s) **${itemEmoji}(s)** você deseja retirar da sua **Mochila**?`).then(async (msg4) => {
										collector.stop();

										const collector2 = msg4.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
											time: 60000
										});

										collector2.on('collect', async (r2) => {
											if (Number(r2.content) <= 0) {
												message.reply('você precisa colocar uma quantia **maior** que 0. Digite a quantia novamente!').then((a) => a.delete({
													timeout: 6000
												}));
												r2.delete();
											} else if (isNaN(r2.content)) {
												message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite a quantia novamente!').then((a) => a.delete({
													timeout: 6000
												}));
												r2.delete();
											} else if (Number(r2.content) > user.mochila.find((a) => a.item === itemEmoji).quantia) {
												message.reply('você não tem toda essa quantia para ser retirada. Digite a quantia novamente!').then((a) => a.delete({
													timeout: 6000
												}));
												r2.delete();
											} else {
												collector2.stop();

												msg3.delete();
												message.channel.send(`${author}, você retirou **${Number(r2.content)}** \`${itemEmoji}(s)\` da sua Mochila com sucesso!`);

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
															'mochila.$.quantia': user.mochila.find((a) => a.item === itemEmoji).quantia - Number(r2.content)
														}
													});
												}

												user.save();
											}
										});

										collector2.on('end', async (collected2, reason) => {
											if (reason === 'time') {
												collector2.stop();
												msg3.delete();
												return message.reply('você demorou demais para responder. Use o comando novamente!');
											}
										});
									});
								} else {
									message.channel.send(`${author}, você retirou 1 \`${itemEmoji}\` da sua Mochila com sucesso!`);

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
								}
							});
						});
					}
				} else if (Number(r.content) !== 1 && Number(r.content) !== 2) {
					r.delete();
					message.reply('número não encontrado. Digite o número novamente!');
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					collector.stop();
					return message.reply('você demorou demais para escolher de onde você deseja retirar seu item. Use o comando novamente!').then((a) => a.delete({
						timeout: 6000
					}));
				}
			});
		});
	}

};
