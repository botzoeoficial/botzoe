/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Roubar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'roubar';
		this.category = 'Crime';
		this.description = 'Roube um usuário!';
		this.usage = 'roubar <usuário>';
		this.aliases = ['assaltar'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server2 = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (user.policia.isPolice) return message.reply('você não pode usar esse comando pois você é Policial do servidor!');

		if (server2.cidade.delegado === author.id) return message.reply('você não pode usar esse comando pois você é Delegado do servidor!');

		if (user.armaEquipada === 'Nenhuma arma equipada.') return message.reply('você precisa equipar uma arma antes de roubar alguém!');

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
		} else if (user.mochila.find((a) => a.item === 'Máscara')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

			if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

			if (user2.saldo < 100) return message.reply(`esse usuário não possui nem **R$100,00** de dinheiro na carteira. Vá roubar outro!`);

			const embed = new ClientEmbed(author)
				.setTitle('🔫 | Roubo');

			if (user.armaEquipada === 'Ak-47') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 76) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Metralhadora'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Metralhadora'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 76) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'UMP') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 61) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Metralhadora'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Metralhadora'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 61) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'MP5') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 51) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Metralhadora'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Metralhadora'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 51) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'ACR') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 86) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Metralhadora'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Metralhadora'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 86) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'KNT-308') {
				if (!user.mochila.find((a) => a.item === 'Munição KNT')) {
					return message.reply('antes de roubar, você precisa ter **Munição KNT** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 26) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição KNT').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição KNT'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição KNT'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 26) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'Desert Eagle') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 31) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Pistola'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Pistola'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 31) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'Revolver 38') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 21) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Pistola'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Pistola'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 21) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			} else if (user.armaEquipada === 'G18') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
				} else {
					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 11) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						message.channel.send(author, embed).then(async (msg) => {
							await msg.react('👮‍♂️');

							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

							const sim = msg.createReactionCollector(filter, {
								time: 4000,
								max: 1
							});

							if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$pull: {
										mochila: {
											item: 'Munição Pistola'
										}
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': 'Munição Pistola'
								}, {
									$set: {
										'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
									}
								});
							}

							sim.on('collect', async (reaction, user3) => {
								const userPolicia = await this.client.database.users.findOne({
									userId: user3.id,
									guildId: message.guild.id
								});

								const timeoutRoubar = 5400000;

								if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
									const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

									const embedRoubar = new ClientEmbed(author)
										.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

									message.channel.send(`<@${user3.id}>`, embedRoubar);
								} else {
									sim.stop();

									message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

									await this.client.database.users.findOneAndUpdate({
										userId: user3.id,
										guildId: message.guild.id
									}, {
										$set: {
											'policia.prenderRoubar': Date.now()
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											'prisao.isPreso': true,
											'prisao.tempo': Date.now(),
											'prisao.prender': true
										}
									});

									setTimeout(async () => {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': 0,
												'prisao.isPreso': false,
												'prisao.tempo': 0,
												'prisao.prender': false
											}
										});
									}, 43200000);
								}
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'cooldown.roubar': Date.now(),
											saldo: user.saldo + Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo - Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 11) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.channel.send(author, embed);
					}
				}
			}

			if (user.mochila.find((a) => a.item === 'Máscara').quantia <= 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						mochila: {
							item: 'Máscara'
						}
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'mochila.item': 'Máscara'
				}, {
					$set: {
						'mochila.$.quantia': user.mochila.find((a) => a.item === 'Máscara').quantia - 1
					}
				});
			}
		} else {
			const timeout = 1800000;

			if (timeout - (Date.now() - user.cooldown.roubar) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.roubar));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você ainda está cansado da última vez! Você pode tentar novamente em: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			} else {
				const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

				if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

				const user2 = await this.client.database.users.findOne({
					userId: member.id,
					guildId: message.guild.id
				});

				if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

				if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

				if (user2.saldo < 100) return message.reply(`esse usuário não possui nem **R$100,00** de dinheiro na carteira. Vá roubar outro!`);

				const embed = new ClientEmbed(author)
					.setTitle('🔫 | Roubo');

				if (user.armaEquipada === 'Ak-47') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 76) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Metralhadora'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Metralhadora'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 76) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'UMP') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 61) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Metralhadora'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Metralhadora'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 61) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'MP5') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 51) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Metralhadora'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Metralhadora'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 51) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'ACR') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply('antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 86) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Metralhadora'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Metralhadora'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Metralhadora').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 86) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'KNT-308') {
					if (!user.mochila.find((a) => a.item === 'Munição KNT')) {
						return message.reply('antes de roubar, você precisa ter **Munição KNT** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 26) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição KNT').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição KNT'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição KNT'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição KNT').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 26) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'Desert Eagle') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 31) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Pistola'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Pistola'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 31) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'Revolver 38') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 21) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Pistola'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Pistola'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 21) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				} else if (user.armaEquipada === 'G18') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply('antes de roubar, você precisa ter **Munição Pistola** na sua mochila!');
					} else {
						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 11) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							message.channel.send(author, embed).then(async (msg) => {
								await msg.react('👮‍♂️');

								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (reaction, user3) => reaction.emoji.name === '👮‍♂️' && server.cidade.policiais.map(a => a.id).includes(user3.id);

								const sim = msg.createReactionCollector(filter, {
									time: 4000,
									max: 1
								});

								if (user.mochila.find((a) => a.item === 'Munição Pistola').quantia <= 1) {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$pull: {
											mochila: {
												item: 'Munição Pistola'
											}
										}
									});
								} else {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id,
										'mochila.item': 'Munição Pistola'
									}, {
										$set: {
											'mochila.$.quantia': user.mochila.find((a) => a.item === 'Munição Pistola').quantia - 1
										}
									});
								}

								sim.on('collect', async (reaction, user3) => {
									const userPolicia = await this.client.database.users.findOne({
										userId: user3.id,
										guildId: message.guild.id
									});

									const timeoutRoubar = 5400000;

									if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
										const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

										const embedRoubar = new ClientEmbed(author)
											.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

										message.channel.send(`<@${user3.id}>`, embedRoubar);
									} else {
										sim.stop();

										message.channel.send(`🚓 | Você foi preso em flagrante por <@${user3.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

										await this.client.database.users.findOneAndUpdate({
											userId: user3.id,
											guildId: message.guild.id
										}, {
											$set: {
												'policia.prenderRoubar': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												'prisao.isPreso': true,
												'prisao.tempo': Date.now(),
												'prisao.prender': true
											}
										});

										setTimeout(async () => {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													'cooldown.roubar': 0,
													'prisao.isPreso': false,
													'prisao.tempo': 0,
													'prisao.prender': false
												}
											});
										}, 43200000);
									}
								});

								sim.on('end', async (collected, reason) => {
									if (reason === 'time') {
										sim.stop();

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo + Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo - Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 11) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.channel.send(author, embed);
						}
					}
				}
			}
		}
	}

};
