/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
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

		const emojis = {
			0: '0️⃣',
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '1️⃣0️⃣',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🎭 | Facções do Servidor');

		eventosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Facção:** ${eu.nome}\n`);
		embed.setDescription(!server.faccoes.length ? 'Não há Facções no Servidor no momento.' : `Lista de Facções do Servidor **${message.guild.name}**\n\n${embedMessage}\nSelecione o Número da Facção para saber mais, ou digite \`0\` para sair.`);

		message.channel.send(author, embed).then((msg) => {
			if (!server.faccoes.length) return;

			let page = 0;
			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();
					return message.reply(`seleção cancelada com sucesso!`);
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
							timeout: 5000
						}));
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

						msg.edit(author, embed).then(async (msg3) => {
							await msg3.react('⬅️');

							const sim2 = msg3.createReactionCollector((re, ue) => re.emoji.name === '⬅️' && ue.id === author.id, {
								time: 60000
							});

							sim2.on('collect', async () => {
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

								const emojis2 = {
									0: '0️⃣',
									1: '1️⃣',
									2: '2️⃣',
									3: '3️⃣',
									4: '4️⃣',
									5: '5️⃣',
									6: '6️⃣',
									7: '7️⃣',
									8: '8️⃣',
									9: '9️⃣',
									10: '1️⃣0️⃣',
									11: '1️⃣1️⃣',
									12: '1️⃣2️⃣',
									13: '1️⃣3️⃣',
									14: '1️⃣4️⃣',
									15: '1️⃣5️⃣',
									16: '1️⃣6️⃣',
									17: '1️⃣7️⃣',
									18: '1️⃣8️⃣',
									19: '1️⃣9️⃣',
									20: '2️⃣0️⃣'
								};

								let embedMessage2 = '';

								const embed2 = new ClientEmbed(author)
									.setTitle('🎭 | Facções do Servidor');

								eventosArray2.forEach((eu) => embedMessage2 += `[${emojis2[eu.position + 1]}] **Facção:** ${eu.nome}\n`);
								embed2.setDescription(!server.faccoes.length ? 'Não há Facções no Servidor no momento.' : `Lista de Facções do Servidor **${message.guild.name}**\n\n${embedMessage}\nSelecione o Número da Facção para saber mais, ou digite \`0\` para sair.`);

								msg.edit(author, embed2).then(async (msg4) => {
									const collector3 = msg4.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
										time: 300000
									});

									collector3.on('collect', async (ce3) => {
										if (Number(ce3.content) === 0) {
											msg4.delete();
											collector3.stop();
											return message.channel.send(`${author}, seleção cancelada com sucesso!`);
										} else {
											const selected2 = Number(ce3.content - 1);
											const findSelectedEvento2 = eventosArray2.find((xis) => xis.position === selected2);

											if (!findSelectedEvento2) {
												message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
													timeout: 5000
												}));
												ce3.delete();
											} else {
												page += 1;
												collector3.stop();
												ce3.delete();

												embed2
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

												msg.edit(author, embed2);
											}
										}
									});

									collector3.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector3.stop();

											return message.channel.send(`${author}, você demorou demais para escolher a Facção. Use o comando novamente!`).then((a) => a.delete({
												timeout: 6000
											}));
										}
									});
								});
							});

							sim2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									sim2.stop();

									return msg3.reactions.removeAll();
								}
							});
						});
					}
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply(`você demorou demais para escolher a Facção. Use o comando novamente!`).then((a) => a.delete({
						timeout: 6000
					}));
					sim.stop();
					return;
				}
			});
		});
	}

};
