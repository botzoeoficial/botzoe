/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Apostar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'apostar';
		this.category = 'Economia';
		this.description = 'Aposte com um usuário!';
		this.usage = 'apostar <usuário> <saldo>';
		this.aliases = ['aposta'];

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
		let user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.apostaAberta) {
			return message.reply({
				content: 'Você chamou alguém para apostar recentemente... Espere o outro usuário aceitar/negar, para que você possa chamar ele novamente!'
			});
		}

		const timeoutApostar = 1200000;

		if (timeoutApostar - (Date.now() - user.cooldown.usarApostar) > 0) {
			const faltam = ms(timeoutApostar - (Date.now() - user.cooldown.usarApostar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está muito viciado em apostas, vai acabar falindo. Respire um pouco e se quiser aposte novamente em: \`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.id === author.id) {
			return message.reply({
				content: 'Você não pode apostar com você mesmo!'
			});
		}

		if (member.user === member.user.bot) {
			return message.reply({
				content: 'Você não pode apostar com um bot!'
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

		const btc = args[1];

		if (!btc) {
			return message.reply({
				content: 'Você precisa colocar uma quantia de saldo para apostar.'
			});
		}

		if (!parseInt(btc)) {
			return message.reply({
				content: 'Você precisa colocar uma quantia válida.'
			});
		}

		if (parseInt(btc) <= 0) {
			return message.reply({
				content: 'A quantia a ser adicionada precisa ser maior que **0**.'
			});
		}

		if (parseInt(btc) > 100000) {
			return message.reply({
				content: 'A quantia precisa ser abaixo de **R$100.000,00**'
			});
		}

		if (isNaN(btc)) {
			return message.reply({
				content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
			});
		}

		if (parseInt(btc) > user.banco) {
			return message.reply({
				content: 'Você não tem esse saldo todo no banco para ser apostado!'
			});
		}

		if (parseInt(btc) > user2.banco) {
			return message.reply({
				content: 'O usuário mencionado não tem esse tanto de saldo no banco para ser apostado!'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('🎰 | CONFIRMAÇÃO DE APOSTA')
			.setDescription(`${member}, o(a) usuário(a) ${author} te chamou para uma aposta de **R$${Utils.numberFormat(Number(btc))},00**!\n\nDeseja aceitar?`);

		const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
		const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
		const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

		message.reply({
			content: member.toString(),
			embeds: [embed],
			components: [botoes]
		}).then(async (msg) => {
			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					apostaAberta: true
				}
			});

			const filter = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === member.id;

			const collectorBotoes = msg.createMessageComponentCollector({
				filter,
				time: 60000,
				max: 1
			});

			collectorBotoes.on('collect', async (b) => {
				switch (b.customId) {
					case 'negar':
						await b.deferUpdate();

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								apostaAberta: false
							}
						});

						msg.delete();
						return message.reply({
							content: `O(a) usuário(a) ${member.toString()} recusou seu pedido de aposta! ||ARREGÃO!||`
						});
					case 'aceitar':
						await b.deferUpdate();

						user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								usarApostar: user.usarApostar += 1
							}
						});

						if (user.usarApostar === 4) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									usarApostar: 0,
									'cooldown.usarApostar': Date.now(),
									'cooldown.apostar': Date.now()
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								banco: user.banco -= Number(btc)
							}
						});

						user2 = await this.client.database.users.findOne({
							userId: member.id,
							guildId: message.guild.id
						});

						await this.client.database.users.findOneAndUpdate({
							userId: member.id,
							guildId: message.guild.id
						}, {
							$set: {
								banco: user2.banco -= Number(btc)
							}
						});

						const random = Math.floor(Math.random() * 100);

						if (random <= 50) {
							msg.delete();

							const embedMoeda = new ClientEmbed(author)
								.setTitle('🪙 | JOGO DA MOEDA')
								.addField('Se cair 😀:', `O usuário ${author.toString()} ganha!`)
								.addField('Se cair 👑:', `O usuário ${member.toString()} ganha!`)
								.addField('🏆 Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00** na carteira do vencedor!`);

							const embedWin = new ClientEmbed(author)
								.setAuthor({
									name: '🪙 | Jogando a moeda, e...'
								});

							const msgLoading = await message.reply({
								content: `${author} e ${member}`,
								embeds: [embedMoeda]
							});

							const arrayEmojis = ['😀', '👑'];

							const randomEmojis = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

							const embedWin2 = new ClientEmbed(author)
								.setTitle('🏆 | TEMOS UM VENCEDOR');

							if (randomEmojis === '😀') {
								embedWin2
									.setDescription(`**Joguei a moeda e caiu \`${randomEmojis}\`**`)
									.addField('Vencedor:', author.toString())
									.addField('Perdedor:', member.toString())
									.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

								user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										banco: user.banco += Number(btc * 2)
									}
								});
							} else if (randomEmojis === '👑') {
								embedWin2
									.setDescription(`**Joguei a moeda e caiu \`${randomEmojis}\`**`)
									.addField('Vencedor:', member.toString())
									.addField('Perdedor:', author.toString())
									.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

								user2 = await this.client.database.users.findOne({
									userId: member.id,
									guildId: message.guild.id
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$set: {
										banco: user2.banco += Number(btc * 2)
									}
								});
							}

							setTimeout(async () => {
								msgLoading.edit({
									content: `${author} e ${member}`,
									embeds: [embedWin]
								});
							}, 7000);

							setTimeout(async () => {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										apostaAberta: false
									}
								});

								msgLoading.edit({
									content: `${author} e ${member}`,
									embeds: [embedWin2]
								});
							}, 10000);
						} else if (random > 51) {
							msg.delete();

							const embedMoeda = new ClientEmbed(author)
								.setTitle('🎲 | JOGO DO DADO')
								.addField('Se cair número PAR:', `O usuário ${author.toString()} ganha!`)
								.addField('Se cair número ÍMPAR:', `O usuário ${member.toString()} ganha!`)
								.addField('🏆 Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00** na carteira do vencedor!`);

							const embedWin = new ClientEmbed(author)
								.setAuthor({
									name: '🎲 | Jogando o dado, e...'
								});

							const msgLoading = await message.reply({
								content: `${author} e ${member}`,
								embeds: [embedMoeda]
							});

							const arrayEmojis = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

							const randomEmojis = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

							const embedWin2 = new ClientEmbed(author)
								.setTitle('🏆 | TEMOS UM VENCEDOR');

							if (randomEmojis === 2 || randomEmojis === 4 || randomEmojis === 6 || randomEmojis === 8 || randomEmojis === 10 || randomEmojis === 12) {
								embedWin2
									.setDescription(`**Joguei o dado e caiu número \`${randomEmojis}\`** (**PAR**)`)
									.addField('Vencedor:', author.toString())
									.addField('Perdedor:', member.toString())
									.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

								user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										banco: user.banco += Number(btc * 2)
									}
								});
							} else if (randomEmojis === 3 || randomEmojis === 5 || randomEmojis === 7 || randomEmojis === 9 || randomEmojis === 11) {
								embedWin2
									.setDescription(`**Joguei o dado e caiu número \`${randomEmojis}\`** (**ÍMPAR**)`)
									.addField('Vencedor:', member.toString())
									.addField('Perdedor:', author.toString())
									.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

								user2 = await this.client.database.users.findOne({
									userId: member.id,
									guildId: message.guild.id
								});

								await this.client.database.users.findOneAndUpdate({
									userId: member.id,
									guildId: message.guild.id
								}, {
									$set: {
										banco: user2.banco += Number(btc * 2)
									}
								});
							}

							setTimeout(async () => {
								msgLoading.edit({
									content: `${author} e ${member}`,
									embeds: [embedWin]
								});
							}, 7000);

							setTimeout(async () => {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										apostaAberta: false
									}
								});

								msgLoading.edit({
									content: `${author} e ${member}`,
									embeds: [embedWin2]
								});
							}, 10000);
						}
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							apostaAberta: false
						}
					});

					return message.reply({
						content: `O(a) usuário(a) ${member.toString()} demorou demais para aceitar/negar a aposta. Use o comando novamente!`
					});
				}
			});
		});
	}

};
