/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Bancos extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'bancos';
		this.category = 'Vip';
		this.description = 'Veja a lista de usuários no banco!';
		this.usage = 'banks';
		this.aliases = ['banco'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = true;

		this.vip = true;
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

		if (!server.vip.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser \`VIP\` do servidor para usar esse comando!`
			});
		}

		const bancosArray = server.banco.map((value, index) => ({
			nick: value.nick,
			id: value.id,
			valor: value.valor,
			dia: value.dia,
			hora: value.hora,
			status: value.status,
			timestamps: value.timestamps,
			position: index
		}));

		let embedMessage2 = '';

		const embed = new ClientEmbed(author)
			.setTitle('🏦 | Bancos Disponíveis:')
			.setFooter({
				text: 'DIGITE A PALAVRA cancelar NO CHAT, PARA CANCELAR A ESCOLHA DO BANCO'
			});

		const datas = [...new Set(bancosArray.map(a => a.dia).sort())];

		datas.forEach((eu) => embedMessage2 += `**Data:** ${eu}\n`);
		embed.setDescription(!server.banco.length ? 'Não há usuários cadastrados no banco no momento.' : `🗓️ | De qual data você deseja visualizar os bancos?\n**OBS: Digite a data no chat!**\n\n${embedMessage2}`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			if (!server.banco.length) return;

			const filter = (m) => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content.toLowerCase() === 'cancelar') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Você cancelou a escolha do **banco** com sucesso!'
					});
				}

				const regexDay = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g);

				if (!regexDay.test(ce.content)) {
					message.reply({
						content: `Você precisa colocar a **data** do banco no formato certo. (\`dia\`/\`mês\`/\`ano\`)! Ex: \`21/09/2021\`.`
					}).then((a) => a.delete(), 6000);
					ce.delete();
				} else if (!server.banco.map(u => u.dia).includes(ce.content)) {
					message.reply({
						content: 'Essa data não está registrada. Por favor, digite a data novamente!'
					});
				} else {
					collector.stop();

					const usersData = await this.client.database.guilds.find({
						_id: message.guild.id
					});

					let embedMessage = '';

					embedMessage += `${usersData[0].banco.filter((u) => u.dia === ce.content).map((a, i) => `${i} **ID:** ${a.id} | **Hora:** ${a.hora} | **Valor:** R$${Utils.numberFormat(Number(a.valor))},00`).sort().join('\n')}`;

					embed.setDescription(`**USUÁRIOS DA DATA: ${ce.content}**\n\n${embedMessage}`);

					msg.edit({
						content: author.toString(),
						embeds: [embed]
					}).then((msg2) => {
						let page = 0;
						const filter2 = (m) => {
							return m.author.id === author.id && !isNaN(m.content);
						};

						const collector2 = msg2.channel.createMessageCollector({
							filter: filter2,
							time: 60000
						});

						collector2.on('collect', async (ce2) => {
							const datesMap = usersData[0].banco.filter((u) => u.dia === ce.content).map((a) => a).sort();

							const mapUsers = datesMap.map((value, index) => ({
								nick: value.nick,
								id: value.id,
								valor: value.valor,
								dia: value.dia,
								hora: value.hora,
								status: value.status,
								timestamps: value.timestamps,
								position: index
							})).sort();

							const selected = Number(ce2.content);
							const findSelectedEvento = mapUsers.find((xis) => xis.position === selected);

							if (!findSelectedEvento) {
								message.reply({
									content: 'Esse número não existe! Por favor, envie o número novamente.'
								}).then((a) => a.delete(), 6000);
								ce2.delete();
							} else {
								page += 1;
								collector2.stop();
								ce2.delete();

								embed
									.setTitle(`🏦 | Usuário: ${findSelectedEvento.nick}`)
									.setDescription(`Informações sobre o usuário <@${findSelectedEvento.id}>:`)
									.addField('👤 Nick:', findSelectedEvento.nick)
									.addField('🆔 ID:', findSelectedEvento.id)
									.addField('💵 Valor:', `R$${Utils.numberFormat(Number(findSelectedEvento.valor))},00`)
									.addField('🗓️ Dia:', findSelectedEvento.dia)
									.addField('⏰ Hora:', findSelectedEvento.hora)
									.addField('🔎 Status:', findSelectedEvento.status);

								const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
								const botoes = new MessageActionRow().addComponents([buttonVoltar]);

								msg.edit({
									content: author.toString(),
									embeds: [embed],
									components: [botoes]
								}).then(async (msg3) => {
									const filter3 = (interaction) => interaction.isButton() && ['voltar'].includes(interaction.customId) && interaction.user.id === author.id;

									const collectorBotoes = msg3.createMessageComponentCollector({
										filter: filter3,
										time: 60000
									});

									collectorBotoes.on('collect', async (b) => {
										if (b.customId === 'voltar') {
											await b.deferUpdate();

											if (page < 0) {
												page = 0;
											} else {
												page -= 1;
											}

											const usersData2 = await this.client.database.guilds.find({});

											let embedMessage3 = '';

											embedMessage3 += `${usersData2[0].banco.filter((u) => u.dia === ce.content).map((a, i) => `[${i}] **ID:** ${a.id} | **Hora:** ${a.hora} | **Valor:** R$${Utils.numberFormat(Number(a.valor))},00`).sort().join('\n')}`;

											embed.fields = [];
											embed.setDescription(`**USUÁRIOS DA DATA: ${ce.content}**\n\n${embedMessage3}`);

											msg.edit({
												content: author.toString(),
												embeds: [embed]
											}).then(async (msg4) => {
												const filter4 = (m) => {
													return m.author.id === author.id && !isNaN(m.content);
												};

												const collector3 = msg4.channel.createMessageCollector({
													filter: filter4,
													time: 60000
												});

												collector3.on('collect', async (ce3) => {
													const datesMap2 = usersData[0].banco.filter((u) => u.dia === ce.content).map((a) => a).sort();

													const mapUsers2 = datesMap2.map((value, index) => ({
														nick: value.nick,
														id: value.id,
														valor: value.valor,
														dia: value.dia,
														hora: value.hora,
														status: value.status,
														timestamps: value.timestamps,
														position: index
													})).sort();

													const selected2 = Number(ce3.content);
													const findSelectedEvento2 = mapUsers2.find((xis) => xis.position === selected2);

													if (!findSelectedEvento2) {
														message.reply({
															content: 'Esse número não existe. Por favor, envie o número novamente!'
														}).then((a) => a.delete(), 6000);
														ce3.delete();
													} else {
														ce3.delete();
														collector3.stop();

														embed
															.setTitle(`🏦 | Usuário: ${findSelectedEvento2.nick}`)
															.setDescription(`Informações sobre o usuário <@${findSelectedEvento2.id}>:`)
															.addField('👤 Nick:', findSelectedEvento2.nick)
															.addField('🆔 ID:', findSelectedEvento2.id)
															.addField('💵 Valor:', `R$${Utils.numberFormat(Number(findSelectedEvento2.valor))},00`)
															.addField('🗓️ Dia:', findSelectedEvento2.dia)
															.addField('⏰ Hora:', findSelectedEvento2.hora)
															.addField('🔎 Status:', findSelectedEvento2.status);

														msg.edit({
															content: author.toString(),
															embeds: [embed]
														});
													}
												});

												collector3.on('end', async (collected, reason) => {
													if (reason === 'time') {
														collector3.stop();

														return message.reply({
															content: `Você demorou demais para escolher o usuário. Use o comando novamente!`
														});
													}
												});
											});
										}
									});

									collectorBotoes.on('end', async (collected, reason) => {
										if (reason === 'time') {
											return msg.delete();
										}
									});
								});
							}
						});

						collector2.on('end', async (collected, reason) => {
							if (reason === 'time') {
								collector2.stop();

								return message.reply({
									content: `Você demorou demais para escolher o usuário. Use o comando novamente!`
								});
							}
						});
					});
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();

					msg.delete();
					return message.reply({
						content: `Você demorou demais para enviar a data. Use o comando novamente!`
					});
				}
			});
		});
	}

};
