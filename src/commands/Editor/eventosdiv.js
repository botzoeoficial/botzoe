/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Eventosdiv extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'eventosdiv';
		this.category = 'Editor';
		this.description = 'Inicie um evento da lista!';
		this.usage = 'eventosdiv';
		this.aliases = ['evento-div'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		const eventosArray = server.eventos.map((value, index) => ({
			nome: value.nome,
			tag: value.tag,
			date: value.date,
			hour: value.hour,
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
			.setTitle('🎉 | Eventos Disponíveis:');

		eventosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Evento:** ${eu.nome} | **Data:** ${eu.date} | **Hora:** ${eu.hour} | **Tag:** <@&${eu.tag}>\n`);
		embed.setDescription(!server.eventos.length ? 'Não há eventos cadastrados no momento.' : `**DIGITE A POSIÇÃO DO EVENTO NO CHAT PARA ANUNCIAR ELE!**\n\n${embedMessage}`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			if (!server.eventos.length) return;

			const filter = m => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 10000
			});

			collector.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply({
						content: 'Este número não existe! Por favor, envie o número do evento novamente.'
					}).then((a) => a.delete(), 6000);
					ce.delete();
				} else {
					collector.stop();

					embed
						.setTitle(`🎉 | Evento **${ce.content}** Escolhido`)
						.setDescription(`Muito bem ${author}, você escolheu o evento de número: **${ce.content}**.\n\nAgora envie no chat o **CANAL** onde será enviado esse evento!`)
						.addField('Nome:', findSelectedEvento.nome, true)
						.addField('Data:', findSelectedEvento.date, true)
						.addField('Hora:', findSelectedEvento.hour, true)
						.addField('Tag:', `<@&${findSelectedEvento.tag}>`, true);

					ce.delete();
					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then((msg1) => {
						const filter2 = m => {
							return m.author.id === author.id;
						};

						const collector2 = msg1.channel.createMessageCollector({
							filter: filter2,
							time: 600000
						});

						collector2.on('collect', async (ce2) => {
							const canal = ce2.mentions.channels.first() || message.guild.channels.cache.get(ce2.content);

							if (!canal) {
								message.reply({
									content: 'Você precisa mencionar um canal! Por favor, envie o canal novamente.'
								}).then((a) => a.delete(), 6000);
								ce2.delete();
							} else {
								collector2.stop();

								embed
									.setDescription(`Muito bem ${author}, você escolheu o evento de número: **${ce.content}**.\n\nAgora envie no chat a **MENSAGEM** desse evento!`)
									.addField('Canal:', canal, true);

								ce2.delete();
								msg1.edit({
									content: author.toString(),
									embeds: [embed]
								}).then((msg2) => {
									const filter3 = m => {
										return m.author.id === author.id;
									};

									const collector3 = msg2.channel.createMessageCollector({
										filter: filter3,
										time: 600000
									});

									collector3.on('collect', async (ce3) => {
										if (ce3.content.length > 4096) {
											return message.reply({
												content: 'A descrição do evento só pode ter no máximo **4096** letras.'
											});
										}

										embed
											.setDescription(`Muito bem ${author}, você escolheu o evento de número: **${ce.content}**.\nVeja as **informações** do evento abaixo:`);

										ce3.delete();
										collector3.stop();
										msg2.edit({
											content: author.toString(),
											embeds: [embed]
										});

										const embed2 = new ClientEmbed(author)
											.setTitle('🎉 | Evento')
											.setThumbnail(message.guild.iconURL({
												dynamic: true,
												format: 'png'
											}))
											.setDescription(ce3.content);

										msg2.delete();
										const ok = await message.reply({
											content: `Enviando o evento no canal ${canal} em \`5s\``
										});

										setTimeout(() => {
											ok.delete();
											canal.send({
												embeds: [embed2]
											}).then((as) => {
												as.react('🎟️');

												const filter5 = (reactionFilter, userFilter) => {
													return reactionFilter.emoji.name === '🎟️' && userFilter.id !== this.client.user.id;
												};

												const sim = as.createReactionCollector({
													filter: filter5
												});

												sim.on('collect', async (reaction, user) => {
													if (message.guild.id === '830972296176992296') {
														const member = message.guild.members.cache.get(user.id);

														await member.roles.add('880884384884981790');
													}
												});
											});

											return message.reply({
												content: `Evento enviado no canal ${canal} com sucesso.`
											});
										}, 5000);
									});

									collector3.on('end', (collected, reason) => {
										if (reason === 'time') {
											collector3.stop();
											msg.delete();
											return message.reply({
												content: 'Você demorou demais para escolher a mensagem. Use o comando novamente!'
											});
										}
									});
								});
							}
						});

						collector2.on('end', (collected, reason) => {
							if (reason === 'time') {
								collector2.stop();
								msg.delete();
								return message.reply({
									content: 'Você demorou demais para escolher o canal. Use o comando novamente!'
								});
							}
						});
					});
				}
			});

			collector.on('end', (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Você demorou demais para escolher o evento. Use o comando novamente!'
					});
				}
			});
		});
	}

};
