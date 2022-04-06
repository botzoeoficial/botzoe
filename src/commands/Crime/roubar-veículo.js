/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	CarQuery
} = require('car-query');
const carQuery = new CarQuery();
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Roubarveículo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'roubarveículo';
		this.category = 'Crime';
		this.description = 'Roube um veículo aleatório!';
		this.usage = 'roubar-veículo';
		this.aliases = ['roubar-veículo', 'roubarveiculo', 'roubar-veículo', 'roubarcarro'];

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

		if (user.hp.vida < 50) {
			const embedVida = new ClientEmbed(author)
				.setTitle('😨 | Você está ferido!')
				.setDescription(`Você se feriu, e não consegue realizar esta ação.\nVá até o **Hospital ${message.guild.name}** para se recuperar e receber **tratamento**.\n\nUse o comando \`${prefix}entradahospital\` para um Médico iniciar seu **tratamento**.`);

			return message.reply({
				content: author.toString(),
				embeds: [embedVida]
			});
		}

		const server2 = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server2.cidade.governador === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Prefeito do servidor!'
			});
		}

		if (server2.cidade.delegado === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Delegado do servidor!'
			});
		}

		if (user.policia.isPolice) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Policial do servidor!'
			});
		}

		if (server2.cidade.carcereiro.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Carcereiro do servidor!'
			});
		}

		if (server2.cidade.diretorHP === author.id) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Diretor do Hospital do servidor!'
			});
		}

		if (server2.cidade.medicos.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você não pode usar esse comando pois você é Médico do servidor!'
			});
		}

		if (user.prisao.isPreso) {
			let presoTime = 0;

			const embedPreso = new ClientEmbed(author)
				.setTitle('👮 | Preso');

			if (user.prisao.prenderCmd) {
				presoTime = user.prisao.prenderMili;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.traficoDrogas) {
				presoTime = 36000000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.prender) {
				presoTime = 43200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.revistar) {
				presoTime = 21600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.roubarVeiculo) {
				presoTime = 180000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.atirarPrisao) {
				presoTime = 129600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.velha) {
				presoTime = 300000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.frentista) {
				presoTime = 600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.joalheria) {
				presoTime = 900000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.agiota) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.casaLoterica) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.brazino) {
				presoTime = 2100000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.facebook) {
				presoTime = 2700000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.bancoCentral) {
				presoTime = 3600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.shopping) {
				presoTime = 7200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.banco) {
				presoTime = 14400000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			}

			const buttonPreso = new MessageButton().setCustomId('preso').setEmoji('900544510365405214').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonPreso]);

			const escolha = await message.reply({
				content: author.toString(),
				embeds: [embedPreso],
				components: [botoes]
			});

			const filter = (interaction) => interaction.isButton() && ['preso'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorEscolhas = escolha.createMessageComponentCollector({
				filter,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				switch (b.customId) {
					case 'preso':
						await b.deferUpdate();

						const userMochila = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						if (!userMochila.isMochila) {
							escolha.delete();

							return message.reply({
								content: 'Você não tem uma **mochila**. Vá até a Loja > Utilidades e Compre uma!'
							});
						}

						if (!userMochila.mochila.find((a) => a.item === 'Chave Micha')) {
							escolha.delete();

							return message.reply({
								content: 'Você não tem uma **Chave Micha** na sua Mochila!'
							});
						}

						if (userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia > 1) {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id,
								'mochila.item': 'Chave Micha'
							}, {
								$set: {
									'mochila.$.quantia': userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia - 1
								}
							});
						} else {
							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$pull: {
									mochila: {
										item: 'Chave Micha'
									}
								}
							});
						}

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'prisao.isPreso': false,
								'prisao.tempo': 0,
								'prisao.prenderCmd': false,
								'prisao.prenderMili': 0,
								'prisao.traficoDrogas': false,
								'prisao.crime': false,
								'prisao.prender': false,
								'prisao.revistar': false,
								'prisao.roubarVeiculo': false,
								'prisao.atirarPrisao': false,
								'prisao.velha': false,
								'prisao.frentista': false,
								'prisao.joalheria': false,
								'prisao.agiota': false,
								'prisao.casaLoterica': false,
								'prisao.brazino': false,
								'prisao.facebook': false,
								'prisao.bancoCentral': false,
								'prisao.shopping': false,
								'prisao.banco': false
							}
						});

						escolha.delete();
						return message.reply({
							content: `Você usou \`x1\` **Chave Micha** e conseguiu sair da prisão com sucesso!`
						});
				}
			});

			collectorEscolhas.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return escolha.edit({
						content: author.toString(),
						embeds: [embedPreso],
						components: []
					});
				}
			});

			return;
		} else {
			const timeout = 300000;

			if (timeout - (Date.now() - user.cooldown.roubarVeiculo) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.roubarVeiculo));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você ainda está cansado da última vez! Você pode tentar novamente em: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.reply({
					content: author.toString(),
					embeds: [embed]
				});
			} else {
				const randomChance = author.id === '463421520686088192' ? Math.floor(Math.random() * 200) : Math.floor(Math.random() * 101);

				if (randomChance >= 0 && randomChance < 51) {
					const randomFrases = [
						'não deu certo, tinha muita polícia passando na rua e você decidiu não roubar o veículo.',
						'durante a fuga você lembrou que não tinha dinheiro para pagar o pedágio, deixou o carro ali e saiu correndo.',
						'sua chave Micha quebrou tentando abrir o veículo, você desistiu e foi embora.',
						'você estava tentando quebrar o vidro de um carro, mas só depois percebeu que ele era Blindado, você disfarçou e foi embora.',
						'você viu um carro legal, só que estava tão nervoso que não conseguiu roubá-lo!'
					];

					const embed = new ClientEmbed(author)
						.setTitle('Tentativa de Roubo!')
						.setDescription(`${author}, ${randomFrases[Math.floor(Math.random() * randomFrases.length)]}`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'cooldown.roubarVeiculo': Date.now()
						}
					});
				} else if (randomChance > 50 && randomChance < 91) {
					const randomFrases = [
						'você ficou sem gasolina e não tinha dinheiro para abastecer, a polícia chegou e te prendeu.',
						'você não sabia dirigir o carro automático e ficou perdido na troca das marchas, a polícia chegou e te prendeu.',
						'na fuga você foi parado em uma blitz, gaguejou e foi descoberto, você foi preso.',
						'quando você tentou roubar o carro, foi notado por um policial, ele imediatamente te prendeu.'
					];

					const embed = new ClientEmbed(author)
						.setTitle('Você foi Preso!')
						.setDescription(`${author}, ${randomFrases[Math.floor(Math.random() * randomFrases.length)]}`);

					message.reply({
						content: author.toString(),
						embeds: [embed]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'cooldown.roubarVeiculo': Date.now(),
							'prisao.isPreso': true,
							'prisao.tempo': Date.now(),
							'prisao.roubarVeiculo': true
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
								'prisao.roubarVeiculo': false
							}
						});
					}, 180000);
				} else if (randomChance > 90) {
					const carrosArray = require('../../json/veiculos.json');

					const randomCategoria = Math.floor(Math.random() * 101);

					if (randomCategoria >= 0 && randomCategoria <= 70) {
						// comuns
						const carrosComum = Math.floor(Math.random() * carrosArray.carros[0].comuns.length);
						const randomDano = Math.floor(Math.random() * 91);
						const random = Math.floor(Math.random() * 59001);
						const porcentagem = 30 / 100;
						const randomPlaca = Math.floor(Math.random() * 10000);

						carQuery.getModelDetail(random).then(async car => {
							const embed = new ClientEmbed(author)
								.setTitle('Veículo Roubado')
								.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].comuns[carrosComum].nome}\``)
								.addField('Modelo:', carrosArray.carros[0].comuns[carrosComum].marca, true)
								.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].comuns[carrosComum].valor))},00`, true)
								.addField('Danificado:', `${randomDano}%`, true)
								.addField('Velocidade:', `${Number(carrosArray.carros[0].comuns[carrosComum].velocidade)} KM/h`, true)
								.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].comuns[carrosComum].cavalo)} HP`, true)
								.addField('Ano:', `${Number(carrosArray.carros[0].comuns[carrosComum].ano)}`, true)
								.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].comuns[carrosComum].valor))},00`, true)
								.addField('Placa:', `\`${randomPlaca}\``, true)
								.addField('\u200b', '\u200b', true)
								.setImage(carrosArray.carros[0].comuns[carrosComum].img);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.roubarVeiculo': Date.now(),
									'crime.reputacao': user.crime.reputacao + 1,
									'crime.feito': user.crime.feito + 1
								},
								$push: {
									garagem: {
										nome: carrosArray.carros[0].comuns[carrosComum].nome,
										modelo: carrosArray.carros[0].comuns[carrosComum].marca,
										valor: Number(carrosArray.carros[0].comuns[carrosComum].valor),
										ano: Number(carrosArray.carros[0].comuns[carrosComum].ano),
										danificado: Number(randomDano),
										velocidade: Number(carrosArray.carros[0].comuns[carrosComum].velocidade),
										cavalos: Number(carrosArray.carros[0].comuns[carrosComum].cavalo),
										peso: Number(car.weightKilograms),
										desmanche: porcentagem * Number(carrosArray.carros[0].comuns[carrosComum].valor),
										img: carrosArray.carros[0].comuns[carrosComum].img,
										dono: author.id,
										mecanica: false,
										arrumado: false,
										emplacado: false,
										liberado: false,
										placa: String(randomPlaca)
									}
								}
							});
						});

						return;
					} else if (randomCategoria > 70 && randomCategoria <= 88) {
						// raros
						const carrosRaros = Math.floor(Math.random() * carrosArray.carros[0].raros.length);
						const randomDano = Math.floor(Math.random() * 91);
						const random = Math.floor(Math.random() * 59001);
						const porcentagem = 30 / 100;
						const randomPlaca = Math.floor(Math.random() * 10000);

						carQuery.getModelDetail(random).then(async car => {
							const embed = new ClientEmbed(author)
								.setTitle('Veículo Roubado')
								.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].raros[carrosRaros].nome}\``)
								.addField('Modelo:', carrosArray.carros[0].raros[carrosRaros].marca, true)
								.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].raros[carrosRaros].valor))},00`, true)
								.addField('Danificado:', `${randomDano}%`, true)
								.addField('Velocidade:', `${Number(carrosArray.carros[0].raros[carrosRaros].velocidade)} KM/h`, true)
								.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].raros[carrosRaros].cavalo)} HP`, true)
								.addField('Ano:', `${Number(carrosArray.carros[0].raros[carrosRaros].ano)}`, true)
								.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].raros[carrosRaros].valor))},00`, true)
								.addField('Placa:', `\`${randomPlaca}\``, true)
								.addField('\u200b', '\u200b', true)
								.setImage(carrosArray.carros[0].raros[carrosRaros].img);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.roubarVeiculo': Date.now(),
									'crime.reputacao': user.crime.reputacao + 1,
									'crime.feito': user.crime.feito + 1
								},
								$push: {
									garagem: {
										nome: carrosArray.carros[0].raros[carrosRaros].nome,
										modelo: carrosArray.carros[0].raros[carrosRaros].marca,
										valor: Number(carrosArray.carros[0].raros[carrosRaros].valor),
										ano: Number(carrosArray.carros[0].raros[carrosRaros].ano),
										danificado: Number(randomDano),
										velocidade: Number(carrosArray.carros[0].raros[carrosRaros].velocidade),
										cavalos: Number(carrosArray.carros[0].raros[carrosRaros].cavalo),
										peso: Number(car.weightKilograms),
										desmanche: porcentagem * Number(carrosArray.carros[0].raros[carrosRaros].valor),
										img: carrosArray.carros[0].raros[carrosRaros].img,
										dono: author.id,
										mecanica: false,
										arrumado: false,
										emplacado: false,
										liberado: false,
										placa: String(randomPlaca)
									}
								}
							});
						});

						return;
					} else if (randomCategoria > 88 && randomCategoria <= 97) {
						// epicos
						const carrosEpicos = Math.floor(Math.random() * carrosArray.carros[0].epicos.length);
						const randomDano = Math.floor(Math.random() * 91);
						const random = Math.floor(Math.random() * 59001);
						const porcentagem = 30 / 100;
						const randomPlaca = Math.floor(Math.random() * 10000);

						carQuery.getModelDetail(random).then(async car => {
							const embed = new ClientEmbed(author)
								.setTitle('Veículo Roubado')
								.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].epicos[carrosEpicos].nome}\``)
								.addField('Modelo:', carrosArray.carros[0].epicos[carrosEpicos].marca, true)
								.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].epicos[carrosEpicos].valor))},00`, true)
								.addField('Danificado:', `${randomDano}%`, true)
								.addField('Velocidade:', `${Number(carrosArray.carros[0].epicos[carrosEpicos].velocidade)} KM/h`, true)
								.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].epicos[carrosEpicos].cavalo)} HP`, true)
								.addField('Ano:', `${Number(carrosArray.carros[0].epicos[carrosEpicos].ano)}`, true)
								.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].epicos[carrosEpicos].valor))},00`, true)
								.addField('Placa:', `\`${randomPlaca}\``, true)
								.addField('\u200b', '\u200b', true)
								.setImage(carrosArray.carros[0].epicos[carrosEpicos].img);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.roubarVeiculo': Date.now(),
									'crime.reputacao': user.crime.reputacao + 1,
									'crime.feito': user.crime.feito + 1
								},
								$push: {
									garagem: {
										nome: carrosArray.carros[0].epicos[carrosEpicos].nome,
										modelo: carrosArray.carros[0].epicos[carrosEpicos].marca,
										valor: Number(carrosArray.carros[0].epicos[carrosEpicos].valor),
										ano: Number(carrosArray.carros[0].epicos[carrosEpicos].ano),
										danificado: Number(randomDano),
										velocidade: Number(carrosArray.carros[0].epicos[carrosEpicos].velocidade),
										cavalos: Number(carrosArray.carros[0].epicos[carrosEpicos].cavalo),
										peso: Number(car.weightKilograms),
										desmanche: porcentagem * Number(carrosArray.carros[0].epicos[carrosEpicos].valor),
										img: carrosArray.carros[0].epicos[carrosEpicos].img,
										dono: author.id,
										mecanica: false,
										arrumado: false,
										emplacado: false,
										liberado: false,
										placa: String(randomPlaca)
									}
								}
							});
						});

						return;
					} else if (randomCategoria > 97 && randomCategoria <= 99) {
						// epicos 2
						const carrosEpicos2 = Math.floor(Math.random() * carrosArray.carros[0].epicos2.length);
						const randomDano = Math.floor(Math.random() * 91);
						const random = Math.floor(Math.random() * 59001);
						const porcentagem = 30 / 100;
						const randomPlaca = Math.floor(Math.random() * 10000);

						carQuery.getModelDetail(random).then(async car => {
							const embed = new ClientEmbed(author)
								.setTitle('Veículo Roubado')
								.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].epicos2[carrosEpicos2].nome}\``)
								.addField('Modelo:', carrosArray.carros[0].epicos2[carrosEpicos2].marca, true)
								.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor))},00`, true)
								.addField('Danificado:', `${randomDano}%`, true)
								.addField('Velocidade:', `${Number(carrosArray.carros[0].epicos2[carrosEpicos2].velocidade)} KM/h`, true)
								.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].epicos2[carrosEpicos2].cavalo)} HP`, true)
								.addField('Ano:', `${Number(carrosArray.carros[0].epicos2[carrosEpicos2].ano)}`, true)
								.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor))},00`, true)
								.addField('Placa:', `\`${randomPlaca}\``, true)
								.addField('\u200b', '\u200b', true)
								.setImage(carrosArray.carros[0].epicos2[carrosEpicos2].img);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.roubarVeiculo': Date.now(),
									'crime.reputacao': user.crime.reputacao + 1,
									'crime.feito': user.crime.feito + 1
								},
								$push: {
									garagem: {
										nome: carrosArray.carros[0].epicos2[carrosEpicos2].nome,
										modelo: carrosArray.carros[0].epicos2[carrosEpicos2].marca,
										valor: Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor),
										ano: Number(carrosArray.carros[0].epicos2[carrosEpicos2].ano),
										danificado: Number(randomDano),
										velocidade: Number(carrosArray.carros[0].epicos2[carrosEpicos2].velocidade),
										cavalos: Number(carrosArray.carros[0].epicos2[carrosEpicos2].cavalo),
										peso: Number(car.weightKilograms),
										desmanche: porcentagem * Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor),
										img: carrosArray.carros[0].epicos2[carrosEpicos2].img,
										dono: author.id,
										mecanica: false,
										arrumado: false,
										emplacado: false,
										liberado: false,
										placa: String(randomPlaca)
									}
								}
							});
						});

						return;
					} else if (randomCategoria > 99) {
						// lendario
						const carrosLendarios = Math.floor(Math.random() * carrosArray.carros[0].lendario.length);
						const randomDano = Math.floor(Math.random() * 91);
						const random = Math.floor(Math.random() * 59001);
						const porcentagem = 30 / 100;
						const randomPlaca = Math.floor(Math.random() * 10000);

						carQuery.getModelDetail(random).then(async car => {
							const embed = new ClientEmbed(author)
								.setTitle('Veículo Roubado')
								.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].lendario[carrosLendarios].nome}\``)
								.addField('Modelo:', carrosArray.carros[0].lendario[carrosLendarios].marca, true)
								.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].lendario[carrosLendarios].valor))},00`, true)
								.addField('Danificado:', `${randomDano}%`, true)
								.addField('Velocidade:', `${Number(carrosArray.carros[0].lendario[carrosLendarios].velocidade)} KM/h`, true)
								.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].lendario[carrosLendarios].cavalo)} HP`, true)
								.addField('Ano:', `${Number(carrosArray.carros[0].lendario[carrosLendarios].ano)}`, true)
								.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].lendario[carrosLendarios].valor))},00`, true)
								.addField('Placa:', `\`${randomPlaca}\``, true)
								.addField('\u200b', '\u200b', true)
								.setImage(carrosArray.carros[0].lendario[carrosLendarios].img);

							message.reply({
								content: author.toString(),
								embeds: [embed]
							});

							await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									'cooldown.roubarVeiculo': Date.now(),
									'crime.reputacao': user.crime.reputacao + 1,
									'crime.feito': user.crime.feito + 1
								},
								$push: {
									garagem: {
										nome: carrosArray.carros[0].lendario[carrosLendarios].nome,
										modelo: carrosArray.carros[0].lendario[carrosLendarios].marca,
										valor: Number(carrosArray.carros[0].lendario[carrosLendarios].valor),
										ano: Number(carrosArray.carros[0].lendario[carrosLendarios].ano),
										danificado: Number(randomDano),
										velocidade: Number(carrosArray.carros[0].lendario[carrosLendarios].velocidade),
										cavalos: Number(carrosArray.carros[0].lendario[carrosLendarios].cavalo),
										peso: Number(car.weightKilograms),
										desmanche: porcentagem * Number(carrosArray.carros[0].lendario[carrosLendarios].valor),
										img: carrosArray.carros[0].lendario[carrosLendarios].img,
										dono: author.id,
										mecanica: false,
										arrumado: false,
										emplacado: false,
										liberado: false,
										placa: String(randomPlaca)
									}
								}
							});
						});

						return;
					}
				}
			}
		}
	}

};
