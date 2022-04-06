/* eslint-disable arrow-body-style */
/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
/* eslint-disable complexity */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
require('moment-duration-format');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Facção extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'facção';
		this.category = 'Crime';
		this.description = 'Veja o sistema de Facção!';
		this.usage = 'facção';
		this.aliases = ['faccao', 'faccão', 'fcc'];

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

		const fb = user?.fac;

		if (!args[0]) {
			const embed = new ClientEmbed(author)
				.setTitle('🎭 | Sistema de Facção')
				.addField('❔ Como utilizar?', `\`${prefix}facção\` \`<subcomando>\``)
				.addField('🔖 Exemplos:', [
					`\`${prefix}facção\` **criar** - Cria uma Facção. (Apenas Level 3 no **CRIME**)`,
					`\`${prefix}facção\` **cargo <criar/deletar> <nome do cargo>** - Cria ou deleta um cargo da sua facção.`,
					`\`${prefix}facção\` **convidar <usuário>** - Adiciona um membro a sua Facção.`,
					`\`${prefix}facção\` **demitir <usuário>** - Demite um membro da sua Facção.`,
					`\`${prefix}facção\` **promover <usuário>** - Promove um funcionário.`,
					`\`${prefix}facção\` **rebaixar <usuário>** - Rebaixa um funcionário.`,
					`\`${prefix}facção\` **trabalhar** - Trabalha e gera um valor para a sua Facção e também um level.`,
					`\`${prefix}facção\` **registro <@usuario>** - Mostra registro de trabalho de um membro da sua Facção.`,
					`\`${prefix}facção\` **valor transferir <@usuario> <saldo>** - Transfere um valor da sua Facção para um usuário.`,
					`\`${prefix}facção\` **info** - Mostra informações da sua Facção.`,
					`\`${prefix}facção\` **sair** - Sai da Facção que você está.`,
					`\`${prefix}facção\` **deletar** - Deleta a Facção.`
				]);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else if (args[0].toLowerCase() === 'criar') {
			if (user.fac.createFac) {
				return message.reply({
					content: `Você já é dono de uma Facção! Use o comando \`${prefix}facção info\` para ver informações da sua Facção!`
				});
			} else if (user.fac.isFac) {
				return message.reply({
					content: `Você já está em uma Facção! Use o comando \`${prefix}facção info\` para ver informações da sua Facção!`
				});
			} else if (user.crime.reputacao <= 2000) {
				return message.reply({
					content: `Você precisa ser **Maloqueiro** para poder criar uma Facção! Use \`${prefix}reputacao\`.`
				});
			} else {
				message.reply({
					content: 'Qual nome você deseja dar a sua **Facção**? OBS: Digite no chat o nome dela!'
				}).then(async (msg) => {
					const filter = m => {
						return m.author.id === author.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 60000
					});

					collector.on('collect', async (r) => {
						collector.stop();

						const embed = new ClientEmbed(author)
							.setTitle('🎭 | Facção')
							.setDescription(`${author}\n> Parabéns! Você agora é Líder de uma Facção chamada: **${r.content}**`);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.isFac': true,
								'fac.createFac': true,
								'fac.nome': r.content,
								'fac.dono': author.id,
								'fac.level': 1,
								'fac.cargos': [],
								'fac.membros': [author.id],
								'fac.money': 0,
								'fac.xp': 0,
								'fac.lastWork': 0,
								'fac.emprego.nome': 'Sem Cargo',
								'fac.emprego.numero': 0,
								'fac.tempo': Date.now()
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$push: {
								faccoes: {
									nome: r.content,
									criado: moment(Date.now()).format('L'),
									membros: [author.id],
									level: 1,
									money: 0
								}
							}
						});

						return;
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg.delete();
							return message.reply({
								content: 'Você demorou demais para dar a sua Facção. Use o comando novamente!'
							});
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'info') {
			if (!user.fac.isFac) {
				return message.reply({
					content: `Você não está em uma Facção! Peça para alguém lhe chamar para uma, ou crie a sua própria usando o comando \`${prefix}facção criar\`.`
				});
			} else {
				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users.findOne({
					userId: owner.id,
					guildId: message.guild.id
				}).then((x) => x.fac);

				const members = [];
				const list = fd.membros;

				await this.PUSH(members, list, message.guild.id);

				const EMBED = new ClientEmbed(author)
					.setTitle(`Informações da Facção`)
					.addFields({
						name: `Nome da Facção:`,
						value: fd.nome
					}, {
						name: `Dono da Facção:`,
						value: `${owner} ( ${1800000 - (Date.now() - fd.lastWork) < 0 ? `\`Pode Trabalhar\`` : `\`${moment.duration(1800000 - (Date.now() - fd.lastWork)).format('h[h] m[m] s[s]')}\``} )`
					}, {
						name: `Level **${fd.level}** - XP: [**${fd.xp}/${fd.level * 1000}**]`,
						value: `\`\`\`css\n[${this.progressBar(fd.xp > fd.level * 1000 ? fd.level * 1000 : fd.xp, fd.level * 1000, 25)}]\`\`\``
					}, {
						name: 'Dinheiro:',
						value: `R$${Utils.numberFormat(fd.money)},00`
					}, {
						name: `Membros:`,
						value: !fd.membros.length ?
							'Nenhum Membro no Momento.' : `${members.map((x) => `**${x.user}** **${x.emprego}** - ${1800000 - (Date.now() - x.lastWork) < 0 ? `\`Pode Trabalhar\`` : `\`${moment.duration(1800000 - (Date.now() - x.lastWork)).format('h[h] m[m] s[s]')}\``}`).join('\n')}`
					});

				return message.reply({
					content: author.toString(),
					embeds: [EMBED]
				});
			}
		} else if (args[0].toLowerCase() === 'trabalhar') {
			const userAuthor = await this.client.database.users.findOne({
				userId: author.id,
				guildId: message.guild.id
			});

			if (userAuthor.prisao.isPreso) {
				let presoTime = 0;

				const embedPreso = new ClientEmbed(author)
					.setTitle('👮 | Preso');

				if (userAuthor.prisao.prenderCmd) {
					presoTime = userAuthor.prisao.prenderMili;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.traficoDrogas) {
					presoTime = 36000000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.prender) {
					presoTime = 43200000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.revistar) {
					presoTime = 21600000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.roubarVeiculo) {
					presoTime = 180000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.atirarPrisao) {
					presoTime = 129600000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.velha) {
					presoTime = 300000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.frentista) {
					presoTime = 600000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.joalheria) {
					presoTime = 900000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.agiota) {
					presoTime = 1200000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.casaLoterica) {
					presoTime = 1200000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.brazino) {
					presoTime = 2100000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.facebook) {
					presoTime = 2700000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.bancoCentral) {
					presoTime = 3600000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.shopping) {
					presoTime = 7200000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
					}
				} else if (userAuthor.prisao.crime && userAuthor.prisao.banco) {
					presoTime = 14400000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

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
			} else {
				const fd = user?.fac;

				const XP = 1;

				const cooldown = 1800000 - (Date.now() - fd.lastWork);

				if (cooldown > 0) {
					const embedWork = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você deve aguardar **${moment.duration(cooldown).format('h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}** para poder trabalhar novamente.`);

					return message.reply({
						content: author.toString(),
						embeds: [embedWork]
					});
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você trabalhou com sucesso para sua **Facção**!\nConseguiu as seguintes coisas:\n+**1 XP**\n**R$200,00**`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					const owner = await this.client.users.fetch(fd.dono);
					const fc = await this.client.database.users.findOne({
						userId: owner.id,
						guildId: message.guild.id
					}).then((x) => x.fac);

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.lastWork': Date.now(),
							'fac.money': fc.money += 200,
							'fac.xp': fc.xp += XP
						},
						$push: {
							'fac.registro': {
								tempo: Date.now(),
								money: 200,
								xp: 1
							}
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: owner.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.money': fc.money += 200,
							'fac.xp': fc.xp + XP
						}
					});

					await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id,
						'faccoes.nome': user.fac.nome
					}, {
						$set: {
							'faccoes.$.money': fc.money += 200
						}
					});

					await user.save();

					const xpToUp = (fc.level + 1) * 1000;

					if (fc.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.level': fc.level += 1,
								'fac.xp': 1
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: owner.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.level': fc.level += 1,
								'fac.xp': 1
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id,
							'faccoes.nome': user.fac.nome
						}, {
							$set: {
								'faccoes.$.level': fc.level += 1
							}
						});
					}

					return;
				}
			}
		} else if (args[0].toLowerCase() === 'convidar') {
			if (!user.fac.createFac) {
				return message.reply({
					content: 'Você precisa ser Dono de uma Facção para convidar alguém!'
				});
			} else {
				const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

				if (!USER) {
					return message.reply({
						content: 'Mencione alguém para ser convidado para sua Facção!'
					});
				}

				if (USER.id === author.id) {
					return message.reply({
						content: 'Você não pode se autoconvidar para sua Facção!'
					});
				}

				if (USER.bot) {
					return message.reply({
						content: 'Você não pode convidar bots!'
					});
				}

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				if (user2.fac.isFac) {
					return message.reply({
						content: 'Este usuário já faz parte de outra Facção!'
					});
				}

				const embed1 = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${USER}\n\n> Você está sendo convidado para entrar na Facção **${user.fac.nome}!**\n\n> Você aceita?\n\n> **SIM** - Aceita\n> **NÃO** - Recusa`);

				message.reply({
					content: USER.toString(),
					embeds: [embed1]
				}).then(async (msg) => {
					const filter = m => {
						return m.author.id === USER.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 15000,
						max: 1
					});

					collector.on('collect', async (collected) => {
						if (['sim', 'y', 'yes'].includes(collected.content.toLowerCase())) {
							const embed = new ClientEmbed(author)
								.setTitle('🎭 | Facção')
								.setDescription(`${author}, você contratou o(a) usuário(a) ${USER} com sucesso.`);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$push: {
									'fac.membros': USER.id
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: USER.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.dono': author.id,
									'fac.isFac': true,
									'fac.emprego.nome': 'Sem Cargo',
									'fac.emprego.numero': 0,
									'fac.tempo': Date.now(),
									'fac.lastWork': 0
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id,
								'faccoes.nome': user.fac.nome
							}, {
								$push: {
									'faccoes.$.membros': USER.id
								}
							});

							msg.delete();
							collector.stop();
							return;
						}

						if (['não', 'nao', 'no'].includes(collected.content.toLowerCase())) {
							const embed = new ClientEmbed(author)
								.setTitle('🎭 | Facção')
								.setDescription(`${author}, o(a) usuário(a) ${USER} recusou seu pedido.`);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							msg.delete();
							collector.stop();
							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg.delete();
							return message.reply({
								content: `O usuário ${USER} demorou demais para responder ao seu convite. Use o comando novamente!`
							});
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'demitir') {
			if (!user.fac.createFac) {
				return message.reply({
					content: 'Você precisa ser Dono de uma Facção para demitir alguém!'
				});
			} else {
				const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

				if (!USER) {
					return message.reply({
						content: 'Mencione alguém para ser demitido da sua Facção!'
					});
				}

				if (USER.id === author.id) {
					return message.reply({
						content: 'Você não pode demitir você mesmo!'
					});
				}

				if (USER.bot) {
					return message.reply({
						content: 'Você não pode demitir bots!'
					});
				}

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users.findOne({
					userId: owner.id,
					guildId: message.guild.id
				}).then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply({
						content: 'Este usuário não está contratado em sua Facção!'
					});
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, usuário demitido com sucesso.`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$pull: {
							'fac.membros': USER.id
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: USER.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.isFac': false,
							'fac.createFac': false,
							'fac.nome': '',
							'fac.dono': '',
							'fac.level': 1,
							'fac.cargos': [],
							'fac.membros': [],
							'fac.money': 0,
							'fac.xp': 0,
							'fac.lastWork': 0,
							'fac.emprego': {
								nome: '',
								numero: ''
							},
							'fac.registro': [],
							'fac.tempo': 0
						}
					});

					await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id,
						'faccoes.nome': user.fac.nome
					}, {
						$pull: {
							'faccoes.$.membros': USER.id
						}
					});

					return;
				}
			}
		} else if (args[0].toLowerCase() === 'sair') {
			if (!user.fac.isFac) {
				return message.reply({
					content: `Você não está em uma Facção! Peça para alguém lhe chamar para uma, ou crie a sua própria usando o comando \`${prefix}facção criar\`.`
				});
			} else if (user.fac.createFac) {
				if (!user.fac.membros.length) {
					return message.reply({
						content: `Sua Facção não possui nenhum membro. Use o comando \`${prefix}facção deletar\`!`
					});
				}

				const embed = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, tem certeza que deseja abandonar sua Facção?\n\n> **SIM** - Sair\n> **NÃO** - Ficar`);

				message.reply({
					content: author.toString(),
					embeds: [embed]
				}).then(async (msg) => {
					const filter = m => {
						return m.author.id === author.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 60000
					});

					collector.on('collect', async (collected) => {
						if (['sim', 'y', 'yes'].includes(collected.content.toLowerCase())) {
							const random = Math.floor(Math.random() * user.fac.membros.length);

							const fd = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							}).then((x) => x.fac);

							await this.client.database.users.findOneAndUpdate({
								userId: await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.createFac': false,
									'fac.nome': '',
									'fac.dono': '',
									'fac.level': 1,
									'fac.cargos': [],
									'fac.membros': [],
									'fac.money': 0,
									'fac.xp': 0,
									'fac.lastWork': 0,
									'fac.emprego': {
										nome: '',
										numero: ''
									},
									'fac.registro': [],
									'fac.tempo': 0
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.createFac': true,
									'fac.nome': fd.nome,
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
									'fac.level': fd.level,
									'fac.cargos': fd.cargos,
									'fac.membros': fd.membros,
									'fac.money': fd.money,
									'fac.xp': fd.xp,
									'fac.emprego': fd.emprego
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.createFac': false,
									'fac.nome': '',
									'fac.dono': '',
									'fac.level': 1,
									'fac.cargos': [],
									'fac.membros': [],
									'fac.money': 0,
									'fac.xp': 0,
									'fac.lastWork': 0,
									'fac.emprego': {
										nome: '',
										numero: ''
									},
									'fac.registro': [],
									'fac.tempo': 0
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id,
								'faccoes.nome': user.fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': author.id
								}
							});

							collector.stop();
							msg.delete();

							const embed1 = new ClientEmbed(author)
								.setTitle('🎭 | Facção')
								.setDescription(`${author}, você saiu da sua Facção com sucesso! O novo dono dela agora é o(a): <@${await this.client.users.fetch(fd.membros[random]).then((a) => a.id)}>.`);

							return message.reply({
								content: author.toString(),
								embeds: [embed1]
							});
						}

						if (['não', 'nao', 'no'].includes(collected.content.toLowerCase())) {
							msg.delete();
							collector.stop();
							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg.delete();
							return message.reply({
								content: `Você demorou demais para responder. Use o comando novamente!`
							});
						}
					});
				});
			} else {
				const embed = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, tem certeza que deseja sair da sua Facção?\n\n> **SIM** - Sair\n> **NÃO** - Ficar`);

				message.reply({
					content: author.toString(),
					embeds: [embed]
				}).then(async (msg) => {
					const filter = m => {
						return m.author.id === author.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 60000
					});

					collector.on('collect', async (collected) => {
						if (['sim', 'y', 'yes'].includes(collected.content.toLowerCase())) {
							const owner = await this.client.users.fetch(fb.dono);

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.createFac': false,
									'fac.nome': '',
									'fac.dono': '',
									'fac.level': 1,
									'fac.cargos': [],
									'fac.membros': [],
									'fac.money': 0,
									'fac.xp': 0,
									'fac.lastWork': 0,
									'fac.emprego': {
										nome: '',
										numero: ''
									},
									'fac.registro': [],
									'fac.tempo': 0
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: owner.id,
								guildId: message.guild.id
							}, {
								$pull: {
									'fac.membros': author.id
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id,
								'faccoes.nome': user.fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': author.id
								}
							});

							collector.stop();
							msg.delete();

							const embed1 = new ClientEmbed(author)
								.setTitle('🎭 | Facção')
								.setDescription(`${author}, você saiu da sua Facção com sucesso!`);

							return message.reply({
								content: author.toString(),
								embeds: [embed1]
							});
						}

						if (['não', 'nao', 'no'].includes(collected.content.toLowerCase())) {
							msg.delete();
							collector.stop();
							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg.delete();
							return message.reply({
								content: `Você demorou demais para responder. Use o comando novamente!`
							});
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'deletar') {
			if (!user.fac.createFac) {
				return message.reply({
					content: 'Você precisa ter criado uma Facção para deletar uma!'
				});
			} else {
				await this.client.database.guilds.findOneAndUpdate({
					_id: message.guild.id
				}, {
					$pull: {
						faccoes: {
							nome: user.fac.nome
						}
					}
				});

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'fac.isFac': false,
						'fac.createFac': false,
						'fac.nome': '',
						'fac.dono': '',
						'fac.level': 1,
						'fac.cargos': [],
						'fac.membros': [],
						'fac.money': 0,
						'fac.xp': 0,
						'fac.lastWork': 0,
						'fac.emprego': {
							nome: '',
							numero: ''
						},
						'fac.registro': [],
						'fac.tempo': 0
					}
				});

				if (user.fac.membros.length >= 0) {
					for (var i = 0; i < user.fac.membros.length; i++) {
						await this.client.database.users.findOneAndUpdate({
							userId: user.fac.membros[i],
							guildId: message.guild.id
						}, {
							$set: {
								'fac.isFac': false,
								'fac.createFac': false,
								'fac.nome': '',
								'fac.dono': '',
								'fac.level': 1,
								'fac.cargos': [],
								'fac.membros': [],
								'fac.money': 0,
								'fac.xp': 0,
								'fac.lastWork': 0,
								'fac.emprego': {
									nome: '',
									numero: ''
								},
								'fac.registro': [],
								'fac.tempo': 0
							}
						});
					}
				}

				const embed1 = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, Facção deletada com sucesso!`);

				return message.reply({
					content: author.toString(),
					embeds: [embed1]
				});
			}
		} else if (args[0].toLowerCase() === 'valor') {
			if (!args[1]) {
				return message.reply({
					content: `Você precisa colocar o que quer fazer com o valor. Ex: \`${prefix}facção valor transferir @usuario 1000\``
				});
			} else if (args[1].toLowerCase() === 'transferir') {
				if (user.fac.dono !== author.id) {
					return message.reply({
						content: 'Você precisa ser o dono da Facção para transferir dinheiro da FAC pra algum membro!'
					});
				} else {
					const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

					if (!USER) {
						return message.reply({
							content: 'Mencione alguém para transferir o dinheiro!'
						});
					}

					if (USER.bot) {
						return message.reply({
							content: 'Você não pode transferir dinheiro para bots!'
						});
					}

					const user2 = await this.client.database.users.findOne({
						userId: USER.id,
						guildId: message.guild.id
					});

					const owner = await this.client.users.fetch(fb.dono);
					const fd = await this.client.database.users.findOne({
						userId: owner.id,
						guildId: message.guild.id
					}).then((x) => x.fac);

					if (!fd.membros.some((x) => x === USER.id)) {
						return message.reply({
							content: 'Esse usuário não está contratado em sua Facção!'
						});
					}

					const valor = args[3];

					if (!valor) {
						return message.reply({
							content: 'Você precisa colocar o valor que deseja transferir!'
						});
					}

					if (Number(valor) <= 0) {
						return message.reply({
							content: 'Você precisa colocar um valor acima de **0**!'
						});
					}

					if (!parseInt(valor)) {
						return message.reply({
							content: 'Você precisa colocar um valor válido!'
						});
					}

					if (isNaN(valor)) {
						return message.reply({
							content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
						});
					}

					if (Number(valor) > fd.money) {
						return message.reply({
							content: 'Sua Facção não tem esse valor todo para ser transferido!'
						});
					}

					await this.client.database.users.findOneAndUpdate({
						userId: USER.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.money': fd.money - Number(valor),
							banco: user2.banco += Number(valor)
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.money': fd.money - Number(valor)
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: owner.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.money': fd.money - Number(valor)
						}
					});

					const embed1 = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você transferiu **R$${Utils.numberFormat(Number(valor))},00** da sua Facção para o banco de ${USER} com sucesso!`);

					return message.reply({
						content: author.toString(),
						embeds: [embed1]
					});
				}
			}
		} else if (args[0].toLowerCase() === 'registro') {
			const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

			if (!USER) {
				return message.reply({
					content: 'Mencione alguém para ver o registro!'
				});
			}

			const user2 = await this.client.database.users.findOne({
				userId: USER.id,
				guildId: message.guild.id
			});

			const owner = await this.client.users.fetch(fb.dono);
			const fd = await this.client.database.users.findOne({
				userId: owner.id,
				guildId: message.guild.id
			}).then((x) => x.fac);

			if (!fd.membros.some((x) => x === USER.id)) {
				return message.reply({
					content: 'Esse usuário não está em sua Facção!'
				});
			}

			user2.fac.registro.map((x, index) => `\`[${index++}]\` Trabalhou as: **${moment(x.tempo).format('LTS L')}** | Ganhou: **${x.xp} XP** e **R$${x.money},00**`).slice(0, 20).join('\n');

			let pagina = 0;

			const registroArray = user2.fac.registro.map((value, index) => ({
				tempo: value.tempo,
				xp: value.xp,
				money: value.money,
				position: index
			}));

			let embedMessage = '';

			const embed = new ClientEmbed(author)
				.setTitle('Registros - Facção');

			registroArray.slice(pagina * 20, pagina * 20 + 20).forEach((est) => embedMessage += `\`[${est.position + 1}]\` Trabalhou as: **${moment(est.tempo).format('LTS L')}** | Ganhou: **${est.xp} XP** e **R$${est.money},00**\n`);
			embed.setDescription(`**REGISTRO DO USUÁRIO:** ${USER}\n\n${embedMessage}`);

			const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
			const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonIr, buttonVoltar]);

			const escolha = await message.reply({
				content: author.toString(),
				embeds: [embed],
				components: [botoes]
			});

			const filter = (interaction) => interaction.isButton() && ['voltar', 'ir'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorEscolhas = escolha.createMessageComponentCollector({
				filter
			});

			collectorEscolhas.on('collect', async (b) => {
				switch (b.customId) {
					case 'voltar':
						await b.deferUpdate();

						if (pagina <= 0) {
							pagina = 0;
						} else {
							pagina--;
						}

						const registroArray2 = user2.fac.registro.map((value, index) => ({
							tempo: value.tempo,
							xp: value.xp,
							money: value.money,
							position: index
						}));

						let embedMessage2 = '';

						const embed2 = new ClientEmbed(author)
							.setTitle('Registros - Facção');

						registroArray2.slice(pagina * 20, pagina * 20 + 20).forEach((est) => embedMessage2 += `\`[${est.position + 1}]\` Trabalhou as: **${moment(est.tempo).format('LTS L')}** | Ganhou: **${est.xp} XP** e **R$${est.money},00**\n`);
						embed2.setDescription(`**REGISTRO DO USUÁRIO:** ${USER}\n\n${embedMessage2}`);

						escolha.edit({
							content: author.toString(),
							embeds: [embed2]
						});
						break;
					case 'ir':
						await b.deferUpdate();

						if (pagina !== ~~(user2.fac.registro.length / 20)) {
							pagina++;
						}

						const registroArray3 = user2.fac.registro.map((value, index) => ({
							tempo: value.tempo,
							xp: value.xp,
							money: value.money,
							position: index
						}));

						let embedMessage3 = '';

						const embed3 = new ClientEmbed(author)
							.setTitle('Registros - Facção');

						registroArray3.slice(pagina * 20, pagina * 20 + 20).forEach((est) => embedMessage3 += `\`[${est.position + 1}]\` Trabalhou as: **${moment(est.tempo).format('LTS L')}** | Ganhou: **${est.xp} XP** e **R$${est.money},00**\n`);
						embed3.setDescription(`**REGISTRO DO USUÁRIO:** ${USER}\n\n${embedMessage3}`);

						escolha.edit({
							content: author.toString(),
							embeds: [embed3]
						});
				}
			});
		} else if (args[0].toLowerCase() === 'cargo') {
			if (!args[1]) {
				return message.reply({
					content: 'Você precisa colocar se quer **criar** ou **deletar** um cargo!'
				});
			} else if (args[1].toLowerCase() === 'criar') {
				if (user.fac.dono !== author.id) {
					return message.reply({
						content: 'Você precisa ser o dono da Facção para criar um cargo na Facção!'
					});
				} else if (user.fac.cargos.length === 7) {
					return message.reply({
						content: 'Sua Facção já possui muitos cargos. Delete algum cargo, e crie outro novamente!'
					});
				} else if (!args.slice(2).join(' ')) {
					return message.reply({
						content: 'Você precisa colocar o nome do cargo!'
					});
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você criou o cargo **${args.slice(2).join(' ')}** para sua Facção com sucesso!`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$push: {
							'fac.cargos': {
								nome: args.slice(2).join(' ')
							}
						}
					});
				}
			} else if (args[1].toLowerCase() === 'deletar') {
				if (user.fac.dono !== author.id) {
					return message.reply({
						content: 'Você precisa ser o dono da Facção para deletar um cargo na Facção!'
					});
				} else if (!user.fac.cargos.length) {
					return message.reply({
						content: `Sua Facção não possui nenhum cargo ainda. Use o comando \`${prefix}facção criar\` para criar um cargo!`
					});
				} else if (!args.slice(2).join(' ')) {
					return message.reply({
						content: 'Você precisa colocar o nome do cargo!'
					});
				} else if (!user.fac.cargos.find((f) => f.nome === args.slice(2).join(' '))) {
					return message.reply({
						content: 'Não existe um cargo com esse nome na sua Facção!'
					});
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você deletou o cargo **${args.slice(2).join(' ')}** para sua Facção com sucesso!`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$pull: {
							'fac.cargos': {
								nome: args.slice(2).join(' ')
							}
						}
					});
				}
			}
		} else if (args[0].toLowerCase() === 'promover') {
			if (user.fac.dono !== author.id) {
				return message.reply({
					content: 'Você precisa ser o dono da Facção para promover algum membro!'
				});
			} else {
				const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

				if (!USER) {
					return message.reply({
						content: 'Mencione alguém para promover!'
					});
				}

				if (USER.bot) {
					return message.reply({
						content: 'Você não pode promover um bot!'
					});
				}

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users.findOne({
					userId: owner.id,
					guildId: message.guild.id
				}).then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply({
						content: 'Esse usuário não está em sua Facção!'
					});
				}

				const cargosArray = user.fac.cargos.map((value, index) => ({
					nome: value.nome,
					position: index
				}));

				let embedMessage = '';

				const emojis = {
					1: '1️⃣',
					2: '2️⃣',
					3: '3️⃣',
					4: '4️⃣',
					5: '5️⃣',
					6: '6️⃣',
					7: '7️⃣',
					8: '8️⃣',
					9: '9️⃣',
					10: '🔟',
					11: '1️⃣1️⃣',
					12: '1️⃣2️⃣',
					13: '1️⃣3️⃣',
					14: '1️⃣4️⃣',
					15: '1️⃣5️⃣',
					16: '1️⃣6️⃣',
					17: '1️⃣7️⃣',
					18: '1️⃣8️⃣',
					19: '1️⃣9️⃣',
					20: '2️⃣0️⃣',
					21: '2️⃣1️⃣',
					22: '2️⃣2️⃣',
					23: '2️⃣3️⃣',
					24: '2️⃣4️⃣',
					25: '2️⃣5️⃣',
					26: '2️⃣6️⃣',
					27: '2️⃣7️⃣',
					28: '2️⃣8️⃣',
					29: '2️⃣9️⃣',
					30: '3️⃣0️⃣'
				};

				const embed = new ClientEmbed(author)
					.setTitle('Promoção');

				cargosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **Cargo:** ${eu.nome}\n`);
				embed.setDescription(`**➡️ | Digite o número do cargo que deseja dar para o ${USER}:**\n\n${embedMessage}`);

				message.reply({
					content: author.toString(),
					embeds: [embed]
				}).then((msg) => {
					const filter = m => {
						return m.author.id === author.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 60000
					});

					collector.on('collect', async (ce) => {
						const selected = Number(ce.content - 1);
						const findSelectedEmprego = cargosArray.find((xis) => xis.position === selected);

						if (!findSelectedEmprego) {
							message.reply({
								content: 'Esse número não existe. Por favor, envie o número do cargo novamente.'
							}).then(a => a.delete(), 5000);
							return ce.delete();
						} else if (user2.fac.emprego.nome === findSelectedEmprego.nome) {
							message.reply({
								content: 'Esse usuário já possui esse cargo na Facção!'
							}).then(a => a.delete(), 5000);
							return ce.delete();
						} else {
							collector.stop();

							const embed2 = new ClientEmbed(author)
								.setTitle('Promoção')
								.setDescription(`${USER}, você foi promovido na Facção **${user.fac.nome}**`)
								.addField('Cargo Anterior:', user2.fac.emprego.nome)
								.addField('Cargo Atual:', findSelectedEmprego.nome);

							message.reply({
								content: USER.toString(),
								embeds: [embed2]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: USER.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.emprego.nome': findSelectedEmprego.nome,
									'fac.emprego.numero': user2.fac.emprego.numero = findSelectedEmprego.position
								}
							});

							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							msg.delete();
							collector.stop();
							return message.reply({
								content: 'Você demorou demais para escolher o cargo. Use o comando novamente!'
							});
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'rebaixar') {
			if (user.fac.dono !== author.id) {
				return message.reply({
					content: 'Você precisa ser o dono da Facção para rebaixar algum membro!'
				});
			} else {
				const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

				if (!USER) {
					return message.reply({
						content: 'Mencione alguém para rebaixar!'
					});
				}

				if (USER.bot) {
					return message.reply({
						content: 'Você não pode rebaixar um bot!'
					});
				}

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users.findOne({
					userId: owner.id,
					guildId: message.guild.id
				}).then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply({
						content: 'Esse usuário não está em sua Facção!'
					});
				}

				const cargosArray = user.fac.cargos.map((value, index) => ({
					nome: value.nome,
					position: index
				}));

				let embedMessage = '';

				const emojis = {
					1: '1️⃣',
					2: '2️⃣',
					3: '3️⃣',
					4: '4️⃣',
					5: '5️⃣',
					6: '6️⃣',
					7: '7️⃣',
					8: '8️⃣',
					9: '9️⃣',
					10: '🔟',
					11: '1️⃣1️⃣',
					12: '1️⃣2️⃣',
					13: '1️⃣3️⃣',
					14: '1️⃣4️⃣',
					15: '1️⃣5️⃣',
					16: '1️⃣6️⃣',
					17: '1️⃣7️⃣',
					18: '1️⃣8️⃣',
					19: '1️⃣9️⃣',
					20: '2️⃣0️⃣',
					21: '2️⃣1️⃣',
					22: '2️⃣2️⃣',
					23: '2️⃣3️⃣',
					24: '2️⃣4️⃣',
					25: '2️⃣5️⃣',
					26: '2️⃣6️⃣',
					27: '2️⃣7️⃣',
					28: '2️⃣8️⃣',
					29: '2️⃣9️⃣',
					30: '3️⃣0️⃣'
				};

				const embed = new ClientEmbed(author)
					.setTitle('Promoção');

				cargosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **Cargo:** ${eu.nome}\n`);
				embed.setDescription(`**➡️ | Digite o número do cargo que deseja rebaixar para o ${USER}:**\n\n${embedMessage}`);

				message.reply({
					content: author.toString(),
					embeds: [embed]
				}).then((msg) => {
					const filter = m => {
						return m.author.id === author.id;
					};

					const collector = msg.channel.createMessageCollector({
						filter,
						time: 60000
					});

					collector.on('collect', async (ce) => {
						const selected = Number(ce.content - 1);
						const findSelectedEmprego = cargosArray.find((xis) => xis.position === selected);

						if (!findSelectedEmprego) {
							message.reply({
								content: 'Esse número não existe. Por favor, envie o número do cargo novamente.'
							}).then(a => a.delete(), 5000);
							return ce.delete();
						} else if (user2.fac.emprego.nome === findSelectedEmprego.nome) {
							message.reply({
								content: 'Esse usuário já possui esse cargo na Facção!'
							}).then(a => a.delete(), 5000);
							return ce.delete();
						} else {
							collector.stop();

							const embed2 = new ClientEmbed(author)
								.setTitle('Rebaixado')
								.setDescription(`${USER}, você foi rebaixado na Facção **${user.fac.nome}**`)
								.addField('Cargo Anterior:', user2.fac.emprego.nome)
								.addField('Cargo Atual:', findSelectedEmprego.nome);

							message.reply({
								content: USER.toString(),
								embeds: [embed2]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: USER.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.emprego.nome': findSelectedEmprego.nome,
									'fac.emprego.numero': user2.fac.emprego.numero = findSelectedEmprego.position
								}
							});

							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							msg.delete();
							collector.stop();
							return message.reply({
								content: 'Você demorou demais para escolher o cargo. Use o comando novamente!'
							});
						}
					});
				});
			}
		}
	}

	async PUSH(members, list, guild) {
		for (const employer of list) {
			const doc = await this.client.database.users.findOne({
				userId: employer,
				guildId: guild
			}).then((x) => x.fac);
			members.push({
				user: await this.client.users.fetch(employer).then((user) => user),
				lastWork: doc.lastWork,
				emprego: doc.emprego.nome
			});
		}
	}

	progressBar(current, total, barSize) {
		const progress = Math.round((barSize * current) / total);

		return '▮'.repeat(progress) + ':'.repeat(barSize - progress);
	}

};
