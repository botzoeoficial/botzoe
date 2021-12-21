/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');

module.exports = class Exportador extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'exportador';
		this.category = 'Crime';
		this.description = 'Veja se o exportador de drogas está na cidade!';
		this.usage = 'exportador';
		this.aliases = ['exportador-drogas'];

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

		const irEmbora = 600000;
		const faltamHora = ms(irEmbora - (Date.now() - server.exportador.irEmbora));

		const embed = new ClientEmbed(author)
			.setTitle('Exportador de Drogas')
			.setDescription(server.exportador.precisandoDroga === 'Nenhuma Droga' ? 'O Exportador não está na Cidade.' : `O Exportador de Drogas está precisando de **${server.exportador.precisandoQuantia}KG** de **${server.exportador.precisandoDroga}**, para levar a Europa.`)
			.addField('Tempo para ir embora:', irEmbora - (Date.now() - server.exportador.irEmbora) > 0 ? `\`${faltamHora.days}\`d \`${faltamHora.hours}\`h \`${faltamHora.minutes}\`m \`${faltamHora.seconds}\`s` : `\`0\`d \`0\`h \`0\`m \`0\`s`)
			.addField('Quantidade que falta para a exportação:', `${server.exportador.quantiaQueFalta}/${server.exportador.precisandoQuantia}`);

		message.channel.send(author, embed).then(async (msg) => {
			if (server.exportador.precisandoDroga === 'Nenhuma Droga') return;

			await msg.react('📦');

			const filtro = (reaction, user) => reaction.emoji.name === '📦' && user.id === author.id;
			const coletor = msg.createReactionCollector(filtro, {
				time: 600000,
				max: 1
			});

			coletor.on('collect', async () => {
				const userAuthor = await this.client.database.users.findOne({
					userId: author.id,
					guildId: message.guild.id
				});

				let presoTime = 0;

				if (userAuthor.prisao.isPreso && userAuthor.prisao.traficoDrogas) {
					presoTime = 36000000;

					if (presoTime - (Date.now() - userAuthor.prisao.tempo) > 0) {
						const faltam = ms(presoTime - (Date.now() - userAuthor.prisao.tempo));

						const embedPreso = new ClientEmbed(this.client.user)
							.setTitle('👮 | Preso')
							.setDescription(`<:algema:898326104413188157> | Você está preso por tentativa de tráfico de drogas.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

						return message.channel.send(author, embedPreso);
					}
				} else if (!userAuthor.isMochila) {
					return message.channel.send(`${author}, você não possui uma **Mochila**. Vá até Loja > Utilidades e Compre uma!`).then((b) => b.delete({
						timeout: 5000
					}));
				} else if (!userAuthor.mochila.find((a) => a.item === server.exportador.precisandoDroga)) {
					return message.channel.send(`${author}, você não possui **${server.exportador.precisandoDroga}** na sua mochila para vender ela.`).then((b) => b.delete({
						timeout: 5000
					}));
				} else {
					const randomDrogaUser = Math.floor(Math.random() * Math.min(server.exportador.precisandoQuantia, userAuthor.mochila.find((a) => a.item === server.exportador.precisandoDroga).quantia));

					server.exportador.quantiaQueFalta += randomDrogaUser;
					server.save();

					await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id
					}, {
						$set: {
							'exportador.quantiaQueFalta': server.exportador.quantiaQueFalta
						}
					});

					if (server.exportador.quantiaQueFalta >= server.exportador.precisandoQuantia) {
						server.exportador.quantiaQueFalta = server.exportador.precisandoQuantia;

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'exportador.precisandoQuantia': 0,
								'exportador.precisandoDroga': 'Nenhuma Droga',
								'exportador.irEmbora': 0,
								'exportador.quantiaQueFalta': 0
							}
						});

						coletor.stop();

						const embedTchau = new ClientEmbed(this.client.user)
							.setTitle('Exportando Drogas')
							.setDescription(`O exportador de drogas encheu seu lote de drogas para levar a Europa. Ele só irá voltar daqui a ${Utils.convertMS(17280000)}!`);

						return message.channel.send(embedTchau);
					}

					let valor = 0;

					if (server.exportador.precisandoDroga === 'Maconha') {
						valor = randomDrogaUser * 30;
					} else if (server.exportador.precisandoDroga === 'Cocaína') {
						valor = randomDrogaUser * 50;
					} else if (server.exportador.precisandoDroga === 'LSD') {
						valor = randomDrogaUser * 70;
					} else if (server.exportador.precisandoDroga === 'Metanfetamina') {
						valor = randomDrogaUser * 90;
					}

					const embedExportada = new ClientEmbed(this.client.user)
						.setTitle('Exportando Drogas')
						.setDescription(`${author}, você repassou **${randomDrogaUser}KG** de **${server.exportador.precisandoDroga}** para o exportador, e recebeu **R$${Utils.numberFormat(valor)},00**.`);

					message.channel.send(author, embedExportada).then(async (msg1) => {
						await msg1.react('👮');

						const filtro2 = (reaction3, user3) => reaction3.emoji.name === '👮' && (server.cidade.policiais.map(a => a.id).includes(user3.id) || server.cidade.delegado === user3.id);
						const coletor2 = msg1.createReactionCollector(filtro2, {
							time: 4000,
							max: 1
						});

						coletor2.on('collect', async (reaction, user) => {
							const userPolicia = await this.client.database.users.findOne({
								userId: user.id,
								guildId: message.guild.id
							});

							if (userPolicia.policia.isFolga) return message.reply('o Delegado do servidor deu uma folga para todos os **Policiais** do servidor, portanto, você não pode prender ninguém ainda!');

							const timeoutRoubar = 300000;

							if (timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador) > 0) {
								const faltam = ms(timeoutRoubar - (Date.now() - userPolicia.policia.prenderExportador));

								const embedRoubar = new ClientEmbed(this.client.user)
									.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

								return message.channel.send(`<@${user.id}>`, embedRoubar);
							} else {
								const embedPolicia = new ClientEmbed(this.client.user)
									.setTitle('Prisão')
									.setDescription(`${author}, você foi preso em flagrante por <@${user.id}>, ao traficar drogas. Todo o dinheiro e drogas foram confiscados. Agora você passará um tempinho na Cadeia.`);

								message.channel.send(author, embedPolicia);

								server.exportador.quantiaQueFalta -= randomDrogaUser;

								await this.client.database.users.findOneAndUpdate({
									userId: user.id,
									guildId: message.guild.id
								}, {
									$set: {
										'policia.prenderExportador': Date.now()
									}
								});

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										'exportador.quantiaQueFalta': server.exportador.quantiaQueFalta
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										'prisao.isPreso': true,
										'prisao.tempo': Date.now(),
										'prisao.traficoDrogas': true
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': server.exportador.precisandoDroga
								}, {
									$set: {
										'mochila.$.quantia': userAuthor.mochila.find((a) => a.item === server.exportador.precisandoDroga).quantia - randomDrogaUser
									}
								});

								setTimeout(async () => {
									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											'prisao.isPreso': false,
											'prisao.tempo': 0,
											'prisao.traficoDrogas': false
										}
									});
								}, 36000000);

								return;
							}
						});

						coletor2.on('end', async (collected, reason) => {
							if (reason === 'time') {
								coletor2.stop();

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: msg.guild.id
								}, {
									$set: {
										saldo: userAuthor.saldo + valor
									}
								});

								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: msg.guild.id,
									'mochila.item': server.exportador.precisandoDroga
								}, {
									$set: {
										'mochila.$.quantia': userAuthor.mochila.find((a) => a.item === server.exportador.precisandoDroga).quantia - randomDrogaUser
									}
								});

								return;
							}
						});
					});
				}
			});

			coletor.on('end', async (collected, reason) => {
				if (reason === 'time') {
					coletor.stop();
					return message.reply('você demorou demais para enviar suas drogas. Use o comando novamente!');
				}
			});
		});
	}

};
