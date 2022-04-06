/* eslint-disable no-empty-function */
/* eslint-disable arrow-body-style */
/* eslint-disable no-inline-comments */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable complexity */
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const c = require('colors');
const moment = require('moment');
const ClientEmbed = require('../../structures/ClientEmbed');
moment.locale('pt-BR');
const coldoown = new Set();

module.exports = class messageCreate {

	constructor(client) {
		this.client = client;
	}

	async run(message) {
		try {
			if (message.author.bot) return;

			let server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			let user = await this.client.database.users.findOne({
				userId: message.author.id,
				guildId: message.guild.id
			});

			let client = await this.client.database.clientUtils.findOne({
				_id: this.client.user.id
			});

			let shop = await this.client.database.shop.findOne({
				_id: message.guild.id
			});

			if (!server) {
				await this.client.database.guilds.create({
					_id: message.guild.id
				});
			}

			if (!user) {
				await this.client.database.users.create({
					userId: message.author.id,
					guildId: message.guild.id
				});
			}

			if (!client) {
				await this.client.database.clientUtils.create({
					_id: this.client.user.id
				});
			}

			if (!shop) {
				await this.client.database.shop.create({
					_id: message.guild.id
				});
			}

			server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			user = await this.client.database.users.findOne({
				userId: message.author.id,
				guildId: message.guild.id
			});

			client = await this.client.database.clientUtils.findOne({
				_id: this.client.user.id
			});

			shop = await this.client.database.shop.findOne({
				_id: message.guild.id
			});

			const {
				prefix
			} = server;

			if (message.content.match(GetMention(this.client.user.id))) {
				const embed = new ClientEmbed(message.author)
					.setTitle(`🦉 | ${this.client.user.username}`)
					.setThumbnail(this.client.user.displayAvatarURL())
					.addField('⁉️ Como me usar?', `Use o comando \`${prefix}ajuda\` para saber todos os meus comandos!`)
					.addField('⚙️ Meu Prefix:', `\`${prefix}\``)
					.addField('⚒️ Editores:', !server.editor.length ? 'Esse servidor não há Editores.' : server.editor.map(a => `<@${a.id}>`).join('\n'));

				return message.reply({
					embeds: [embed]
				});
			}

			if (message.content.indexOf(prefix) !== 0) return;

			const {
				author
			} = message;
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return;

			const comando = await this.client.database.commands.findOne({
				_id: cmd.name
			});

			if (comando) {
				if (user.hp.tratamento && cmd.name !== 'vertratamento' && !cmd.aliases.includes(['ver-tratamento']) && cmd.name !== 'cancelartratamento' && !cmd.aliases.includes(['cancelar-tratamento']) && cmd.name !== 'eval') {
					const embedTratamento = new ClientEmbed(message.author)
						.setTitle('🩸 | Tratamento')
						.setDescription(`Você não pode realizar está ação pois você está em **tratamento hospitalar**!\n\nUse \`${prefix}ver-tratamento\` para ver o andamento do seu **tratamento**.`);

					return message.reply({
						content: author.toString(),
						embeds: [embedTratamento]
					});
				} else if (!user.hp.tratamento && server.hospital.find((a) => a.usuario === author.id) && user.hp.vida <= 0) {
					const embedTratamento = new ClientEmbed(message.author)
						.setTitle('🩸 | Ferido')
						.setDescription(`Você não pode realizar está ação pois você está **ferido** no **Hospital ${message.guild.name}**!\n\nPeça para algum médico iniciar um **tratamento hospitalar** em você!`);

					return message.reply({
						content: author.toString(),
						embeds: [embedTratamento]
					});
				}

				const oneValue = Math.floor(Math.random() * 101);
				const twoValue = Math.floor(Math.random() * 101);

				if (oneValue <= 30) {
					if (twoValue <= 85) {
						await message.react('949360699992326254');

						const filter = (reaction, user2) => {
							return reaction.emoji.id === '949360699992326254' && user2.id !== this.client.user.id;
						};

						const coletor = await message.createReactionCollector({
							filter,
							max: 1
						});

						coletor.on('collect', async (reaction, user3) => {
							const userOvos = await this.client.database.users.findOne({
								userId: user3.id,
								guildId: message.guild.id
							});

							await this.client.database.users.updateOne({
								userId: user3.id,
								guildId: message.guild.id
							}, {
								$set: {
									'ovos.comuns': userOvos.ovos.comuns += 1
								}
							});

							await coletor.stop();
							message.channel.send({
								content: `<:ovo_1:949360699992326254> | <@${user3.id}> conseguiu pegar **1** Ovo com sucesso!`
							});
						});
					} else if (twoValue > 85 && twoValue < 95) {
						await message.react('🥕');

						const filter = (reaction, user4) => {
							return reaction.emoji.name === '🥕' && user4.id !== this.client.user.id;
						};

						const coletor = await message.createReactionCollector({
							filter,
							max: 1
						});

						coletor.on('collect', async (reaction, user5) => {
							await coletor.stop();
							message.channel.send({
								content: `😬 | <@${user5.id}> a caça é de **Ovos** e não de **Cenouras**!`
							});
						});
					} else {
						await message.react('949360699971366933');

						const filter = (reaction, user6) => {
							return reaction.emoji.id === '949360699971366933' && user6.id !== this.client.user.id;
						};

						const coletor = await message.createReactionCollector({
							filter,
							max: 1
						});

						coletor.on('collect', async (reaction, user7) => {
							const userOvos = await this.client.database.users.findOne({
								userId: user7.id,
								guildId: message.guild.id
							});

							await this.client.database.users.updateOne({
								userId: user7.id,
								guildId: message.guild.id
							}, {
								$set: {
									'ovos.lendarios': userOvos.ovos.lendarios += 4
								}
							});

							await coletor.stop();
							message.channel.send({
								content: `<:ovo_2:949360699971366933> | <@${user7.id}> conseguiu pegar **1** Ovo Dourado e ganhou \`+4\` ovos com sucesso!`
							});
						});
					}
				}

				if (comando.manutenção) {
					return message.reply({
						content: `Desculpe, mas este comando está em **manutenção**.\nMotivo: \`${comando.reason}\`.`
					});
				}

				if (client.usersBan.find((a) => a === message.author.id)) {
					return message.reply({
						content: 'Você está banido de usar minhas funções **GLOBALMENTE**!'
					});
				}

				if (server.canal.map(a => a.id).includes(message.channel.id) && cmd.name !== 'channelcmd') {
					return message.reply({
						content: 'Os meus comandos estão **DESATIVADOS** nesse canal!'
					});
				}

				if (cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!['463421520686088192', '707677540583735338', '804677047959027714'].includes(message.author.id)) {
						return message.reply({
							content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
						});
					}
				}

				if (!cmd.owner && cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser \`Editor\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find((a) => a.id === message.author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
						return message.reply({
							content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!message.member.permissions.has('ADMINISTRATOR')) {
						return message.reply({
							content: `Você precisa ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.vip.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser \`VIP\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && cmd.adm && cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.vip.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser \`VIP\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.governador !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Prefeito\` da Cidade para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.delegado !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Delegado\` da Cidade para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.diretorHP !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Diretor do Hospital\` da Cidade para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` da Cidade para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.cidade.donoFabricadeArmas.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser um \`Fabricante das Armas\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.cidade.donoFabricadeDrogas.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser um \`Fabricante das Drogas\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoDesmanche !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Dono do Desmanche\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoLavagem !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Lavagem de Dinheiro\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.cidade.ajudanteDesmanche.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser um \`Ajudante do Desmanche\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && cmd.ajudanteLavagem) {
					if (!server.cidade.ajudanteLavagem.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser um \`Ajudante da Lavagem de Dinheiro\` da Favela para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.governador !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Prefeito\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.governador !== message.author.id && server.cidade.delegado !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Prefeito\` ou \`Delegado\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && !cmd.delegado && cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.governador !== message.author.id && server.cidade.diretorHP !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Prefeito\` ou \`Diretor do Hospital\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && !server.cidade.donoFabricadeArmas.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Fabricante das Armas\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && !server.cidade.donoFabricadeDrogas.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Fabricante das Drogas\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && server.cidade.donoDesmanche !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Dono do Desmanche\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && server.cidade.donoLavagem !== message.author.id) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Dono da Lavagem de Dinheiro\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && server.cidade.donoDesmanche !== message.author.id && !server.cidade.ajudanteDesmanche.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Dono do Desmanche\` ou \`Ajudante do Desmanche\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === message.author.id) && server.cidade.donoLavagem !== message.author.id && !server.cidade.ajudanteLavagem.find((a) => a.id === message.author.id)) {
						return message.reply({
							content: `Você precisa ser o \`Dono da Favela\` ou \`Dono da Lavagem de Dinheiro\` ou \`Ajudante da Lavagem de Dinheiro\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
						});
					}
				}

				if (coldoown.has(message.author.id)) {
					return message.channel.send({
						content: `${author}, você precisa esperar \`3\` segundos para usar algum comando novamente!`
					}).then((a) => setTimeout(() => a.delete(), 3000));
				}

				coldoown.add(message.author.id);

				setTimeout(() => {
					coldoown.delete(message.author.id);
				}, 3000);

				try {
					await cmd.run({
						message,
						args,
						prefix,
						author
					});
				} catch (error) {
					if (error) {
						message.reply({
							content: author.toString(),
							embeds: [
								new ClientEmbed(author)
									.setTitle('⚠️ | ERRO! | ⚠️')
									.setDescription('Aconteceu um erro ao executar o comando, que tal reportar ele para a minha equipe?\nVocê pode relatar ele no meu [servidor de suporte](https://discord.com/invite/vwAgmduqnh).')
									.addField('Erro:', `\`\`\`js\n${error}\`\`\``)
							]
						}).catch(() => {});
					}
				}
			} else {
				await this.client.database.commands.create({
					_id: cmd.name,
					manutenção: false,
					reason: ''
				});

				console.log(c.cyan(`[COMANDO] - Comando ( ${cmd.name} ) teve o seu Documento criado com Sucesso.`));

				try {
					await cmd.run({
						message,
						args,
						prefix,
						author
					});
				} catch (error) {
					if (error) {
						message.reply({
							content: author.toString(),
							embeds: [
								new ClientEmbed(author)
									.setTitle('⚠️ | ERRO! | ⚠️')
									.setDescription('Aconteceu um erro ao executar o comando, que tal reportar ele para a minha equipe?\nVocê pode relatar ele no meu [servidor de suporte](https://discord.com/invite/vwAgmduqnh).')
									.addField('Erro:', `\`\`\`js\n${error}\`\`\``)
							]
						}).catch(() => {});
					}
				}
			}
		} catch (err) {
			console.log(err);
			console.error(`ERRO NO MESSAGE-CREATE: ${err}`);
		}
	}

};
