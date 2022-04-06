/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

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
		args,
		prefix
	}) {
		let user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.hp.vida < 50) {
			const embedVida = new ClientEmbed(author)
				.setTitle('😨 | Você está ferido!')
				.setDescription(`Você se feriu, e não consegue realizar esta ação.\nVá até o **Hospital ${message.guild.name}** para se recuperar e receber **tratamento**.\n\nUse o comando \`${prefix}entradahospital\` para um Médico iniciar seu **tratamento**.`);

			return message.reply({
				content: author.toString(),
				embeds: [embedVida]
			});
		}

		const server2 = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server2.cidade.governador === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Prefeito do servidor!'
			});
		}

		if (server2.cidade.delegado === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Delegado do servidor!'
			});
		}

		if (user.policia.isPolice) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Policial do servidor!'
			});
		}

		if (server2.cidade.carcereiro.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Carcereiro do servidor!'
			});
		}

		if (server2.cidade.diretorHP === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Diretor do Hospital do servidor!'
			});
		}

		if (server2.cidade.medicos.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Médico do servidor!'
			});
		}

		if (user.armaEquipada === 'Nenhuma arma equipada.') {
			return message.reply({
				content: 'Você precisa equipar uma arma antes de roubar alguém!'
			});
		}

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
			} else if (user.prisao.atirarPrisao) {
				presoTime = 129600000;

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

			const buttonPreso = new MessageButton().setCustomId('preso').setEmoji('900544510365405214').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonPreso]);

			const escolha = await message.reply({
				content: author.toString(),
				embeds: [embedPreso],
				components: [botoes]
			});

			const filter = (interaction) => interaction.isButton() && ['preso'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorEscolhas = escolha.createMessageComponentCollector({
				filter,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				switch (b.customId) {
					case 'preso':
						await b.deferUpdate();

						const userMochila = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (!userMochila.isMochila) {
							escolha.delete();

							return message.reply({
								content: 'Você não tem uma **mochila**. Vá até a Loja > Utilidades e Compre uma!'
							});
						}

						if (!userMochila.mochila.find((a) => a.item === 'Chave Micha')) {
							escolha.delete();

							return message.reply({
								content: 'Você não tem uma **Chave Micha** na sua Mochila!'
							});
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
						return message.reply({
							content: `Você usou \`x1\` **Chave Micha** e conseguiu sair da prisão com sucesso!`
						});
				}
			});

			collectorEscolhas.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return escolha.edit({
						content: author.toString(),
						embeds: [embedPreso],
						components: []
					});
				}
			});

			return;
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.id === author.id) {
			return message.reply({
				content: 'Você não pode roubar você mesmo.'
			});
		}

		let user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		if (user2.saldo < 100) {
			return message.reply({
				content: 'Esse usuário não possui nem **R$100,00** de dinheiro na carteira. Vá roubar outro!'
			});
		}

		if (user.mochila.find((a) => a.item === 'Máscara')) {
			const embed = new ClientEmbed(author)
				.setTitle('🔫 | Roubo');

			if (user.armaEquipada === 'Ak-47') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 76) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);

											return;
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 76) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'UMP') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 61) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 61) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'MP5') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 51) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 51) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'ACR') {
				if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 86) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 86) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'KNT-308') {
				if (!user.mochila.find((a) => a.item === 'Munição KNT')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição KNT** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 26) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 26) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'Desert Eagle') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 31) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 31) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'Revolver 38') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 21) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 21) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
					}
				}
			} else if (user.armaEquipada === 'G18') {
				if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
					return message.reply({
						content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
					});
				} else {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					const random = Math.floor(Math.random() * 101);
					const dindin = Math.floor(Math.random() * user2.saldo);

					if (random >= 0 && random < 11) {
						embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

						const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonPrisao]);

						message.reply({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg) => {
							const server = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

							const collectorBotoes = msg.createMessageComponentCollector({
								filter,
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

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'prender':
										await b.deferUpdate();
										collectorBotoes.stop();

										const userPolicia = await this.client.database.users.findOne({
											userId: b.user.id,
											guildId: message.guild.id
										});

										if (userPolicia.policia.isFolga) {
											return message.reply({
												content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
											});
										}

										const timeoutRoubar = 5400000;

										if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
											const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

											const embedRoubar = new ClientEmbed(author)
												.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

											return message.reply({
												content: b.user.toString(),
												embeds: [embedRoubar]
											});
										} else {
											const embedPrisao = new ClientEmbed(author)
												.setTitle('👮 | Preso')
												.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

											message.reply({
												content: author.toString(),
												embeds: [embedPrisao]
											});

											await this.client.database.users.findOneAndUpdate({
												userId: b.user.id,
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
													'prisao.isPreso': true,
													'prisao.tempo': Date.now(),
													'prisao.prender': true
												}
											});

											return setTimeout(async () => {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$set: {
														'prisao.isPreso': false,
														'prisao.tempo': 0,
														'prisao.prender': false
													}
												});
											}, 43200000);
										}
								}
							});

							collectorBotoes.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collectorBotoes.stop();

									user = await this.client.database.users.findOne({
										userId: author.id,
										guildId: message.guild.id
									});

									user2 = await this.client.database.users.findOne({
										userId: member.id,
										guildId: message.guild.id
									});

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user.saldo += Number(dindin)
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: member.id,
										guildId: message.guild.id
									}, {
										$set: {
											saldo: user2.saldo -= Number(dindin)
										}
									});

									return;
								}
							});
						});
					} else if (random >= 11) {
						embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

						return message.reply({
							content: author.toString(),
							embeds: [embed]
						});
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

				return message.reply({
					content: author.toString(),
					embeds: [embed]
				});
			} else {
				const embed = new ClientEmbed(author)
					.setTitle('🔫 | Roubo');

				if (user.armaEquipada === 'Ak-47') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 76) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 76) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'UMP') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 61) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 61) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'MP5') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 51) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 51) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'ACR') {
					if (!user.mochila.find((a) => a.item === 'Munição Metralhadora')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Metralhadora** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 86) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 86) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'KNT-308') {
					if (!user.mochila.find((a) => a.item === 'Munição KNT')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição KNT** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 26) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 26) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'Desert Eagle') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 31) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 31) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'Revolver 38') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 101);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 21) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 21) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				} else if (user.armaEquipada === 'G18') {
					if (!user.mochila.find((a) => a.item === 'Munição Pistola')) {
						return message.reply({
							content: 'Antes de roubar, você precisa ter **Munição Pistola** na sua mochila!'
						});
					} else {
						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 5);
						const dindin = Math.floor(Math.random() * user2.saldo);

						if (random >= 0 && random < 101) {
							embed.setDescription(`✅ | Você roubou **R$${Utils.numberFormat(Number(dindin))},00** do usuário ${member}.`);

							const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮‍♂️').setStyle('PRIMARY');
							const botoes = new MessageActionRow().addComponents([buttonPrisao]);

							message.reply({
								content: author.toString(),
								embeds: [embed],
								components: [botoes]
							}).then(async (msg) => {
								const server = await this.client.database.guilds.findOne({
									_id: message.guild.id
								});

								const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

								const collectorBotoes = msg.createMessageComponentCollector({
									filter,
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

								collectorBotoes.on('collect', async (b) => {
									switch (b.customId) {
										case 'prender':
											await b.deferUpdate();
											collectorBotoes.stop();

											const userPolicia = await this.client.database.users.findOne({
												userId: b.user.id,
												guildId: message.guild.id
											});

											if (userPolicia.policia.isFolga) {
												return message.reply({
													content: 'O Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!'
												});
											}

											const timeoutRoubar = 5400000;

											if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar) > 0) {
												const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderRoubar));

												const embedRoubar = new ClientEmbed(author)
													.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

												return message.reply({
													content: b.user.toString(),
													embeds: [embedRoubar]
												});
											} else {
												const embedPrisao = new ClientEmbed(author)
													.setTitle('👮 | Preso')
													.setDescription(`🚓 | ${author}, você foi preso em flagrante por <@${b.user.id}>, ao roubar **R$${Utils.numberFormat(Number(dindin))},00** de ${member}. Agora você passará um tempinho na **Cadeia.**`);

												message.reply({
													content: author.toString(),
													embeds: [embedPrisao]
												});

												await this.client.database.users.findOneAndUpdate({
													userId: b.user.id,
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

												return setTimeout(async () => {
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
									}
								});

								collectorBotoes.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collectorBotoes.stop();

										user = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										user2 = await this.client.database.users.findOne({
											userId: member.id,
											guildId: message.guild.id
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												'cooldown.roubar': Date.now(),
												saldo: user.saldo += Number(dindin)
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: member.id,
											guildId: message.guild.id
										}, {
											$set: {
												saldo: user2.saldo -= Number(dindin)
											}
										});

										return;
									}
								});
							});
						} else if (random >= 11) {
							embed.setDescription(`❌ | O roubo falhou, você ficou nervoso e acabou saindo correndo antes de levar o dinheiro de ${member}.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed]
							});
						}
					}
				}
			}
		}
	}

};
