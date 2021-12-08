/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Novaeleicao extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'novaeleicao';
		this.category = 'Cidade';
		this.description = 'Inicie uma Eleição na sua Cidade!';
		this.usage = 'novaeleicao';
		this.aliases = ['novaeleição'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.level < 2) return message.reply('você precisa ser level **2** para iniciar uma Eleição!');

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.golpeEstado.caos) return message.reply('a Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!');

		if (server.cidade.governador === '') return message.reply(`você só pode abrir uma Eleição se a cidade possuir um Prefeito e essa Cidade não possui Prefeito ainda. Use o comando \`${prefix}addprefeito\`!`);

		const {
			channel
		} = server.cidade.impeachment;
		const msg1 = server.cidade.impeachment.message;

		if (server.cidade.impeachment.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`${author}, não é possível abrir uma Eleição pois está rolando um **Impeachment** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel}/${msg1})`);

			return message.channel.send(author, embedExistes);
		}

		const channel2 = server.cidade.eleicao.channel;
		const msg2 = server.cidade.eleicao.message;

		if (server.cidade.eleicao.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Eleição')
				.setDescription(`${author}, já está rolando uma **Eleição** na Cidade.\n\n> [Clique Aqui para Ir Nela](https://discord.com/channels/${message.guild.id}/${channel2}/${msg2})`);

			return message.channel.send(author, embedExistes);
		}

		const channel3 = server.cidade.golpeEstado.channel;
		const msg8 = server.cidade.golpeEstado.message;

		if (server.cidade.golpeEstado.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('🕵️ | Golpe de Estado')
				.setDescription(`${author}, não é possível abrir uma Eleição pois está rolando um **Golpe de Estado** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel3}/${msg8})`);

			return message.channel.send(author, embedExistes);
		}

		const timeout = 604800000;

		if (timeout - (Date.now() - server.cidade.eleicao.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.eleicao.cooldown));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('<:Urna:895779255491911740> | Novas Eleições')
				.setDescription(`Você está prestes a abrir uma Nova Eleição para **Prefeito** da Cidade.\nApós fazer isso a cidade só poderá ter uma outra eleição após **7 dias.**\n\nPara conseguir eleger um novo Prefeito, a eleição precisa alcançar 20 votos, a eleição durará 10 horas, ou até alcançar os votos necessários.\n\nTem certeza que deseja continuar para a eleição?`);

			const buttonSim = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
			const buttonNao = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
			const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

			message.channel.send(author, {
				embed: embed,
				components: [botoes]
			}).then(async (msg) => {
				const collectorBotoes = msg.createButtonCollector((button) => button.clicker.user.id === author.id, {
					time: 180000,
					max: 1
				});

				collectorBotoes.on('collect', async (b) => {
					if (b.id === 'negar') {
						b.reply.defer();

						return msg.delete();
					} else if (b.id === 'aceitar') {
						b.reply.defer();

						const candidatos = [];

						embed
							.setDescription(`Você convocou novas eleições na cidade. Digite o nome de 3 candidatos para votação popular.\n\nQuem será o **PRIMEIRO** candidato?`);

						await msg.edit(author, {
							embed: embed,
							components: []
						}).then(async (msg3) => {
							const collector = await msg3.channel.createMessageCollector((m) => m.author.id === author.id, {
								time: 7200000
							});

							collector.on('collect', async (ce) => {
								const mention = ce.mentions.members.first() || message.guild.members.cache.get(ce.content);

								if (!mention) message.reply('você precisa mencionar um usuário. Por favor, tente novamente!');

								if (mention.user.bot) message.reply('você não pode mandar um bot para ser **Candidato**.');

								candidatos.push({
									id: mention.id,
									votos: 0
								});

								embed
									.setDescription(`Você convocou novas eleições na cidade. Digite o nome de 3 candidatos para votação popular.\n\nQuem será o **SEGUNDO** candidato?`);

								await msg.edit(author, embed).then(async (msg4) => {
									collector.stop();

									const collector2 = await msg4.channel.createMessageCollector((m) => m.author.id === author.id, {
										time: 7200000
									});

									collector2.on('collect', async (ce2) => {
										const mention2 = ce2.mentions.members.first() || message.guild.members.cache.get(ce2.content);

										if (!mention2) message.reply('você precisa mencionar um usuário. Por favor, tente novamente!');

										if (mention2.user.bot) message.reply('você não pode mandar um bot para ser **Candidato**.');

										if (candidatos.includes(mention2.id)) message.reply('você já colocou esse usuário como candidato a **Prefeito**.');

										candidatos.push({
											id: mention2.id,
											votos: 0
										});

										embed
											.setDescription(`Você convocou novas eleições na cidade. Digite o nome de 3 candidatos para votação popular.\n\nQuem será o **TERCEIRO** candidato?`);

										await msg.edit(author, embed).then(async (msg5) => {
											collector.stop();
											collector2.stop();

											const collector3 = await msg5.channel.createMessageCollector((m) => m.author.id === author.id, {
												time: 7200000
											});

											collector3.on('collect', async (ce3) => {
												const mention3 = ce3.mentions.members.first() || message.guild.members.cache.get(ce3.content);

												if (!mention3) message.reply('você precisa mencionar um usuário. Por favor, tente novamente!');

												if (mention3.user.bot) message.reply('você não pode mandar um bot para ser **Candidato**.');

												if (candidatos.includes(mention3.id)) message.reply('você já colocou esse usuário como candidato a **Prefeito**.');

												candidatos.push({
													id: mention3.id,
													votos: 0
												});

												embed
													.setDescription(`Você convocou novas eleições na cidade. Digite o nome de 3 candidatos para votação popular.\n\nQuem será o **TERCEIRO** candidato?`);

												await msg.edit(author, embed).then(async () => {
													collector.stop();
													collector2.stop();
													collector3.stop();
													ce.delete();
													ce2.delete();
													ce3.delete();
													message.delete();

													const emojis = {
														1: '1️⃣',
														2: '2️⃣',
														3: '3️⃣'
													};

													embed
														.setDescription(`Está convocada novas eleições para **PREFEITO** na Cidade.\nPara eleger uma pessoa, o candidato precisa alcançar 20 votos.\nA votação durará 10 horas.\n\nOs candidatos são:\n\n${candidatos.map((a, i) => `${emojis[i + 1]} - <@${a.id}> (${a.votos} votos)`).join('\n')}`);

													await msg.edit(author, embed).then(async (msg6) => {
														await this.client.database.guilds.findOneAndUpdate({
															_id: message.guild.id
														}, {
															$set: {
																'cidade.eleicao.existe': true,
																'cidade.eleicao.cooldown': Date.now(),
																'cidade.eleicao.message': msg6.id,
																'cidade.eleicao.channel': msg6.channel.id
															}
														});

														await msg6.react('1️⃣');
														await msg6.react('2️⃣');
														await msg6.react('3️⃣');

														const um = await msg6.createReactionCollector((r, u) => r.emoji.name === '1️⃣' && u.id !== this.client.user.id, {
															time: 36000000
														});

														const dois = await msg6.createReactionCollector((r, u) => r.emoji.name === '2️⃣' && u.id !== this.client.user.id, {
															time: 36000000
														});

														const tres = await msg6.createReactionCollector((r, u) => r.emoji.name === '3️⃣' && u.id !== this.client.user.id, {
															time: 36000000
														});

														const usersId = [];

														um.on('collect', async (reaction, user2) => {
															if (usersId.includes(user2.id)) candidatos[0].votos -= 1;

															if (!usersId.includes(user2.id)) {
																usersId.push(user2.id);
															}

															candidatos[0].votos += 1;

															if (candidatos[0].votos >= 20) {
																um.stop();
																dois.stop();
																tres.stop();

																candidatos[0].votos = 20;

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`🥳 | **Parabéns** <@${candidatos[0].id}>, você acaba de se tornar o novo **Prefeito** da Cidade.\n\nAcesse: o canal de #Prefeitura, caso haja algum e também os comandos de Prefeito para alterar: bolsa, delegado, diretor de hospital entre outros...\n\nUse seu Mandato com sabedoria, seja influente e faça boas amizades para não sofrer um Impeachment.\n\n**Bom Governo!** 🎉 🎉 🎉`);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.governador': candidatos[0].id,
																		'cidade.tempoGovernador': Date.now(),
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}

															embed
																.setDescription(`Está convocada novas eleições para **PREFEITO** na Cidade.\nPara eleger uma pessoa, o candidato precisa alcançar 20 votos.\nA votação durará 10 horas.\n\nOs candidatos são:\n\n${candidatos.map((a, i) => `${emojis[i + 1]} - <@${a.id}> (${a.votos} votos)`).join('\n')}`);

															await msg.edit(author, embed);
															reaction.users.remove(user2.id);
														});

														dois.on('collect', async (reaction, user2) => {
															if (usersId.includes(user2.id)) candidatos[1].votos -= 1;

															if (!usersId.includes(user2.id)) {
																usersId.push(user2.id);
															}

															candidatos[1].votos += 1;

															if (candidatos[1].votos >= 20) {
																um.stop();
																dois.stop();
																tres.stop();

																candidatos[1].votos = 20;

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`🥳 | **Parabéns** <@${candidatos[1].id}>, você acaba de se tornar o novo **Prefeito** da Cidade.\n\nAcesse: o canal de #Prefeitura, caso haja algum e também os comandos de Prefeito para alterar: bolsa, delegado, diretor de hospital entre outros...\n\nUse seu Mandato com sabedoria, seja influente e faça boas amizades para não sofrer um Impeachment.\n\n**Bom Governo!** 🎉 🎉 🎉`);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.governador': candidatos[1].id,
																		'cidade.tempoGovernador': Date.now(),
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}

															embed
																.setDescription(`Está convocada novas eleições para **PREFEITO** na Cidade.\nPara eleger uma pessoa, o candidato precisa alcançar 20 votos.\nA votação durará 10 horas.\n\nOs candidatos são:\n\n${candidatos.map((a, i) => `${emojis[i + 1]} - <@${a.id}> (${a.votos} votos)`).join('\n')}`);

															await msg.edit(author, embed);
															reaction.users.remove(user2.id);
														});

														tres.on('collect', async (reaction, user2) => {
															if (usersId.includes(user2.id)) candidatos[2].votos -= 1;

															if (!usersId.includes(user2.id)) {
																usersId.push(user2.id);
															}

															candidatos[2].votos += 1;

															if (candidatos[2].votos >= 20) {
																um.stop();
																dois.stop();
																tres.stop();

																candidatos[2].votos = 20;

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`🥳 | **Parabéns** <@${candidatos[2].id}>, você acaba de se tornar o novo **Prefeito** da Cidade.\n\nAcesse: o canal de #Prefeitura, caso haja algum e também os comandos de Prefeito para alterar: bolsa, delegado, diretor de hospital entre outros...\n\nUse seu Mandato com sabedoria, seja influente e faça boas amizades para não sofrer um Impeachment.\n\n**Bom Governo!** 🎉 🎉 🎉`);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.governador': candidatos[2].id,
																		'cidade.tempoGovernador': Date.now(),
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}

															embed
																.setDescription(`Está convocada novas eleições para **PREFEITO** na Cidade.\nPara eleger uma pessoa, o candidato precisa alcançar 20 votos.\nA votação durará 10 horas.\n\nOs candidatos são:\n\n${candidatos.map((a, i) => `${emojis[i + 1]} - <@${a.id}> (${a.votos} votos)`).join('\n')}`);

															await msg.edit(author, embed);
															reaction.users.remove(user2.id);
														});

														um.on('end', async (collected, reason) => {
															if (reason === 'time') {
																um.stop();
																dois.stop();
																tres.stop();

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`A Eleição foi Finalizada pois não houve **votos** suficientes para nenhum dos **Candidatos**!\n\nPróxima eleição só poderá ser ocorrida agora daqui a: \`7\`:\`00\`:\`00\`:\`00\``);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}
														});

														dois.on('end', async (collected, reason) => {
															if (reason === 'time') {
																um.stop();
																dois.stop();
																tres.stop();

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`A Eleição foi Finalizada pois não houve **votos** suficientes para nenhum dos **Candidatos**!\n\nPróxima eleição só poderá ser ocorrida agora daqui a: \`7\`:\`00\`:\`00\`:\`00\``);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}
														});

														tres.on('end', async (collected, reason) => {
															if (reason === 'time') {
																um.stop();
																dois.stop();
																tres.stop();

																embed
																	.setTitle('<:Urna:895779255491911740> | Eleição Finalizada')
																	.setDescription(`A Eleição foi Finalizada pois não houve **votos** suficientes para nenhum dos **Candidatos**!\n\nPróxima eleição só poderá ser ocorrida agora daqui a: \`7\`:\`00\`:\`00\`:\`00\``);

																await msg.edit(author, embed);

																await this.client.database.guilds.findOneAndUpdate({
																	_id: message.guild.id
																}, {
																	$set: {
																		'cidade.eleicao.existe': false,
																		'cidade.eleicao.message': '',
																		'cidade.eleicao.channel': ''
																	}
																});

																await msg.reactions.removeAll();
																return;
															}
														});
													});
												});
											});

											collector3.on('end', async (collected, reason) => {
												if (reason === 'time') {
													collector.stop();
													collector2.stop();
													collector3.stop();
													msg.delete();

													return message.reply('você demorou demais para escolher o **TERCEIRO** candidato. Use o comando novamente!');
												}
											});
										});
									});

									collector2.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector.stop();
											collector2.stop();
											msg.delete();

											return message.reply('você demorou demais para escolher o **SEGUNDO** candidato. Use o comando novamente!');
										}
									});
								});
							});

							collector.on('end', async (collected, reason) => {
								if (reason === 'time') {
									collector.stop();
									msg.delete();

									return message.reply('você demorou demais para escolher o **PRIMEIRO** candidato. Use o comando novamente!');
								}
							});
						});
					}
				});

				collectorBotoes.on('end', async (collected, reason) => {
					if (reason === 'time') {
						return msg.edit(`${author}, você demorou demais para escolher. Use o comando novamente!`, {
							components: []
						});
					}
				});
			});
		}
	}

};
