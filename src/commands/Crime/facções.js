/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Facções extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'facções';
		this.category = 'Crime';
		this.description = 'Veja todas as Facções da cidade!';
		this.usage = 'facções';
		this.aliases = ['faccoes'];

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const eventosArray = server.faccoes.map((value, index) => ({
			nome: value.nome,
			criado: value.criado,
			membros: value.membros,
			level: value.level,
			money: value.money,
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
			.setTitle('🎭 | Facções do Servidor');

		eventosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Facção:** ${eu.nome}\n`);
		embed.setDescription(!server.faccoes.length ? 'Não há Facções no Servidor no momento.' : `Lista de Facções do Servidor **${message.guild.name}**\n\n${embedMessage}\nSelecione o Número da Facção para saber mais, ou digite \`0\` para sair.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			if (!server.faccoes.length) return;

			let page = 0;
			const filterSim = m => {
				return m.author.id === author.id && !isNaN(m.content);
			};

			const sim = msg.channel.createMessageCollector({
				filter: filterSim,
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();
					return message.reply({
						content: 'Seleção cancelada com sucesso!'
					});
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						message.reply({
							content: 'Número não encontrado. Por favor, envie o número novamente!'
						}).then((b) => setTimeout(() => b.delete(), 5000));
						ce.delete();
					} else {
						if (page > 1) {
							page = 1;
						} else {
							page += 1;
						}

						sim.stop();
						ce.delete();

						embed
							.setDescription(`**Você selecionou a Facção:** \`${findSelectedEvento.nome}\``)
							.addField('Nome:', findSelectedEvento.nome, true)
							.addField('Data de Criação:', findSelectedEvento.criado, true)
							.addField('\u2800', '\u2800', true)
							.addField('Qtde Membros:', findSelectedEvento.membros.length, true)
							.addField('Level:', findSelectedEvento.level, true)
							.addField('\u2800', '\u2800', true)
							.addField('Dinheiro em caixa:', `R$${Utils.numberFormat(findSelectedEvento.money)},00`)
							.addField('\u2800', '\u2800')
							.addField('Membros:', findSelectedEvento.membros.map((a) => `<@${a}>`).join('\n'));

						const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
						const botoes = new MessageActionRow().addComponents([buttonVoltar]);

						msg.edit({
							content: author.toString(),
							embeds: [embed],
							components: [botoes]
						}).then(async (msg3) => {
							const filter2 = (interaction) => interaction.isButton() && ['voltar'].includes(interaction.customId) && interaction.user.id === author.id;

							const collectorBotoes = msg3.createMessageComponentCollector({
								filter: filter2,
								time: 60000
							});

							collectorBotoes.on('collect', async (b) => {
								switch (b.customId) {
									case 'voltar':
										await b.deferUpdate();

										if (page < 0) {
											page = 0;
										} else {
											page -= 1;
										}

										const eventosArray2 = server.faccoes.map((value, index) => ({
											nome: value.nome,
											criado: value.criado,
											membros: value.membros,
											level: value.level,
											money: value.money,
											position: index
										}));

										let embedMessage2 = '';

										const embed2 = new ClientEmbed(author)
											.setTitle('🎭 | Facções do Servidor');

										eventosArray2.forEach((eu) => embedMessage2 += `${emojis[eu.position + 1]} **Facção:** ${eu.nome}\n`);
										embed2.setDescription(!server.faccoes.length ? 'Não há Facções no Servidor no momento.' : `Lista de Facções do Servidor **${message.guild.name}**\n\n${embedMessage}\nSelecione o Número da Facção para saber mais, ou digite \`0\` para sair.`);

										msg.edit({
											content: author.toString(),
											embeds: [embed2]
										}).then(async (msg4) => {
											const filterCollector3 = m => {
												return m.author.id === author.id && !isNaN(m.content);
											};

											const collector3 = msg4.channel.createMessageCollector({
												filter: filterCollector3,
												time: 300000
											});

											collector3.on('collect', async (ce3) => {
												if (Number(ce3.content) === 0) {
													msg4.delete();
													collector3.stop();
													return message.reply({
														content: 'Seleção cancelada com sucesso!'
													});
												} else {
													const selected2 = Number(ce3.content - 1);
													const findSelectedEvento2 = eventosArray2.find((xis) => xis.position === selected2);

													if (!findSelectedEvento2) {
														message.reply({
															content: 'Número não encontrado. Por favor, envie o número novamente!'
														}).then((b) => setTimeout(() => b.delete(), 5000));
														ce3.delete();
													} else {
														page += 1;
														collector3.stop();
														ce3.delete();

														embed2
															.setDescription(`**Você selecionou a Facção:** \`${findSelectedEvento2.nome}\``)
															.addField('Nome:', findSelectedEvento2.nome, true)
															.addField('Data de Criação:', findSelectedEvento2.criado, true)
															.addField('\u2800', '\u2800', true)
															.addField('Qtde Membros:', findSelectedEvento2.membros.length, true)
															.addField('Level:', findSelectedEvento2.level, true)
															.addField('\u2800', '\u2800', true)
															.addField('Dinheiro em caixa:', `R$${Utils.numberFormat(findSelectedEvento2.money)},00`)
															.addField('\u2800', '\u2800')
															.addField('Membros:', findSelectedEvento2.membros.map((a) => `<@${a}>`).join('\n'));

														msg.edit({
															content: author.toString(),
															embeds: [embed2]
														});
													}
												}
											});

											collector3.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector3.stop();

													msg.delete();
													return message.reply({
														content: 'Você demorou demais para escolher a Facção. Use o comando novamente!'
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
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					return msg.delete();
				}
			});
		});
	}

};
