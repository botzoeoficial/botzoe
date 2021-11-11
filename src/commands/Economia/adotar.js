/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Adotar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'adotar';
		this.category = 'Economia';
		this.description = 'Adote um pet!';
		this.usage = 'adotar';
		this.aliases = ['pegar'];

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

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		let presoTime = 0;

		if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			presoTime = 36000000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de tráfico de drogas.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.crime) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de crime.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.prender) {
			presoTime = 43200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de roubo.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			presoTime = 21600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por inventário irregular.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			presoTime = 180000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um veículo.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.velha) {
			presoTime = 300000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Senhora.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.frentista) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Frentista.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.joalheria) {
			presoTime = 900000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Joalheria.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.agiota) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Agiota.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.casaLoterica) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar uma Casa Lotérica.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.brazino) {
			presoTime = 2100000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Brazino777.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.facebook) {
			presoTime = 2700000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Facebook.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.bancoCentral) {
			presoTime = 3600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar hackear o Banco Central.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.shopping) {
			presoTime = 7200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Shopping Center.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else if (user.prisao.isPreso && user.prisao.banco) {
			presoTime = 14400000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				const embed = new ClientEmbed(author)
					.setTitle('👮 | Preso')
					.setDescription(`<:algema:898326104413188157> | Você está preso por tentar roubar um Banco.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			}
		} else {
			const timeoutAdotar = 3600000;

			if (timeoutAdotar - (Date.now() - user.cooldown.usarAdotar) > 0) {
				const faltam = ms(timeoutAdotar - (Date.now() - user.cooldown.usarAdotar));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você atingiu o limite de uso do comando \`${prefix}adotar\`, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						usarAdotar: user.usarAdotar += 1
					}
				});

				if (user.usarAdotar === 10) {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							usarAdotar: 0,
							'cooldown.usarAdotar': Date.now()
						}
					});
				}
			}

			const timeout = 7200000;

			const petsArray = require('../../json/pets.json');

			const randomLendario = Math.floor(Math.random() * 100);

			const randomCategoria = Math.floor(Math.random() * 100);

			if (randomLendario <= 98) {
				if (randomCategoria > 0 && randomCategoria <= 50) {
					const petsComum = Math.floor(Math.random() * petsArray.animais[0].comum.length);

					const embed = new ClientEmbed(author)
						.setTitle('ADOÇÃO!')
						.addField('Animal:', petsArray.animais[0].comum[petsComum].nome)
						.addField('Categoria:', 'COMUM')
						.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/888867937535004702/images.png')
						.setImage(petsArray.animais[0].comum[petsComum].img)
						.addField('Como Adotar:', `**Clique na reação ${petsArray.animais[0].comum[petsComum].pet} para adotar o pet.**`);

					message.channel.send(author, embed).then(async (msg) => {
						await msg.react(petsArray.animais[0].comum[petsComum].pet);

						const sim = msg.createReactionCollector((r, u) => r.emoji.name === petsArray.animais[0].comum[petsComum].pet && u.id === author.id, {
							time: 30000
						});

						sim.on('collect', async () => {
							const user2 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (timeout - (Date.now() - user2.cooldown.adotar) > 0) {
								sim.stop();

								const faltam = ms(timeout - (Date.now() - user2.cooldown.adotar));

								const embed2 = new ClientEmbed(author)
									.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

								return message.channel.send(author, embed2);
							} else if (user2.pets.map((a) => a.animal).includes(petsArray.animais[0].comum[petsComum].pet)) {
								message.channel.send(`${author}, você já tem esse pet!`);
							} else {
								message.channel.send(`${author}, você adotou o animal \`${petsArray.animais[0].comum[petsComum].nome}\` (${petsArray.animais[0].comum[petsComum].pet}) com sucesso! Agora digite o nome dele no chat:`).then((msg2) => {
									const filter = (m) => m.author.id === author.id;
									const collector = msg2.channel.createMessageCollector(filter, {
										time: 30000
									});

									collector.on('collect', async (ce) => {
										if (parseInt(ce.content)) {
											message.channel.send(`${author}, o nome do seu pet não pode ser um número! Digite o nome novamente!`);
										} else if (ce.content.toLowerCase() === '++treinarpet' || ce.content.toLowerCase() === '++treinar-pet') {
											message.channel.send(`${author}, o nome do seu pet não pode ser esse! Digite o nome novamente!`);
										} else {
											sim.stop();
											collector.stop();

											message.channel.send(`${author}, você nomeou o nome do seu pet para \`${ce.content}\` com sucesso.`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													pets: {
														animal: petsArray.animais[0].comum[petsComum].pet,
														nome: ce.content,
														forca: 1,
														idade: 1
													}
												},
												$set: {
													'cooldown.adotar': Date.now()
												}
											});
										}
									});

									collector.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector.stop();

											return message.chanel.send(`${author}, você demorou demais para dar nome ao seu pet, e ele foi devolvido para a adoção!`);
										}
									});
								});
							}
						});

						sim.on('end', async () => {
							sim.stop();
							return;
						});
					});
				} else if (randomCategoria > 50 && randomCategoria <= 85) {
					const petsRaro = Math.floor(Math.random() * petsArray.animais[0].raro.length);

					const embed = new ClientEmbed(author)
						.setTitle('ADOÇÃO!')
						.addField('Animal:', petsArray.animais[0].raro[petsRaro].nome)
						.addField('Categoria:', 'RARO')
						.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/888867937535004702/images.png')
						.setImage(petsArray.animais[0].raro[petsRaro].img)
						.addField('Como Adotar:', `**Clique na reação ${petsArray.animais[0].raro[petsRaro].pet} para adotar o pet.**`);

					message.channel.send(author, embed).then(async (msg) => {
						await msg.react(petsArray.animais[0].raro[petsRaro].pet);

						const sim = msg.createReactionCollector((r, u) => r.emoji.name === petsArray.animais[0].raro[petsRaro].pet && u.id === author.id, {
							time: 30000
						});

						sim.on('collect', async () => {
							const user3 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (timeout - (Date.now() - user3.cooldown.adotar) > 0) {
								sim.stop();

								const faltam = ms(timeout - (Date.now() - user3.cooldown.adotar));

								const embed2 = new ClientEmbed(author)
									.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

								return message.channel.send(author, embed2);
							} else if (user3.pets.map((a) => a.animal).includes(petsArray.animais[0].raro[petsRaro].pet)) {
								message.channel.send(`${author}, você já tem esse pet!`);
							} else {
								message.channel.send(`${author}, você adotou o animal \`${petsArray.animais[0].raro[petsRaro].nome}\` (${petsArray.animais[0].raro[petsRaro].pet}) com sucesso! Agora digite o nome dele no chat:`).then((msg2) => {
									const filter = (m) => m.author.id === author.id;
									const collector = msg2.channel.createMessageCollector(filter, {
										time: 30000
									});

									collector.on('collect', async (ce) => {
										if (parseInt(ce.content)) {
											message.channel.send(`${author}, o nome do seu pet não pode ser um número! Digite o nome novamente!`);
										} else {
											sim.stop();
											collector.stop();

											message.channel.send(`${author}, você nomeou o nome do seu pet para \`${ce.content}\` com sucesso.`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													pets: {
														animal: petsArray.animais[0].raro[petsRaro].pet,
														nome: ce.content,
														forca: 1,
														idade: 1
													}
												},
												$set: {
													'cooldown.adotar': Date.now()
												}
											});
										}
									});

									collector.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector.stop();

											return message.chanel.send(`${author}, você demorou demais para dar nome ao seu pet, e ele foi devolvido para a adoção!`);
										}
									});
								});
							}
						});

						sim.on('end', async () => {
							sim.stop();
							return;
						});
					});
				} else if (randomCategoria > 85) {
					const petsEpico = Math.floor(Math.random() * petsArray.animais[0].epico.length);

					const embed = new ClientEmbed(author)
						.setTitle('ADOÇÃO!')
						.addField('Animal:', petsArray.animais[0].epico[petsEpico].nome)
						.addField('Categoria:', 'ÉPICO')
						.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/888867937535004702/images.png')
						.setImage(petsArray.animais[0].epico[petsEpico].img)
						.addField('Como Adotar:', `**Clique na reação ${petsArray.animais[0].epico[petsEpico].pet} para adotar o pet.**`);

					message.channel.send(author, embed).then(async (msg) => {
						await msg.react(petsArray.animais[0].epico[petsEpico].pet);

						const sim = msg.createReactionCollector((r, u) => r.emoji.name === petsArray.animais[0].epico[petsEpico].pet && u.id === author.id, {
							time: 30000
						});

						sim.on('collect', async () => {
							const user4 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (timeout - (Date.now() - user4.cooldown.adotar) > 0) {
								sim.stop();

								const faltam = ms(timeout - (Date.now() - user4.cooldown.adotar));

								const embed2 = new ClientEmbed(author)
									.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

								return message.channel.send(author, embed2);
							} else if (user4.pets.map((a) => a.animal).includes(petsArray.animais[0].epico[petsEpico].pet)) {
								message.channel.send(`${author}, você já tem esse pet!`);
							} else {
								message.channel.send(`${author}, você adotou o animal \`${petsArray.animais[0].epico[petsEpico].nome}\` (${petsArray.animais[0].epico[petsEpico].pet}) com sucesso! Agora digite o nome dele no chat:`).then((msg2) => {
									const filter = (m) => m.author.id === author.id;
									const collector = msg2.channel.createMessageCollector(filter, {
										time: 30000
									});

									collector.on('collect', async (ce) => {
										if (parseInt(ce.content)) {
											message.channel.send(`${author}, o nome do seu pet não pode ser um número! Digite o nome novamente!`);
										} else {
											sim.stop();
											collector.stop();

											message.channel.send(`${author}, você nomeou o nome do seu pet para \`${ce.content}\` com sucesso.`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													pets: {
														animal: petsArray.animais[0].epico[petsEpico].pet,
														nome: ce.content,
														forca: 1,
														idade: 1
													}
												},
												$set: {
													'cooldown.adotar': Date.now()
												}
											});
										}
									});

									collector.on('end', async (collected, reason) => {
										if (reason === 'time') {
											collector.stop();

											return message.chanel.send(`${author}, você demorou demais para dar nome ao seu pet, e ele foi devolvido para a adoção!`);
										}
									});
								});
							}
						});

						sim.on('end', async () => {
							sim.stop();
							return;
						});
					});
				}
			} else if (randomLendario > 98) {
				const embed = new ClientEmbed(author)
					.setTitle('ADOÇÃO!')
					.addField('Animal:', 'Coruja')
					.addField('Categoria:', 'LENDÁRIO')
					.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/888867937535004702/images.png')
					.setImage('https://media.discordapp.net/attachments/887089600726720512/888887858469933086/coruja-das-neves-780x405.png')
					.addField('Como Adotar:', `**Clique na reação 🦉 para adotar o pet.**`);

				message.channel.send(author, embed).then(async (msg) => {
					await msg.react('🦉');

					const sim = msg.createReactionCollector((r, u) => r.emoji.name === '🦉' && u.id === author.id, {
						time: 30000
					});

					sim.on('collect', async () => {
						const user5 = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (timeout - (Date.now() - user5.cooldown.adotar) > 0) {
							sim.stop();

							const faltam = ms(timeout - (Date.now() - user5.cooldown.adotar));

							const embed2 = new ClientEmbed(author)
								.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

							return message.channel.send(author, embed2);
						} else if (user5.pets.map((a) => a.animal).includes('🦉')) {
							message.channel.send(`${author}, você já tem esse pet!`);
						} else {
							message.channel.send(`${author}, você adotou o animal \`Coruja\` (🦉) com sucesso! Agora digite o nome dele no chat:`).then((msg2) => {
								const filter = (m) => m.author.id === author.id;
								const collector = msg2.channel.createMessageCollector(filter, {
									time: 30000
								});

								collector.on('collect', async (ce) => {
									if (parseInt(ce.content)) {
										message.channel.send(`${author}, o nome do seu pet não pode ser um número! Digite o nome novamente!`);
									} else {
										sim.stop();
										collector.stop();

										message.channel.send(`${author}, você nomeou o nome do seu pet para \`${ce.content}\` com sucesso.`);

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												pets: {
													animal: '🦉',
													nome: ce.content,
													forca: 1,
													idade: 1
												}
											},
											$set: {
												'cooldown.adotar': Date.now()
											}
										});
									}
								});

								collector.on('end', async (collected, reason) => {
									if (reason === 'time') {
										collector.stop();

										return message.chanel.send(`${author}, você demorou demais para dar nome ao seu pet, e ele foi devolvido para a adoção!`);
									}
								});
							});
						}
					});

					sim.on('end', async () => {
						sim.stop();
						return;
					});
				});
			}
		}
	}

};
