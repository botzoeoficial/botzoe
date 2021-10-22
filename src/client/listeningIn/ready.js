/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable id-length */
const Guild = require('../../database/Schemas/Guild'),
	User = require('../../database/Schemas/User'),
	Commands = require('../../database/Schemas/Command'),
	Client = require('../../database/Schemas/Client'),
	Shop = require('../../database/Schemas/Shop');
const c = require('colors');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

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

		const random2 = Math.floor(Math.random() * 91);

		const server2 = await this.client.database.guilds.findOne({
			_id: '830972296176992296'
		});

		if (server2) {
			server2.bolsa.valor = random2;
			server2.bolsa.tempo = Date.now();
			server2.save();
		}

		const allUsers = await User.find({});

		const allGuilds = await Guild.find({});

		allGuilds.forEach(async (a) => {
			a.vip.forEach((_, index2) => {
				if (new Date(a.vip[index2].tempo).getTime() - Date.now() > 0) {
					setTimeout(async () => {
						this.client.users.cache.get(a.vip[index2].id).roles.remove('830972296260485189');

						await this.client.database.guilds.findOneAndUpdate({
							_id: a._id
						}, {
							$pull: {
								vip: {
									id: a.vip[index2].id
								}
							}
						});
					}, new Date(a.vip[index2].tempo).getTime() - Date.now());
				} else {
					a.vip[index2].tempo = null;
					// this.client.users.cache.get(a.vip[index2].id).roles.remove('830972296260485189');
				}
			});

			a.save();
		});

		allUsers.forEach(async e => {
			if (new Date(e.cooldown.bitcoin).getTime() - Date.now() > 0) {
				setTimeout(() => {
					e.save();
				}, new Date(e.cooldown.bitcoin).getTime() - Date.now());
			} else {
				const user2 = await this.client.database.users.findOne({
					_id: e._id
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
						_id: e._id
					}, {
						$set: {
							'humores.fome': e.humores.fome -= 1
						}
					});
					console.log('fome salva!');
				}, 7200000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.sede': e.humores.sede -= 1
						}
					});
					console.log('sede salva!');
				}, 3600000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.bravo': e.humores.bravo -= 1
						}
					});
					console.log('bravo salvo!');
				}, 3000000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.triste': e.humores.triste -= 1
						}
					});
					console.log('triste salvo!');
				}, 10800000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.cansado': e.humores.cansado -= 1
						}
					});
					console.log('cansado salvo!');
				}, 2400000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.solitario': e.humores.solitario -= 1
						}
					});
					console.log('solitário salvo!');
				}, 4800000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.desanimado': e.humores.desanimado -= 1
						}
					});
					console.log('desanimado salvo!');
				}, 6000000);
			} catch (err) {
				return;
			}

			try {
				setInterval(async () => {
					await this.client.database.users.findOneAndUpdate({
						_id: e._id
					}, {
						$set: {
							'humores.estressado': e.humores.estressado -= 1
						}
					});
					console.log('estressado salvo!');
				}, 5400000);
			} catch (err) {
				return;
			}
		});

		setInterval(async () => {
			const random = Math.floor(Math.random() * 91);

			const server = await this.client.database.guilds.findOne({
				_id: '830972296176992296'
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

				this.client.channels.cache.get('893472777909178369').send(embed);
        this.client.channels.cache.get('897285158099619880').send(embed);
			}
		}, 1200000);

		const allItens = await Shop.find({});

		allItens.forEach(async (e) => {
			setInterval(async () => {
				const server = await this.client.database.guilds.findOne({
					_id: e._id
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
						'loja.utilidades.$.preco': 5000 - (porcentagem * 5000)
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
			}, 1200000);
		});
	}

};
