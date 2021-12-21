/* eslint-disable no-return-assign */
/* eslint-disable complexity */
/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const moment = require('moment');
require('moment-duration-format');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');

module.exports = class Facção extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'facção';
		this.category = 'Crime';
		this.description = 'Veja o sistema de Facção!';
		this.usage = 'ping';
		this.aliases = ['faccao', 'faccão'];

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

			return message.channel.send(author, embed);
		} else if (args[0].toLowerCase() === 'criar') {
			if (user.fac.createFac) {
				return message.reply(`você já é dono de uma Facção! Use o comando \`${prefix}facção info\` para ver informações da sua Facção!`);
			} else if (user.fac.isFac) {
				return message.reply(`você já está em uma Facção! Use o comando \`${prefix}facção info\` para ver informações da sua Facção!`);
			} else if (user.crime.reputacao <= 2000) {
				return message.reply(`você precisa ser **Maloqueiro** para poder criar uma Facção! Use \`${prefix}reputacao\`.`);
			} else {
				message.reply('qual nome você deseja dar a sua **Facção**? OBS: Digite no chat o nome dela!').then(async (msg) => {
					const filter = (m) => m.author.id === author.id;
					const collector = msg.channel.createMessageCollector(filter, {
						time: 60000
					});

					collector.on('collect', async (r) => {
						collector.stop();

						const embed = new ClientEmbed(author)
							.setTitle('🎭 | Facção')
							.setDescription(`${author}\n> Parabéns! Você agora é Líder de uma Facção chamada: **${r.content}**`);

						message.channel.send(author, embed);

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
							return message.reply('você demorou demais para dar a sua Facção. Use o comando novamente!');
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'info') {
			if (!user.fac.isFac) {
				return message.reply(`você não está em uma Facção! Peça para alguém lhe chamar para uma, ou crie a sua própria usando o comando \`${prefix}facção criar\`.`);
			} else {
				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users
					.findOne({
						userId: owner.id,
						guildId: message.guild.id
					})
					.then((x) => x.fac);

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

				return message.channel.send(author, EMBED);
			}
		} else if (args[0].toLowerCase() === 'trabalhar') {
			let presoTime = 0;

			const embedPreso = new ClientEmbed(author)
				.setTitle('👮 | Preso');

			if (user.prisao.isPreso && user.prisao.prenderCmd) {
				presoTime = user.prisao.prenderMili;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.channel.send(author, embedPreso);
				}
			} else if (user.prisao.isPreso && user.prisao.traficoDrogas) {
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
				const fd = user?.fac;

				const XP = 1;

				const cooldown = 1800000 - (Date.now() - fd.lastWork);

				if (cooldown > 0) {
					const embedWork = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você deve aguardar **${moment.duration(cooldown).format('h [horas] m [minutos] e s [segundos]').replace('minsutos', 'minutos')}** para poder trabalhar novamente.`);

					return message.channel.send(author, embedWork);
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você trabalhou com sucesso para sua **Facção**!\nConseguiu as seguintes coisas:\n+**1 XP**\n**R$200,00**`);

					message.channel.send(author, embed);

					const owner = await this.client.users.fetch(fb.dono);
					const fc = await this.client.database.users
						.findOne({
							userId: owner.id,
							guildId: message.guild.id
						})
						.then((x) => x.fac);

					const xpToUp = (fc.level + 1) * 1000;

					if (fc.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.level': fc.level + 1
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: owner.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.level': fc.level + 1
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id,
							'faccoes.nome': user.fac.nome
						}, {
							$set: {
								'faccoes.$.level': fc.level + 1
							}
						});
					}

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'fac.lastWork': Date.now(),
							'fac.money': fc.money += 200,
							'fac.xp': fc.xp + XP
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
							'fac.xp': fc.xp + XP,
							'fac.money': fc.money += 200
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

					return;
				}
			}
		} else if (args[0].toLowerCase() === 'convidar') {
			if (!user.fac.createFac) {
				return message.reply('você precisa ser Dono de uma Facção para convidar alguém!');
			} else {
				const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

				if (!USER) return message.reply('mencione alguém para ser convidado para sua Facção!');

				if (USER.id === author.id) return message.reply('você não pode se autoconvidar para sua Facção!');

				if (USER.bot) return message.reply('você não pode convidar bots!');

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				if (!user2.cadastrado) return message.reply('peça para esse usuário se cadastrar antes de entrar em uma Facção!');

				if (user2.fac.isFac) return message.reply('este usuário já faz parte de outra Facção!');

				const embed1 = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${USER}\n\n> Você está sendo convidado para entrar na Facção **${user.fac.nome}!**\n\n> Você aceita?\n\n> **SIM** - Aceita\n> **NÃO** - Recusa`);

				message.channel.send(USER, embed1).then(async (msg) => {
					const collector = msg.channel.createMessageCollector((m) => m.author.id === USER.id, {
						max: 1,
						time: 150000
					});

					collector.on('collect', async (collected) => {
						if (['sim', 'y', 'yes'].includes(collected.content.toLowerCase())) {
							const embed = new ClientEmbed(author)
								.setTitle('🎭 | Facção')
								.setDescription(`${author}, você contratou o(a) usuário(a) ${USER} com sucesso.`);

							message.channel.send(author, embed);

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

							message.channel.send(author, embed);

							msg.delete();
							collector.stop();
							return;
						}
					});

					collector.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg.delete();
							return message.reply(`o usuário ${USER} demorou demais para responder ao seu convite. Use o comando novamente!`);
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'demitir') {
			if (!user.fac.createFac) {
				return message.reply('você precisa ser Dono de uma Facção para demitir alguém!');
			} else {
				const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

				if (!USER) return message.reply('mencione alguém para ser demitido da sua Facção!');

				if (USER.id === author.id) return message.reply('você não pode demitir você mesmo!');

				if (USER.bot) return message.reply('você não pode demitir bots!');

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				if (!user2.cadastrado) return message.reply('peça para esse usuário se cadastrar antes de ser demitido de uma Facção!');

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users
					.findOne({
						userId: owner.id,
						guildId: message.guild.id
					})
					.then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply(`este usuário não está contratado em sua Facção!`);
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, usuário demitido com sucesso.`);

					message.channel.send(author, embed);

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
							'fac.dono': '',
							'fac.isFac': false,
							'fac.tempo': Date.now()
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
				return message.reply(`você não está em uma Facção! Peça para alguém lhe chamar para uma, ou crie a sua própria usando o comando \`${prefix}facção criar\`.`);
			} else if (user.fac.createFac) {
				if (!user.fac.membros.length) return message.reply(`sua Facção não possui nenhum membro. Use o comando \`${prefix}facção deletar\`!`);

				const embed = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, tem certeza que deseja abandonar sua Facção?\n\n> **SIM** - Sair\n> **NÃO** - Ficar`);

				message.channel.send(author, embed).then(async (msg) => {
					const filter = (m) => m.author.id === author.id;
					const collector = msg.channel.createMessageCollector(filter, {
						time: 60000
					});

					collector.on('collect', async (collected) => {
						if (['sim', 'y', 'yes'].includes(collected.content.toLowerCase())) {
							const random = Math.floor(Math.random() * user.fac.membros.length);

							const owner = await this.client.users.fetch(fb.dono);
							const fd = await this.client.database.users
								.findOne({
									userId: owner.id,
									guildId: message.guild.id
								})
								.then((x) => x.fac);

							await this.client.database.users.findOneAndUpdate({
								userId: await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
								guildId: message.guild.id
							}, {
								$set: {
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id)
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
									'fac.isFac': false,
									'fac.createFac': false,
									'fac.membros': [],
									'fac.tempo': Date.now()
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

							return message.channel.send(author, embed1);
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
							return message.reply(`você demorou demais para responder. Use o comando novamente!`);
						}
					});
				});
			} else {
				const embed = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, tem certeza que deseja sair da sua Facção?\n\n> **SIM** - Sair\n> **NÃO** - Ficar`);

				message.channel.send(author, embed).then(async (msg) => {
					const filter = (m) => m.author.id === author.id;
					const collector = msg.channel.createMessageCollector(filter, {
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
									'fac.tempo': Date.now()
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

							return message.channel.send(author, embed1);
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
							return message.reply(`você demorou demais para responder. Use o comando novamente!`);
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'deletar') {
			if (!user.fac.createFac) {
				return message.reply('você precisa ter criado uma Facção para deletar uma!');
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'fac.dono': '',
						'fac.isFac': false,
						'fac.createFac': false
					}
				});

				if (user.fac.membros.length >= 0) {
					for (var i = 0; i < user.fac.membros.length; i++) {
						await this.client.database.users.findOneAndUpdate({
							userId: user.fac.membros[i],
							guildId: message.guild.id
						}, {
							$set: {
								'fac.dono': '',
								'fac.isFac': false,
								'fac.createFac': false
							}
						});
					}
				}

				await this.client.database.guilds.findOneAndUpdate({
					_id: message.guild.id,
					'faccoes.nome': user.fac.nome
				}, {
					$set: {
						faccoes: []
					}
				});

				const embed1 = new ClientEmbed(author)
					.setTitle('🎭 | Facção')
					.setDescription(`${author}, Facção deletada com sucesso!`);

				return message.channel.send(author, embed1);
			}
		} else if (args[0].toLowerCase() === 'valor') {
			if (!args[1]) {
				return message.reply(`você precisa colocar o que quer fazer com o valor. Ex: \`${prefix}facção valor transferir @usuario 1000\``);
			} else if (args[1].toLowerCase() === 'transferir') {
				if (user.fac.dono !== author.id) {
					return message.reply('você precisa ser o dono da Facção para transferir dinheiro da FAC pra algum membro!');
				} else {
					const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

					if (!USER) return message.reply('mencione alguém para transferir o dinheiro!');

					if (USER.bot) return message.reply('você não pode transferir dinheiro para bots!');

					const user2 = await this.client.database.users.findOne({
						userId: USER.id,
						guildId: message.guild.id
					});

					if (!user2.cadastrado) return message.reply('peça para esse usuário se cadastrar antes de receber dinheiro de uma Facção!');

					const owner = await this.client.users.fetch(fb.dono);
					const fd = await this.client.database.users
						.findOne({
							userId: owner.id,
							guildId: message.guild.id
						})
						.then((x) => x.fac);

					if (!fd.membros.some((x) => x === USER.id)) {
						return message.reply(`este usuário não está contratado em sua Facção!`);
					}

					const valor = args[3];

					if (!valor) return message.reply('você precisa colocar o valor que deseja transferir!');

					if (Number(valor) <= 0) return message.reply('você precisa colocar um valor acima de **0**!');

					if (!parseInt(valor)) return message.reply('você precisa colocar um valor válido!');

					if (isNaN(valor)) return message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

					if (Number(valor) > fd.money) return message.reply('sua Facção não tem esse valor todo para ser transferido!');

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

					return message.channel.send(author, embed1);
				}
			}
		} else if (args[0].toLowerCase() === 'registro') {
			if (user.fac.dono !== author.id) {
				return message.reply('você precisa ser o dono da Facção para ver o registro de algum membro!');
			} else {
				const USER = this.client.users.cache.get(args[1]) || message.mentions.users.first();

				if (!USER) return message.reply('mencione alguém para ver o registro!');

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users
					.findOne({
						userId: owner.id,
						guildId: message.guild.id
					})
					.then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply(`este usuário não está em sua Facção!`);
				}

				const embed = new ClientEmbed(author)
					.setTitle('Registros - Facção')
					.setDescription(`**REGISTRO DO USUÁRIO:** ${USER}\n\n${user2.fac.registro.map((x, index) => `\`[${index++}]\` Trabalhou as: **${moment(x.tempo).format('LTS L')}** | Ganhou: **${x.xp} XP** e **R$${x.money},00**`).slice(0, 20).join('\n')}`);

				return message.channel.send(author, embed);
			}
		} else if (args[0].toLowerCase() === 'cargo') {
			if (!args[1]) {
				return message.reply('você precisa colocar se quer **criar** ou **deletar** um cargo!');
			} else if (args[1].toLowerCase() === 'criar') {
				if (user.fac.dono !== author.id) {
					return message.reply('você precisa ser o dono da Facção para criar um cargo na Facção!');
				} else if (user.fac.cargos.length === 7) {
					return message.reply('sua Facção já possui muitos cargos. Delete algum cargo, e crie outro novamente!');
				} else if (!args.slice(2).join(' ')) {
					return message.reply('você precisa colocar o nome do cargo!');
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você criou o cargo **${args.slice(2).join(' ')}** para sua Facção com sucesso!`);

					message.channel.send(author, embed);

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
					return message.reply('você precisa ser o dono da Facção para deletar um cargo na Facção!');
				} else if (!user.fac.cargos.length) {
					return message.reply(`sua Facção não possui nenhum cargo ainda. Use o comando \`${prefix}facção criar\` para criar um cargo!`);
				} else if (!args.slice(2).join(' ')) {
					return message.reply('você precisa colocar o nome do cargo!');
				} else if (!user.fac.cargos.find((f) => f.nome === args.slice(2).join(' '))) {
					return message.reply('não existe um cargo com esse nome na sua Facção!');
				} else {
					const embed = new ClientEmbed(author)
						.setTitle('🎭 | Facção')
						.setDescription(`${author}, você deletou o cargo **${args.slice(2).join(' ')}** para sua Facção com sucesso!`);

					message.channel.send(author, embed);

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
				return message.reply('você precisa ser o dono da Facção para promover algum membro!');
			} else {
				const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

				if (!USER) return message.reply('mencione alguém para promover!');

				if (USER.bot) return message.reply('você não pode promover um bot!');

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				if (!user2.cadastrado) return message.reply('peça para esse usuário se cadastrar antes de ser promovido de uma Facção!');

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users
					.findOne({
						userId: owner.id,
						guildId: message.guild.id
					})
					.then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply(`este usuário não está em sua Facção!`);
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

				message.channel.send(author, embed).then((msg) => {
					const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
						time: 60000
					});

					collector.on('collect', async (ce) => {
						const selected = Number(ce.content - 1);
						const findSelectedEmprego = cargosArray.find((xis) => xis.position === selected);

						if (!findSelectedEmprego) {
							message.reply(`este número não existe! Por favor, envie o número do cargo novamente.`).then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else if (findSelectedEmprego.position < user2.fac.emprego.numero) {
							message.reply('o cargo escolhido precisa ser **maior** que o cargo atual desse usuário na Facção!').then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else if (user2.fac.emprego.nome === findSelectedEmprego.nome) {
							message.reply('esse usuário já possui esse cargo na Facção!').then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else {
							collector.stop();

							const embed2 = new ClientEmbed(author)
								.setTitle('Promoção')
								.setDescription(`${USER}, você foi promovido na Facção **${user.fac.nome}**`)
								.addField('Cargo Anterior:', user2.fac.emprego.nome)
								.addField('Cargo Atual:', findSelectedEmprego.nome);

							message.channel.send(USER, embed2);

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
							return message.reply('você demorou demais para escolher o cargo. Use o comando novamente!').then((a) => a.delete({
								timeout: 6000
							}));
						}
					});
				});
			}
		} else if (args[0].toLowerCase() === 'rebaixar') {
			if (user.fac.dono !== author.id) {
				return message.reply('você precisa ser o dono da Facção para rebaixar algum membro!');
			} else {
				const USER = this.client.users.cache.get(args[2]) || message.mentions.users.first();

				if (!USER) return message.reply('mencione alguém para rebaixar!');

				if (USER.bot) return message.reply('você não pode rebaixar um bot!');

				const user2 = await this.client.database.users.findOne({
					userId: USER.id,
					guildId: message.guild.id
				});

				if (!user2.cadastrado) return message.reply('peça para esse usuário se cadastrar antes de ser rebaixado de uma Facção!');

				const owner = await this.client.users.fetch(fb.dono);
				const fd = await this.client.database.users
					.findOne({
						userId: owner.id,
						guildId: message.guild.id
					})
					.then((x) => x.fac);

				if (!fd.membros.some((x) => x === USER.id)) {
					return message.reply(`este usuário não está em sua Facção!`);
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

				message.channel.send(author, embed).then((msg) => {
					const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
						time: 60000
					});

					collector.on('collect', async (ce) => {
						const selected = Number(ce.content - 1);
						const findSelectedEmprego = cargosArray.find((xis) => xis.position === selected);

						if (!findSelectedEmprego) {
							message.reply(`este número não existe! Por favor, envie o número do cargo novamente.`).then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else if (findSelectedEmprego.position > user2.fac.emprego.numero) {
							message.reply('o cargo escolhido precisa ser **menor** que o cargo atual desse usuário na Facção!').then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else if (user2.fac.emprego.nome === findSelectedEmprego.nome) {
							message.reply('esse usuário já possui esse cargo na Facção!').then(a => a.delete({
								timeout: 5000
							}));
							return ce.delete();
						} else {
							collector.stop();

							const embed2 = new ClientEmbed(author)
								.setTitle('Rebaixado')
								.setDescription(`${USER}, você foi rebaixado na Facção **${user.fac.nome}**`)
								.addField('Cargo Anterior:', user2.fac.emprego.nome)
								.addField('Cargo Atual:', findSelectedEmprego.nome);

							message.channel.send(USER, embed2);

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
							return message.reply('você demorou demais para escolher o cargo. Use o comando novamente!').then((a) => a.delete({
								timeout: 6000
							}));
						}
					});
				});
			}
		}
	}

	async PUSH(members, list, guild) {
		for (const employer of list) {
			const doc = await this.client.database.users
				.findOne({
					userId: employer,
					guildId: guild
				})
				.then((x) => x.fac);
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
