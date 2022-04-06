/* eslint-disable arrow-body-style */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const User = require('../../database/Schemas/User');

module.exports = class Golpedeestado extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'golpedeestado';
		this.category = 'Cidade';
		this.description = 'Inicie um Golpe de Estado na Cidade!';
		this.usage = 'golpedeestado';
		this.aliases = ['golpe-deestado', 'golpe-de-estado'];

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
		args,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.level < 2) {
			return message.reply({
				content: 'Você precisa ser level **2** para iniciar um Golpe de Estado!'
			});
		}

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		if (server.cidade.governador === '') {
			return message.reply({
				content: `Essa Cidade não possui Prefeito ainda. Use o comando \`${prefix}addprefeito\`!`
			});
		}

		const {
			channel
		} = server.cidade.impeachment;
		const msg1 = server.cidade.impeachment.message;

		if (server.cidade.impeachment.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`${author}, não é possível abrir um Golpe de Estado pois está rolando um **Impeachment** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel}/${msg1})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const channel2 = server.cidade.eleicao.channel;
		const msg2 = server.cidade.eleicao.message;

		if (server.cidade.eleicao.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Eleição')
				.setDescription(`${author}, não é possível abrir um Golpe de Estado pois está rolando uma **Eleição** na Cidade.\n\n> [Clique Aqui para Ir Nela](https://discord.com/channels/${message.guild.id}/${channel2}/${msg2})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const channel3 = server.cidade.golpeEstado.channel;
		const msg3 = server.cidade.golpeEstado.message;

		if (server.cidade.golpeEstado.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('🕵️ | Golpe de Estado')
				.setDescription(`${author}, já está rolando um **Golpe de Estado** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel3}/${msg3})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const timeout = 604800000;

		if (timeout - (Date.now() - server.cidade.golpeEstado.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.golpeEstado.cooldown));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

			if (!canal) {
				return message.reply({
					content: 'Você precisa mencionar um canal onde será iniciado o Golpe de Estado!'
				});
			}

			message.reply({
				content: `**Golpe de Estado** iniciado com sucesso no canal: <#${canal.id}>.`
			});
			message.delete();

			let votos = 0;
			const usersId = [];

			const embed = new ClientEmbed(this.client.user)
				.setTitle('🕵️ | Golpe de Estado')
				.setDescription(`Ao chegar em **30 votos**, a Cidade se tornará um caos por 5 horas.\n\nTodos da Cidade irão perder seus cargos: **Prefeito**, **Delegado**, **Policial**, **Carcereiro**, **Diretor Hospital** e **Médicos**.\n\nApós as 5 horas, o último **Delegado** se torna **Prefeito**, podendo eleger os novos cargos!\n\n**🕵️:** ${votos} voto(s)`);

			canal.send({
				embeds: [embed]
			}).then(async (msg) => {
				await this.client.database.guilds.findOneAndUpdate({
					_id: message.guild.id
				}, {
					$set: {
						'cidade.golpeEstado.existe': true,
						'cidade.golpeEstado.cooldown': Date.now(),
						'cidade.golpeEstado.message': msg.id,
						'cidade.golpeEstado.channel': msg.channel.id,
						'cidade.golpeEstado.caos': false
					}
				});

				await msg.react('🕵️');

				const filter2 = (reaction, user3) => {
					return reaction.emoji.name === '🕵️' && user3.id !== this.client.user.id;
				};

				const votacao = msg.createReactionCollector({
					filter: filter2,
					time: 18000000
				});

				votacao.on('collect', async (reaction, user2) => {
					if (usersId.includes(user2.id)) votos -= 1;

					if (!usersId.includes(user2.id)) {
						usersId.push(user2.id);
					}

					votos += 1;

					if (votos >= 30) {
						votacao.stop();

						votos = 30;

						embed
							.setTitle('🕵️ | Golpe de Estado Finalizado!')
							.setDescription(`O Golpe de Estado foi terminado com êxito, e por isso agora a Cidade está em **caos** por 5 horas!\n\nCargos na Cidade:\n**Prefeito:** ${server.cidade.delegado === '' ? 'Ninguém ainda. Espere terminar o **caos** para um novo Prefeito.' : `<@${server.cidade.delegado}>`}\n**Delegado:** Ninguém\n**Policiais:** Nenhum\n**Carcereiros:** Nenhum\n**Diretor do Hospital:** Ninguém\n**Médicos:** Nenhum`);

						await msg.edit({
							content: author.toString(),
							embeds: [embed]
						});

						await msg.reactions.removeAll();

						const allUsers = await User.find({
							guildId: message.guild.id
						});

						allUsers.forEach(async (a) => {
							if (a.policia.isPolice) {
								a.policia.isPolice = false;
								a.policia.prender = 0;
								a.policia.revistar = 0;
								a.policia.prenderRoubar = 0;
								a.policia.prenderExportador = 0;
								a.policia.isFolga = false;

								a.save();
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.golpeEstado.existe': false,
								'cidade.golpeEstado.cooldown': 0,
								'cidade.golpeEstado.message': '',
								'cidade.golpeEstado.channel': '',
								'cidade.golpeEstado.caos': true,
								'cidade.policiais': [],
								'cidade.carcereiro': [],
								'cidade.diretorHP': '',
								'cidade.medicos': []
							}
						});

						setTimeout(async () => {
							const server2 = await this.client.database.guilds.findOne({
								_id: message.guild.id
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.golpeEstado.existe': false,
									'cidade.golpeEstado.cooldown': 0,
									'cidade.golpeEstado.message': '',
									'cidade.golpeEstado.channel': '',
									'cidade.golpeEstado.caos': false,
									'cidade.governador': server2.cidade.delegado === '' ? '' : server2.cidade.delegado,
									'cidade.delegado': ''
								}
							});
						}, 18000000);

						return;
					}

					embed
						.setDescription(`Ao chegar em **30 votos**, a Cidade se tornará um caos por 5 horas.\n\nTodos da Cidade irão perder seus cargos: **Prefeito**, **Delegado**, **Policial**, **Carcereiro**, **Diretor Hospital** e **Médicos**.\n\nApós as 5 horas, o último **Delegado** se torna **Prefeito**, podendo eleger os novos cargos!\n\n**🕵️:** ${votos} voto(s)`);

					await msg.edit({
						content: author.toString(),
						embeds: [embed]
					});

					return reaction.users.remove(user2.id);
				});
			});
		}
	}

};
