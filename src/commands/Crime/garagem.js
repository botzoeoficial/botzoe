/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Garagem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'garagem';
		this.category = 'Crime';
		this.description = 'Veja seus carros na garagem!';
		this.usage = 'garagem';
		this.aliases = ['gr'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const carrosArray = user.garagem.map((value, index) => ({
			nome: value.nome,
			modelo: value.modelo,
			valor: value.valor,
			danificado: value.danificado,
			velocidade: value.velocidade,
			cavalos: value.cavalos,
			peso: value.peso,
			desmanche: value.desmanche,
			dono: value.dono,
			img: value.img,
			mecanica: value.mecanica,
			arrumado: value.arrumado,
			emplacado: value.emplacado,
			liberado: value.liberado,
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
			.setTitle('<:garagem:901528229112844308> | Garagem');

		carrosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} | **Modelo:** ${eu.modelo}\n`);
		embed.setDescription(!user.garagem.length ? 'Você não possui nenhum carro no momento.' : `**DIGITE A POSIÇÃO DO CARRO NO CHAT PARA VER INFORMAÇÕES SOBRE ELE!**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			if (!user.garagem.length) return;

			let page = 0;
			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = carrosArray.find((xis) => xis.position === selected);

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
						.setDescription(`**Você selecionou o Carro:** \`${findSelectedEvento.nome}\``)
						.addField('Modelo:', findSelectedEvento.modelo, true)
						.addField('Valor:', `R$${Utils.numberFormat(Number(findSelectedEvento.valor))},00`, true)
						.addField('Danificado:', `${findSelectedEvento.danificado}%`, true)
						.addField('Velocidade:', `${findSelectedEvento.velocidade} KM/h`, true)
						.addField('Cavalos de Força:', `${findSelectedEvento.cavalos} HP`, true)
						.addField('Peso:', `${findSelectedEvento.peso} KG`, true)
						.addField('Valor para Desmanche:', `R$${Utils.numberFormat(findSelectedEvento.desmanche)},00`, true)
						.addField('Emplacado:', `**\`${!findSelectedEvento.emplacado ? 'Não está emplacado.' : 'Está emplacado.'}\`**`, true)
						.addField('\u2800', '\u2800', true)
						.addField('Oficina:', `**\`${!findSelectedEvento.mecanica ? 'Não está na Oficina.' : 'Está na Oficina.'}\`**`, true)
						.addField('Arrumado na Oficina:', `**\`${!findSelectedEvento.arrumado ? 'Não está arrumado.' : 'Está arrumado.'}\`**`, true)
						.addField('Liberado da Oficina:', `**\`${!findSelectedEvento.liberado ? 'Não está liberado.' : 'Está liberado.'}\`**`, true)
						.setImage(findSelectedEvento.img);

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

							const carrosArray2 = user.garagem.map((value, index) => ({
								nome: value.nome,
								modelo: value.modelo,
								valor: value.valor,
								danificado: value.danificado,
								velocidade: value.velocidade,
								cavalos: value.cavalos,
								peso: value.peso,
								desmanche: value.desmanche,
								dono: value.dono,
								img: value.img,
								mecanica: value.mecanica,
								arrumado: value.arrumado,
								emplacado: value.emplacado,
								liberado: value.liberado,
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
								.setTitle('<:garagem:901528229112844308> | Garagem');

							carrosArray2.forEach((eu) => embedMessage2 += `[${emojis2[eu.position + 1]}] **Carro:** ${eu.nome} | **Modelo:** ${eu.modelo}\n`);
							embed2.setDescription(!user.garagem.length ? 'Você não possui nenhum carro no momento.' : `**DIGITE A POSIÇÃO DO CARRO NO CHAT PARA VER INFORMAÇÕES SOBRE ELE!**\n\n${embedMessage}`);

							msg.edit(author, embed2).then(async (msg4) => {
								const collector3 = msg4.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
									time: 300000
								});

								collector3.on('collect', async (ce3) => {
									const selected2 = Number(ce3.content - 1);
									const findSelectedEvento2 = carrosArray2.find((xis) => xis.position === selected2);

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
											.setDescription(`**Você selecionou o Carro:** \`${findSelectedEvento.nome}\``)
											.addField('Modelo:', findSelectedEvento.modelo, true)
											.addField('Valor:', `R$${Utils.numberFormat(Number(findSelectedEvento.valor))},00`, true)
											.addField('Danificado:', `${findSelectedEvento.danificado}%`, true)
											.addField('Velocidade:', `${findSelectedEvento.velocidade} KM/h`, true)
											.addField('Cavalos de Força:', `${findSelectedEvento.cavalos} HP`, true)
											.addField('Peso:', `${findSelectedEvento.peso} KG`, true)
											.addField('Valor para Desmanche:', `R$${Utils.numberFormat(Number(findSelectedEvento.desmanche))},00`, true)
											.addField('Emplacado:', `**\`${!findSelectedEvento.emplacado ? 'Não está emplacado.' : 'Está emplacado.'}\`**`, true)
											.addField('\u2800', '\u2800', true)
											.addField('Oficina:', `**\`${!findSelectedEvento.mecanica ? 'Não está na Oficina.' : 'Está na Oficina.'}\`**`, true)
											.addField('Arrumado na Oficina:', `**\`${!findSelectedEvento.arrumado ? 'Não está arrumado.' : 'Está arrumado.'}\`**`, true)
											.addField('Liberado da Oficina:', `**\`${!findSelectedEvento.liberado ? 'Não está liberado.' : 'Está liberado.'}\`**`, true)
											.setImage(findSelectedEvento.img);

										msg.edit(author, embed2);
									}
								});

								collector3.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collector3.stop();

										return message.channel.send(`${author}, você demorou demais para escolher o Carro. Use o comando novamente!`).then((a) => a.delete({
											timeout: 6000
										}));
									}
								});
							});
						});

						sim2.on('end', async (collected, reason) => {
							if (reason === 'time') {
								sim2.stop();
								sim.stop();

								return msg3.reactions.removeAll();
							}
						});
					});
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply(`você demorou demais para escolher o Carro. Use o comando novamente!`).then((a) => a.delete({
						timeout: 6000
					}));
					sim.stop();
					return;
				}
			});
		});
	}

};
