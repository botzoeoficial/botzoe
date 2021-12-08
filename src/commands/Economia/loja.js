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
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

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
		const shop = await this.client.database.shop.findOne({
			_id: message.guild.id
		});

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

			const buttonBebidas = new MessageButton().setStyle('blurple').setEmoji('🥂').setID('bebidas');
			const buttonComidas = new MessageButton().setStyle('blurple').setEmoji('🍗').setID('comidas');
			const buttonDoces = new MessageButton().setStyle('blurple').setEmoji('🧁').setID('doces');
			const buttonUtilidades = new MessageButton().setStyle('blurple').setEmoji('🛠️').setID('utilidades');
			const buttonPolicia = new MessageButton().setStyle('blurple').setEmoji('👮').setID('policia');
			const buttonBitcoin = new MessageButton().setStyle('blurple').setEmoji('908786996535787551').setID('bitcoin');
			const botoes = new MessageActionRow().addComponents([buttonBebidas, buttonComidas, buttonDoces]);
			const botoes2 = new MessageActionRow().addComponents([buttonUtilidades, buttonPolicia, buttonBitcoin]);

			const msgTeste = await message.channel.send(author, {
				embed: embed,
				components: [botoes, botoes2]
			});

			const collector = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
				max: 1
			});

			collector.on('collect', async (b) => {
				if (b.id === 'bebidas') {
					b.reply.defer();

					const loja2 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja as bebidas que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja2.bebidas.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonAgua = new MessageButton().setStyle('blurple').setEmoji('897849546409906228').setID('agua');
					const buttonSuco = new MessageButton().setStyle('blurple').setEmoji('897849547294916638').setID('suco');
					const buttonRefrigerante = new MessageButton().setStyle('blurple').setEmoji('891034945085120572').setID('refrigerante');
					const buttonCafe = new MessageButton().setStyle('blurple').setEmoji('897849547244593162').setID('cafe');
					const buttonEnergetico = new MessageButton().setStyle('blurple').setEmoji('891035343262990366').setID('energetico');
					const buttonCerveja = new MessageButton().setStyle('blurple').setEmoji('897849547085217822').setID('cerveja');
					const bebidas1 = new MessageActionRow().addComponents([buttonAgua, buttonSuco, buttonRefrigerante]);
					const bebidas2 = new MessageActionRow().addComponents([buttonCafe, buttonEnergetico, buttonCerveja]);

					b.message.edit(author, {
						embed: embed,
						components: [bebidas1, bebidas2]
					});

					const collectorBebidas = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorBebidas.on('collect', async (b) => {
						if (b.id === 'agua') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[0].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Água\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[0].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[0].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[0].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[0].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[0].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[0].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'suco') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[1].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Suco\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[1].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[1].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[1].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[1].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[1].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[1].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'refrigerante') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[2].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Refrigerante\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[2].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[2].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[2].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[2].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[2].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[2].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'cafe') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[3].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Café\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[3].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[3].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[3].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[3].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[3].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[3].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'energetico') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[4].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Energético\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[4].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[4].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[4].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[4].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[4].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[4].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'cerveja') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja2.bebidas[5].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Cerveja\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja2.bebidas[5].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja2.bebidas[5].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja2.bebidas[5].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.bebidas[5].item).quantia + 1,
											saldo: user.saldo -= loja2.bebidas[5].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja2.bebidas[5].preco
										}
									});

									user.save();
								}
							}
						}
					});

					collectorBebidas.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				} else if (b.id === 'comidas') {
					b.reply.defer();

					const loja3 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja as comidas que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja3.comidas.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonSanduiche = new MessageButton().setStyle('blurple').setEmoji('897849546695147551').setID('sanduiche');
					const buttonPizza = new MessageButton().setStyle('blurple').setEmoji('897849547089399848').setID('pizza');
					const buttonBatataFrita = new MessageButton().setStyle('blurple').setEmoji('897849547957612574').setID('batatafrita');
					const buttonMistoQuente = new MessageButton().setStyle('blurple').setEmoji('897849547143913472').setID('mistoquente');
					const buttonCarne = new MessageButton().setStyle('blurple').setEmoji('897849547538186300').setID('carne');
					const buttonTacos = new MessageButton().setStyle('blurple').setEmoji('897849547206840410').setID('tacos');
					const buttonMiojo = new MessageButton().setStyle('blurple').setEmoji('897849546783223829').setID('miojo');
					const comidas1 = new MessageActionRow().addComponents([buttonSanduiche, buttonPizza, buttonBatataFrita, buttonMistoQuente]);
					const comidas2 = new MessageActionRow().addComponents([buttonCarne, buttonTacos, buttonMiojo]);

					b.message.edit(author, {
						embed: embed,
						components: [comidas1, comidas2]
					});

					const collectorComidas = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorComidas.on('collect', async (b) => {
						if (b.id === 'sanduiche') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[0].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Sanduíche\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[0].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[0].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[0].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[0].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[0].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[0].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'pizza') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[1].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Pizza\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[1].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[1].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[1].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[1].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[1].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[1].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'batatafrita') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[2].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Batata Frita\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[2].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[2].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[2].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[2].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[2].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[2].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'mistoquente') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[3].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Misto Quente\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[3].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[3].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[3].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[3].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[3].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[3].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'carne') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[4].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Carne\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[4].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[4].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[4].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[4].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[4].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[4].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'tacos') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[5].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Taco\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[5].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[5].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[5].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[5].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[5].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[5].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'miojo') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja3.comidas[6].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Miojo\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja3.comidas[6].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja3.comidas[6].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja3.comidas[6].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.comidas[6].item).quantia + 1,
											saldo: user.saldo -= loja3.comidas[6].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja3.comidas[6].preco
										}
									});

									user.save();
								}
							}
						}
					});

					collectorComidas.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				} else if (b.id === 'doces') {
					b.reply.defer();

					const loja4 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja os docinhos que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja4.doces.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonRosquinha = new MessageButton().setStyle('blurple').setEmoji('897849546992930867').setID('rosquinha');
					const buttonChocolate = new MessageButton().setStyle('blurple').setEmoji('897849546804174848').setID('chocolate');
					const buttonPipoca = new MessageButton().setStyle('blurple').setEmoji('897849547215212584').setID('pipoca');
					const buttonBolo = new MessageButton().setStyle('blurple').setEmoji('897849546913247292').setID('bolo');
					const buttonCookie = new MessageButton().setStyle('blurple').setEmoji('897849546720305175').setID('cookie');
					const doces1 = new MessageActionRow().addComponents([buttonRosquinha, buttonChocolate, buttonPipoca, buttonBolo]);
					const doces2 = new MessageActionRow().addComponents([buttonCookie]);

					b.message.edit(author, {
						embed: embed,
						components: [doces1, doces2]
					});

					const collectorDoces = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorDoces.on('collect', async (b) => {
						if (b.id === 'rosquinha') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja4.doces[0].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Rosquinha\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja4.doces[0].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja4.doces[0].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja4.doces[0].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[0].item).quantia + 1,
											saldo: user.saldo -= loja4.doces[0].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja4.doces[0].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'chocolate') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja4.doces[1].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Chocolate\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja4.doces[1].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja4.doces[1].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja4.doces[1].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[1].item).quantia + 1,
											saldo: user.saldo -= loja4.doces[1].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja4.doces[1].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'pipoca') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja4.doces[2].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Pipoca\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja4.doces[2].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja4.doces[2].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja4.doces[2].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[2].item).quantia + 1,
											saldo: user.saldo -= loja4.doces[2].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja4.doces[2].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'bolo') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja4.doces[3].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Bolo\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja4.doces[3].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja4.doces[3].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja4.doces[3].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[3].item).quantia + 1,
											saldo: user.saldo -= loja4.doces[3].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja4.doces[3].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'cookie') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja4.doces[4].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Cookie\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja4.doces[4].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja4.doces[4].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja4.doces[4].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja4.doces[4].item).quantia + 1,
											saldo: user.saldo -= loja4.doces[4].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja4.doces[4].preco
										}
									});

									user.save();
								}
							}
						}
					});

					collectorDoces.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				} else if (b.id === 'utilidades') {
					b.reply.defer();

					const loja5 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja os itens utéis que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja5.utilidades.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonRemedio = new MessageButton().setStyle('blurple').setEmoji('897849546862919740').setID('remedio');
					const buttonVaraDePesca = new MessageButton().setStyle('blurple').setEmoji('891297733774819328').setID('varadepesca');
					const buttonMascara = new MessageButton().setStyle('blurple').setEmoji('898324362279669851').setID('mascara');
					const buttonMochila = new MessageButton().setStyle('blurple').setEmoji('899007409006215188').setID('mochila');
					const buttonPorteDeArmas = new MessageButton().setStyle('blurple').setEmoji('899766443757928489').setID('portedearmas');
					const buttonTransferir = new MessageButton().setStyle('blurple').setEmoji('900544627097108531').setID('transferir');
					const utilidades1 = new MessageActionRow().addComponents([buttonRemedio, buttonVaraDePesca, buttonMascara]);
					const utilidades2 = new MessageActionRow().addComponents([buttonMochila, buttonPorteDeArmas, buttonTransferir]);

					b.message.edit(author, {
						embed: embed,
						components: [utilidades1, utilidades2]
					});

					const collectorUtilidades = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorUtilidades.on('collect', async (b) => {
						if (b.id === 'remedio') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							const itens = user.inventory;

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (itens.find((a) => a.item === loja5.utilidades[0].item)) {
								if (itens.find((a) => a.item === loja5.utilidades[0].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **Remédio** no inventário!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja5.utilidades[0].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Remédio\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[0].preco
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: loja5.utilidades[0].item,
											emoji: loja5.utilidades[0].emoji,
											id: loja5.utilidades[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja5.utilidades[0].preco
									}
								});
							}
						} else if (b.id === 'varadepesca') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const itens = user.inventory;

							if (itens.find((a) => a.item === loja5.utilidades[1].item)) {
								if (itens.find((a) => a.item === loja5.utilidades[1].item).quantia === 5) {
									return message.reply(`você já tem o máximo de **Varas de Pesca** no inventário!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja5.utilidades[1].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Vara de Pesca\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[1].preco
									}
								});

								if (!user.inventory.find((a) => a.item === loja5.utilidades[1].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$push: {
											inventory: {
												item: loja5.utilidades[1].item,
												emoji: loja5.utilidades[1].emoji,
												id: loja5.utilidades[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja5.utilidades[1].preco
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja5.utilidades[1].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((x) => x.item === loja5.utilidades[1].item).quantia + 1
										}
									});
								}
							}
						} else if (b.id === 'mascara') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (user.saldo < loja5.utilidades[2].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Máscara\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[2].preco
									}
								});

								if (user.mochila.find((a) => a.item === loja5.utilidades[2].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': loja5.utilidades[2].item
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === loja5.utilidades[2].item).quantia + 1,
											saldo: user.saldo -= loja5.utilidades[2].preco
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
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja5.utilidades[2].preco
										}
									});

									user.save();
								}
							}
						} else if (b.id === 'mochila') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							if (user.isMochila) return message.reply('você já possui uma **Mochila**!');

							if (user.saldo < loja5.utilidades[3].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||').then((b) => b.delete({
									timeout: 7000
								}));
							} else {
								message.reply(`você comprou o item \`Mochila\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[3].preco
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
						} else if (b.id === 'portedearmas') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.level < 2) return message.reply('você precisa ser level **2** para comprar um Porte de Armas!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item!');

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (user.mochila.find((a) => a.item === loja5.utilidades[4].item)) {
								if (user.mochila.find((a) => a.item === loja5.utilidades[4].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **Porte de Armas** na mochila!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja5.utilidades[4].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||').then((b) => b.delete({
									timeout: 7000
								}));
							} else {
								message.reply(`você comprou o item \`Porte de Armas\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[4].preco
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja5.utilidades[4].item,
											emoji: loja5.utilidades[4].emoji,
											id: loja5.utilidades[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja5.utilidades[4].preco
									}
								});
							}
						} else if (b.id === 'transferir') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							if (user.saldo < loja5.utilidades[5].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Transferir\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja5.utilidades[5].preco
									}
								});

								if (user.inventory.find((a) => a.item === loja5.utilidades[5].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'inventory.item': loja5.utilidades[5].item
									}, {
										$set: {
											'inventory.$.quantia': user.inventory.find((a) => a.item === loja5.utilidades[5].item).quantia + 1,
											saldo: user.saldo -= loja5.utilidades[5].preco
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$push: {
											inventory: {
												item: loja5.utilidades[5].item,
												emoji: loja5.utilidades[5].emoji,
												id: loja5.utilidades[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
												quantia: 1
											}
										},
										$set: {
											saldo: user.saldo -= loja5.utilidades[5].preco
										}
									});

									user.save();
								}
							}
						}
					});

					collectorUtilidades.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				} else if (b.id === 'policia') {
					b.reply.defer();

					const loja6 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja os itens da Polícia que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja6.pm.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
					});

					const buttonAlgemas = new MessageButton().setStyle('blurple').setEmoji('898326104413188157').setID('algemas');
					const buttonMp5 = new MessageButton().setStyle('blurple').setEmoji('901117948180168724').setID('mp5');
					const buttonG18 = new MessageButton().setStyle('blurple').setEmoji('901117282003075072').setID('g18');
					const buttonMunicaoPistola = new MessageButton().setStyle('blurple').setEmoji('905653668643241985').setID('pistola');
					const buttonMunicaoMetralhadora = new MessageButton().setStyle('blurple').setEmoji('905653521846784080').setID('metralhadora');
					const policia1 = new MessageActionRow().addComponents([buttonAlgemas, buttonMp5, buttonG18, buttonMunicaoPistola]);
					const policia2 = new MessageActionRow().addComponents([buttonMunicaoMetralhadora]);

					b.message.edit(author, {
						embed: embed,
						components: [policia1, policia2]
					});

					const collectorPolicia = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorPolicia.on('collect', async (b) => {
						if (b.id === 'algemas') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para comprar este item!');

							const itens = user.mochila;

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (itens.find((a) => a.item === loja6.pm[0].item)) {
								if (itens.find((a) => a.item === loja6.pm[0].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **Algemas** na sua mochila!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja6.pm[0].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Algemas\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja6.pm[0].preco
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja6.pm[0].item,
											emoji: loja6.pm[0].emoji,
											id: loja6.pm[0].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja6.pm[0].preco
									}
								});
							}
						} else if (b.id === 'mp5') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para comprar este item!');

							const itens = user.mochila;

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (itens.find((a) => a.item === loja6.pm[1].item)) {
								if (itens.find((a) => a.item === loja6.pm[1].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **MP5** na mochila!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja6.pm[1].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou uma \`MP5\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja6.pm[1].preco
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja6.pm[1].item,
											emoji: loja6.pm[1].emoji,
											id: loja6.pm[1].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja6.pm[1].preco
									}
								});
							}
						} else if (b.id === 'g18') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para comprar este item!');

							const itens = user.mochila;

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (itens.find((a) => a.item === loja6.pm[2].item)) {
								if (itens.find((a) => a.item === loja6.pm[2].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **G18** no inventário!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.saldo < loja6.pm[2].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou a arma \`G18\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja6.pm[2].preco
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: loja6.pm[2].item,
											emoji: loja6.pm[2].emoji,
											id: loja6.pm[2].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
											quantia: 1
										}
									},
									$set: {
										saldo: user.saldo -= loja6.pm[2].preco
									}
								});
							}
						} else if (b.id === 'pistola') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para comprar este item!');

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (user.saldo < loja6.pm[3].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou \`Munição Pistola\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja6.pm[3].preco
									}
								});

								if (user.mochila.find((a) => a.item === loja6.pm[3].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': loja6.pm[3].item
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[3].item).quantia + (1 * 5),
											saldo: user.saldo -= loja6.pm[3].preco
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
												quantia: 1 * 5
											}
										},
										$set: {
											saldo: user.saldo -= loja6.pm[3].preco
										}
									});
								}
							}
						} else if (b.id === 'metralhadora') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user.isMochila) return message.reply('você precisa ter uma **Mochila** antes de comprar este item! Vá até a Loja > Utilidades e Compre uma!');

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para comprar este item!');

							if (user.mochila.length > 0) {
								if (user.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							if (user.saldo < loja6.pm[4].preco) {
								return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou \`Munição Metralhadora\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja6.pm[4].preco
									}
								});

								if (user.mochila.find((a) => a.item === loja6.pm[4].item)) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': loja6.pm[4].item
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === loja6.pm[4].item).quantia + (1 * 5),
											saldo: user.saldo -= loja6.pm[4].preco
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
												quantia: 1 * 5
											}
										},
										$set: {
											saldo: user.saldo -= loja6.pm[4].preco
										}
									});
								}
							}
						}
					});

					collectorPolicia.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				} else if (b.id === 'bitcoin') {
					b.reply.defer();

					const loja7 = shop.loja;

					embed.fields = [];

					embed
						.setTitle(`LOJINHA DA ${this.client.user.username}`)
						.setDescription('Veja os itens de BitCoins que tenho disponíveis na minha lojinha:')
						.setThumbnail(this.client.user.displayAvatarURL());

					loja7.bitcoin.forEach((est) => {
						embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **<:btc:908786996535787551> ${Utils.numberFormat(est.preco)}**`, `Descrição: ${est.desc}`);
					});

					const buttonBolso = new MessageButton().setStyle('blurple').setEmoji('908780753884696706').setID('bolso');
					const bitcoin1 = new MessageActionRow().addComponents([buttonBolso]);

					b.message.edit(author, {
						embed: embed,
						components: [bitcoin1]
					});

					const collectorBitcoin = msgTeste.createButtonCollector((button) => button.clicker.user.id === author.id, {
						time: 120000
					});

					collectorBitcoin.on('collect', async (b) => {
						if (b.id === 'bolso') {
							b.reply.defer();

							const user = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user.prisao.isPreso) return message.reply('você não pode comprar esse item, pois você está **preso**!');

							const itens = user.inventory;

							if (itens.find((a) => a.item === loja7.bitcoin[0].item)) {
								if (itens.find((a) => a.item === loja7.bitcoin[0].item).quantia === 1) {
									return message.reply(`você já tem o máximo de **Bolso** no seu inventário!`).then((b) => b.delete({
										timeout: 7000
									}));
								}
							} else if (user.bitcoin < loja7.bitcoin[0].preco) {
								return message.reply('você não tem BitCoin suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
							} else {
								message.reply(`você comprou o item \`Bolso\` com sucesso!`).then((b) => b.delete({
									timeout: 7000
								}));

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										bank: server.bank + loja7.bitcoin[0].preco
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
						}
					});

					collectorBitcoin.on('end', async (b, reason) => {
						if (reason === 'time') {
							msgTeste.edit({
								embed: embed,
								components: []
							});
							return;
						}
					});
				}
			});
		} else if (args[0] === 'agro' || args[0] === 'Agro') {
			const embed = new ClientEmbed(author)
				.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
				.setDescription('Clique na reação de acordo com as categorias da loja abaixo:')
				.setThumbnail(this.client.user.displayAvatarURL())
				.addField('🌱 | Sementes:', `Clique em 🌱`, true)
				.addField('🛠️ | Utilidades:', `Clique em 🛠️`, true)
				.addField('💴 | Vender:', `Clique em 💴`, true);

			message.channel.send(author, embed).then(async (msg) => {
				await msg.react('🌱');
				await msg.react('🛠️');
				await msg.react('💴');

				const collector = msg.createReactionCollector((r, u) => ['🌱', '🛠️', '💴'].includes(r.emoji.name) && u.id === author.id, {
					max: 1
				});

				collector.on('collect', async (reaction) => {
					if (reaction.emoji.name === '🌱') {
						msg.reactions.removeAll();

						const loja2 = shop.loja;

						embed.fields = [];

						embed
							.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
							.setDescription('Veja as Sementes que tenho disponíveis na minha lojinha:')
							.setThumbnail(this.client.user.displayAvatarURL());

						loja2.sementes.forEach((est) => {
							embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
						});

						msg.edit(author, embed).then(async (as) => {
							await as.react('911706991783735306');
							await as.react('911706991297187851');
							await as.react('911706992056365176');
							await as.react('911706991217496075');
							await as.react('911706991796301874');
							await as.react('911706991280410755');
							await as.react('911706991599173653');
							await as.react('911706991804678144');
							await as.react('911706991766933574');
							await as.react('911706991594995732');
							await as.react('911706991632736316');
							await as.react('911706991934734406');
							await as.react('911706991808884776');
							await as.react('911706991615950898');
							await as.react('911706992400298056');
							await as.react('911706991670493214');

							const collector2 = as.createReactionCollector((r, u) => ['911706991783735306', '911706991297187851', '911706992056365176', '911706991217496075', '911706991796301874', '911706991280410755', '911706991599173653', '911706991804678144', '911706991766933574', '911706991594995732', '911706991632736316', '911706991934734406', '911706991808884776', '911706991615950898', '911706992400298056', '911706991670493214'].includes(r.emoji.id) && u.id === author.id, {
								time: 120000
							});

							collector2.on('collect', async (reaction2) => {
								if (reaction2.emoji.id === '911706991783735306') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[0].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Maçã\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[0].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[0].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[0].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[0].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[0].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[0].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991297187851') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[1].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Banana\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[1].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[1].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[1].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[1].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[1].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[1].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706992056365176') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[2].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Laranja\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[2].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[2].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[2].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[2].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[2].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[2].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991217496075') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[3].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Limão\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[3].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[3].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[3].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[3].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[3].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[3].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991796301874') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[4].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Pêra\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[4].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[4].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[4].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[4].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[4].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[4].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991280410755') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[5].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Morango\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[5].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[5].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[5].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[5].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[5].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[5].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991599173653') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[6].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Tomate\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[6].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[6].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[6].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[6].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[6].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[6].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991804678144') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[7].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Abacaxi\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[7].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[7].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[7].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[7].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[7].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[7].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991766933574') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[8].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Melão\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[8].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[8].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[8].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[8].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[8].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[8].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991594995732') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[9].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Manga\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[9].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[9].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[9].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[9].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[9].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[9].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991632736316') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[10].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Pêssego\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[10].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[10].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[10].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[10].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[10].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[10].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991934734406') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[11].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Cereja\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[11].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[11].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[11].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[11].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[11].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[11].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991808884776') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[12].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Melancia\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[12].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[12].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[12].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[12].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[12].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[12].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991615950898') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[13].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Café\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[13].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[13].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[13].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[13].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[13].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[13].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706992400298056') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[14].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Milho\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[14].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[14].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[14].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[14].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[14].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[14].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911706991670493214') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja2.sementes[15].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou **5** Sementes de \`Arroz\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja2.sementes[15].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja2.sementes[15].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja2.sementes[15].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja2.sementes[15].item).quantia + 5,
													saldo: user.saldo -= loja2.sementes[15].preco
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
														quantia: 5
													}
												},
												$set: {
													saldo: user.saldo -= loja2.sementes[15].preco
												}
											});

											user.save();
										}
									}
								}
							});

							collector2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									as.reactions.removeAll();
									return;
								}
							});
						});
					} else if (reaction.emoji.name === '🛠️') {
						msg.reactions.removeAll();

						const loja3 = shop.loja;

						embed.fields = [];

						embed
							.setTitle(`Agro é Pop, Agro é Tech, Agro é Zoe, Agro é Tudo!!`)
							.setDescription('Veja as Utilidades Agro que tenho disponíveis na minha lojinha:')
							.setThumbnail(this.client.user.displayAvatarURL());

						loja3.utilidadesAgro.forEach((est) => {
							embed.addField(`${est.emoji} | ${est.item}:ㅤㅤPreço: **R$${Utils.numberFormat(est.preco)},00**`, `Descrição: ${est.desc}`);
						});

						msg.edit(author, embed).then(async (as) => {
							await as.react('898326104782299166');
							await as.react('898326105126215701');
							await as.react('898326105361113099');
							await as.react('911776845144416287');
							await as.react('911776844724969532');

							const collector2 = as.createReactionCollector((r, u) => ['898326104782299166', '898326105126215701', '898326105361113099', '911776845144416287', '911776844724969532'].includes(r.emoji.id) && u.id === author.id, {
								time: 120000
							});

							collector2.on('collect', async (reaction2) => {
								if (reaction2.emoji.id === '898326104782299166') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja3.utilidadesAgro[0].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou o item \`Adubo\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja3.utilidadesAgro[0].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[0].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[0].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[0].item).quantia + 1,
													saldo: user.saldo -= loja3.utilidadesAgro[0].preco
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
														quantia: 1
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[0].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '898326105126215701') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja3.utilidadesAgro[1].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou o item \`Fertilizante\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja3.utilidadesAgro[1].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[1].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[1].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[1].item).quantia + 1,
													saldo: user.saldo -= loja3.utilidadesAgro[1].preco
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
														quantia: 1
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[1].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '898326105361113099') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja3.utilidadesAgro[2].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou o item \`Irrigação\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja3.utilidadesAgro[2].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[2].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[2].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[2].item).quantia + 1,
													saldo: user.saldo -= loja3.utilidadesAgro[2].preco
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
														quantia: 1
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[2].preco
												}
											});

											user.save();
										}
									}
								} else if (reaction2.emoji.id === '911776845144416287') {
									const user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									if (user.inventory.length > 0) {
										if (user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
											if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
												return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
													timeout: 5000
												}));
											}
										}
									}

									if (user.saldo < loja3.utilidadesAgro[3].preco) {
										return message.reply('você não tem saldo suficiente para comprar este item! ||"SEU(A) POBRE!!!!!"||');
									} else {
										message.reply(`você comprou o item \`Aluguel Trator\` com sucesso!`).then((b) => b.delete({
											timeout: 7000
										}));

										const server = await this.client.database.guilds.findOne({
											_id: message.guild.id
										});

										await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$set: {
												bank: server.bank + loja3.utilidadesAgro[3].preco
											}
										});

										if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[3].item)) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'inventory.item': loja3.utilidadesAgro[3].item
											}, {
												$set: {
													'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[3].item).quantia + 1,
													saldo: user.saldo -= loja3.utilidadesAgro[3].preco
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
														quantia: 1
													}
												},
												$set: {
													saldo: user.saldo -= loja3.utilidadesAgro[3].preco
												}
											});

											user.save();
										}
									}
								}
								// else if (reaction2.emoji.id === '911776844724969532') {
								// 	const user = await this.client.database.users.findOne({
								// 		userId: author.id,
								// 		guildId: message.guild.id
								// 	});

								// 	if (user.saldo < loja3.utilidadesAgro[4].preco) {
								// 		return message.reply('você não tem saldo suficiente para comprar o Agricultor! ||"SEU(A) POBRE!!!!!"||');
								// 	} else {
								// 		message.reply(`você comprou o item \`Agricultor\` com sucesso!`).then((b) => b.delete({
								// 			timeout: 7000
								// 		}));

								// 		const server = await this.client.database.guilds.findOne({
								// 			_id: message.guild.id
								// 		});

								// 		await this.client.database.guilds.findOneAndUpdate({
								// 			_id: message.guild.id
								// 		}, {
								// 			$set: {
								// 				bank: server.bank + loja3.utilidadesAgro[4].preco
								// 			}
								// 		});

								// 		if (user.inventory.find((a) => a.item === loja3.utilidadesAgro[4].item)) {
								// 			await this.client.database.users.findOneAndUpdate({
								// 				userId: author.id,
								// 				guildId: message.guild.id,
								// 				'inventory.item': loja3.utilidadesAgro[4].item
								// 			}, {
								// 				$set: {
								// 					'inventory.$.quantia': user.inventory.find((a) => a.item === loja3.utilidadesAgro[4].item).quantia + 1,
								// 					saldo: user.saldo -= loja3.utilidadesAgro[4].preco
								// 				}
								// 			});
								// 		} else {
								// 			await this.client.database.users.findOneAndUpdate({
								// 				userId: author.id,
								// 				guildId: message.guild.id
								// 			}, {
								// 				$push: {
								// 					inventory: {
								// 						item: loja3.utilidadesAgro[4].item,
								// 						emoji: loja3.utilidadesAgro[4].emoji,
								// 						id: loja3.utilidadesAgro[4].emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
								// 						quantia: 1
								// 					}
								// 				},
								// 				$set: {
								// 					saldo: user.saldo -= loja3.utilidadesAgro[4].preco
								// 				}
								// 			});

								// 			user.save();
								// 		}

								// 		return;
								// 	}
								// }
							});

							collector2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									as.reactions.removeAll();
									return;
								}
							});
						});
					} else if (reaction.emoji.name === '💴') {
						// falta fazer ainda
					}
				});
			});
		}
	}

};
