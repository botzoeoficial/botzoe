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

		let presoTime = 0;

		if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			presoTime = 36000000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de tráfico de drogas.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.crime) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de crime.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.prender) {
			presoTime = 43200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de roubo.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			presoTime = 21600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por inventário irregular.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			presoTime = 180000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um veículo.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.velha) {
			presoTime = 300000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Senhora.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.frentista) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Frentista.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.joalheria) {
			presoTime = 900000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Joalheria.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.agiota) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Agiota.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.casaLoterica) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Casa Lotérica.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.brazino) {
			presoTime = 2100000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Brazino777.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.facebook) {
			presoTime = 2700000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Facebook.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.bancoCentral) {
			presoTime = 3600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Banco Central.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.shopping) {
			presoTime = 7200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Shopping Center.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.banco) {
			presoTime = 14400000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Banco.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('🪙 BITCOIN')
				.setDescription('📈 | Quantos BitCoins você deseja investir?\n\n**OBS: Envie no chat um número!**');

			message.channel.send(author, embed).then(async (msg) => {
				const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id, {
					time: 60000
				});

				collector.on('collect', async (ce) => {
					if (!parseInt(ce.content)) {
						message.channel.send(`${author}, você precisa enviar uma quantia válida!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else if (parseInt(ce.content) <= 0) {
						message.channel.send(`${author}, você precisa colocar uma quantia acima de **0**!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else if (parseInt(ce.content) > user.bitcoin) {
						message.channel.send(`${author}, você não tem essa quantia toda de bitcoins para investir!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else if (isNaN(ce.content)) {
						message.channel.send(`${author}, você precisa colocar apenas números, não **letras** ou **números junto com letras**!`).then((a) => a.delete({
							timeout: 5000
						}));
					} else {
						collector.stop();

						embed.setDescription(`📈 | Você tem certeza que deseja investir **${ce.content}** bitcoin(s) com duração de 10 dias?`);

						msg.edit(author, embed).then(async (msg2) => {
							await msg2.react('✅');
							await msg2.react('❌');

							const sim = msg2.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
								time: 30000,
								max: 1
							});

							const não = msg2.createReactionCollector((r, u) => r.emoji.name === '❌' && u.id === author.id, {
								time: 30000,
								max: 1
							});

							sim.on('collect', async () => {
								await msg2.reactions.removeAll();
								sim.stop();

								embed.setDescription(`📈 | Você investiu **${ce.content}** Bitcoin(s) com duração de 10 dias com 100% de Lucro.`);

								msg.edit(author, embed);

								Date.prototype.addDays = function (days) {
									const date = new Date(this.valueOf());
									date.setDate(date.getDate() + days);
									return date;
								};

								const date = new Date(Date.now());

								let valor2 = Number(ce.content);

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										bitcoin: user.bitcoin -= Number(ce.content),
										'investimento.investido': Number(ce.content),
										'investimento.dobro': valor2 *= 2,
										'cooldown.bitcoin': date.addDays(10)
									}
								});

								setTimeout(async () => {
									const user2 = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									let valor = user2.bitcoin + Number(ce.content);

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											bitcoin: valor *= 2,
											'investimento.dobro': valor *= 2,
											'investimento.investido': 0,
											'cooldown.bitcoin': null
										}
									});
								}, 864000000);
							});

							não.on('collect', async () => {
								sim.stop();
								não.stop();

								msg.delete();
							});

							sim.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim.stop();
									não.stop();
									msg.delete();

									return message.channel.send(`${author}, você demorou demais para escolher! Use o comando novamente!`);
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

};
