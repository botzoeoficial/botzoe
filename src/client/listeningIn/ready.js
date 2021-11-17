/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Guild = require('../../database/Schemas/Guild'),
	User = require('../../database/Schemas/User'),
	Commands = require('../../database/Schemas/Command'),
	Client = require('../../database/Schemas/Client'),
	Shop = require('../../database/Schemas/Shop');
const c = require('colors');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const cron = require('node-cron');
const Utils = require('../../utils/Util');

module.exports = class Ready {

	constructor(client) {
		this.client = client;
	}

	async run() {
		this.client.database.users = User;
		this.client.database.guilds = Guild;
		this.client.database.clientUtils = Client;
		this.client.database.commands = Commands;
		this.client.database.shop = Shop;

		console.log(c.green('[BOT] - Conectado a API do Discord.'));

		await this.client.user.setActivity(`${this.client.users.cache.size} usuários jogarem na TD2CÚPULA!`, {
			type: 'WATCHING'
		});

		const channelServers = await this.client.channels.cache.get('885645282673590298');
		const channelUsers = await this.client.channels.cache.get('910156012353363998');

		channelServers.setName(`Servidores: ${this.client.guilds.cache.size}`);
		channelUsers.setName(`Usuários: ${this.client.users.cache.size}`);

		const allUsers = await User.find({});
		const allGuilds = await Guild.find({});
		const allItens = await Shop.find({});

		// allGuilds.forEach(async (a) => {
		// 	a.vip.forEach((_, index2) => {
		// 		if (new Date(a.vip[index2].tempo).getTime() - Date.now() > 0) {
		// 			setTimeout(async () => {
		// 				this.client.users.cache.get(a.vip[index2].id).roles.remove('830972296260485189');

		// 				await this.client.database.guilds.findOneAndUpdate({
		// 					_id: a._id
		// 				}, {
		// 					$pull: {
		// 						vip: {
		// 							id: a.vip[index2].id
		// 						}
		// 					}
		// 				});
		// 			}, new Date(a.vip[index2].tempo).getTime() - Date.now());
		// 		} else {
		// 			a.vip[index2].tempo = null;
		// 			// this.client.users.cache.get(a.vip[index2].id).roles.remove('830972296260485189');
		// 		}
		// 	});

		// 	a.save();
		// });

		cron.schedule('*/20 * * * *', async () => {
			const random = Math.floor(Math.random() * 91);

			const server = await this.client.database.guilds.findOne({
				_id: '885645282614861854'
			});

			server.bolsa.valor = random;
			server.bolsa.tempo = Date.now();
			server.save();

			const timeout = 1200000;

			if (timeout - (Date.now() - server.bolsa.tempo) > 0) {
				const faltam = ms(timeout - (Date.now() - server.bolsa.tempo));

				const embed = new ClientEmbed(this.client.users.cache.get('887455458967826523'))
					.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/891826029415510056/gettyimages-1186283017-1-1.jpg?width=905&height=603')
					.setTitle('📈 | **Bolsa de Valores - Zoe Investing**')
					.addField('📉 | Valor da Bolsa', `\`${server.bolsa.valor}.0%\``)
					.setColor('#1cfc03')
					.addField('🕑 | Tempo para Atualização da Bolsa', `${faltam.minutes}m ${faltam.seconds}s\n\n***Faça um Bom Investimento!***`);

				this.client.channels.cache.get('897285158099619880').send(embed);
			}
		});

		allUsers.forEach(async e => {
			if (e.cadastrado) {
				if (!e.payBank.sucess && 518400000 - (Date.now() - e.payBank.cooldown) > 0) {
					await this.client.database.users.findOneAndUpdate({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							saldo: e.banco
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							banco: 0
						}
					});
				}

				if (new Date(e.cooldown.bitcoin).getTime() - Date.now() > 0) {
					setTimeout(() => {
						e.save();
					}, new Date(e.cooldown.bitcoin).getTime() - Date.now());
				} else {
					const user2 = await this.client.database.users.findOne({
						userId: e.userId,
						guildId: e.guildId
					});

					let valor = user2.bitcoin + Number(user2.investimento.investido);

					user2.valor = valor *= 2;
					user2.investimento.investido = 0;
					user2.cooldown.bitcoin = null;
					e.save();
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.fome': e.humores.fome - 1
							}
						});
					}, 7200000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.sede': e.humores.sede - 1
							}
						});
					}, 3600000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.bravo': e.humores.bravo - 1
							}
						});
					}, 3000000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.triste': e.humores.triste - 1
							}
						});
					}, 10800000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.cansado': e.humores.cansado - 1
							}
						});
					}, 2400000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.solitario': e.humores.solitario - 1
							}
						});
					}, 4800000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.desanimado': e.humores.desanimado - 1
							}
						});
					}, 6000000);
				} catch (err) {
					return;
				}

				try {
					setInterval(async () => {
						await this.client.database.users.findOneAndUpdate({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'humores.estressado': e.humores.estressado - 1
							}
						});
					}, 5400000);
				} catch (err) {
					return;
				}
			}
		});

		allItens.forEach(async (e) => {
			allGuilds.forEach(async (i) => {
				setInterval(async () => {
					const server = await this.client.database.guilds.findOne({
						_id: i._id
					});

					const {
						bolsa
					} = server;

					const porcentagem = bolsa.valor / 100;

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[0]
					}, {
						$set: {
							'loja.bebidas.$.preco': 1500 - (porcentagem * 1500)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[1]
					}, {
						$set: {
							'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[2]
					}, {
						$set: {
							'loja.bebidas.$.preco': 1800 - (porcentagem * 1800)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[3]
					}, {
						$set: {
							'loja.bebidas.$.preco': 800 - (porcentagem * 800)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[4]
					}, {
						$set: {
							'loja.bebidas.$.preco': 1200 - (porcentagem * 1200)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.bebidas': e.loja.bebidas[5]
					}, {
						$set: {
							'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[0]
					}, {
						$set: {
							'loja.comidas.$.preco': 2000 - (porcentagem * 2000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[1]
					}, {
						$set: {
							'loja.comidas.$.preco': 1500 - (porcentagem * 1500)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[2]
					}, {
						$set: {
							'loja.comidas.$.preco': 900 - (porcentagem * 900)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[3]
					}, {
						$set: {
							'loja.comidas.$.preco': 600 - (porcentagem * 600)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[4]
					}, {
						$set: {
							'loja.comidas.$.preco': 1000 - (porcentagem * 1000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[5]
					}, {
						$set: {
							'loja.comidas.$.preco': 1200 - (porcentagem * 1200)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.comidas': e.loja.comidas[6]
					}, {
						$set: {
							'loja.comidas.$.preco': 500 - (porcentagem * 500)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.doces': e.loja.doces[0]
					}, {
						$set: {
							'loja.doces.$.preco': 300 - (porcentagem * 300)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.doces': e.loja.doces[1]
					}, {
						$set: {
							'loja.doces.$.preco': 750 - (porcentagem * 750)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.doces': e.loja.doces[2]
					}, {
						$set: {
							'loja.doces.$.preco': 450 - (porcentagem * 450)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.doces': e.loja.doces[3]
					}, {
						$set: {
							'loja.doces.$.preco': 700 - (porcentagem * 700)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.doces': e.loja.doces[4]
					}, {
						$set: {
							'loja.doces.$.preco': 550 - (porcentagem * 550)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.utilidades': e.loja.utilidades[0]
					}, {
						$set: {
							'loja.utilidades.$.preco': 50000 - (porcentagem * 50000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.utilidades': e.loja.utilidades[1]
					}, {
						$set: {
							'loja.utilidades.$.preco': 2000 - (porcentagem * 2000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.utilidades': e.loja.utilidades[2]
					}, {
						$set: {
							'loja.utilidades.$.preco': 5000 - (porcentagem * 5000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.utilidades': e.loja.utilidades[3]
					}, {
						$set: {
							'loja.utilidades.$.preco': 25000 - (porcentagem * 25000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.utilidades': e.loja.utilidades[4]
					}, {
						$set: {
							'loja.utilidades.$.preco': 20000 - (porcentagem * 20000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.pm': e.loja.pm[0]
					}, {
						$set: {
							'loja.pm.$.preco': 2000 - (porcentagem * 2000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.pm': e.loja.pm[1]
					}, {
						$set: {
							'loja.pm.$.preco': 55000 - (porcentagem * 55000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.pm': e.loja.pm[2]
					}, {
						$set: {
							'loja.pm.$.preco': 28000 - (porcentagem * 28000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.pm': e.loja.pm[3]
					}, {
						$set: {
							'loja.pm.$.preco': 15000 - (porcentagem * 15000)
						}
					});

					await Shop.findOneAndUpdate({
						_id: e._id,
						'loja.pm': e.loja.pm[4]
					}, {
						$set: {
							'loja.pm.$.preco': 25000 - (porcentagem * 25000)
						}
					});
				}, 1200000);
			});
		});

		const hasDocGuild = await Guild.find({
			'exportador.canal': {
				$exists: true
			}
		});
		if (!hasDocGuild) return;

		const arrayCanais = await hasDocGuild.map((ce) => ce.exportador.canal);
		if (!arrayCanais) return;

		const filtroCanais = arrayCanais.filter((item) => item.length !== 0);
		if (!filtroCanais) return;

		cron.schedule('48 */4 * * *', async () => {
			const randomQuantia = Utils.randomNumber(50, 100);
			const mapDroga = ['Maconha', 'Cocaína', 'LSD', 'Metanfetamina'];
			const randomDroga = mapDroga[Math.floor(Math.random() * mapDroga.length)];
			let tempo = 600000;
			let atualDroga = 0;

			const embed = new ClientEmbed(this.client.user)
				.setTitle('Exportando Drogas')
				.setDescription(`O Exportador de Drogas está precisando de **${randomQuantia}KG** de **${randomDroga}**, para levar a Europa.\n\nClique na reação 📦 para Exportar e Vender a sua Droga.`)
				.addField('Tempo para o exportador ir embora:', Utils.convertMS(tempo))
				.addField('Quantidade que falta para a exportação:', `${atualDroga}/${randomQuantia}`);

			for (let i = 0; i < arrayCanais.length; i++) {
				try {
					await this.client.channels.cache.get(filtroCanais[i]).send(embed).then(async (msg) => {
						await msg.react('📦');

						await this.client.database.guilds.findOneAndUpdate({
							_id: msg.guild.id
						}, {
							$set: {
								'exportador.precisandoQuantia': randomQuantia,
								'exportador.precisandoDroga': randomDroga,
								'exportador.irEmbora': tempo,
								'exportador.quantiaQueFalta': atualDroga
							}
						});

						const filtro = (reaction, user) => reaction.emoji.name === '📦' && user.id !== this.client.user.id;
						const coletor = msg.createReactionCollector(filtro, {
							time: 600000,
							max: 10
						});

						coletor.on('collect', async (reaction2, user2) => {
							const userAuthor = await this.client.database.users.findOne({
								userId: user2.id,
								guildId: msg.guild.id
							});

							let presoTime = 0;

							if (userAuthor.prisao.isPreso && userAuthor.prisao.traficoDrogas) {
								presoTime = 36000000;

								if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
									const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

									const embedPreso = new ClientEmbed(this.client.user)
										.setTitle('👮 | Preso')
										.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de tráfico de drogas.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									return msg.channel.send(`<@${reaction2.users.cache.last().id}>`, embedPreso);
								}
							} else if (!userAuthor.isMochila) {
								msg.channel.send(`<@${reaction2.users.cache.last().id}>, você não possui uma **Mochila**. Vá até Loja > Utilidades e Compre uma!`).then((b) => b.delete({
									timeout: 5000
								}));
							} else if (!userAuthor.mochila.find((a) => a.item === randomDroga)) {
								msg.channel.send(`<@${reaction2.users.cache.last().id}>, você não possui **${randomDroga}** na sua mochila para vender ela.`).then((b) => b.delete({
									timeout: 5000
								}));
							} else {
								const randomDrogaUser = Math.floor(Math.random() * Math.min(randomQuantia, userAuthor.mochila.find((a) => a.item === randomDroga).quantia));

								atualDroga += randomDrogaUser;

								await this.client.database.guilds.findOneAndUpdate({
									_id: msg.guild.id
								}, {
									$set: {
										'exportador.quantiaQueFalta': atualDroga
									}
								});

								if (atualDroga >= randomQuantia) {
									atualDroga = randomQuantia;

									await this.client.database.guilds.findOneAndUpdate({
										_id: msg.guild.id
									}, {
										$set: {
											'exportador.precisandoQuantia': 0,
											'exportador.precisandoDroga': 'Nenhuma Droga',
											'exportador.irEmbora': 0,
											'exportador.quantiaQueFalta': 0
										}
									});

									coletor.stop();

									const embedTchau = new ClientEmbed(this.client.user)
										.setTitle('Exportando Drogas')
										.setDescription(`O exportador de drogas encheu seu lote de drogas para levar a Europa. Ele só irá voltar daqui a ${Utils.convertMS(17280000)}!`);

									return msg.channel.send(embedTchau);
								}

								let valor = 0;

								if (randomDroga === 'Maconha') {
									valor = randomDrogaUser * 30;
								} else if (randomDroga === 'Cocaína') {
									valor = randomDrogaUser * 50;
								} else if (randomDroga === 'LSD') {
									valor = randomDrogaUser * 70;
								} else if (randomDroga === 'Metanfetamina') {
									valor = randomDrogaUser * 90;
								}

								const embedExportada = new ClientEmbed(this.client.user)
									.setTitle('Exportando Drogas')
									.setDescription(`<@${reaction2.users.cache.last().id}>, você repassou **${randomDrogaUser}KG** de **${randomDroga}** para o exportador, e recebeu **R$${Utils.numberFormat(valor)},00**.`);

								msg.channel.send(`<@${reaction2.users.cache.last().id}>`, embedExportada).then(async (msg1) => {
									await msg1.react('👮');

									const server = await this.client.database.guilds.findOne({
										_id: msg.guild.id
									});

									const filtro2 = (reaction3, user3) => reaction3.emoji.name === '👮' && server.cidade.policiais.map(a => a.id).includes(user3.id);
									const coletor2 = msg1.createReactionCollector(filtro2, {
										time: 4000,
										max: 1
									});

									coletor2.on('collect', async (reaction4, user4) => {
										const userPolicia = await this.client.database.users.findOne({
											userId: user4.id,
											guildId: msg.guild.id
										});

										if (userPolicia.policia.isFolga) return msg.reply('o Delegado do servidor deu uma folga para todos os **Policiais** do servidor, por tanto, você não pode prender ninguém ainda!');

										const timeoutRoubar = 300000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador));

											const embedRoubar = new ClientEmbed(this.client.user)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											msg.channel.send(`<@${user4.id}>`, embedRoubar);
										} else {
											const embedPolicia = new ClientEmbed(this.client.user)
												.setTitle('Prisão')
												.setDescription(`<@${user2.id}>, você foi preso em flagrante por <@${user4.id}>, ao traficar drogas. Todo o dinheiro e drogas foram confiscados. Agora você passará um tempinho na Cadeia.`);

											msg.channel.send(`<@${user2.id}>`, embedPolicia);

											atualDroga -= randomDrogaUser;

											await this.client.database.users.findOneAndUpdate({
												userId: user4.id,
												guildId: msg.guild.id
											}, {
												$set: {
													'policia.prenderExportador': Date.now()
												}
											});

											await this.client.database.guilds.findOneAndUpdate({
												_id: msg.guild.id
											}, {
												$set: {
													'exportador.quantiaQueFalta': atualDroga
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: user2.id,
												guildId: msg.guild.id
											}, {
												$set: {
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.traficoDrogas': true
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: user2.id,
												guildId: msg.guild.id,
												'mochila.item': randomDroga
											}, {
												$set: {
													'mochila.$.quantia': userAuthor.mochila.find((a) => a.item === randomDroga).quantia - randomDrogaUser
												}
											});

											setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: user2.id,
													guildId: msg.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.traficoDrogas': false
													}
												});
											}, 36000000);
										}
									});

									coletor2.on('end', async (collected, reason) => {
										if (reason === 'time') {
											coletor2.stop();

											await this.client.database.users.findOneAndUpdate({
												userId: user2.id,
												guildId: msg.guild.id
											}, {
												$set: {
													saldo: userAuthor.saldo + valor
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: user2.id,
												guildId: msg.guild.id,
												'mochila.item': randomDroga
											}, {
												$set: {
													'mochila.$.quantia': userAuthor.mochila.find((a) => a.item === randomDroga).quantia - randomDrogaUser
												}
											});
										}
									});
								});
							}
						});

						coletor.on('end', async (collected, reason) => {
							if (reason === 'time') {
								coletor.stop();

								await this.client.database.guilds.findOneAndUpdate({
									_id: msg.guild.id
								}, {
									$set: {
										'exportador.precisandoQuantia': 0,
										'exportador.precisandoDroga': 'Nenhuma Droga',
										'exportador.irEmbora': 0,
										'exportador.quantiaQueFalta': 0
									}
								});

								return;
							}
						});

						setInterval(async () => {
							tempo--;

							await this.client.database.guilds.findOneAndUpdate({
								_id: msg.guild.id
							}, {
								$set: {
									'exportador.irEmbora': tempo
								}
							});

							embed.fields = [];
							embed.addField('Tempo para o exportador ir embora:', Utils.convertMS(tempo));
							embed.addField('Quantidade que falta para a exportação:', `${atualDroga}/${randomQuantia}`);

							await msg.edit(embed);
						}, 60000);
					});
				} catch (error) {
					return;
				}
			}
		});
	}

};
