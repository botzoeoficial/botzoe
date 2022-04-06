/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Atirar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'atirar';
		this.category = 'Crime';
		this.description = 'Atire em um usuário!';
		this.usage = 'atirar <usuário>';
		this.aliases = ['disparar'];

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
		args,
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const timeout = 86400000;

		if (timeout - (Date.now() - user.cooldown.atirar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.atirar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você ainda está cansado da última vez! Você pode tentar novamente em: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		}

		if (user.armaEquipada === 'Nenhuma arma equipada.') {
			return message.reply({
				content: 'Você precisa ter uma **arma** equipada antes de atirar em alguém.'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário para atirar.'
			});
		}

		if (member.id === author.id) {
			return message.reply({
				content: 'Não faça isso... Não queremos ter relatos de suicídio aqui no servidor, né?'
			});
		}

		const user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		const serverMemberHospital = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (serverMemberHospital.hospital.find((a) => a.usuario === member.id)) {
			return message.reply({
				content: 'Não dá para atirar nesse usuário, pois ele está no Hospital.'
			});
		}

		const sairHospital = 7200000;

		if (sairHospital - (Date.now() - user2.hp.saiu) > 0) {
			const faltam = ms(sairHospital - (Date.now() - user2.hp.saiu));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Esse usuário saiu recentemente do **Hospital**, espere: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		}

		const random = Math.floor(Math.random() * 100);
		// console.log(random);

		if (random >= 31) {
			const embed = new ClientEmbed(author)
				.setTitle('TENTATIVA DE ASSASSINATO')
				.setDescription(`🔫 | Você atirou e **NÃO CONSEGUIU** ferir o usuário ${member.toString()}.`);

			const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonPrisao]);

			message.reply({
				content: `${author.toString()} ${member.toString()}`,
				embeds: [embed],
				components: [botoes]
			}).then(async (msg) => {
				const server = await this.client.database.guilds.findOne({
					_id: message.guild.id
				});

				const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

				const collectorBotoes = msg.createMessageComponentCollector({
					filter,
					time: 5000
				});

				collectorBotoes.on('collect', async (b) => {
					if (b.customId === 'prender') {
						await b.deferUpdate();

						const userPolicia = await this.client.database.users.findOne({
							userId: b.user.id,
							guildId: message.guild.id
						});

						if (10800000 - (Date.now() - userPolicia.policia.prenderAtirar) > 0) {
							const faltam = ms(10800000 - (Date.now() - userPolicia.policia.prenderAtirar));

							const embedPolice = new ClientEmbed(author)
								.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

							msg.reply({
								content: `<@${b.user.id}>`,
								embeds: [embedPolice]
							});
						} else {
							const user3 = await this.client.database.users.findOne({
								userId: member.id,
								guildId: message.guild.id
							});

							if (!user3.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
								embed
									.setTitle('🛑 | Detido')
									.setDescription(`👮 | ${author.toString()} foi preso por <@${b.user.id}>, em flagrante tentando **Assassinar** ${member.toString()}.\n\nAgora ele passará um bom tempo na prisão.`);

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										'prisao.isPreso': true,
										'prisao.tempo': Date.now(),
										'prisao.atirarPrisao': true,
										'cooldown.atirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: b.user.id,
									guildId: message.guild.id
								}, {
									$set: {
										'policia.prenderAtirar': Date.now()
									}
								});

								collectorBotoes.stop();

								return message.reply({
									content: `${author.toString()} ${member.toString()} <@${b.user.id}>`,
									embeds: [embed]
								});
							} else if (user3.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
								embed
									.setTitle('🛑 | Detido')
									.setDescription(`👮 | ${author.toString()} foi preso por <@${b.user.id}>, em flagrante tentando **Assassinar** ${member.toString()}.\n\nAgora ele passará um bom tempo na prisão.`);

								await this.client.database.users.findOneAndUpdate({
									userId: b.user.id,
									guildId: message.guild.id
								}, {
									$set: {
										'policia.prenderAtirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$pull: {
										inventory: {
											item: 'Colete à Prova de Balas'
										}
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										'prisao.isPreso': true,
										'prisao.tempo': Date.now(),
										'prisao.atirarPrisao': true,
										'cooldown.atirar': Date.now()
									}
								});

								collectorBotoes.stop();

								return message.reply({
									content: `${author.toString()} ${member.toString()} <@${b.user.id}>`,
									embeds: [embed]
								});
							}
						}
					}
				});

				collectorBotoes.on('end', async (collected, reason) => {
					if (reason === 'time') {
						const user4 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						if (!user4.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
							embed
								.setTitle('🙏 | Milagre')
								.setDescription(`🙏 | ${member.toString()} foi atingido por ${author.toString()}, felizmente o tiro passou de raspão e a vítima passa bem.\n\nO **Assassino** conseguiu fugir.`);

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.atirar': Date.now()
								}
							});

							return message.reply({
								content: `${author.toString()} ${member.toString()}`,
								embeds: [embed]
							});
						} else if (user4.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
							embed
								.setTitle('🙏 | Graças Ao Colete')
								.setDescription(`🙏 | ${member.toString()} foi atingido por ${author.toString()}, graças ao seu **Colete À Prova de Balas**, a vítima passa bem.\n\nO **Assassino** conseguiu fugir.`);

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.atirar': Date.now()
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$pull: {
									inventory: {
										item: 'Colete à Prova de Balas'
									}
								}
							});

							return message.reply({
								content: `${author.toString()} ${member.toString()}`,
								embeds: [embed]
							});
						}
					}
				});
			});
		} else if (random <= 30) {
			const embed = new ClientEmbed(author)
				.setTitle('TENTATIVA DE ASSASSINATO')
				.setDescription(`🔫 | Você atirou e **CONSEGUIU** ferir o usuário ${member.toString()}.`);

			const buttonPrisao = new MessageButton().setCustomId('prender').setEmoji('👮').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonPrisao]);

			message.reply({
				content: `${author.toString()} ${member.toString()}`,
				embeds: [embed],
				components: [botoes]
			}).then(async (msg) => {
				const server = await this.client.database.guilds.findOne({
					_id: message.guild.id
				});

				const filter = (interaction) => interaction.isButton() && ['prender'].includes(interaction.customId) && (server.cidade.policiais.map(a => a.id).includes(interaction.user.id) || server.cidade.delegado === interaction.user.id);

				const collectorBotoes = msg.createMessageComponentCollector({
					filter,
					time: 5000
				});

				collectorBotoes.on('collect', async (b) => {
					if (b.customId === 'prender') {
						await b.deferUpdate();

						const userPolicia = await this.client.database.users.findOne({
							userId: b.user.id,
							guildId: message.guild.id
						});

						if (10800000 - (Date.now() - userPolicia.policia.prenderAtirar) > 0) {
							const faltam = ms(10800000 - (Date.now() - userPolicia.policia.prenderAtirar));

							const embedPolice = new ClientEmbed(author)
								.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

							msg.reply({
								content: `<@${b.user.id}>`,
								embeds: [embedPolice]
							});
						} else {
							const user3 = await this.client.database.users.findOne({
								userId: member.id,
								guildId: message.guild.id
							});

							if (!user3.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
								embed
									.setTitle('🛑 | Detido')
									.setDescription(`👮 | ${author.toString()} foi preso por <@${b.user.id}>, em flagrante tentando **Assassinar** ${member.toString()}.\n\nAgora ele passará um bom tempo na prisão.`);

								const embedHospital = new ClientEmbed(author)
									.setTitle('🚑 | Vítima Resgatada')
									.setDescription(`🏥 | ${member.toString()} foi baleado por ${author}, felizmente o tiro não atingiu nenhum órgão vital e a vítima foi resgatada com vida e levada até o **Hospital ${message.guild.name}**.`);

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										'prisao.isPreso': true,
										'prisao.tempo': Date.now(),
										'prisao.atirarPrisao': true,
										'cooldown.atirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: b.user.id,
									guildId: message.guild.id
								}, {
									$set: {
										'policia.prenderAtirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$set: {
										'hp.vida': 0
									}
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$push: {
										hospital: {
											usuario: member.id,
											entrada: Date.now()
										}
									}
								});

								collectorBotoes.stop();

								return message.reply({
									content: `${author.toString()} ${member.toString()} <@${b.user.id}>`,
									embeds: [embed, embedHospital]
								});
							} else if (user3.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
								embed
									.setTitle('🛑 | Detido')
									.setDescription(`👮 | ${author.toString()} foi preso por <@${b.user.id}>, em flagrante tentando **Assassinar** ${member.toString()}.\n\nAgora ele passará um bom tempo na prisão.`);

								const embedHospital = new ClientEmbed(author)
									.setTitle('🚑 | Vítima Resgatada')
									.setDescription(`🏥 | ${member.toString()} foi baleado por ${author}, felizmente o tiro não atingiu nenhum órgão vital e a vítima foi resgatada com vida e levada até o **Hospital ${message.guild.name}**.`);

								await this.client.database.users.findOneAndUpdate({
									userId: b.user.id,
									guildId: message.guild.id
								}, {
									$set: {
										'policia.prenderAtirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$pull: {
										inventory: {
											item: 'Colete à Prova de Balas'
										}
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										'prisao.isPreso': true,
										'prisao.tempo': Date.now(),
										'prisao.atirarPrisao': true,
										'cooldown.atirar': Date.now()
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$set: {
										'hp.vida': 0
									}
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$push: {
										hospital: {
											usuario: member.id,
											entrada: Date.now()
										}
									}
								});

								collectorBotoes.stop();

								return message.reply({
									content: `${author.toString()} ${member.toString()} <@${b.user.id}>`,
									embeds: [embed, embedHospital]
								});
							}
						}
					}
				});

				collectorBotoes.on('end', async (collected, reason) => {
					if (reason === 'time') {
						const user4 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						if (!user4.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
							embed
								.setTitle('🚑 | Vítima Resgatada')
								.setDescription(`🏥 | ${member.toString()} foi baleado por ${author}, felizmente o tiro não atingiu nenhum órgão vital e a vítima foi resgatada com vida e levada até o **Hospital ${message.guild.name}**.\n\nO **Assassino** conseguiu fugir.`);

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.atirar': Date.now()
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$set: {
									'hp.vida': 0
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$push: {
									hospital: {
										usuario: member.id,
										entrada: Date.now()
									}
								}
							});

							return message.reply({
								content: `${author.toString()} ${member.toString()}`,
								embeds: [embed]
							});
						} else if (user4.inventory.find((a) => a.item === 'Colete à Prova de Balas')) {
							embed
								.setTitle('🚑 | Vítima Resgatada')
								.setDescription(`🏥 | ${member.toString()} foi baleado por ${author}, felizmente o tiro não atingiu nenhum órgão vital e a vítima foi resgatada com vida e levada até o **Hospital ${message.guild.name}**.\n\nO **Assassino** conseguiu fugir.`);

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.atirar': Date.now()
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$pull: {
									inventory: {
										item: 'Colete à Prova de Balas'
									}
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$set: {
									'hp.vida': 0
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$push: {
									hospital: {
										usuario: member.id,
										entrada: Date.now()
									}
								}
							});

							return message.reply({
								content: `${author.toString()} ${member.toString()}`,
								embeds: [embed]
							});
						}
					}
				});
			});
		}
	}

};
