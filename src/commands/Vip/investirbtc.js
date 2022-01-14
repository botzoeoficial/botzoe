/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable complexity */
/* eslint-disable func-names */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
moment.locale('pt-BR');
const ms = require('parse-ms');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Investirbtc extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'investirbtc';
		this.category = 'Vip';
		this.description = 'Invista em uma quantia de bitcoins!';
		this.usage = 'investirbtc';
		this.aliases = ['investir-btc'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = true;
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

		if (user.prisao.isPreso) {
			let presoTime = 0;

			const embedPreso = new ClientEmbed(author)
				.setTitle('👮 | Preso');

			if (user.prisao.prenderCmd) {
				presoTime = user.prisao.prenderMili;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.traficoDrogas) {
				presoTime = 36000000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.prender) {
				presoTime = 43200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.revistar) {
				presoTime = 21600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.roubarVeiculo) {
				presoTime = 180000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.velha) {
				presoTime = 300000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.frentista) {
				presoTime = 600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.joalheria) {
				presoTime = 900000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.agiota) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.casaLoterica) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.brazino) {
				presoTime = 2100000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.facebook) {
				presoTime = 2700000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.bancoCentral) {
				presoTime = 3600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.shopping) {
				presoTime = 7200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.banco) {
				presoTime = 14400000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			}

			const buttonPreso = new MessageButton().setStyle('blurple').setEmoji('900544510365405214').setID('preso');
			const botoes = new MessageActionRow().addComponents([buttonPreso]);

			const escolha = await message.channel.send(author, {
				embed: embedPreso,
				components: [botoes]
			});

			const collectorEscolhas = escolha.createButtonCollector((button) => button.clicker.user.id === author.id, {
				max: 1,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				if (b.id === 'preso') {
					b.reply.defer();

					const userMochila = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!userMochila.isMochila) {
						escolha.delete();

						return message.reply('você não tem uma **mochila**. Vá até a Loja > Utilidades e Compre uma!');
					}

					if (!userMochila.mochila.find((a) => a.item === 'Chave Micha')) {
						escolha.delete();

						return message.reply('você não tem uma **Chave Micha** na sua Mochila!');
					}

					if (userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia > 1) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id,
							'mochila.item': 'Chave Micha'
						}, {
							$set: {
								'mochila.$.quantia': userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia - 1
							}
						});
					} else {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$pull: {
								mochila: {
									item: 'Chave Micha'
								}
							}
						});
					}

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'prisao.isPreso': false,
							'prisao.tempo': 0,
							'prisao.prenderCmd': false,
							'prisao.prenderMili': 0,
							'prisao.traficoDrogas': false,
							'prisao.crime': false,
							'prisao.prender': false,
							'prisao.revistar': false,
							'prisao.roubarVeiculo': false,
							'prisao.atirarPrisao': false,
							'prisao.velha': false,
							'prisao.frentista': false,
							'prisao.joalheria': false,
							'prisao.agiota': false,
							'prisao.casaLoterica': false,
							'prisao.brazino': false,
							'prisao.facebook': false,
							'prisao.bancoCentral': false,
							'prisao.shopping': false,
							'prisao.banco': false
						}
					});

					escolha.delete();
					return message.reply(`você usou \`x1\` **Chave Micha** e conseguiu sair da prisão com sucesso!`);
				}
			});

			collectorEscolhas.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return escolha.edit(author, {
						embed: embedPreso,
						components: []
					});
				}
			});

			return;
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('<:btc:908786996535787551> BITCOIN')
				.setDescription('📈 | Quantos BitCoins você deseja investir?\n\n**OBS: Envie no chat um número!**')
				.setFooter('Digite 0 para cancelar.', author.displayAvatarURL({ dynamic: true }))

			message.channel.send(author, embed).then(async (msg) => {
				const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id, {
					time: 60000
				});

				collector.on('collect', async (ce) => {
					if (parseInt(ce.content) <= 0) {
						msg.delete();

						return message.reply(`cancelado com sucesso!`);
					} else if (!parseInt(ce.content)) {
						message.reply(`você precisa enviar uma quantia válida. Digite a quantia novamente!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else if (parseInt(ce.content) > user.bitcoin) {
						message.reply(`você não tem essa quantia toda de bitcoins para investir. Digite a quantia novamente!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else if (isNaN(ce.content)) {
						message.reply(`você precisa colocar apenas números, não **letras** ou **números junto com letras**. Digite a quantia novamente!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else {
						collector.stop();

						embed.setDescription(`📈 | Você tem certeza que deseja investir **${ce.content}** bitcoin(s) com duração de 10 dias?`);

						const buttonSim = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
						const buttonNao = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
						const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

						msg.edit(author, {
							embed: embed,
							components: [botoes]
						}).then(async (msg2) => {
							const collectorBotoes = msg2.createButtonCollector((button) => button.clicker.user.id === author.id, {
								time: 60000,
								max: 1
							});

							collectorBotoes.on('collect', async (b) => {
								if (b.id === 'aceitar') {
									b.reply.defer();

									embed.setDescription(`📈 | Você investiu **${ce.content}** Bitcoin(s) com duração de 10 dias com 100% de Lucro.`);

									msg.edit(author, {
										embed: embed,
										components: []
									});

									let valor2 = Number(ce.content);

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											bitcoin: user.bitcoin -= Number(ce.content),
											'investimento.investido': Number(ce.content),
											'investimento.dobro': valor2 *= 2,
											'cooldown.bitcoin': Date.now()
										}
									});

									this.extendedSetTimeout(async () => {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										let valor = user2.bitcoin += Number(ce.content);

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: valor *= 2,
												'investimento.dobro': valor *= 2,
												'investimento.investido': 0,
												'cooldown.bitcoin': 0
											}
										});
									}, 10 * 24 * 60 * 60 * 1000);

									return;
								} else if (b.id === 'negar') {
									b.reply.defer();

									return msg.delete();
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									msg.delete();

									return message.reply(`você demorou demais para escolher! Use o comando novamente!`);
								}
							});
						});
					}
				});

				collector.on('end', async (collected, reason) => {
					if (reason === 'time') {
						msg.delete();
						collector.stop();
						return message.reply('você demorou demais para enviar a quantia! Use o comando novamente!');
					}
				});
			});
		}
	}

	extendedSetTimeout(callback, ms2) {
		const biggestInt = (2 ** 31) - 1;
		const max = ms2 > biggestInt ? biggestInt : ms2;

		setTimeout(() => ms2 > max ? extendedSetTimeout(callback, ms2 - max) : callback(), max);
	}

};
