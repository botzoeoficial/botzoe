/* eslint-disable no-self-assign */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Imobiliaria extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'imobiliaria';
		this.category = 'Social';
		this.description = 'Veja as Casas/Fazendas da Imobiliária iCasaZoe!';
		this.usage = 'imobiliaria';
		this.aliases = ['imobiliária'];

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
		const embed = new ClientEmbed(author)
			.setTitle('Bem vindo a Imobiliária iCasaZoe')
			.setDescription(`O que você deseja comprar?\n\n1️⃣ - Casas\n2️⃣ - Fazendas\n\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then(async (msg) => {
			const collector = msg.channel.createMessageCollector((m) => m.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content === '0') {
					collector.stop();
					msg.delete();
					return message.reply('tentiva de compra de Imobiliária cancelada com sucesso.');
				} else if (ce.content === '1') {
					collector.stop();
					msg.delete();
					ce.delete();

					const casas = require('../../json/casas.json');

					let pg = 0;

					const embedCasas = new ClientEmbed(author)
						.setTitle('Imobiliária iCasaZoe')
						.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
						.setImage(casas[pg].gif);

					const buttonVoltar = new MessageButton().setStyle('blurple').setEmoji('⬅️').setID('voltar');
					const buttonIr = new MessageButton().setStyle('blurple').setEmoji('➡️').setID('ir');
					const buttonAceitar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
					const buttonNegar = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
					const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonAceitar, buttonNegar, buttonIr]);

					message.channel.send(author, {
						embed: embedCasas,
						components: [botoes]
					}).then(async (msg1) => {
						const collectorBotoes = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
							time: 600000
						});

						collectorBotoes.on('collect', async (b) => {
							if (b.id === 'voltar') {
								b.reply.defer();

								if (!casas[pg - 1]) {
									pg = 0;
								} else {
									pg -= 1;
								}

								embedCasas
									.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
									.setImage(casas[pg].gif);

								msg1.edit(author, embedCasas);
							} else if (b.id === 'ir') {
								b.reply.defer();

								if (!casas[pg + 1]) {
									pg = pg;
								} else {
									pg += 1;
								}

								embedCasas
									.setDescription(`Qual Casa você deseja Comprar?\n\n**${casas[pg].nome}**\n\nValor: R$${Utils.numberFormat(casas[pg].valor)},00\nBaú: **${Utils.numberFormat(Number(casas[pg].bau))} espaço.**`)
									.setImage(casas[pg].gif);

								msg1.edit(author, embedCasas);
							} else if (b.id === 'negar') {
								b.reply.defer();

								msg1.delete();
								return message.reply('tentativa de compra cancelada com sucesso!');
							} else if (b.id === 'aceitar') {
								b.reply.defer();

								const user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								if (user.casas.tipo === casas[pg].nome) {
									msg1.delete();
									return message.reply(`você já possui essa **Casa**! Use o comando \`${prefix}casa\`.`);
								}

								if (user.banco < casas[pg].valor) {
									msg1.delete();

									const embedPobre = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`Você não tem saldo suficiente para comprar essa **Casa**.\nVocê precisa de mais \`R$${Utils.numberFormat(casas[pg].valor - user.banco)},00\` no **banco** para comprar essa Casa!\n\n||Então vá trabalhar VAGABUNDO!!||`);

									return message.channel.send(author, embedPobre);
								} else {
									collector.stop();
									msg1.delete();

									const embedComprada = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`**${casas[pg].nome}** Comprada com sucesso! 🎉\n\nQual nome você deseja dar para sua **${casas[pg].nome}**?`);

									message.channel.send(author, embedComprada).then(async (msg2) => {
										const collector3 = msg2.channel.createMessageCollector((m) => m.author.id === author.id, {
											max: 1
										});

										collector3.on('collect', async (ce1) => {
											collector3.stop();
											msg2.delete();

											message.reply(`**${casas[pg].nome}** nomeada com sucesso para \`${ce1.content}\`! Use o comando \`${prefix}casa\` para vê-la.`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$set: {
													banco: user.banco -= casas[pg].valor,
													'casas.tipo': casas[pg].nome,
													'casas.nome': String(ce1.content),
													'casas.valor': casas[pg].valor,
													'casas.gif': casas[pg].gif,
													'casas.quantiaItens': Number(casas[pg].bau)
												}
											});

											return;
										});
									});
								}
							}
						});

						collectorBotoes.on('end', async (collected, reason) => {
							if (reason === 'time') {
								return msg1.delete();
							}
						});
					});
				} else if (ce.content === '2') {
					collector.stop();
					msg.delete();
					ce.delete();

					const fazendas = require('../../json/fazendas.json');

					let pg = 0;

					const embedFazendas = new ClientEmbed(author)
						.setTitle('Imobiliária iCasaZoe')
						.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
						.setImage(fazendas[pg].gif);

					const buttonVoltar = new MessageButton().setStyle('blurple').setEmoji('⬅️').setID('voltar');
					const buttonIr = new MessageButton().setStyle('blurple').setEmoji('➡️').setID('ir');
					const buttonAceitar = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
					const buttonNegar = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
					const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonAceitar, buttonNegar, buttonIr]);

					message.channel.send(author, {
						embed: embedFazendas,
						components: [botoes]
					}).then(async (msg1) => {
						const collectorBotoes = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
							time: 600000
						});

						collectorBotoes.on('collect', async (b) => {
							if (b.id === 'voltar') {
								b.reply.defer();

								if (!fazendas[pg - 1]) {
									pg = 0;
								} else {
									pg -= 1;
								}

								embedFazendas
									.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
									.setImage(fazendas[pg].gif);

								msg1.edit(author, embedFazendas);
							} else if (b.id === 'ir') {
								b.reply.defer();

								if (!fazendas[pg + 1]) {
									pg = pg;
								} else {
									pg += 1;
								}

								embedFazendas
									.setDescription(`Qual Fazenda você deseja Comprar?\n\n**${fazendas[pg].nome}**\n\nValor: R$${Utils.numberFormat(fazendas[pg].valor)},00\nDescrição: ${fazendas[pg].desc}`)
									.setImage(fazendas[pg].gif);

								msg1.edit(author, embedFazendas);
							} else if (b.id === 'negar') {
								b.reply.defer();

								msg1.delete();
								return message.reply('tentativa de compra cancelada com sucesso!');
							} else if (b.id === 'aceitar') {
								b.reply.defer();

								const user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								if (user.fazendas.map((a) => a.nome).includes(fazendas[pg].nome)) {
									msg1.delete();

									return message.reply('você já possui essa **Fazenda** comprada. Use o comando novamente para comprar outra!');
								}

								if (user.banco < fazendas[pg].valor) {
									msg1.delete();

									const embedPobre = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`Você não tem saldo suficiente para comprar essa **Fazenda**.\nVocê precisa de mais \`R$${Utils.numberFormat(fazendas[pg].valor - user.banco)},00\` no **banco** para comprar essa Fazenda!\n\n||Então vá trabalhar VAGABUNDO!!||`);

									return message.channel.send(author, embedPobre);
								} else {
									collector.stop();
									msg1.delete();

									const embedComprada = new ClientEmbed(author)
										.setTitle('Imobiliária iCasaZoe')
										.setDescription(`**${fazendas[pg].nome}** Comprada com sucesso! 🎉\n\nDigite \`${prefix}fazenda\` para vê-la.`);

									message.channel.send(author, embedComprada);

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$push: {
											fazendas: {
												nome: fazendas[pg].nome,
												lote1: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote2: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote3: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote4: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												},
												lote5: {
													bloqueado: true,
													fruta: '',
													emoji: '',
													cooldown: 0,
													adubo: 0,
													fertilizante: 0,
													irrigacao: 0,
													trator: 0,
													quantia: 0
												}
											}
										},
										$set: {
											banco: user.banco -= fazendas[pg].valor
										}
									});

									return;
								}
							}
						});

						collectorBotoes.on('end', async (collected, reason) => {
							if (reason === 'time') {
								return msg1.delete();
							}
						});
					});
				} else {
					collector.stop();
					msg.delete();
					ce.delete();
					return message.reply('número não encontrado. Por favor, use o comando novamente!');
				}
			});
		});
	}

};
