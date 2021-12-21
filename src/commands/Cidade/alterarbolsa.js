/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const Shop = require('../../database/Schemas/Shop');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Alterarbolsa extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'alterarbolsa';
		this.category = 'Cidade';
		this.description = 'Altere o valor da bolsa de valores!';
		this.usage = 'alterarbolsa <valor>';
		this.aliases = ['alterar-bolsa'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = true;
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
		args,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const timeout = 43200000;

		if (timeout - (Date.now() - server.cidade.alterarBolsa) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.alterarBolsa));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const xp = args[0];

			if (!xp) return message.reply('você precisa colocar um valor.');

			if (parseInt(xp) < 0 || parseInt(xp) > 90) return message.reply('o valor da bolsa precisa ser **maior que 0** e **menor que 91**.');

			server.bolsa.valor = Number(xp);
			server.bolsa.tempo = Date.now();

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.alterarBolsa': Date.now()
				}
			});

			server.save();

			message.reply(`valor da bolsa de valores alterada para **${server.bolsa.valor}.0%**`);

			const {
				bolsa
			} = server;

			const porcentagem = bolsa.valor / 100;

			const allItens = await Shop.find({
				_id: message.guild.id
			});

			allItens.forEach(async (e) => {
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
						'loja.utilidades.$.preco': 150000 - (porcentagem * 150000)
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
					'loja.utilidades': e.loja.utilidades[5]
				}, {
					$set: {
						'loja.utilidades.$.preco': 10000 - (porcentagem * 10000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.pm': e.loja.pm[0]
				}, {
					$set: {
						'loja.pm.$.preco': 20000 - (porcentagem * 20000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.pm': e.loja.pm[1]
				}, {
					$set: {
						'loja.pm.$.preco': 350000 - (porcentagem * 350000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.pm': e.loja.pm[2]
				}, {
					$set: {
						'loja.pm.$.preco': 200000 - (porcentagem * 200000)
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

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[0]
				}, {
					$set: {
						'loja.sementes.$.preco': 800 - (porcentagem * 800),
						'loja.sementes.$.venda': 421 + (porcentagem * 421)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[1]
				}, {
					$set: {
						'loja.sementes.$.preco': 900 - (porcentagem * 900),
						'loja.sementes.$.venda': 685 + (porcentagem * 685)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[2]
				}, {
					$set: {
						'loja.sementes.$.preco': 1100 - (porcentagem * 1100),
						'loja.sementes.$.venda': 790 + (porcentagem * 790)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[3]
				}, {
					$set: {
						'loja.sementes.$.preco': 750 - (porcentagem * 750),
						'loja.sementes.$.venda': 1000 + (porcentagem * 1000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[4]
				}, {
					$set: {
						'loja.sementes.$.preco': 1500 - (porcentagem * 1500),
						'loja.sementes.$.venda': 948 + (porcentagem * 948)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[5]
				}, {
					$set: {
						'loja.sementes.$.preco': 1800 - (porcentagem * 1800),
						'loja.sementes.$.venda': 1369 + (porcentagem * 1369)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[6]
				}, {
					$set: {
						'loja.sementes.$.preco': 2100 - (porcentagem * 2100),
						'loja.sementes.$.venda': 2106 + (porcentagem * 2106)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[7]
				}, {
					$set: {
						'loja.sementes.$.preco': 2500 - (porcentagem * 2500),
						'loja.sementes.$.venda': 1632 + (porcentagem * 1632)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[8]
				}, {
					$set: {
						'loja.sementes.$.preco': 2900 - (porcentagem * 2900),
						'loja.sementes.$.venda': 1790 + (porcentagem * 1790)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[9]
				}, {
					$set: {
						'loja.sementes.$.preco': 3300 - (porcentagem * 3300),
						'loja.sementes.$.venda': 2790 + (porcentagem * 2790)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[10]
				}, {
					$set: {
						'loja.sementes.$.preco': 3900 - (porcentagem * 3900),
						'loja.sementes.$.venda': 3105 + (porcentagem * 3105)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[11]
				}, {
					$set: {
						'loja.sementes.$.preco': 4400 - (porcentagem * 4400),
						'loja.sementes.$.venda': 2211 + (porcentagem * 2211)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[12]
				}, {
					$set: {
						'loja.sementes.$.preco': 5000 - (porcentagem * 5000),
						'loja.sementes.$.venda': 2579 + (porcentagem * 2579)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[13]
				}, {
					$set: {
						'loja.sementes.$.preco': 3900 - (porcentagem * 3900),
						'loja.sementes.$.venda': 4100 + (porcentagem * 4100)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[14]
				}, {
					$set: {
						'loja.sementes.$.preco': 4400 - (porcentagem * 4400),
						'loja.sementes.$.venda': 3237 + (porcentagem * 3237)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.sementes': e.loja.sementes[15]
				}, {
					$set: {
						'loja.sementes.$.preco': 5000 - (porcentagem * 5000),
						'loja.sementes.$.venda': 5263 + (porcentagem * 5263)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.utilidadesAgro': e.loja.utilidadesAgro[0]
				}, {
					$set: {
						'loja.utilidadesAgro.$.preco': 100 - (porcentagem * 100)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.utilidadesAgro': e.loja.utilidadesAgro[1]
				}, {
					$set: {
						'loja.utilidadesAgro.$.preco': 150 - (porcentagem * 150)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.utilidadesAgro': e.loja.utilidadesAgro[2]
				}, {
					$set: {
						'loja.utilidadesAgro.$.preco': 130 - (porcentagem * 130)
					}
				});

				await Shop.findOneAndUpdate({
					_id: e._id,
					'loja.utilidadesAgro': e.loja.utilidadesAgro[3]
				}, {
					$set: {
						'loja.utilidadesAgro.$.preco': 300 - (porcentagem * 300)
					}
				});
			});
		}
	}

};
