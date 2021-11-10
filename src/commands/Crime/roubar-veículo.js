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

		if (user.policia.isPolice) return message.reply('você não pode usar esse comando pois você é Policial do servidor!');

		let presoTime = 0;
		const timeout = 300000;

		if (timeout - (Date.now() - user.cooldown.roubarVeiculo) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.roubarVeiculo));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você ainda está cansado da última vez! Você pode tentar novamente em: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else if (user.prisao.isPreso && user.prisao.traficoDrogas) {
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
			const randomChance = Math.floor(Math.random() * 101);

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

				message.channel.send(author, embed);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.roubarVeiculo': Date.now()
					}
				});

				setTimeout(async () => {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'cooldown.roubarVeiculo': 0
						}
					});
				}, 300000);
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

				message.channel.send(author, embed);

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
							'cooldown.roubarVeiculo': 0,
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

					carQuery.getModelDetail(random).then(async car => {
						const embed = new ClientEmbed(author)
							.setTitle('Veículo Roubado')
							.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].comuns[carrosComum].nome}\``)
							.addField('Modelo:', carrosArray.carros[0].comuns[carrosComum].marca, true)
							.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].comuns[carrosComum].valor))},00`, true)
							.addField('Danificado:', `${randomDano}%`, true)
							.addField('Velocidade:', `${Number(carrosArray.carros[0].comuns[carrosComum].velocidade)} KM/h`, true)
							.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].comuns[carrosComum].cavalo)} HP`, true)
							.addField('Peso:', `${Number(car.weightKilograms)} KG`, true)
							.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].comuns[carrosComum].valor))},00`, true)
							.setImage(carrosArray.carros[0].comuns[carrosComum].img);

						message.channel.send(author, embed);

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
									liberado: false
								}
							}
						});
					});
				} else if (randomCategoria > 70 && randomCategoria <= 88) {
					// raros

					const carrosRaros = Math.floor(Math.random() * carrosArray.carros[0].raros.length);
					const randomDano = Math.floor(Math.random() * 91);
					const random = Math.floor(Math.random() * 59001);
					const porcentagem = 30 / 100;

					carQuery.getModelDetail(random).then(async car => {
						const embed = new ClientEmbed(author)
							.setTitle('Veículo Roubado')
							.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].raros[carrosRaros].nome}\``)
							.addField('Modelo:', carrosArray.carros[0].raros[carrosRaros].marca, true)
							.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].raros[carrosRaros].valor))},00`, true)
							.addField('Danificado:', `${randomDano}%`, true)
							.addField('Velocidade:', `${Number(carrosArray.carros[0].raros[carrosRaros].velocidade)} KM/h`, true)
							.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].raros[carrosRaros].cavalo)} HP`, true)
							.addField('Peso:', `${Number(car.weightKilograms)} KG`, true)
							.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].raros[carrosRaros].valor))},00`, true)
							.setImage(carrosArray.carros[0].raros[carrosRaros].img);

						message.channel.send(author, embed);

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
									liberado: false
								}
							}
						});
					});
				} else if (randomCategoria > 88 && randomCategoria <= 97) {
					// epicos

					const carrosEpicos = Math.floor(Math.random() * carrosArray.carros[0].epicos.length);
					const randomDano = Math.floor(Math.random() * 91);
					const random = Math.floor(Math.random() * 59001);
					const porcentagem = 30 / 100;

					carQuery.getModelDetail(random).then(async car => {
						const embed = new ClientEmbed(author)
							.setTitle('Veículo Roubado')
							.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].epicos[carrosEpicos].nome}\``)
							.addField('Modelo:', carrosArray.carros[0].epicos[carrosEpicos].marca, true)
							.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].epicos[carrosEpicos].valor))},00`, true)
							.addField('Danificado:', `${randomDano}%`, true)
							.addField('Velocidade:', `${Number(carrosArray.carros[0].epicos[carrosEpicos].velocidade)} KM/h`, true)
							.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].epicos[carrosEpicos].cavalo)} HP`, true)
							.addField('Peso:', `${Number(car.weightKilograms)} KG`, true)
							.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].epicos[carrosEpicos].valor))},00`, true)
							.setImage(carrosArray.carros[0].epicos[carrosEpicos].img);

						message.channel.send(author, embed);

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
									liberado: false
								}
							}
						});
					});
				} else if (randomCategoria > 97 && randomCategoria <= 99) {
					// epicos 2

					const carrosEpicos2 = Math.floor(Math.random() * carrosArray.carros[0].epicos2.length);
					const randomDano = Math.floor(Math.random() * 91);
					const random = Math.floor(Math.random() * 59001);
					const porcentagem = 30 / 100;

					carQuery.getModelDetail(random).then(async car => {
						const embed = new ClientEmbed(author)
							.setTitle('Veículo Roubado')
							.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].epicos2[carrosEpicos2].nome}\``)
							.addField('Modelo:', carrosArray.carros[0].epicos2[carrosEpicos2].marca, true)
							.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor))},00`, true)
							.addField('Danificado:', `${randomDano}%`, true)
							.addField('Velocidade:', `${Number(carrosArray.carros[0].epicos2[carrosEpicos2].velocidade)} KM/h`, true)
							.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].epicos2[carrosEpicos2].cavalo)} HP`, true)
							.addField('Peso:', `${Number(car.weightKilograms)} KG`, true)
							.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].epicos2[carrosEpicos2].valor))},00`, true)
							.setImage(carrosArray.carros[0].epicos2[carrosEpicos2].img);

						message.channel.send(author, embed);

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
									liberado: false
								}
							}
						});
					});
				} else if (randomCategoria > 99) {
					// lendario

					const carrosLendarios = Math.floor(Math.random() * carrosArray.carros[0].lendario.length);
					const randomDano = Math.floor(Math.random() * 91);
					const random = Math.floor(Math.random() * 59001);
					const porcentagem = 30 / 100;

					carQuery.getModelDetail(random).then(async car => {
						const embed = new ClientEmbed(author)
							.setTitle('Veículo Roubado')
							.setDescription(`✅ Você Roubou um: \`${carrosArray.carros[0].lendario[carrosLendarios].nome}\``)
							.addField('Modelo:', carrosArray.carros[0].lendario[carrosLendarios].marca, true)
							.addField('Valor:', `R$${Utils.numberFormat(Number(carrosArray.carros[0].lendario[carrosLendarios].valor))},00`, true)
							.addField('Danificado:', `${randomDano}%`, true)
							.addField('Velocidade:', `${Number(carrosArray.carros[0].lendario[carrosLendarios].velocidade)} KM/h`, true)
							.addField('Cavalos de Força:', `${Number(carrosArray.carros[0].lendario[carrosLendarios].cavalo)} HP`, true)
							.addField('Peso:', `${Number(car.weightKilograms)} KG`, true)
							.addField('Valor para Desmanche:', `R$${Utils.numberFormat(porcentagem * Number(carrosArray.carros[0].lendario[carrosLendarios].valor))},00`, true)
							.setImage(carrosArray.carros[0].lendario[carrosLendarios].img);

						message.channel.send(author, embed);

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
									liberado: false
								}
							}
						});
					});
				}
			}
		}
	}

};
