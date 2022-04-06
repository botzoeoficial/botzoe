/* eslint-disable no-case-declarations */
/* eslint-disable max-depth */
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
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
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
			if (user.inventory.length > 0) {
				if (user.inventory.find((a) => a.item === 'Bolso')) {
					if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
						return message.reply({
							content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
						});
					}
				} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
					if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
						return message.reply({
							content: 'Seu **inventário** está cheio. Use algum item, para liberar espaço!'
						});
					}
				}
			}

			const timeout = 1200000;

			if (timeout - (Date.now() - user.cooldown.garimpar) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.garimpar));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.reply({
					content: author.toString(),
					embeds: [embed]
				});
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
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:aluminiumpaper:918835445780074507> | Alumínio: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:aluminiumpaper:918835445780074507>',
										id: '<:aluminiumpaper:918835445780074507>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					}
				} else if (randomEspecial === 'Borracha') {
					if (randomItens[0] === 'Ferro' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Ferro' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Caulim' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Plástico' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Cobre' && randomItens[1] === 'Prata') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia2}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Ferro') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:beam:918835445746532412> | Ferro: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:beam:918835445746532412>',
										id: '<:beam:918835445746532412>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Caulim') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:landslide:918835445700378684> | Caulim: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:landslide:918835445700378684>',
										id: '<:landslide:918835445700378684>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Plástico') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:plasticbag:918835445838774322> | Plástico: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:plasticbag:918835445838774322>',
										id: '<:plasticbag:918835445838774322>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					} else if (randomItens[0] === 'Prata' && randomItens[1] === 'Cobre') {
						const embed = new ClientEmbed(author)
							.setTitle('<:garimpar:957700475556339802> | Garimpo')
							.setDescription(`Você garimpou:\n\n<:eraser:918835444794400799> | Borracha: \`${randomQuantia}\`\n\n<:silver:918835445939458088> | Prata: \`${randomQuantia2}\`\n\n<:copperwire:918835446040133652> | Cobre: \`${randomQuantia3}\``);

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

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
										emoji: '<:eraser:918835444794400799>',
										id: '<:eraser:918835444794400799>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:silver:918835445939458088>',
										id: '<:silver:918835445939458088>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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
										emoji: '<:copperwire:918835446040133652>',
										id: '<:copperwire:918835446040133652>'.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
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

						return user.save();
					}
				}
			}
		}
	}

};
