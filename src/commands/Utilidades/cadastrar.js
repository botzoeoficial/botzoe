/* eslint-disable no-useless-escape */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Cadastrar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cadastrar';
		this.category = 'Utilidades';
		this.description = 'Cadastre-se no servidor TD2CÚPULA!';
		this.usage = 'cadastrar';
		this.aliases = ['cadastrar-se'];

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
		prefix,
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.cadastrado) {
			return message.reply(`você já está cadastrado no servidor **${message.guild.name}**! Use o comando \`${prefix}cadastro\` para ver suas informações.`);
		}

		await message.delete();

		const embed = new ClientEmbed(author)
			.setTitle('📋 | CADASTRO')
			.setDescription(`Olá ${author}, estou aqui para fazer seu **cadastro**!\n\nPrimeiramente, preciso que você envie seu **NOME VERDADEIRO** no chat!`)
			.setFooter('DIGITE A PALAVRA cancelar NO CHAT, PARA CANCELAR O CADASTRO');

		message.channel.send(author, embed).then(async (msg) => {
			const filter = (m) => m.author.id === author.id;
			const collector = msg.channel.createMessageCollector(filter, {
				time: 60000
			});

			collector.on('collect', async (msg2) => {
				if (msg2.content.toLowerCase() === 'cancelar') {
					collector.stop();
					msg.delete();
					return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
				}

				if (parseInt(msg2.content)) {
					message.channel.send(`${author}, aposto que seu nome verdadeiro não é um número! Por favor, envie seu nome verdadeiro novamente.`).then(ba => ba.delete({
						timeout: 5000
					}));
					msg2.delete();
				} else {
					collector.stop();
					msg.delete();

					embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie seu **GÊNERO** no chat!\n\n**GÊNEROS DISPONÍVEIS:**\n\`Masculino\`\n\`Feminino\`\n`);
					embed.addField('Nome Verdadeiro:', msg2.content, true);

					message.channel.send(author, embed).then(async (msg3) => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg3.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (msg4) => {
							if (msg4.content.toLowerCase() === 'cancelar') {
								collector2.stop();
								msg3.delete();
								return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
							}

							if (parseInt(msg4.content)) {
								message.channel.send(`${author}, aposto que seu gênero não é um número! Por favor, envie seu gênero novamente.`).then(ba => ba.delete({
									timeout: 5000
								}));
								msg4.delete();
							} else if (msg4.content.toLowerCase() !== 'masculino' && msg4.content.toLowerCase() !== 'feminino') {
								message.channel.send(`${author}, seu gênero precisa ser **Masculino** ou **Feminino**! Por favor, envie seu gênero novamente.`).then(ba => ba.delete({
									timeout: 5000
								}));
								msg4.delete();
							} else {
								collector2.stop();
								msg3.delete();

								embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie sua **IDADE** no chat!`);
								embed.addField('Gênero:', await this.capitalize(msg4.content), true);

								message.channel.send(author, embed).then(async (msg5) => {
									const filter3 = (m) => m.author.id === author.id;
									const collector3 = msg5.channel.createMessageCollector(filter3, {
										time: 60000
									});

									collector3.on('collect', async (msg6) => {
										if (msg6.content.toLowerCase() === 'cancelar') {
											collector3.stop();
											msg5.delete();
											return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
										}

										if (!parseInt(msg6.content)) {
											message.channel.send(`${author}, aposto que sua idade não é uma palavra! Por favor, envie sua idade novamente.`).then(ba => ba.delete({
												timeout: 5000
											}));
											msg6.delete();
										} else if (isNaN(msg6.content)) {
											message.channel.send(`${author}, você precisa colocar apenas o número da sua idade, não **letras** ou **números junto com letras**!`).then((a) => a.delete({
												timeout: 5000
											}));
											msg6.delete();
										} else {
											collector3.stop();
											msg5.delete();

											embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie sua **ORIENTAÇÃO SEXUAL** no chat!\n\n**ORIENTAÇÕES SEXUAIS DISPONÍVEIS:**\n\`Não Binário\`\n\`Hétero\`\n\`LGBT\`\n`);
											embed.addField('Idade:', msg6.content, true);

											message.channel.send(author, embed).then(async (msg7) => {
												const filter4 = (m) => m.author.id === author.id;
												const collector4 = msg7.channel.createMessageCollector(filter4, {
													time: 60000
												});

												collector4.on('collect', async (msg8) => {
													if (msg8.content.toLowerCase() === 'cancelar') {
														collector4.stop();
														msg7.delete();
														return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
													}

													if (parseInt(msg8.content)) {
														message.channel.send(`${author}, aposto que sua orientação sexual não é um número! Por favor, envie sua orientação sexual novamente.`).then(ba => ba.delete({
															timeout: 5000
														}));
														msg8.delete();
													} else if (msg8.content.toLowerCase() !== 'não binário' && msg8.content.toLowerCase() !== 'hétero' && msg8.content.toLowerCase() !== 'lgbt') {
														message.channel.send(`${author}, sua orientação sexual precisa ser **Não Binário** ou **Hétero** ou **Lgbt**! Por favor, envie sua orientação sexual novamente.`).then(ba => ba.delete({
															timeout: 5000
														}));
														msg8.delete();
													} else {
														collector4.stop();
														msg7.delete();

														embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie sua **PLATAFORMA DE JOGO** no chat!\n\n**PLATAFORMAS DISPONÍVEIS:**\n\`Pc\`\n\`Celular\`\n\`Pc/Celular\``);
														embed.addField('Orientação Sexual:', await this.capitalize(msg8.content), true);

														message.channel.send(author, embed).then(async (msg9) => {
															const filter5 = (m) => m.author.id === author.id;
															const collector5 = msg9.channel.createMessageCollector(filter5, {
																time: 60000
															});

															collector5.on('collect', async (msg10) => {
																if (msg10.content.toLowerCase() === 'cancelar') {
																	collector5.stop();
																	msg9.delete();
																	return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
																}

																if (parseInt(msg10.content)) {
																	message.channel.send(`${author}, aposto que você não joga por um aparelho que seria um número! Por favor, envie sua plataforma de jogo novamente.`).then(ba => ba.delete({
																		timeout: 5000
																	}));
																	msg10.delete();
																} else if (msg10.content.toLowerCase() !== 'pc' && msg10.content.toLowerCase() !== 'celular' && msg10.content.toLowerCase() !== 'pc/celular') {
																	message.channel.send(`${author}, sua plataforma de jogo precisa ser **Pc** ou **Celular** ou **Pc/Celular**! Por favor, envie sua plataforma de jogo novamente.`).then(ba => ba.delete({
																		timeout: 5000
																	}));
																	msg10.delete();
																} else {
																	collector5.stop();
																	msg9.delete();

																	embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie sua **REGIÃO** no chat!\n\n**REGIÕES DISPONÍVEIS:**\n\`Nordeste\`\n\`Norte\`\n\`Sudeste\`\n\`Sul\`\n\`Centro-Oeste\`\n`);
																	embed.addField('Plataforma de Jogo:', await this.capitalize(msg10.content), true);

																	message.channel.send(author, embed).then(async (msg11) => {
																		const filter6 = (m) => m.author.id === author.id;
																		const collector6 = msg11.channel.createMessageCollector(filter6, {
																			time: 60000
																		});

																		collector6.on('collect', async (msg12) => {
																			if (msg12.content.toLowerCase() === 'cancelar') {
																				collector6.stop();
																				msg11.delete();
																				return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
																			}

																			if (parseInt(msg12.content)) {
																				message.channel.send(`${author}, aposto que você não mora em uma região que seria um número! Por favor, envie sua região novamente.`).then(ba => ba.delete({
																					timeout: 5000
																				}));
																				msg12.delete();
																			} else if (msg12.content.toLowerCase() !== 'nordeste' && msg12.content.toLowerCase() !== 'norte' && msg12.content.toLowerCase() !== 'sudeste' && msg12.content.toLowerCase() !== 'sul' && msg12.content.toLowerCase() !== 'centro-oeste') {
																				message.channel.send(`${author}, sua região precisa ser **Nordeste** ou **Norte** ou **Sudeste** ou **Sul** ou **Centro-Oeste**! Por favor, envie sua região novamente.`).then(ba => ba.delete({
																					timeout: 5000
																				}));
																				msg12.delete();
																			} else {
																				collector6.stop();
																				msg11.delete();

																				embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie seu **ID** no chat!\n`);
																				embed.addField('Região:', await this.capitalize(msg12.content), true);

																				message.channel.send(author, embed).then(async (msg13) => {
																					const filter7 = (m) => m.author.id === author.id;
																					const collector7 = msg13.channel.createMessageCollector(filter7, {
																						time: 60000
																					});

																					collector7.on('collect', async (msg14) => {
																						if (msg14.content.toLowerCase() === 'cancelar') {
																							collector7.stop();
																							msg13.delete();
																							return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
																						}

																						if (!parseInt(msg14.content)) {
																							message.channel.send(`${author}, seu ID não são letras e sim números! Por favor, envie seu ID novamente.`).then(ba => ba.delete({
																								timeout: 5000
																							}));
																							msg14.delete();
																						} else if (msg14.content !== author.id) {
																							message.channel.send(`${author}, seu ID não é esse! Por favor, envie seu ID novamente.`).then(ba => ba.delete({
																								timeout: 5000
																							}));
																							msg14.delete();
																						} else {
																							collector7.stop();
																							msg13.delete();

																							embed.setDescription(`Muito bem ${author}, agora eu preciso que você envie sua **DATA DE NASCIMENTO** no chat!\n`);
																							embed.addField('ID:', msg14.content, true);

																							message.channel.send(author, embed).then(async (msg17) => {
																								const filter9 = (m) => m.author.id === author.id;
																								const collector9 = msg17.channel.createMessageCollector(filter9, {
																									time: 60000
																								});

																								collector9.on('collect', async (msg18) => {
																									if (msg18.content.toLowerCase() === 'cancelar') {
																										collector9.stop();
																										msg17.delete();
																										return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
																									}

																									const regexDay = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g);

																									if (!regexDay.test(msg18.content)) {
																										message.channel.send(`${author}, você precisa colocar a **data de nascimento** no formato certo. (\`dia\`/\`mês\`/\`ano\`)! Ex: \`21/09/2021\`.`).then(ba => ba.delete({
																											timeout: 5000
																										}));
																										msg18.delete();
																									} else {
																										collector9.stop();
																										msg17.delete();

																										embed.setDescription(`Muito bem ${author}, agora para terminarmos, preciso que você envie no chat seu nome de **RP** (Roleplay), o nome do seu Personagem no Jogo (NickName)!\n`);
																										embed.addField('Data de Nascimento:', msg18.content, true);
																										embed.addField('\u2800', '\u2800', true);

																										message.channel.send(author, embed).then(async (msg19) => {
																											const filter10 = (m) => m.author.id === author.id;
																											const collector10 = msg19.channel.createMessageCollector(filter10, {
																												time: 60000
																											});

																											collector10.on('collect', async (msg20) => {
																												if (msg20.content.toLowerCase() === 'cancelar') {
																													collector10.stop();
																													msg19.delete();
																													return message.channel.send(`${author}, você cancelou o seu **cadastro** com sucesso!`);
																												} else {
																													collector10.stop();
																													msg19.delete();

																													if (message.guild.id === '885645282614861854') {
																														message.member.setNickname(String(msg20));
																														message.member.roles.add('885645282660995086');
																													}

																													embed.fields = [];
																													embed.setDescription(`***CADASTRO TERMINADO!***\n\nUse o comando \`${prefix}cadastro\` para ver suas informações!`);

																													message.channel.send(author, embed).then(async (as) => {
																														await as.delete({
																															timeout: 6000
																														});
																													});

																													await this.client.database.users.findOneAndUpdate({
																														userId: author.id,
																														guildId: message.guild.id
																													}, {
																														$set: {
																															nick: message.member.nickname || author.username,
																															cadastrado: true,
																															idade: Number(msg6.content),
																															genero: await this.capitalize(msg4.content),
																															nomeReal: msg2.content,
																															orientacaoSexual: await this.capitalize(msg8.content),
																															plataformaJogo: await this.capitalize(msg10.content),
																															regiao: await this.capitalize(msg12.content),
																															funcao: 'Não pertence a nenhuma Facção.',
																															aniversario: msg18.content
																														}
																													});

																													await msg2.delete();
																													await msg4.delete();
																													await msg6.delete();
																													await msg8.delete();
																													await msg10.delete();
																													await msg12.delete();
																													await msg14.delete();
																													await msg18.delete();
																													await msg20.delete();
																												}
																											});
																										});
																									}
																								});

																								collector9.on('end', (collected, reason) => {
																									if (reason === 'time') {
																										msg17.delete();
																										message.channel.send(`${author}, você demorou demais para enviar sua data de nascimento! Use o comando novamente!`);
																										return collector9.stop();
																									}
																								});
																							});
																						}
																					});

																					collector7.on('end', (collected, reason) => {
																						if (reason === 'time') {
																							msg13.delete();
																							message.channel.send(`${author}, você demorou demais para enviar seu ID! Use o comando novamente!`);
																							return collector7.stop();
																						}
																					});
																				});
																			}
																		});

																		collector6.on('end', (collected, reason) => {
																			if (reason === 'time') {
																				msg11.delete();
																				message.channel.send(`${author}, você demorou demais para enviar sua região! Use o comando novamente!`);
																				return collector6.stop();
																			}
																		});
																	});
																}
															});

															collector5.on('end', (collected, reason) => {
																if (reason === 'time') {
																	msg9.delete();
																	message.channel.send(`${author}, você demorou demais para enviar sua plataforma de jogo! Use o comando novamente!`);
																	return collector5.stop();
																}
															});
														});
													}
												});

												collector4.on('end', (collected, reason) => {
													if (reason === 'time') {
														msg7.delete();
														message.channel.send(`${author}, você demorou demais para enviar sua orientação sexual! Use o comando novamente!`);
														return collector4.stop();
													}
												});
											});
										}
									});

									collector3.on('end', (collected, reason) => {
										if (reason === 'time') {
											msg5.delete();
											message.channel.send(`${author}, você demorou demais para enviar sua idade! Use o comando novamente!`);
											return collector3.stop();
										}
									});
								});
							}
						});

						collector2.on('end', (collected, reason) => {
							if (reason === 'time') {
								msg3.delete();
								message.channel.send(`${author}, você demorou demais para enviar seu gênero! Use o comando novamente!`);
								return collector2.stop();
							}
						});
					});
				}
			});

			collector.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.channel.send(`${author}, você demorou demais para enviar seu nome! Use o comando novamente!`);
					return collector.stop();
				}
			});
		});
	}

	async capitalize(str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	}

};
