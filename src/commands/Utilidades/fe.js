/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Fe extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fe';
		this.category = 'Utilidades';
		this.description = 'Faça um evento família!';
		this.usage = 'fe';
		this.aliases = ['family-event'];

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

		const embedPreso = new ClientEmbed(author)
			.setTitle('👮 | Preso');

		if (user.prisao.isPreso && user.prisao.prenderCmd) {
			presoTime = user.prisao.prenderMili;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			presoTime = 36000000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.prender) {
			presoTime = 43200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			presoTime = 21600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			presoTime = 180000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.velha) {
			presoTime = 300000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.frentista) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.joalheria) {
			presoTime = 900000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.agiota) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.casaLoterica) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.brazino) {
			presoTime = 2100000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.facebook) {
			presoTime = 2700000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.bancoCentral) {
			presoTime = 3600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.shopping) {
			presoTime = 7200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.banco) {
			presoTime = 14400000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else {
			const user2 = await this.client.database.users.findOne({
				userId: user.marry.user,
				guildId: message.guild.id
			});

			if (!user.marry.has) return message.reply(`você não está casado! Use o comando \`${prefix}casar\`.`);

			if (user.familia.length <= 0) return message.reply(`você não tem filhos ainda! Use o comando \`${prefix}gf\`.`);

			const timeout = 3600000;

			if (timeout - (Date.now() - user.cooldown.fe) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.fe));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			} else {
				const randomFilhos = Math.floor(Math.random() * user.familia.length);

				if (user.familia[randomFilhos].idade >= 18) {
					const random = Math.floor(Math.random() * 100);

					if (random <= 30) {
						const mortes = [
							`**${user.familia[randomFilhos].nome}** teve um ataque cardíaco correndo uma Maratona, e morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
							`**${user.familia[randomFilhos].nome}** não olhou para os dois lados ao atravessar um sinal e foi atropelada, ele(a) morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
							`**${user.familia[randomFilhos].nome}** pegou Covid-19, foi internado mas não resistiu aos sintomas, ele(a) morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
							`**${user.familia[randomFilhos].nome}** foi vítima de uma bala perdida no RJ e morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`
						];

						const resposta = mortes[Math.floor(Math.random() * mortes.length)];

						const embed = new ClientEmbed(author)
							.setTitle('EVENTO FAMÍLIA!')
							.setDescription(`${author}, ${resposta}`);

						message.channel.send(author, embed);

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$pull: {
								familia: {
									nome: user.familia[randomFilhos].nome
								}
							},
							$set: {
								'cooldown.fe': Date.now()
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: user.marry.user,
							guildId: message.guild.id
						}, {
							$pull: {
								familia: {
									nome: user2.familia[randomFilhos].nome
								}
							}
						});
					} else if (random >= 31) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id,
							'familia.nome': user.familia[randomFilhos].nome
						}, {
							$set: {
								'familia.$.idade': user.familia[randomFilhos].idade += 1,
								'cooldown.fe': Date.now()
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: user.marry.user,
							guildId: message.guild.id,
							'familia.nome': user2.familia[randomFilhos].nome
						}, {
							$set: {
								'familia.$.idade': user2.familia[randomFilhos].idade += 1
							}
						});

						const embed = new ClientEmbed(author)
							.setTitle('EVENTO FAMÍLIA!')
							.setDescription(`${author}, **${user.familia[randomFilhos].nome}** completou **${user.familia[randomFilhos].idade}** anos de idade! 🎉`);

						message.channel.send(author, embed);
					}
				} else if (user.familia[randomFilhos].idade <= 17) {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id,
						'familia.nome': user.familia[randomFilhos].nome
					}, {
						$set: {
							'familia.$.idade': user.familia[randomFilhos].idade += 1,
							'cooldown.fe': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: user.marry.user,
						guildId: message.guild.id,
						'familia.nome': user2.familia[randomFilhos].nome
					}, {
						$set: {
							'familia.$.idade': user2.familia[randomFilhos].idade += 1
						}
					});

					const embed = new ClientEmbed(author)
						.setTitle('EVENTO FAMÍLIA!')
						.setDescription(`${author}, **${user.familia[randomFilhos].nome}** completou **${user.familia[randomFilhos].idade}** anos de idade! 🎉`);

					message.channel.send(author, embed);
				}
			}
		}
	}

};
