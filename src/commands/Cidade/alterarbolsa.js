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

			if (parseInt(xp) < 0 || parseInt(xp) > 90) return message.reply('o valor da bolsa precisa ser **maior que 0** e **menor que 90**.');

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

			const allItens = await Shop.find({});

			allItens.forEach(async (e) => {
				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[0]
				}, {
					$set: {
						'loja.bebidas.$.preco': 1500 - (porcentagem * 1500)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[1]
				}, {
					$set: {
						'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[2]
				}, {
					$set: {
						'loja.bebidas.$.preco': 1800 - (porcentagem * 1800)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[3]
				}, {
					$set: {
						'loja.bebidas.$.preco': 800 - (porcentagem * 800)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[4]
				}, {
					$set: {
						'loja.bebidas.$.preco': 1200 - (porcentagem * 1200)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.bebidas': e.loja.bebidas[5]
				}, {
					$set: {
						'loja.bebidas.$.preco': 2000 - (porcentagem * 2000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[0]
				}, {
					$set: {
						'loja.comidas.$.preco': 2000 - (porcentagem * 2000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[1]
				}, {
					$set: {
						'loja.comidas.$.preco': 1500 - (porcentagem * 1500)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[2]
				}, {
					$set: {
						'loja.comidas.$.preco': 900 - (porcentagem * 900)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[3]
				}, {
					$set: {
						'loja.comidas.$.preco': 600 - (porcentagem * 600)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[4]
				}, {
					$set: {
						'loja.comidas.$.preco': 1000 - (porcentagem * 1000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[5]
				}, {
					$set: {
						'loja.comidas.$.preco': 1200 - (porcentagem * 1200)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.comidas': e.loja.comidas[6]
				}, {
					$set: {
						'loja.comidas.$.preco': 500 - (porcentagem * 500)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.doces': e.loja.doces[0]
				}, {
					$set: {
						'loja.doces.$.preco': 300 - (porcentagem * 300)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.doces': e.loja.doces[1]
				}, {
					$set: {
						'loja.doces.$.preco': 750 - (porcentagem * 750)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.doces': e.loja.doces[2]
				}, {
					$set: {
						'loja.doces.$.preco': 450 - (porcentagem * 450)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.doces': e.loja.doces[3]
				}, {
					$set: {
						'loja.doces.$.preco': 700 - (porcentagem * 700)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.doces': e.loja.doces[4]
				}, {
					$set: {
						'loja.doces.$.preco': 550 - (porcentagem * 550)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.utilidades': e.loja.utilidades[0]
				}, {
					$set: {
						'loja.utilidades.$.preco': 50000 - (porcentagem * 50000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.utilidades': e.loja.utilidades[1]
				}, {
					$set: {
						'loja.utilidades.$.preco': 2000 - (porcentagem * 2000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.utilidades': e.loja.utilidades[2]
				}, {
					$set: {
						'loja.utilidades.$.preco': 5000 - (porcentagem * 5000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.utilidades': e.loja.utilidades[3]
				}, {
					$set: {
						'loja.utilidades.$.preco': 25000 - (porcentagem * 25000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.utilidades': e.loja.utilidades[4]
				}, {
					$set: {
						'loja.utilidades.$.preco': 20000 - (porcentagem * 20000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.pm': e.loja.pm[0]
				}, {
					$set: {
						'loja.pm.$.preco': 2000 - (porcentagem * 2000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.pm': e.loja.pm[1]
				}, {
					$set: {
						'loja.pm.$.preco': 55000 - (porcentagem * 55000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.pm': e.loja.pm[2]
				}, {
					$set: {
						'loja.pm.$.preco': 28000 - (porcentagem * 28000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.pm': e.loja.pm[3]
				}, {
					$set: {
						'loja.pm.$.preco': 15000 - (porcentagem * 15000)
					}
				});

				await Shop.findOneAndUpdate({
					_id: message.guild.id,
					'loja.pm': e.loja.pm[4]
				}, {
					$set: {
						'loja.pm.$.preco': 25000 - (porcentagem * 25000)
					}
				});
			});
		}
	}

};
