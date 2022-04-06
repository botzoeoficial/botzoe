/* eslint-disable arrow-body-style */
/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Gf extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'gf';
		this.category = 'Social';
		this.description = 'Faça um filho!';
		this.usage = 'gf';
		this.aliases = ['gozofone'];

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

		const casado = await this.client.database.users.findOne({
			userId: user.marry.user,
			guildId: message.guild.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) {
			return message.reply({
				content: `Você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`
			});
		}

		if (!user.marry.has) {
			return message.reply({
				content: `Você não está casado! Use o comando \`${prefix}casar\`.`
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

		if (casado.prisao.isPreso) {
			return message.reply({
				content: `Seu(a) parceiro(a) está **preso(a)**. Use o comando \`${prefix}visitaintima\` para fazer **GF** na cadeia!`
			});
		}

		const timeout = 7200000;

		if (timeout - (Date.now() - user.cooldown.gf) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.gf));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			const embedConfirm = new ClientEmbed(author)
				.setTitle('😈 | GOZOFONE')
				.setDescription(`<@${user.marry.user}>, você aceita fazer **GF** comigo?`);

			const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
			const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

			message.reply({
				content: `<@${user.marry.user}>`,
				embeds: [embedConfirm],
				components: [botoes]
			}).then(async (confirm) => {
				const filterCollector = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === user.marry.user;

				const collectorBotoes = confirm.createMessageComponentCollector({
					filter: filterCollector,
					time: 30000,
					max: 1
				});

				collectorBotoes.on('collect', async (b) => {
					if (b.customId === 'aceitar') {
						await b.deferUpdate();
						confirm.delete();

						const user2 = await this.client.database.users.findOne({
							userId: user.marry.user,
							guildId: message.guild.id
						});

						const random = Math.floor(Math.random() * 100);

						if (random < 50) {
							const embed = new ClientEmbed(author)
								.setTitle('😈 | GOZOFONE')
								.setDescription(`😈 | Você fez gozofone com <@${user.marry.user}> e conseguiram ter um filho **homem**! Você tem 30 segundos para digitar no chat o nome dele, ou ele será enviado para adoção. Qual nome você deseja colocar:`);

							message.reply({
								content: `${author.toString()} e <@${user.marry.user}>`,
								embeds: [embed]
							}).then((msg) => {
								const filter = (m) => {
									return m.author.id === author.id || m.author.id === user.marry.user;
								};

								const collector = msg.channel.createMessageCollector({
									filter,
									time: 30000
								});

								collector.on('collect', async (msg2) => {
									if (parseInt(msg2.content)) {
										message.reply({
											content: 'O nome do seu filho não pode ser um número. Digite o nome novamente!'
										});
									} else if (user.familia.map((a) => a.nome).includes(msg2.content) || user2.familia.map((a) => a.nome).includes(msg2.content)) {
										message.reply({
											content: 'Você já tem um filho com esse nome. Digite o nome novamente!'
										});
									} else {
										collector.stop();
										msg.delete();
										message.reply({
											content: `${author.toString()}, seu filho **${msg2.content}** nasceu! Você e <@${user.marry.user}> podem usar agora \`${prefix}familia\`!`
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												familia: {
													nome: msg2.content,
													idade: 1,
													genero: 'Masculino'
												}
											},
											$set: {
												'cooldown.gf': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: user.marry.user,
											guildId: message.guild.id
										}, {
											$push: {
												familia: {
													nome: msg2.content,
													idade: 1,
													genero: 'Masculino'
												}
											}
										});

										return;
									}
								});

								collector.on('end', (collected, reason) => {
									if (reason === 'time') {
										msg.delete();
										collector.stop();
										message.reply({
											content: `${author.toString()} e <@${user.marry.user}>, vocês demoraram demais para dar nome ao filho de vocês, e por isso ele foi para adoção!`
										});
										return;
									}
								});
							});
						} else {
							const embed = new ClientEmbed(author)
								.setTitle('😈 | GOZOFONE')
								.setDescription(`😈 | Você fez gozofone com <@${user.marry.user}> e conseguiram ter uma filha **mulher**! Você tem 30 segundos para digitar no chat o nome dela, ou ela será enviada para adoção. Qual nome você deseja colocar:`);

							message.reply({
								content: `${author.toString()} e <@${user.marry.user}>`,
								embeds: [embed]
							}).then((msg) => {
								const filter = (m) => {
									return m.author.id === author.id || m.author.id === user.marry.user;
								};

								const collector = msg.channel.createMessageCollector({
									filter,
									time: 30000
								});

								collector.on('collect', async (msg2) => {
									if (parseInt(msg2.content)) {
										message.reply({
											content: 'O nome da sua filha não pode ser um número. Digite o nome novamente!'
										});
									} else if (user.familia.map((a) => a.nome).includes(msg2.content) || user2.familia.map((a) => a.nome).includes(msg2.content)) {
										message.reply({
											content: 'Você já tem uma filha com esse nome. Digite o nome novamente!'
										});
									} else {
										collector.stop();
										msg.delete();
										message.reply({
											content: `${author.toString()}, sua filha **${msg2.content}** nasceu! Você e <@${user.marry.user}> podem usar agora \`${prefix}familia\`!`
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												familia: {
													nome: msg2.content,
													idade: 1,
													genero: 'Feminino'
												}
											},
											$set: {
												'cooldown.gf': Date.now()
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: user.marry.user,
											guildId: message.guild.id
										}, {
											$push: {
												familia: {
													nome: msg2.content,
													idade: 1,
													genero: 'Feminino'
												}
											}
										});

										return;
									}
								});

								collector.on('end', (collected, reason) => {
									if (reason === 'time') {
										msg.delete();
										collector.stop();
										message.reply({
											content: `${author.toString()} e <@${user.marry.user}>, vocês demoraram demais para dar nome ao filho de vocês, e por isso ela foi para adoção!`
										});
										return;
									}
								});
							});
						}
					} else if (b.customId === 'negar') {
						await b.deferUpdate();

						confirm.delete();
						message.reply({
							content: `O(a) usuário(a) <@${user.marry.user}> recusou seu pedido de GF!`
						});
						return;
					}
				});

				collectorBotoes.on('end', async (collected, reason) => {
					if (reason === 'time') {
						confirm.delete();
						return message.reply({
							content: `${author.toString()}, o(a) usuário(a) <@${user.marry.user}> demorou demais para aceitar seu gf!`
						});
					}
				});
			});
		}
	}

};
