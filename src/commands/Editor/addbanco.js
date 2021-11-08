/* eslint-disable id-length */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Addbanco extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addbanco';
		this.category = 'Editor';
		this.description = 'Adicione alguém no banco!';
		this.usage = 'addbanco';
		this.aliases = ['add-banco'];

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
		const embed = new ClientEmbed(author)
			.setTitle('🏦 | Adicionar Usuário')
			.setDescription('👤 | Qual o nick?')
			.setFooter('DIGITE A PALAVRA cancelar NO CHAT, PARA CANCELAR O CADASTRO DO BANCO');

		message.channel.send(author, embed).then((msg) => {
			const filter = (m) => m.author.id === author.id;
			const collector = msg.channel.createMessageCollector(filter, {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content.toLowerCase() === 'cancelar') {
					collector.stop();
					msg.delete();
					return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
				}

				if (parseInt(ce.content)) {
					message.channel.send(`${author}, aposto que o nick do usuário não é um número! Por favor, envie o nick novamente.`).then(ba => ba.delete({
						timeout: 5000
					}));
					ce.delete();
				} else {
					collector.stop();

					embed.setDescription('🆔 | Qual o ID do usuário?');

					msg.edit(author, embed).then((msg2) => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg2.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (ce2) => {
							if (ce2.content.toLowerCase() === 'cancelar') {
								collector2.stop();
								msg2.delete();
								return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
							}

							if (!parseInt(ce2.content)) {
								message.channel.send(`${author}, aposto que o ID do usuário não seja palavras! Por favor, envie o ID novamente.`).then(ba => ba.delete({
									timeout: 5000
								}));
								ce2.delete();
							} else {
								collector2.stop();

								embed.setDescription('⏰ | Qual horário vai sair?');

								msg.edit(author, embed).then((msg3) => {
									const filter3 = (m) => m.author.id === author.id;
									const collector3 = msg3.channel.createMessageCollector(filter3, {
										time: 60000
									});

									collector3.on('collect', async (ce3) => {
										if (ce3.content.toLowerCase() === 'cancelar') {
											collector3.stop();
											msg3.delete();
											return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
										}

										const regexHour = new RegExp(/^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g);

										if (!regexHour.test(ce3.content)) {
											message.channel.send(`${author}, você precisa colocar a **hora** que irá sair no formato certo. (\`hora\`:\`minutos\`:\`segundos\`)! Ex: \`20:00:00\`.`).then(ba => ba.delete({
												timeout: 5000
											}));
											ce3.delete();
										} else {
											collector3.stop();

											embed.setDescription('💸 | Qual o valor?');

											msg.edit(author, embed).then((msg4) => {
												const filter4 = (m) => m.author.id === author.id;
												const collector4 = msg4.channel.createMessageCollector(filter4, {
													time: 60000
												});

												collector4.on('collect', async (ce4) => {
													if (ce4.content.toLowerCase() === 'cancelar') {
														collector4.stop();
														msg4.delete();
														return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
													}

													if (!parseInt(ce4.content)) {
														message.channel.send(`${author}, o valor do saldo do usuário não pode ser letras! Por favor, envie o valor novamente.`).then(ba => ba.delete({
															timeout: 5000
														}));
														ce4.delete();
													} else if (isNaN(ce4.content)) {
														message.channel.send(`${author}, você precisa colocar apenas números, não **letras** ou **números junto com letras**!`).then((a) => a.delete({
															timeout: 5000
														}));
														ce4.delete();
													} else {
														collector4.stop();

														embed.setDescription('🗓️ | Qual a data do banco?');

														msg.edit(author, embed).then((msg5) => {
															const filter5 = (m) => m.author.id === author.id;
															const collector5 = msg5.channel.createMessageCollector(filter5, {
																time: 60000
															});

															collector5.on('collect', async (ce5) => {
																if (ce5.content.toLowerCase() === 'cancelar') {
																	collector5.stop();
																	msg5.delete();
																	return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
																}

																const regexDay = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g);

																if (!regexDay.test(ce5.content)) {
																	message.channel.send(`${author}, você precisa colocar a **data** do banco no formato certo. (\`dia\`/\`mês\`/\`ano\`)! Ex: \`21/09/2021\`.`).then(ba => ba.delete({
																		timeout: 5000
																	}));
																	ce5.delete();
																} else {
																	collector5.stop();

																	embed.setDescription('🔎 | Adicione o status...');

																	msg.edit(author, embed).then((msg6) => {
																		const filter6 = (m) => m.author.id === author.id;
																		const collector6 = msg6.channel.createMessageCollector(filter6, {
																			time: 60000
																		});

																		collector6.on('collect', async (ce6) => {
																			if (ce6.content.toLowerCase() === 'cancelar') {
																				collector6.stop();
																				msg6.delete();
																				return message.channel.send(`${author}, você cancelou o cadastro do **banco** com sucesso!`);
																			}

																			if (ce6.content.length > 1024) {
																				message.channel.send(`${author}, a mensagem do STATUS só pode ter no máximo **1024** letras. Digite novamente o status!`);
																			} else {
																				collector6.stop();

																				embed.setDescription('Usuário adicionado com sucesso!');

																				msg.edit(author, embed);

																				await this.client.database.guilds.findOneAndUpdate({
																					_id: message.guild.id
																				}, {
																					$push: {
																						banco: {
																							nick: ce.content,
																							id: ce2.content,
																							valor: ce4.content,
																							dia: ce5.content,
																							hora: ce3.content,
																							status: ce6.content,
																							timestamps: Date.now()
																						}
																					}
																				});
																			}
																		});

																		collector6.on('end', async (collected, reason) => {
																			if (reason === 'time') {
																				collector6.stop();

																				msg.delete();
																				return message.channel.send(`${author}, você demorou demais para responder o status. Use o comando novamente!`);
																			}
																		});
																	});
																}
															});

															collector5.on('end', async (collected, reason) => {
																if (reason === 'time') {
																	collector5.stop();

																	msg.delete();
																	return message.channel.send(`${author}, você demorou demais para responder a data do banco. Use o comando novamente!`);
																}
															});
														});
													}
												});

												collector4.on('end', async (collected, reason) => {
													if (reason === 'time') {
														collector4.stop();

														msg.delete();
														return message.channel.send(`${author}, você demorou demais para responder o valor do usuário. Use o comando novamente!`);
													}
												});
											});
										}
									});

									collector3.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector3.stop();

											msg.delete();
											return message.channel.send(`${author}, você demorou demais para responder o horário que irá sair. Use o comando novamente!`);
										}
									});
								});
							}
						});

						collector2.on('end', async (collected, reason) => {
							if (reason === 'time') {
								collector2.stop();

								msg.delete();
								return message.channel.send(`${author}, você demorou demais para responder o ID do usuário. Use o comando novamente!`);
							}
						});
					});
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();

					msg.delete();
					return message.channel.send(`${author}, você demorou demais para responder o nick do usuário. Use o comando novamente!`);
				}
			});
		});
	}

};
