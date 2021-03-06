/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable id-length */
/* eslint-disable complexity */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Crime extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'crime';
		this.category = 'Crime';
		this.description = 'Pratique um crime!';
		this.usage = 'crime';
		this.aliases = ['violar'];

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
		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (args[0] && ['estatisticas', 'estatistica', 'estatísticas'].includes(args[0].toLowerCase())) {
			const CRIMES = await require('mongoose')
				.connection.collection('users')
				.find({
					'crime.feito': {
						$gt: 0
					}
				})
				.toArray();

			const crimes = Object.entries(CRIMES)
				.map(([, x]) => x.userId)
				.sort((x, f) => x.feito - f.feito);

			const members = [];

			await this.PUSH(crimes, members, message.guild);

			const crimesMap = members
				.map((x) => x)
				.sort((x, f) => f.feito - x.feito)
				.slice(0, 10);

			const EMBED = new ClientEmbed(author)
				.setTitle('Crime Estatísticas')
				.setDescription(crimesMap.map((x, f) => `\`${f + 1}º\`) **${x.user}** - **${x.feito}**`).join('\n\n'));

			return message.reply({
				content: author.toString(),
				embeds: [EMBED]
			});
		}

		if (server.cidade.governador === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Prefeito do servidor!'
			});
		}

		if (server.cidade.delegado === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Delegado do servidor!'
			});
		}

		if (userAuthor.policia.isPolice) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Policial do servidor!'
			});
		}

		if (server.cidade.carcereiro.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Carcereiro do servidor!'
			});
		}

		if (server.cidade.diretorHP === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Diretor do Hospital do servidor!'
			});
		}

		if (server.cidade.medicos.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Médico do servidor!'
			});
		}

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
			const timeout = 600000;

			if (userAuthor.hp.vida < 50) {
				const embedVida = new ClientEmbed(author)
					.setTitle('😨 | Você está ferido!')
					.setDescription(`Você se feriu, e não consegue realizar esta ação.\nVá até o **Hospital ${message.guild.name}** para se recuperar e receber **tratamento**.\n\nUse o comando \`${prefix}entradahospital\` para um Médico iniciar seu **tratamento**.`);

				return message.reply({
					content: author.toString(),
					embeds: [embedVida]
				});
			}

			if (timeout - (Date.now() - userAuthor.cooldown.crime) > 0) {
				const faltam = ms(timeout - (Date.now() - userAuthor.cooldown.crime));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você ainda está cansado da última vez! Você pode tentar novamente em: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.reply({
					content: author.toString(),
					embeds: [embed]
				});
			} else if (!args[0]) {
				const array = [{
					roubo: '**Roubar uma Velhinha**',
					rep: '**+5**'
				},
				{
					roubo: '**Roubar um Frentista**',
					rep: '**+10**'
				},
				{
					roubo: '**Roubar uma Joalheria**',
					rep: '**+20**'
				},
				{
					roubo: '**Roubar um Agiota**',
					rep: '**+30**'
				},
				{
					roubo: '**Roubar uma Casa Lotérica**',
					rep: '**+40**'
				},
				{
					roubo: '**Hackear o Brazino777**',
					rep: '**+50**'
				},
				{
					roubo: '**Hackear o Facebook**',
					rep: '**+60**'
				},
				{
					roubo: '**Hackear o Banco Central**',
					rep: '**+70**'
				},
				{
					roubo: '**Roubar um Shopping Center**',
					rep: '**+80**'
				},
				{
					roubo: '**Roubar o Banco**',
					rep: '**+90**'
				}
				];

				const crimesArray = array.map((value, index) => ({
					roubo: value.roubo,
					rep: value.rep,
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

				const embed2 = new ClientEmbed(author)
					.setTitle('🥷 | Lista de Crimes');

				crimesArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.roubo} - REP: ${eu.rep}\n`);
				embed2.setDescription(`*Lista de Crimes que você pode cometer:* Use (\`${prefix}crime <número do crime>\`)\n\n${embedMessage}`);

				return message.reply({
					content: author.toString(),
					embeds: [embed2]
				});
			} else if (args[0] === '1') {
				// velhinha - 5 minutos preso
				const randomValor = Utils.randomNumber(500, 2000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu roubar **R${{random}},00** de uma velhinha enquanto ela fazia sua caminhada matinal.\n\n> Você ganhou: **+10** REP.',
					'{{author}}, você conseguiu roubar **R${{random}},00** de uma velhinha depois de ela retirar o seu Bolsa Família.\n\n> Você ganhou: **+10** REP.',
					'{{author}}, você conseguiu roubar **R${{random}},00** de uma velhinha depois de ela sacar a sua Aposentadoria.\n\n> Você ganhou: **+10** REP.'
				];

				const msgLose = [
					'{{author}}, você não conseguiu roubar a Senhorinha, pois ela lhe aplicou um Golpe de KUNG-FU e te dominou. Ela chamou os Policiais e você foi preso.\n\n> Você ganhou: **+5** REP.',
					'{{author}}, você não conseguiu roubar a Senhorinha, pois ela jogou Spray de Pimenta em você que caiu e ficou chorando. Ela chamou os Policiais e você foi preso.\n\n> Você ganhou: **+5** REP.',
					'{{author}}, você não conseguiu roubar a Senhorinha, pois ela lhe encheu de bengalada e você desmaiou. Ela chamou os Policiais e você foi preso.\n\n> Você ganhou: **+5** REP.'
				];

				if (randomChance < 30) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 5,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.velha': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.velha': false,
								'prisao.crime': false
							}
						});
					}, 300000);
				} else if (randomChance >= 30) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (5 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '2') {
				// frentista - 10 minutos preso
				const randomValor = Utils.randomNumber(2000, 5000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu roubar **R${{random}},00** de um Frentista, ele lhe entregou todo o dinheiro do seu dia de trabalho.\n\n> Você ganhou: **+20** REP.',
					'{{author}}, você conseguiu roubar **R${{random}},00** de um Frentista, ele era seu cumplice e lhe entregou o valor sem nenhuma reação.\n\n> Você ganhou: **+20** REP.'
				];

				const msgLose = [
					'{{author}}, você não conseguiu roubar o Frentista, na hora da fuga sua moto Pifou e o Frentista te encheu de vassourada. Ele chamou os Policiais e você foi preso.\n\n> Você ganhou: **+10** REP.',
					'{{author}}, você não conseguiu roubar o Frentista, na hora da fuga você precisou abastecer o seu veículo em outro posto, mas a Gasolina estava muito cara e você ficou sem nada.\n\n> Você ganhou: **+10** REP.'
				];

				if (randomChance < 40) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 10,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.frentista': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.frentista': false,
								'prisao.crime': false
							}
						});
					}, 600000);
				} else if (randomChance >= 40) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (10 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '3') {
				// joalheria - 15 minutos preso
				const randomValor = Utils.randomNumber(5000, 10000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu roubar todas as jóias da loja, revendeu no mercado negro e conseguiu **R${{random}},00**.\n\n> Você ganhou: **+40** REP.',
					'{{author}}, você conseguiu fugir da loja com algumas jóias, vendeu tudo na 25 de Março e ganhou **R${{random}},00**.\n\n> Você ganhou: **+40** REP.'
				];

				const msgLose = [
					'{{author}}, as Jóias que você roubou tinha um dispositivo rastreador, você foi rastreado e Preso.\n\n> Você ganhou: **+20** REP.',
					'{{author}}, você foi pego tentando vender uns anéis para um policial à paisana e foi Preso.\n\n> Você ganhou: **+20** REP.'
				];

				if (randomChance < 50) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 20,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.joalheria': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.joalheria': false,
								'prisao.crime': false
							}
						});
					}, 900000);
				} else if (randomChance >= 50) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (20 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '4') {
				// agiota - 20 minutos preso
				const randomValor = Utils.randomNumber(10000, 20000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu roubar **R${{random}},00** de um agiota enquanto ele estava tirando sua soneca da tarde.\n\n> Você ganhou: **+60** REP.',
					'{{author}}, você conseguiu roubar **R${{random}},00** de um agiota, ele é novo no ramo e não sabia fazer a conta direito.\n\n> Você ganhou: **+60** REP.'
				];

				const msgLose = [
					'{{author}}, você não conseguiu roubar o Agiota, pois ele estava armado e lhe pegou no flagra, você correu mas acabou sendo parado pela polícia com porte ilegal de armas e foi Preso.\n\n> Você ganhou: **+30** REP.',
					'{{author}}, você não conseguiu roubar o agiota, os Capangas dele viram sua ação e te bateram até você desmaiar, eles te denunciaram para a polícia e você foi Preso.\n\n> Você ganhou: **+30** REP.'
				];

				if (randomChance < 60) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 30,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.agiota': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.agiota': false,
								'prisao.crime': false
							}
						});
					}, 1200000);
				} else if (randomChance >= 60) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (30 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '5') {
				// casa lotérica - 20 minutos preso
				const randomValor = Utils.randomNumber(20000, 40000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu **R${{random}},00** ao roubar a casa lotérica a noite enquanto não havia ninguém.\n\n> Você ganhou: **+80** REP.',
					'{{author}}, você conseguiu roubar **R${{random}},00** da lotérica com um bilhete vencedor adulterado.\n\n> Você ganhou: **+80** REP.'
				];

				const msgLose = [
					'{{author}}, a Casa lotérica tinha um sistema anti-roubo e fechou as portas e te trancou la dentro. A polícia chegou e você foi Preso.\n\n> Você ganhou: **+40** REP.',
					'{{author}}, você roubou a Casa Lotérica, mas na fuga você encontrou uma bicicleta e saiu pedalando, mas como não tinha rodinhas você caiu e foi preso pela polícia.\n\n> Você ganhou: **+40** REP.'
				];

				if (randomChance < 70) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 40,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.casaLoterica': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.casaLoterica': false,
								'prisao.crime': false
							}
						});
					}, 1200000);
				} else if (randomChance >= 70) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (40 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '6') {
				// hackear brazino - 35 minutos preso
				const randomValor = Utils.randomNumber(40000, 60000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu Hackear o Brazino777, o dono do site estava ocupado com as modelos da propaganda e não percebeu a sua invasão, você roubou **R${{random}},00**.\n\n> Você ganhou: **+100** REP.',
					'{{author}}, você conseguiu Hackear o Brazino777, os anti-hackers estavam viciados em apostas e não perceberam a sua invasão, você roubou **R${{random}},00**.\n\n> Você ganhou: **+100** REP.'
				];

				const msgLose = [
					'{{author}}, você perdeu todo o dinheiro que roubou apostando no Brazino777 e ficou sem nada.\n\n> Você ganhou: **+50** REP.',
					'{{author}}, você ficou entretido com os vídeos do Brazino777 e acabou sendo desconectado, rastreado e Preso pela polícia.\n\n> Você ganhou: **+50** REP.'
				];

				if (randomChance < 80) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 50,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.brazino': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.brazino': false,
								'prisao.crime': false
							}
						});
					}, 2100000);
				} else if (randomChance >= 80) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (50 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '7') {
				// hackear facebook - 45 minutos preso
				const randomValor = Utils.randomNumber(60000, 80000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu **R${{random}},00** hackeando a conta de um vendedor no Facebook, e lucrou aplicando golpes em cima disto.\n\n> Você ganhou: **+120** REP.',
					'{{author}}, você conseguiu **R${{random}},00** hackeando o Facebook, os anti-hackers na hora de te impedir tropeçou nos fios e desligou todo o sistema deles.\n\n> Você ganhou: **+120** REP.'
				];

				const msgLose = [
					'{{author}}, você tentou hackear o Facebook, mas o Mark Zuckerberg percebeu e acabou lhe Hackeando, ele logo te rastreou e mandou a polícia atrás de você e acabou sendo Preso.\n\n> Você ganhou: **+60** REP.',
					'{{author}}, você tentou hackear o Facebook, mas o seu computador da Xuxa não conseguiu Rodar os programas de Camuflagem de IP e queimou, você foi descoberto e Preso.\n\n> Você ganhou: **+60** REP.'
				];

				if (randomChance < 90) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 60,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.facebook': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.facebook': false,
								'prisao.crime': false
							}
						});
					}, 2700000);
				} else if (randomChance >= 90) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (60 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '8') {
				// hackear banco central - 1 hora preso
				const randomValor = Utils.randomNumber(80000, 100000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você hackeou o Banco Central e conseguiu acesso ao banco de dados dos usuários, clonou cartões e conseguiu **R${{random}},00**.\n\n> Você ganhou: **+140** REP.',
					'{{author}}, você tinha os dados de acesso do Gerente do Banco Central e conseguiu desviar 1 centavo de algumas contas de clientes, você roubou **R${{random}},00**.\n\n> Você ganhou: **+140** REP.'
				];

				const msgLose = [
					'{{author}}, a Policía Federal ja estava de olho em você, e quando você começou a hackear o banco ela invadiu a sua casa e te levou preso.\n\n> Você ganhou: **+70** REP.',
					'{{author}}, seu conhecimento não era tão bom para invadir o sistema do banco, você foi localizado e preso.\n\n> Você ganhou: **+70** REP.'
				];

				if (randomChance < 95) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 70,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.bancoCentral': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.bancoCentral': false,
								'prisao.crime': false
							}
						});
					}, 3600000);
				} else if (randomChance >= 95) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (70 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '9') {
				// roubar shopping center - 2 horas preso
				const randomValor = Utils.randomNumber(100000, 200000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você despistou os seguranças do Shopping se disfarçando de Homem Aranha da Carreta Furacão, e conseguiu roubar **R${{random}},00**.\n\n> Você ganhou: **+160** REP.',
					'{{author}}, você invadiu a administração do Shopping no dia da coleta de dinheiro, rendeu os seguranças e fugiu levando **R${{random}},00**.\n\n> Você ganhou: **+160** REP.'
				];

				const msgLose = [
					'{{author}}, você é muito burro e se perdeu nos andares e escadas rolantes do Shopping, não achou a saída e a Polícia chegou e te prendeu.\n\n> Você ganhou: **+80** REP.',
					'{{author}}, você foi pego pelas câmeras de segurança tentando descer a escada rolante que estava subindo, os seguranças chegaram e você foi preso.\n\n> Você ganhou: **+80** REP.'
				];

				if (randomChance < 97) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 80,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.shopping': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.shopping': false,
								'prisao.crime': false
							}
						});
					}, 7200000);
				} else if (randomChance >= 97) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (80 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else if (args[0] === '10') {
				// roubar banco - 4 horas preso
				const randomValor = Utils.randomNumber(200000, 300000);

				const randomChance = Math.floor(Math.random() * 100);

				const msgSucess = [
					'{{author}}, você conseguiu render todos os funcionários do banco, como em uma cena de cinema, imitou o Professor e conseguiu roubar **R${{random}},00**.\n\n> Você ganhou: **+180** REP.',
					'{{author}}, você conseguiu roubar o banco cavando um túnel até o Cofre, desligou as câmeras de segurança e levou **R${{random}},00**.\n\n> Você ganhou: **+180** REP.'
				];

				const msgLose = [
					'{{author}}, você não conseguiu roubar o Banco, os seguranças do banco perceberam que sua arma era de brinquedo e você foi preso.\n\n> Você ganhou: **+90** REP.',
					'{{author}}, você conseguiu roubar o banco, mas na perseguição você errou o caminho e foi parar na rua da Delegacia, onde te cercaram e você foi preso.\n\n> Você ganhou: **+90** REP.'
				];

				if (randomChance < 99) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgLose[Math.floor(Math.random() * msgLose.length)].replace('{{author}}', `${author}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + 90,
							'crime.feito': user.crime.feito + 1,
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.banco': true,
							'prisao.crime': true,
							'cooldown.crime': Date.now()
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
								'prisao.banco': false,
								'prisao.crime': false
							}
						});
					}, 14400000);
				} else if (randomChance >= 99) {
					const user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const embed = new ClientEmbed(author)
						.setTitle('Crime Cometido')
						.setDescription(msgSucess[Math.floor(Math.random() * msgSucess.length)].replace('{{author}}', `${author}`).replace('{{random}}', `${Utils.numberFormat(randomValor)}`));

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'crime.reputacao': user.crime.reputacao + (90 * 2),
							'crime.feito': user.crime.feito + 1,
							saldo: user.saldo + randomValor,
							'cooldown.crime': Date.now()
						}
					});
				}
			} else {
				return message.reply({
					content: 'Número não encontrado. Use o comando novamente!'
				});
			}
		}
	}

	async PUSH(crimes, members, guild) {
		for (const member of crimes) {
			const doc = await this.client.database.users.findOne({
				userId: member,
				guildId: guild.id
			});

			members.push({
				user: await this.client.users.fetch(member).then((user) => user),
				feito: doc.crime.feito
			});
		}
	}

};
