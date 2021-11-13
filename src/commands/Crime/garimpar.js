/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Garimpar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'garimpar';
		this.category = 'Crime';
		this.description = 'Garimpe alguns minérios!';
		this.usage = 'garimpar';
		this.aliases = ['garimpo'];

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

		let presoTime = 0;

		const embedPreso = new ClientEmbed(author)
			.setTitle('👮 | Preso');

		if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			presoTime = 36000000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.prender) {
			presoTime = 43200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			presoTime = 21600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			presoTime = 180000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.velha) {
			presoTime = 300000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.frentista) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.joalheria) {
			presoTime = 900000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.agiota) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.casaLoterica) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.brazino) {
			presoTime = 2100000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.facebook) {
			presoTime = 2700000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.bancoCentral) {
			presoTime = 3600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.shopping) {
			presoTime = 7200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.banco) {
			presoTime = 14400000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else {
			const timeout = 1200000;

			if (timeout - (Date.now() - user.cooldown.garimpar) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.garimpar));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			} else {
				const itens = ['Ferro', 'Caulim', 'Plástico', 'Cobre', 'Prata'];
				const itensEspeciais = ['Alumínio', 'Borracha'];
				const randomEspecial = itensEspeciais[Math.floor(Math.random() * itensEspeciais.length)];
				const randomItens = itens.sort(() => 0.5 - Math.random()).slice(0, 2);
				const randomQuantia = Utils.randomNumber(5, 10);
				const randomQuantia2 = Utils.randomNumber(5, 10);
				const randomQuantia3 = Utils.randomNumber(5, 10);

				if (randomEspecial === 'Alumínio') {
					if (randomItens[0] === 'Ferro' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminio:901590892727660564> | Alumínio: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Alumínio')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Alumínio'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Alumínio').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Alumínio',
										emoji: '<:aluminio:901590892727660564>',
										id: '<:aluminio:901590892727660564>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					}
				} else if (randomEspecial === 'Borracha') {
					if (randomItens[0] === 'Ferro' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia2}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:ferro:901590546441715782> | Ferro: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Ferro')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Ferro'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Ferro').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Ferro',
										emoji: '<:ferro:901590546441715782>',
										id: '<:ferro:901590546441715782>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:caulim:901590641274921030> | Caulim: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Caulim')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Caulim'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Caulim').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Caulim',
										emoji: '<:caulim:901590641274921030>',
										id: '<:caulim:901590641274921030>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:plastico:901590709235253338> | Plástico: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Plástico')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Plástico'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Plástico').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Plástico',
										emoji: '<:plastico:901590709235253338>',
										id: '<:plastico:901590709235253338>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('Garimpo')
							.setDescription(`Você garimpou:\n\n<:borracha:901590941033435157> | Borracha: \`${randomQuantia}\`\n\n<:prata:901590833151746128> | Prata: \`${randomQuantia2}\`\n\n<:cobre:901590776545431613> | Cobre: \`${randomQuantia3}\``);

						message.channel.send(author, embed);

						if (user.inventory.find((a) => a.item === 'Borracha')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Borracha'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Borracha').quantia + randomQuantia
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Borracha',
										emoji: '<:borracha:901590941033435157>',
										id: '<:borracha:901590941033435157>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Prata')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Prata'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Prata').quantia + randomQuantia2
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Prata',
										emoji: '<:prata:901590833151746128>',
										id: '<:prata:901590833151746128>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia2
									}
								}
							});
						}

						if (user.inventory.find((a) => a.item === 'Cobre')) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'inventory.item': 'Cobre'
							}, {
								$set: {
									'inventory.$.quantia': user.inventory.find((a) => a.item === 'Cobre').quantia + randomQuantia3
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									inventory: {
										item: 'Cobre',
										emoji: '<:cobre:901590776545431613>',
										id: '<:cobre:901590776545431613>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
										quantia: randomQuantia3
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.garimpar': Date.now()
							}
						});

						user.save();
					}
				}
			}
		}
	}

};
