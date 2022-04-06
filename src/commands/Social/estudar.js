/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Estudar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'estudar';
		this.category = 'Social';
		this.description = 'Estude e ganhe xp!';
		this.usage = 'estudar <materia>';
		this.aliases = [];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) {
			return message.reply({
				content: `Você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`
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
		} else {
			const timeout = 3600000;

			if (timeout - (Date.now() - user.cooldown.estudar) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.estudar));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.reply({
					content: author.toString(),
					embeds: [embed]
				});
			} else if (!args.slice(0).join(' ')) {
				return message.reply({
					content: 'Você precisa colocar alguma matéria para estudar!\nAs matérias disponíveis para estudos são: **Matemática**, **Português**, **Química**, **Física**, **Biologia**, **História** e **Geografia**.'
				});
			} else if (args[0].toLowerCase() === 'matemática' || args[0].toLowerCase() === 'matematica') {
				const timeout2 = 3600000;

				if (timeout2 - (Date.now() - user.estudos.matematica) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.matematica));

					const embed = new ClientEmbed(author)
						.setDescription(`📐 | Para estudar Matemática, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 30,
							'humores.sede': user.humores.sede - 20,
							'humores.estressado': user.humores.estressado - 10,
							'humores.cansado': user.humores.cansado - 20,
							'cooldown.estudar': Date.now(),
							'estudos.matematica': Date.now(),
							xp: user.xp += 100
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('📐 | MATEMÁTICA')
						.setDescription(`📚 | Você estudou \`Matemática\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+100\`\n🍽️ Fome: \`-30\`\n🥤 Sede: \`-20\`\n🤯 Estressado: \`-10\`\n😰 Cansado: \`-20\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'português' || args[0].toLowerCase() === 'portugues') {
				const timeout2 = 3600000;

				if (timeout2 - (Date.now() - user.estudos.portugues) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.portugues));

					const embed = new ClientEmbed(author)
						.setDescription(`🔤 | Para estudar Português, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 30,
							'humores.sede': user.humores.sede - 20,
							'humores.estressado': user.humores.estressado - 10,
							'humores.cansado': user.humores.cansado - 20,
							'cooldown.estudar': Date.now(),
							'estudos.portugues': Date.now(),
							xp: user.xp += 100
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🔤 | PORTUGUÊS')
						.setDescription(`📚 | Você estudou \`Português\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+100\`\n🍽️ Fome: \`-30\`\n🥤 Sede: \`-20\`\n🤯 Estressado: \`-10\`\n😰 Cansado: \`-20\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'química' || args[0].toLowerCase() === 'quimica') {
				const timeout2 = 7200000;

				if (timeout2 - (Date.now() - user.estudos.quimica) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.quimica));

					const embed = new ClientEmbed(author)
						.setDescription(`🧑‍🔬 | Para estudar Química, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 20,
							'humores.sede': user.humores.sede - 30,
							'humores.estressado': user.humores.estressado - 20,
							'humores.cansado': user.humores.cansado - 30,
							'cooldown.estudar': Date.now(),
							'estudos.quimica': Date.now(),
							xp: user.xp += 250
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🧑‍🔬 | QUÍMICA')
						.setDescription(`📚 | Você estudou \`Química\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+250\`\n🍽️ Fome: \`-20\`\n🥤 Sede: \`-30\`\n🤯 Estressado: \`-20\`\n😰 Cansado: \`-30\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'física' || args[0].toLowerCase() === 'fisica') {
				const timeout2 = 14400000;

				if (timeout2 - (Date.now() - user.estudos.fisica) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.fisica));

					const embed = new ClientEmbed(author)
						.setDescription(`🌌 | Para estudar Física, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 40,
							'humores.sede': user.humores.sede - 20,
							'humores.estressado': user.humores.estressado - 30,
							'humores.cansado': user.humores.cansado - 30,
							'cooldown.estudar': Date.now(),
							'estudos.fisica': Date.now(),
							xp: user.xp += 350
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🌌 | FÍSICA')
						.setDescription(`📚 | Você estudou \`Física\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+350\`\n🍽️ Fome: \`-40\`\n🥤 Sede: \`-20\`\n🤯 Estressado: \`-30\`\n😰 Cansado: \`-30\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'biologia') {
				const timeout2 = 10800000;

				if (timeout2 - (Date.now() - user.estudos.biologia) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.biologia));

					const embed = new ClientEmbed(author)
						.setDescription(`🐸 | Para estudar Biologia, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 30,
							'humores.sede': user.humores.sede - 40,
							'humores.estressado': user.humores.estressado - 25,
							'humores.cansado': user.humores.cansado - 20,
							'cooldown.estudar': Date.now(),
							'estudos.biologia': Date.now(),
							xp: user.xp += 500
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🐸 | BIOLOGIA')
						.setDescription(`📚 | Você estudou \`Biologia\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+500\`\n🍽️ Fome: \`-30\`\n🥤 Sede: \`-40\`\n🤯 Estressado: \`-25\`\n😰 Cansado: \`-20\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'história' || args[0].toLowerCase() === 'historia') {
				const timeout2 = 14400000;

				if (timeout2 - (Date.now() - user.estudos.historia) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.historia));

					const embed = new ClientEmbed(author)
						.setDescription(`🦖 | Para estudar História, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 45,
							'humores.sede': user.humores.sede - 50,
							'humores.estressado': user.humores.estressado - 30,
							'humores.cansado': user.humores.cansado - 20,
							'cooldown.estudar': Date.now(),
							'estudos.historia': Date.now(),
							xp: user.xp += 600
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🦖 | HISTÓRIA')
						.setDescription(`📚 | Você estudou \`História\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+600\`\n🍽️ Fome: \`-45\`\n🥤 Sede: \`-50\`\n🤯 Estressado: \`-30\`\n😰 Cansado: \`-40\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else if (args[0].toLowerCase() === 'geografia') {
				const timeout2 = 7200000;

				if (timeout2 - (Date.now() - user.estudos.geografia) > 0) {
					const faltam = ms(timeout2 - (Date.now() - user.estudos.geografia));

					const embed = new ClientEmbed(author)
						.setDescription(`🌱 | Para estudar Geografia, você precisa esperar: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

					return message.reply({
						content: author.toString(),
						embeds: [embed]
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.fome': user.humores.fome - 40,
							'humores.sede': user.humores.sede - 10,
							'humores.estressado': user.humores.estressado - 10,
							'humores.cansado': user.humores.cansado - 20,
							'cooldown.estudar': Date.now(),
							'estudos.geografia': Date.now(),
							xp: user.xp += 300
						}
					});

					await user.save();

					const xpToUp = (user.level + 1) * 6000;

					if (user.xp >= xpToUp) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								level: user.level += 1
							}
						});
					}

					const embed = new ClientEmbed(author)
						.setTitle('🌱 | GEOGRAFIA')
						.setDescription(`📚 | Você estudou \`Geografia\` e aconteceu as seguintes coisas:\n\n🆙 XP: \`+300\`\n🍽️ Fome: \`-40\`\n🥤 Sede: \`-10\`\n🤯 Estressado: \`-10\`\n😰 Cansado: \`-20\``);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					return;
				}
			} else {
				return message.reply({
					content: 'As matérias disponíveis para estudos são: **Matemática**, **Português**, **Química**, **Física**, **Biologia**, **História** e **Geografia**.'
				});
			}
		}
	}

};
