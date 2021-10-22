/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Addcard extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addcard';
		this.category = 'Editor';
		this.description = 'Adicione cards utilizaveis!';
		this.usage = 'addcard';
		this.aliases = ['add-card'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
	}
	async run({
		message,
		author,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const card = args.slice(0).join(' ');

		if (!card) return message.reply('você precisa colocar o código de um card.');

		if (server.card.find((fa) => fa.codigo === card)) return message.reply('esse card já está cadastrado.');

		const embed = new ClientEmbed(author)
			.setTitle('💳 | Card')
			.setDescription('💵 | Qual Valor você deseja Adicionar na Zoe?')
			.setFooter('DIGITE A PALAVRA cancelar NO CHAT, PARA CANCELAR O CADASTRO DO CARD');

		message.channel.send(author, embed).then((msg) => {
			const collector = msg.channel.createMessageCollector((m) => m.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (re) => {
				if (re.content.toLowerCase() === 'cancelar') {
					collector.stop();
					msg.delete();
					return message.channel.send(`${author}, você cancelou o cadastro de um **card** com sucesso!`);
				}

				collector.stop();

				embed.addField('🦉 Valor Zoe:', `R$${Utils.numberFormat(Number(re.content))},00`);
				embed.setDescription('🪙 | Quantos BitCoins Você deseja Adicionar?');

				message.channel.send(author, embed).then((msg1) => {
					const collector1 = msg1.channel.createMessageCollector((m) => m.author.id === author.id, {
						time: 60000
					});

					collector1.on('collect', async (re2) => {
						if (re2.content.toLowerCase() === 'cancelar') {
							collector1.stop();
							msg1.delete();
							return message.channel.send(`${author}, você cancelou o cadastro de um **card** com sucesso!`);
						}

						collector1.stop();

						embed.addField('🪙 BitCoins:', `${Utils.numberFormat(Number(re2.content))}`);
						embed.setDescription('💸 | Qual Valor você deseja Adicionar na Alfacusa?');

						message.channel.send(author, embed).then((msg2) => {
							const collector2 = msg2.channel.createMessageCollector((m) => m.author.id === author.id, {
								time: 60000
							});

							collector2.on('collect', async (re3) => {
								if (re3.content.toLowerCase() === 'cancelar') {
									collector2.stop();
									msg2.delete();
									return message.channel.send(`${author}, você cancelou o cadastro de um **card** com sucesso!`);
								}

								collector2.stop();

								embed.addField('💸 Valor Alfacusa:', `R$${Utils.numberFormat(Number(re3.content))}`);
								embed.setDescription('👩‍🦰 | Quantos sonhos da Loritta você deseja Adicionar?');

								message.channel.send(author, embed).then((msg3) => {
									const collector3 = msg3.channel.createMessageCollector((m) => m.author.id === author.id, {
										time: 60000
									});

									collector3.on('collect', async (re4) => {
										if (re4.content.toLowerCase() === 'cancelar') {
											collector3.stop();
											msg3.delete();
											return message.channel.send(`${author}, você cancelou o cadastro de um **card** com sucesso!`);
										}

										collector3.stop();

										embed.addField('👩‍🦰 Sonhos da Loritta:', `${Utils.numberFormat(Number(re4.content))}`);
										embed.setDescription('***CÓDIGO CADASTRADO COM SUCESSO!***');

										message.channel.send(author, embed);

										return await this.client.database.guilds.findOneAndUpdate({
											_id: message.guild.id
										}, {
											$push: {
												card: {
													codigo: card,
													valorZoe: Number(re.content),
													valorAlfa: Number(re3.content),
													valorBtc: Number(re2.content),
													valorSonhos: Number(re4.content),
													ativado: false,
													ativadoPor: 'Ninguém.'
												}
											}
										});
									});

									collector3.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector3.stop();
											msg3.delete();
											return message.channel.send(`${author}, você demorou demais para responder! Use o comando novamente!`);
										}
									});
								});
							});

							collector2.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collector2.stop();
									msg2.delete();
									return message.channel.send(`${author}, você demorou demais para responder! Use o comando novamente!`);
								}
							});
						});
					});

					collector1.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector1.stop();
							msg1.delete();
							return message.channel.send(`${author}, você demorou demais para responder! Use o comando novamente!`);
						}
					});
				});
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.channel.send(`${author}, você demorou demais para responder! Use o comando novamente!`);
				}
			});
		});
	}

};
