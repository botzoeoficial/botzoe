/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
/* eslint-disable max-nested-callbacks */
/* eslint-disable complexity */
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
		try {
			this.client.database.users = User;
			this.client.database.guilds = Guild;
			this.client.database.clientUtils = Client;
			this.client.database.commands = Commands;
			this.client.database.shop = Shop;

			console.log(c.green('[BOT] - Conectado a API do Discord.'));

			await this.client.user.setActivity(`com ${this.client.users.cache.size} usuários na Zoe City!`, {
				type: 'PLAYING'
			});

			const channelServers = await this.client.channels.cache.get('885645282673590298');
			const channelUsers = await this.client.channels.cache.get('910156012353363998');

			channelServers.setName(`Servidores: ${this.client.guilds.cache.size}`);
			channelUsers.setName(`Usuários: ${this.client.users.cache.size}`);

			const allUsers = await User.find({});
			const allGuilds = await Guild.find({});
			const allClients = await Client.findOne({
				_id: this.client.user.id
			});

			allGuilds.forEach(async (i) => {
				i.vip.forEach(async (b) => {
					setInterval(async () => {
						if ((30 * 24 * 60 * 60 * 1000) - (Date.now() - b.tempo) < 0) {
							this.client.channels.cache.get('954795056202670091').send({
								content: `**💎 | Um VIP Acabou! | 💎**\n\n👤 | Usuário: ${await this.client.users.fetch(b.id).then((x) => x.tag)} (\`${b.id}\`)\n🆔 | Servidor: ${await this.client.guilds.fetch(i._id).then((x) => x.name)} (\`${i._id}\`)`
							});

							await this.client.database.guilds.updateOne({
								_id: i._id
							}, {
								$pull: {
									vip: {
										id: b.id
									}
								}
							});
						}
					}, 1000 * 60);
				});

				setInterval(async () => {
					if (1200000 - (Date.now() - i.bolsa.tempo) < 0) {
						const random = Math.floor(Math.random() * 91);

						await this.client.database.guilds.updateOne({
							_id: i._id
						}, {
							$set: {
								'bolsa.valor': random,
								'bolsa.tempo': Date.now()
							}
						});

						const server3 = await this.client.database.guilds.findOne({
							_id: '885645282614861854'
						});

						await server3.save();

						const {
							bolsa
						} = server3;

						const porcentagem = bolsa.valor / 100;

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[0]
						}, {
							$set: {
								'loja.bebidas.$.preco': 1500 - (porcentagem * 1500)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[1]
						}, {
							$set: {
								'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[2]
						}, {
							$set: {
								'loja.bebidas.$.preco': 1800 - (porcentagem * 1800)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[3]
						}, {
							$set: {
								'loja.bebidas.$.preco': 800 - (porcentagem * 800)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[4]
						}, {
							$set: {
								'loja.bebidas.$.preco': 1200 - (porcentagem * 1200)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.bebidas': allClients.loja.bebidas[5]
						}, {
							$set: {
								'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[0]
						}, {
							$set: {
								'loja.comidas.$.preco': 2000 - (porcentagem * 2000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[1]
						}, {
							$set: {
								'loja.comidas.$.preco': 1500 - (porcentagem * 1500)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[2]
						}, {
							$set: {
								'loja.comidas.$.preco': 900 - (porcentagem * 900)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[3]
						}, {
							$set: {
								'loja.comidas.$.preco': 600 - (porcentagem * 600)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[4]
						}, {
							$set: {
								'loja.comidas.$.preco': 1000 - (porcentagem * 1000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[5]
						}, {
							$set: {
								'loja.comidas.$.preco': 1200 - (porcentagem * 1200)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.comidas': allClients.loja.comidas[6]
						}, {
							$set: {
								'loja.comidas.$.preco': 500 - (porcentagem * 500)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.doces': allClients.loja.doces[0]
						}, {
							$set: {
								'loja.doces.$.preco': 300 - (porcentagem * 300)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.doces': allClients.loja.doces[1]
						}, {
							$set: {
								'loja.doces.$.preco': 750 - (porcentagem * 750)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.doces': allClients.loja.doces[2]
						}, {
							$set: {
								'loja.doces.$.preco': 450 - (porcentagem * 450)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.doces': allClients.loja.doces[3]
						}, {
							$set: {
								'loja.doces.$.preco': 700 - (porcentagem * 700)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.doces': allClients.loja.doces[4]
						}, {
							$set: {
								'loja.doces.$.preco': 550 - (porcentagem * 550)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[0]
						}, {
							$set: {
								'loja.utilidades.$.preco': 50000 - (porcentagem * 50000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[1]
						}, {
							$set: {
								'loja.utilidades.$.preco': 2000 - (porcentagem * 2000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[2]
						}, {
							$set: {
								'loja.utilidades.$.preco': 5000 - (porcentagem * 5000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[3]
						}, {
							$set: {
								'loja.utilidades.$.preco': 150000 - (porcentagem * 150000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[4]
						}, {
							$set: {
								'loja.utilidades.$.preco': 20000 - (porcentagem * 20000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidades': allClients.loja.utilidades[5]
						}, {
							$set: {
								'loja.utilidades.$.preco': 10000 - (porcentagem * 10000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.pm': allClients.loja.pm[0]
						}, {
							$set: {
								'loja.pm.$.preco': 20000 - (porcentagem * 20000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.pm': allClients.loja.pm[1]
						}, {
							$set: {
								'loja.pm.$.preco': 350000 - (porcentagem * 350000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.pm': allClients.loja.pm[2]
						}, {
							$set: {
								'loja.pm.$.preco': 200000 - (porcentagem * 200000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.pm': allClients.loja.pm[3]
						}, {
							$set: {
								'loja.pm.$.preco': 15000 - (porcentagem * 15000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.pm': allClients.loja.pm[4]
						}, {
							$set: {
								'loja.pm.$.preco': 25000 - (porcentagem * 25000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[0]
						}, {
							$set: {
								'loja.sementes.$.preco': 800 - (porcentagem * 800),
								'loja.sementes.$.venda': 421 + (porcentagem * 421)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[1]
						}, {
							$set: {
								'loja.sementes.$.preco': 900 - (porcentagem * 900),
								'loja.sementes.$.venda': 685 + (porcentagem * 685)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[2]
						}, {
							$set: {
								'loja.sementes.$.preco': 1100 - (porcentagem * 1100),
								'loja.sementes.$.venda': 790 + (porcentagem * 790)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[3]
						}, {
							$set: {
								'loja.sementes.$.preco': 750 - (porcentagem * 750),
								'loja.sementes.$.venda': 1000 + (porcentagem * 1000)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[4]
						}, {
							$set: {
								'loja.sementes.$.preco': 1500 - (porcentagem * 1500),
								'loja.sementes.$.venda': 948 + (porcentagem * 948)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[5]
						}, {
							$set: {
								'loja.sementes.$.preco': 1800 - (porcentagem * 1800),
								'loja.sementes.$.venda': 1369 + (porcentagem * 1369)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[6]
						}, {
							$set: {
								'loja.sementes.$.preco': 2100 - (porcentagem * 2100),
								'loja.sementes.$.venda': 2106 + (porcentagem * 2106)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[7]
						}, {
							$set: {
								'loja.sementes.$.preco': 2500 - (porcentagem * 2500),
								'loja.sementes.$.venda': 1632 + (porcentagem * 1632)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[8]
						}, {
							$set: {
								'loja.sementes.$.preco': 2900 - (porcentagem * 2900),
								'loja.sementes.$.venda': 1790 + (porcentagem * 1790)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[9]
						}, {
							$set: {
								'loja.sementes.$.preco': 3300 - (porcentagem * 3300),
								'loja.sementes.$.venda': 2790 + (porcentagem * 2790)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[10]
						}, {
							$set: {
								'loja.sementes.$.preco': 3900 - (porcentagem * 3900),
								'loja.sementes.$.venda': 3105 + (porcentagem * 3105)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[11]
						}, {
							$set: {
								'loja.sementes.$.preco': 4400 - (porcentagem * 4400),
								'loja.sementes.$.venda': 2211 + (porcentagem * 2211)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[12]
						}, {
							$set: {
								'loja.sementes.$.preco': 5000 - (porcentagem * 5000),
								'loja.sementes.$.venda': 2579 + (porcentagem * 2579)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[13]
						}, {
							$set: {
								'loja.sementes.$.preco': 3900 - (porcentagem * 3900),
								'loja.sementes.$.venda': 4100 + (porcentagem * 4100)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[14]
						}, {
							$set: {
								'loja.sementes.$.preco': 4400 - (porcentagem * 4400),
								'loja.sementes.$.venda': 3237 + (porcentagem * 3237)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.sementes': allClients.loja.sementes[15]
						}, {
							$set: {
								'loja.sementes.$.preco': 5000 - (porcentagem * 5000),
								'loja.sementes.$.venda': 5263 + (porcentagem * 5263)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidadesAgro': allClients.loja.utilidadesAgro[0]
						}, {
							$set: {
								'loja.utilidadesAgro.$.preco': 100 - (porcentagem * 100)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidadesAgro': allClients.loja.utilidadesAgro[1]
						}, {
							$set: {
								'loja.utilidadesAgro.$.preco': 150 - (porcentagem * 150)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidadesAgro': allClients.loja.utilidadesAgro[2]
						}, {
							$set: {
								'loja.utilidadesAgro.$.preco': 130 - (porcentagem * 130)
							}
						});

						await Client.updateOne({
							_id: this.client.user.id,
							'loja.utilidadesAgro': allClients.loja.utilidadesAgro[3]
						}, {
							$set: {
								'loja.utilidadesAgro.$.preco': 300 - (porcentagem * 300)
							}
						});
					}
				}, 1000 * 60);
			});

			allUsers.forEach(async (e) => {
				if (e.fabricando) {
					await this.client.database.users.updateOne({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							fabricando: false
						}
					});
				}

				if (e.cadastrandoItem) {
					await this.client.database.users.updateOne({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							cadastrandoItem: false
						}
					});
				}

				if (e.loja.aberta) {
					await this.client.database.users.updateOne({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							'loja.aberta': false
						}
					});
				}

				if (e.apostaAberta) {
					await this.client.database.users.updateOne({
						userId: e.userId,
						guildId: e.guildId
					}, {
						$set: {
							apostaAberta: false
						}
					});
				}

				setInterval(async () => {
					const userFullLife = await this.client.database.users.findOne({
						userId: e.userId,
						guildId: e.guildId
					});

					if (userFullLife.hp.vida > 100) {
						await this.client.database.users.updateOne({
							userId: userFullLife.userId,
							guildId: userFullLife.guildId
						}, {
							$set: {
								'hp.vida': 100
							}
						});
					}
				}, 1000 * 60);

				setInterval(async () => {
					if (e.hp.tratamento && e.hp.vida > 100) {
						await this.client.database.users.updateOne({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'hp.tratamento': false,
								'hp.vida': 100,
								'hp.saiu': Date.now()
							}
						});

						this.client.channels.cache.get('954795056202670091').send({
							content: `**🏥 | Tratamento Terminado! | 🏥**\n\n👤 | Paciente: ${await this.client.users.fetch(e.userId).then((x) => x.tag)} (\`${e.userId}\`)\n💓 | Vida: 100\n🆔 | Servidor: ${await this.client.guilds.fetch(e.guildId).then((x) => x.name)} (\`${e.guildId}\`)`
						});

						const serverHospital = await this.client.database.guilds.findOne({
							_id: e.guildId
						});

						if (serverHospital.hospital.find((a) => a.usuario === e.userId)) {
							await this.client.database.guilds.updateOne({
								_id: e.guildId
							}, {
								$pull: {
									hospital: {
										usuario: e.userId
									}
								}
							});
						}
					}
				}, 1000 * 60);

				let userLife = await this.client.database.users.findOne({
					userId: e.userId,
					guildId: e.guildId
				});

				if (e.hp.tratamento && e.hp.vida < 100) {
					userLife = await this.client.database.users.findOne({
						userId: e.userId,
						guildId: e.guildId
					});

					setInterval(async () => {
						await this.client.database.users.updateOne({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								'hp.vida': userLife.hp.vida += 1
							}
						});

						if (userLife.hp.vida === 100) {
							await this.client.database.users.updateOne({
								userId: e.userId,
								guildId: e.guildId
							}, {
								$set: {
									'hp.tratamento': false,
									'hp.vida': 100,
									'hp.saiu': Date.now()
								}
							});

							const serverHospital = await this.client.database.guilds.findOne({
								_id: e.guildId
							});

							if (serverHospital.hospital.find((a) => a.usuario === e.userId)) {
								await this.client.database.guilds.updateOne({
									_id: e.guildId
								}, {
									$pull: {
										hospital: {
											usuario: e.userId
										}
									}
								});
							}

							this.client.channels.cache.get('954795056202670091').send({
								content: `**🏥 | Tratamento Terminado! | 🏥**\n\n👤 | Paciente: ${await this.client.users.fetch(e.userId).then((x) => x.tag)} (\`${e.userId}\`)\n💓 | Vida: 100\n🆔 | Servidor: ${await this.client.guilds.fetch(e.guildId).then((x) => x.name)} (\`${e.guildId}\`)`
							});
						}
					}, 30000);
				}

				setInterval(async () => {
					const usersPrisao = await this.client.database.users.find({
						'prisao.isPreso': true
					});

					const usersFabricaArma = await this.client.database.users.find({
						'fabricagem.fabricandoArma': true
					});

					const usersFabricaDroga = await this.client.database.users.find({
						'fabricagem.fabricandoDroga': true
					});

					const usersFabricaChave = await this.client.database.users.find({
						'fabricagem.fabricandoChaves': true
					});

					const usersFabricaMunicao = await this.client.database.users.find({
						'fabricagem.fabricandoMunicao': true
					});

					usersPrisao.forEach(async (user) => {
						if (user.prisao.prenderCmd) {
							const time = user.prisao.prenderMili;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.prenderMili = 0;
								user.prisao.prenderCmd = false;
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;

								await user.save();
							}
						} else if (user.prisao.traficoDrogas) {
							const time = 36000000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.traficoDrogas = false;

								await user.save();
							}
						} else if (user.prisao.prender) {
							const time = 43200000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.prender = false;

								await user.save();
							}
						} else if (user.prisao.revistar) {
							const time = 21600000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.revistar = false;

								await user.save();
							}
						} else if (user.prisao.roubarVeiculo) {
							const time = 180000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.roubarVeiculo = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.velha) {
							const time = 300000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.velha = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.frentista) {
							const time = 600000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.frentista = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.joalheria) {
							const time = 900000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.joalheria = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.agiota) {
							const time = 1200000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.agiota = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.casaLoterica) {
							const time = 1200000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.casaLoterica = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.brazino) {
							const time = 2100000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.brazino = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.facebook) {
							const time = 2700000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.facebook = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.bancoCentral) {
							const time = 3600000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.bancoCentral = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.shopping) {
							const time = 7200000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.shopping = false;
								user.prisao.crime = false;

								await user.save();
							}
						} else if (user.prisao.crime && user.prisao.banco) {
							const time = 14400000;

							if (time - (Date.now() - user.prisao.tempo) < 0) {
								user.prisao.tempo = 0;
								user.prisao.isPreso = false;
								user.prisao.banco = false;
								user.prisao.crime = false;

								await user.save();
							}
						}
					});

					usersFabricaArma.forEach(async (user) => {
						if (user.fabricagem.armas.nome === 'Ak-47') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 10000800 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Ak-47')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Ak-47'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Ak-47').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Ak-47',
													emoji: '<:AK47:901118225520136243>',
													id: '<:AK47:901118225520136243>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 7200000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Ak-47')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Ak-47'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Ak-47').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Ak-47',
													emoji: '<:AK47:901118225520136243>',
													id: '<:AK47:901118225520136243>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 5400000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Ak-47')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Ak-47'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Ak-47').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Ak-47',
													emoji: '<:AK47:901118225520136243>',
													id: '<:AK47:901118225520136243>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 3600000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Ak-47')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Ak-47'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Ak-47').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Ak-47',
													emoji: '<:AK47:901118225520136243>',
													id: '<:AK47:901118225520136243>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'UMP') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'UMP')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'UMP'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'UMP').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'UMP',
													emoji: '<:UMP:901117871764144200>',
													id: '<:UMP:901117871764144200>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'UMP')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'UMP'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'UMP').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'UMP',
													emoji: '<:UMP:901117871764144200>',
													id: '<:UMP:901117871764144200>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'UMP')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'UMP'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'UMP').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'UMP',
													emoji: '<:UMP:901117871764144200>',
													id: '<:UMP:901117871764144200>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 50000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'UMP')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'UMP'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'UMP').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'UMP',
													emoji: '<:UMP:901117871764144200>',
													id: '<:UMP:901117871764144200>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'MP5') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 150000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'MP5')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'MP5'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'MP5').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'MP5',
													emoji: '<:Mp5:901117948180168724>',
													id: '<:Mp5:901117948180168724>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'MP5')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'MP5'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'MP5').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'MP5',
													emoji: '<:Mp5:901117948180168724>',
													id: '<:Mp5:901117948180168724>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'MP5')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'MP5'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'MP5').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'MP5',
													emoji: '<:Mp5:901117948180168724>',
													id: '<:Mp5:901117948180168724>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'MP5')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'MP5'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'MP5').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'MP5',
													emoji: '<:Mp5:901117948180168724>',
													id: '<:Mp5:901117948180168724>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'ACR') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 180000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'ACR')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'ACR'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'ACR').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'ACR',
													emoji: '<:Acr:901118143735402536>',
													id: '<:Acr:901118143735402536>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'ACR')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'ACR'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'ACR').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'ACR',
													emoji: '<:Acr:901118143735402536>',
													id: '<:Acr:901118143735402536>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'ACR')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'ACR'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'ACR').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'ACR',
													emoji: '<:Acr:901118143735402536>',
													id: '<:Acr:901118143735402536>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'ACR')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'ACR'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'ACR').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'ACR',
													emoji: '<:Acr:901118143735402536>',
													id: '<:Acr:901118143735402536>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'KNT-308') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 240000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'KNT-308')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'KNT-308'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'KNT-308').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'KNT-308',
													emoji: '<:KNT308:901118040245149736>',
													id: '<:KNT308:901118040245149736>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 180000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'KNT-308')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'KNT-308'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'KNT-308').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'KNT-308',
													emoji: '<:KNT308:901118040245149736>',
													id: '<:KNT308:901118040245149736>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'KNT-308')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'KNT-308'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'KNT-308').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'KNT-308',
													emoji: '<:KNT308:901118040245149736>',
													id: '<:KNT308:901118040245149736>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'KNT-308')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'KNT-308'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'KNT-308').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'KNT-308',
													emoji: '<:KNT308:901118040245149736>',
													id: '<:KNT308:901118040245149736>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'Desert Eagle') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Desert Eagle')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Desert Eagle'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Desert Eagle').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Desert Eagle',
													emoji: '<:deserteagle:901117192110739516>',
													id: '<:deserteagle:901117192110739516>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Desert Eagle')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Desert Eagle'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Desert Eagle').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Desert Eagle',
													emoji: '<:deserteagle:901117192110739516>',
													id: '<:deserteagle:901117192110739516>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Desert Eagle')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Desert Eagle'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Desert Eagle').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Desert Eagle',
													emoji: '<:deserteagle:901117192110739516>',
													id: '<:deserteagle:901117192110739516>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 45000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Desert Eagle')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Desert Eagle'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Desert Eagle').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Desert Eagle',
													emoji: '<:deserteagle:901117192110739516>',
													id: '<:deserteagle:901117192110739516>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'Revolver 38') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 180000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Revolver 38')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Revolver 38'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Revolver 38').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Revolver 38',
													emoji: '<:Revolver38:901117447065702501>',
													id: '<:Revolver38:901117447065702501>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 120000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Revolver 38')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Revolver 38'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Revolver 38').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Revolver 38',
													emoji: '<:Revolver38:901117447065702501>',
													id: '<:Revolver38:901117447065702501>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Revolver 38')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Revolver 38'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Revolver 38').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Revolver 38',
													emoji: '<:Revolver38:901117447065702501>',
													id: '<:Revolver38:901117447065702501>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Revolver 38')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Revolver 38'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Revolver 38').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Revolver 38',
													emoji: '<:Revolver38:901117447065702501>',
													id: '<:Revolver38:901117447065702501>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.armas.nome === 'G18') {
							if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
								const timeout = 90000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'G18')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'G18'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'G18').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'G18',
													emoji: '<:G18:901117282003075072>',
													id: '<:G18:901117282003075072>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
								const timeout = 60000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'G18')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'G18'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'G18').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'G18',
													emoji: '<:G18:901117282003075072>',
													id: '<:G18:901117282003075072>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
								const timeout = 45000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'G18')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'G18'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'G18').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'G18',
													emoji: '<:G18:901117282003075072>',
													id: '<:G18:901117282003075072>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.armas.quantia > 20) {
								const timeout = 30000 * user.fabricagem.armas.quantia;

								if (timeout - (Date.now() - user.fabricagem.armas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'G18')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'G18'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'G18').quantia += user.fabricagem.armas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'G18',
													emoji: '<:G18:901117282003075072>',
													id: '<:G18:901117282003075072>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.armas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoArma': false,
												'fabricagem.armas.tempo': 0,
												'fabricagem.armas.quantia': 0,
												'fabricagem.armas.nome': '',
												'fabricagem.armas.emoji': ''
											}
										});
									}
								}
							}
						}
					});

					usersFabricaDroga.forEach(async (user) => {
						if (user.fabricagem.drogas.nome === 'Maconha') {
							if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
								const timeout = 43200000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Maconha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Maconha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Maconha').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Maconha',
													emoji: '<:maconha:898326104866177084>',
													id: '<:maconha:898326104866177084>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
								const timeout = 21600000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Maconha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Maconha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Maconha').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Maconha',
													emoji: '<:maconha:898326104866177084>',
													id: '<:maconha:898326104866177084>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
								const timeout = 16200000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Maconha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Maconha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Maconha').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Maconha',
													emoji: '<:maconha:898326104866177084>',
													id: '<:maconha:898326104866177084>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 20) {
								const timeout = 10800000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Maconha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Maconha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Maconha').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Maconha',
													emoji: '<:maconha:898326104866177084>',
													id: '<:maconha:898326104866177084>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.drogas.nome === 'Cocaína') {
							if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
								const timeout = 54000000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Cocaína')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Cocaína'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Cocaína').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Cocaína',
													emoji: '<:Cocaina:901118422774071326>',
													id: '<:Cocaina:901118422774071326>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
								const timeout = 30600000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Cocaína')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Cocaína'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Cocaína').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Cocaína',
													emoji: '<:Cocaina:901118422774071326>',
													id: '<:Cocaina:901118422774071326>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
								const timeout = 21600000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Cocaína')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Cocaína'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Cocaína').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Cocaína',
													emoji: '<:Cocaina:901118422774071326>',
													id: '<:Cocaina:901118422774071326>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 20) {
								const timeout = 16200000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Cocaína')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Cocaína'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Cocaína').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Cocaína',
													emoji: '<:Cocaina:901118422774071326>',
													id: '<:Cocaina:901118422774071326>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.drogas.nome === 'LSD') {
							if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
								const timeout = 1050000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'LSD')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'LSD'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'LSD').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'LSD',
													emoji: '<:Lsddroga:901118376951304262>',
													id: '<:Lsddroga:901118376951304262>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
								const timeout = 36000000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'LSD')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'LSD'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'LSD').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'LSD',
													emoji: '<:Lsddroga:901118376951304262>',
													id: '<:Lsddroga:901118376951304262>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
								const timeout = 30600000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'LSD')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'LSD'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'LSD').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'LSD',
													emoji: '<:Lsddroga:901118376951304262>',
													id: '<:Lsddroga:901118376951304262>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 20) {
								const timeout = 21600000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'LSD')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'LSD'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'LSD').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'LSD',
													emoji: '<:Lsddroga:901118376951304262>',
													id: '<:Lsddroga:901118376951304262>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.drogas.nome === 'Metanfetamina') {
							if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
								const timeout = 72000000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Metanfetamina')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Metanfetamina'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Metanfetamina').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Metanfetamina',
													emoji: '<:Metanfetamina:901118279530217552>',
													id: '<:Metanfetamina:901118279530217552>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
								const timeout = 43200000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Metanfetamina')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Metanfetamina'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Metanfetamina').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Metanfetamina',
													emoji: '<:Metanfetamina:901118279530217552>',
													id: '<:Metanfetamina:901118279530217552>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
								const timeout = 37800000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Metanfetamina')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Metanfetamina'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Metanfetamina').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Metanfetamina',
													emoji: '<:Metanfetamina:901118279530217552>',
													id: '<:Metanfetamina:901118279530217552>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.drogas.quantia > 20) {
								const timeout = 28800000 * user.fabricagem.drogas.quantia;

								if (timeout - (Date.now() - user.fabricagem.drogas.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Metanfetamina')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Metanfetamina'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Metanfetamina').quantia += user.fabricagem.drogas.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Metanfetamina',
													emoji: '<:Metanfetamina:901118279530217552>',
													id: '<:Metanfetamina:901118279530217552>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.drogas.quantia
												}
											},
											$set: {
												'fabricagem.fabricandoDroga': false,
												'fabricagem.drogas.tempo': 0,
												'fabricagem.drogas.quantia': 0,
												'fabricagem.drogas.nome': '',
												'fabricagem.drogas.emoji': ''
											}
										});
									}
								}
							}
						}
					});

					usersFabricaChave.forEach(async (user) => {
						if (user.fabricagem.chaves.nome === 'Chave Micha') {
							if (user.fabricagem.chaves.quantia >= 1 && user.fabricagem.chaves.quantia <= 5) {
								const timeout = 28800000 * user.fabricagem.chaves.quantia;

								if (timeout - (Date.now() - user.fabricagem.chaves.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Chave Micha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Chave Micha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Chave Micha').quantia += user.fabricagem.chaves.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
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
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Chave Micha',
													emoji: '<:ChaveMicha:900544510365405214>',
													id: '<:ChaveMicha:900544510365405214>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.chaves.quantia
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
								}
							} else if (user.fabricagem.chaves.quantia > 5 && user.fabricagem.chaves.quantia <= 10) {
								const timeout = 25200000 * user.fabricagem.chaves.quantia;

								if (timeout - (Date.now() - user.fabricagem.chaves.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Chave Micha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Chave Micha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Chave Micha').quantia += user.fabricagem.chaves.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
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
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Chave Micha',
													emoji: '<:ChaveMicha:900544510365405214>',
													id: '<:ChaveMicha:900544510365405214>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.chaves.quantia
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
								}
							} else if (user.fabricagem.chaves.quantia > 10 && user.fabricagem.chaves.quantia <= 20) {
								const timeout = 19080000 * user.fabricagem.chaves.quantia;

								if (timeout - (Date.now() - user.fabricagem.chaves.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Chave Micha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Chave Micha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Chave Micha').quantia += user.fabricagem.chaves.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
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
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Chave Micha',
													emoji: '<:ChaveMicha:900544510365405214>',
													id: '<:ChaveMicha:900544510365405214>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.chaves.quantia
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
								}
							} else if (user.fabricagem.chaves.quantia > 20) {
								const timeout = 14400000 * user.fabricagem.chaves.quantia;

								if (timeout - (Date.now() - user.fabricagem.chaves.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Chave Micha')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Chave Micha'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Chave Micha').quantia += user.fabricagem.chaves.quantia
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
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
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Chave Micha',
													emoji: '<:ChaveMicha:900544510365405214>',
													id: '<:ChaveMicha:900544510365405214>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.chaves.quantia
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
								}
							}
						}
					});

					usersFabricaMunicao.forEach(async (user) => {
						if (user.fabricagem.municoes.nome === 'Munição Metralhadora') {
							if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
								const timeout = 28800000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Metralhadora'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Metralhadora',
													emoji: '<:balaassalto:905653521846784080>',
													id: '<:balaassalto:905653521846784080>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
								const timeout = 25200000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Metralhadora'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Metralhadora',
													emoji: '<:balaassalto:905653521846784080>',
													id: '<:balaassalto:905653521846784080>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
								const timeout = 19800000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Metralhadora'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Metralhadora',
													emoji: '<:balaassalto:905653521846784080>',
													id: '<:balaassalto:905653521846784080>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 20) {
								const timeout = 14400000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Metralhadora'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Metralhadora',
													emoji: '<:balaassalto:905653521846784080>',
													id: '<:balaassalto:905653521846784080>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.municoes.nome === 'Munição Pistola') {
							if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
								const timeout = 18000000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Pistola')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Pistola'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Pistola',
													emoji: '<:bala:905653668643241985>',
													id: '<:bala:905653668643241985>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
								const timeout = 14400000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Pistola')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Pistola'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Pistola',
													emoji: '<:bala:905653668643241985>',
													id: '<:bala:905653668643241985>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
								const timeout = 12600000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Pistola')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Pistola'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Pistola',
													emoji: '<:bala:905653668643241985>',
													id: '<:bala:905653668643241985>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 20) {
								const timeout = 7200000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição Pistola')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição Pistola'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição Pistola',
													emoji: '<:bala:905653668643241985>',
													id: '<:bala:905653668643241985>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							}
						} else if (user.fabricagem.municoes.nome === 'Munição KNT') {
							if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
								const timeout = 36000000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição KNT')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição KNT'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição KNT',
													emoji: '<:balasniper:905653583171706980>',
													id: '<:balasniper:905653583171706980>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
								const timeout = 28800000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição KNT')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição KNT'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição KNT',
													emoji: '<:balasniper:905653583171706980>',
													id: '<:balasniper:905653583171706980>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
								const timeout = 18000000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição KNT')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição KNT'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição KNT',
													emoji: '<:balasniper:905653583171706980>',
													id: '<:balasniper:905653583171706980>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							} else if (user.fabricagem.municoes.quantia > 20) {
								const timeout = 14400000 * user.fabricagem.municoes.quantia;

								if (timeout - (Date.now() - user.fabricagem.municoes.tempo) < 0) {
									if (user.mochila.find((a) => a.item === 'Munição KNT')) {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId,
											'mochila.item': 'Munição KNT'
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia += (user.fabricagem.municoes.quantia * 5)
											}
										});

										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									} else {
										await this.client.database.users.updateOne({
											userId: user.userId,
											guildId: user.guildId
										}, {
											$push: {
												mochila: {
													item: 'Munição KNT',
													emoji: '<:balasniper:905653583171706980>',
													id: '<:balasniper:905653583171706980>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: user.fabricagem.municoes.quantia * 5
												}
											},
											$set: {
												'fabricagem.fabricandoMunicao': false,
												'fabricagem.municoes.tempo': 0,
												'fabricagem.municoes.quantia': 0,
												'fabricagem.municoes.nome': '',
												'fabricagem.municoes.emoji': ''
											}
										});
									}
								}
							}
						}
					});
				}, 1000 * 60);

				setInterval(async () => {
					const userPorteDeArmas = await this.client.database.users.findOne({
						userId: e.userId,
						guildId: e.guildId
					});

					if (userPorteDeArmas.porteDeArmas !== 0 && 864000000 - (Date.now() - userPorteDeArmas.porteDeArmas) < 0) {
						if (e.mochila.find((a) => a.item === 'Porte de Armas')) {
							await this.client.database.users.updateOne({
								userId: e.userId,
								guildId: e.guildId
							}, {
								$pull: {
									mochila: {
										item: 'Porte de Armas'
									}
								},
								$set: {
									porteDeArmas: 0
								}
							});
						}
					}
				}, 1000 * 60);

				setInterval(async () => {
					if (e.garagem.length) {
						for (var i = 0; i < e.garagem.length; i++) {
							if (!e.garagem[i].emplacado) {
								await this.client.database.users.updateOne({
									userId: e.userId,
									guildId: e.guildId,
									'garagem.nome': e.garagem[i].nome
								}, {
									$pull: {
										garagem: {
											nome: e.garagem[i].nome
										}
									}
								});
							}
						}
					}
				}, 86400000);

				// setInterval(async () => {
				// 	const userBank = await this.client.database.users.findOne({
				// 		userId: e.userId,
				// 		guildId: e.guildId
				// 	});

				// 	if (userBank.payBank.cooldown !== 0 && 518400000 - (Date.now() - userBank.payBank.cooldown) < 0) {
				// 		await this.client.database.users.updateOne({
				// 			userId: e.userId,
				// 			guildId: e.guildId
				// 		}, {
				// 			$set: {
				// 				saldo: e.saldo + e.banco,
				// 				banco: 0,
				// 				'payBank.cooldown': 0
				// 			}
				// 		});

				// 		this.client.channels.cache.get('954795056202670091').send({
				// 			content: `**🏦 | Um Banco Acabou! | 🏦**\n\n👤 | Usuário: ${await this.client.users.fetch(e.userId).then((x) => x.tag)} (\`${e.userId}\`)\n💸 | Carteira: R$0,00\n🏦 | Banco: R$${Utils.numberFormat(e.banco)},00\n🆔 | Servidor: ${await this.client.guilds.fetch(e.guildId).then((x) => x.name)} (\`${e.guildId}\`)`
				// 		});
				// 	}
				// }, 1000 * 60);

				setInterval(async () => {
					const userBtc = await this.client.database.users.findOne({
						userId: e.userId,
						guildId: e.guildId
					});

					if (userBtc.cooldown.bitcoin !== 0 && 864000000 - (Date.now() - userBtc.cooldown.bitcoin) < 0) {
						const valor = userBtc.bitcoin += Number(userBtc.investimento.investido);

						await this.client.database.users.updateOne({
							userId: e.userId,
							guildId: e.guildId
						}, {
							$set: {
								bitcoin: (valor * 0.25) + Number(userBtc.investimento.investido),
								'investimento.investido': 0,
								'cooldown.bitcoin': 0
							}
						});
					}
				}, 1000 * 60);

				setInterval(async () => {
					try {
						e.humores.fome -= 1;
						e.humores.sede -= 1;
						e.humores.bravo -= 1;
						e.humores.triste -= 1;
						e.humores.cansado -= 1;
						e.humores.solitario -= 1;
						e.humores.desanimado -= 1;
						e.humores.estressado -= 1;
						await e.save();
					} catch (err) {
						return;
					}
				}, 7200000);
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
						await this.client.channels.cache.get(filtroCanais[i]).send({
							embeds: [embed]
						}).then(async (msg) => {
							await msg.react('📦');

							await this.client.database.guilds.updateOne({
								_id: msg.guild.id
							}, {
								$set: {
									'exportador.precisandoQuantia': randomQuantia,
									'exportador.precisandoDroga': randomDroga,
									'exportador.irEmbora': tempo,
									'exportador.quantiaQueFalta': atualDroga
								}
							});

							const filter = (reactionFilter, userFilter) => {
								return reactionFilter.emoji.name === '📦' && userFilter.id !== this.client.user.id;
							};

							const coletor = msg.createReactionCollector({
								filter,
								time: 600000,
								max: 10
							});

							coletor.on('collect', async (reaction2, user2) => {
								const serverDroga = await this.client.database.guilds.findOne({
									_id: msg.guild.id
								});

								if (serverDroga.cidade.donoFabricadeDrogas.find((a) => a.id === user2.id)) {
									msg.reply('você não pode transportar suas drogas para o Exportador, pois você é Fabricante de Drogas desse servidor!').then((b) => setTimeout(() => b.delete(), 5000));
								}

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

										return msg.channel.send({
											content: `<@${reaction2.users.cache.last().id}>`,
											embeds: [embedPreso]
										});
									}
								} else if (!userAuthor.isMochila) {
									msg.channel.send({
										content: `<@${reaction2.users.cache.last().id}>, você não possui uma **Mochila**. Vá até Loja > Utilidades e Compre uma!`
									}).then((b) => setTimeout(() => b.delete(), 5000));
								} else if (!userAuthor.mochila.find((a) => a.item === randomDroga)) {
									msg.channel.send({
										content: `<@${reaction2.users.cache.last().id}>, você não possui **${randomDroga}** na sua mochila para vender ela.`
									}).then((b) => setTimeout(() => b.delete(), 5000));
								} else {
									const randomDrogaUser = userAuthor.mochila.find((a) => a.item === randomDroga).quantia;

									atualDroga += randomDrogaUser;

									await this.client.database.guilds.updateOne({
										_id: msg.guild.id
									}, {
										$set: {
											'exportador.quantiaQueFalta': atualDroga
										}
									});

									if (atualDroga >= randomQuantia) {
										atualDroga = randomQuantia;

										embed.fields = [];
										embed.addField('Tempo para o exportador ir embora:', `\`0\`d \`0\`h \`0\`m \`0\`s`);
										embed.addField('Quantidade que falta para a exportação:', `${randomQuantia}/${randomQuantia}`);

										await msg.edit({
											embeds: [embed]
										});

										await this.client.database.guilds.updateOne({
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

										return msg.channel.send({
											embeds: [embedTchau]
										});
									}

									let valor = 0;

									if (randomDroga === 'Maconha') {
										valor = randomDrogaUser * 30000;
									} else if (randomDroga === 'Cocaína') {
										valor = randomDrogaUser * 50000;
									} else if (randomDroga === 'LSD') {
										valor = randomDrogaUser * 70000;
									} else if (randomDroga === 'Metanfetamina') {
										valor = randomDrogaUser * 90000;
									}

									const embedExportada = new ClientEmbed(this.client.user)
										.setTitle('Exportando Drogas')
										.setDescription(`<@${reaction2.users.cache.last().id}>, você repassou **${randomDrogaUser}KG** de **${randomDroga}** para o exportador, e recebeu **R$${Utils.numberFormat(valor)},00**.`);

									msg.channel.send({
										content: `<@${reaction2.users.cache.last().id}>`,
										embeds: [embedExportada]
									}).then(async (msg1) => {
										await msg1.react('👮');

										const server = await this.client.database.guilds.findOne({
											_id: msg.guild.id
										});

										const filterCollector = (reactionFilter2, userFilter2) => {
											return reactionFilter2.emoji.name === '👮' && (server.cidade.policiais.map(a => a.id).includes(userFilter2.id) || server.cidade.delegado === userFilter2.id);
										};

										const coletor2 = msg1.createReactionCollector({
											filter: filterCollector,
											time: 4000,
											max: 1
										});

										coletor2.on('collect', async (reaction4, user4) => {
											const userPolicia = await this.client.database.users.findOne({
												userId: user4.id,
												guildId: msg.guild.id
											});

											if (userPolicia.policia.isFolga) return msg.reply('o Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!');

											const timeoutRoubar = 300000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador));

												const embedRoubar = new ClientEmbed(this.client.user)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return msg.channel.send({
													content: `<@${user4.id}>`,
													embeds: [embedRoubar]
												});
											} else {
												const embedPolicia = new ClientEmbed(this.client.user)
													.setTitle('Prisão')
													.setDescription(`<@${user2.id}>, você foi preso em flagrante por <@${user4.id}>, ao traficar drogas. Todo o dinheiro e drogas foram confiscados. Agora você passará um tempinho na Cadeia.`);

												msg.channel.send({
													content: `<@${user2.id}>`,
													embeds: [embedPolicia]
												});

												atualDroga -= randomDrogaUser;

												await this.client.database.users.updateOne({
													userId: user4.id,
													guildId: msg.guild.id
												}, {
													$set: {
														'policia.prenderExportador': Date.now()
													}
												});

												await this.client.database.guilds.updateOne({
													_id: msg.guild.id
												}, {
													$set: {
														'exportador.quantiaQueFalta': atualDroga
													}
												});

												await this.client.database.users.updateOne({
													userId: user2.id,
													guildId: msg.guild.id
												}, {
													$set: {
														'prisao.isPreso': true,
														'prisao.tempo': Date.now(),
														'prisao.traficoDrogas': true
													}
												});

												await this.client.database.users.updateOne({
													userId: user2.id,
													guildId: msg.guild.id
												}, {
													$pull: {
														mochila: {
															item: randomDroga
														}
													}
												});

												setTimeout(async () => {
													await this.client.database.users.updateOne({
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

												await this.client.database.users.updateOne({
													userId: user2.id,
													guildId: msg.guild.id
												}, {
													$set: {
														saldo: userAuthor.saldo + valor
													}
												});

												await this.client.database.users.updateOne({
													userId: user2.id,
													guildId: msg.guild.id
												}, {
													$pull: {
														mochila: {
															item: randomDroga
														}
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

									await this.client.database.guilds.updateOne({
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

								await this.client.database.guilds.updateOne({
									_id: msg.guild.id
								}, {
									$set: {
										'exportador.irEmbora': tempo
									}
								});

								embed.fields = [];
								embed.addField('Tempo para o exportador ir embora:', Utils.convertMS(tempo));
								embed.addField('Quantidade que falta para a exportação:', `${atualDroga}/${randomQuantia}`);

								await msg.edit({
									embeds: [embed]
								});
							}, 5000 * 60);
						});
					} catch (error) {
						return;
					}
				}
			});
		} catch (err) {
			console.log(err);
			console.error(`ERRO NO READY: ${err}`);
		}
	}

	extendedSetTimeout(callback, ms2) {
		const biggestInt = (2 ** 31) - 1;
		const max = ms2 > biggestInt ? biggestInt : ms2;

		setTimeout(() => ms2 > max ? extendedSetTimeout(callback, ms2 - max) : callback(), max);
	}

};
