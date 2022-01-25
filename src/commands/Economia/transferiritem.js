/* eslint-disable id-length */
/* eslint-disable max-nested-callbacks */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Transferiritem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'transferiritem';
		this.category = 'Economia';
		this.description = 'Transfira um item seu para outro usuário!';
		this.usage = 'transferiritem <usuário>';
		this.aliases = ['dar-item'];

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
		prefix,
		args
	}) {
		let user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const hasItem = user.inventory.find((xs) => xs.item === 'Transferir');

		if (!hasItem) {
			return message.reply('você não possui um **Transferir** no seu inventário!');
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.id === author.id) return message.reply('você não pode transferir item pra você mesmo.');

		let user2 = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author)
			.setTitle('Transferir Item')
			.setDescription(`Você deseja transferir o item de onde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

		message.channel.send(author, embed).then(async (msg) => {
			const collector = msg.channel.createMessageCollector((m) => m.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				if (ce.content === '0') {
					collector.stop();
					msg.delete();
					return message.reply('cancelado com sucesso.');
				} else if (ce.content === '1') {
					collector.stop();
					ce.delete();

					user = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itens = user.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja transferir para ${member}?\n\n${itens || '**Inventário Vazio.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						if (!user.inventory.length) return;

						for (const emoji of user.inventory.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => user.inventory.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

						const objeto = require('../../json/inventario.json');

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para ${member}?`);

							msg.edit(author, embed).then(async (msg2) => {
								const resposta = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply('você precisa enviar uma quantia válida maior que **0*. Por favor, use o comando novamente!');
									} else if (Number(ce2.content) > user.inventory.find((a) => a.item === itemEmoji).quantia) {
										ce2.delete();
										resposta.stop();
										msg.delete();

										return message.reply(`você não possui tudo isso de \`${itemEmoji}\`. Por favor, use o comando novamente!`);
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply(`você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para ${member} com sucesso!`);

										if (user.mochila.find((a) => a.item === 'Transferir').quantia <= 1) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$pull: {
													mochila: {
														item: 'Transferir'
													}
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'mochila.item': 'Transferir'
											}, {
												$set: {
													'mochila.$.quantia': user.mochila.find((a) => a.item === 'Transferir').quantia -= 1
												}
											});
										}

										if (user.inventory.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user.inventory.find((a) => a.item === itemEmoji).quantia) {
												if (user2.inventory.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id,
														'inventory.item': itemEmoji
													}, {
														$set: {
															'inventory.$.quantia': user2.inventory.find((a) => a.item === itemEmoji).quantia += Number(ce2.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id
													}, {
														$push: {
															inventory: {
																item: itemEmoji,
																emoji: user.inventory.find((a) => a.item === itemEmoji).emoji,
																id: user.inventory.find((a) => a.item === itemEmoji).id,
																quantia: Number(ce2.content)
															}
														}
													});
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'inventory.item': itemEmoji
												}, {
													$set: {
														'inventory.$.quantia': user.inventory.find((a) => a.item === itemEmoji).quantia -= Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$pull: {
														inventory: {
															item: itemEmoji
														}
													}
												});

												if (user2.inventory.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id,
														'inventory.item': itemEmoji
													}, {
														$set: {
															'inventory.$.quantia': user2.inventory.find((a) => a.item === itemEmoji).quantia += user.inventory.find((a) => a.item === itemEmoji).quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id
													}, {
														$push: {
															inventory: {
																item: itemEmoji,
																emoji: user.inventory.find((a) => a.item === itemEmoji).emoji,
																id: user.inventory.find((a) => a.item === itemEmoji).id,
																quantia: user.inventory.find((a) => a.item === itemEmoji).quantia
															}
														}
													});
												}
											}
										}
									}
								});
							});

							return;
						});
					});
				} else if (ce.content === '2') {
					user2 = await this.client.database.users.findOne({
						userId: member.id,
						guildId: message.guild.id
					});

					if (!user2.isMochila) {
						collector.stop();
						ce.delete();
						return message.reply('esse usuário não possui uma **Mochila**. Mande ele ir até a Loja > Utilidades e Comprar uma!');
					}

					collector.stop();
					ce.delete();

					const itens = user.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja enviar para ${member}?\n\n${itens || '**Mochila Vazia.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						if (!user.mochila.length) return;

						for (const emoji of user.mochila.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => user.mochila.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

						const objeto = require('../../json/mochila.json');

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							embed.setDescription(`Qual a quantidade de **${itemEmoji}** você deseja enviar para ${member}?`);

							msg.edit(author, embed).then(async (msg2) => {
								const resposta = msg2.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
									time: 120000
								});

								resposta.on('collect', async (ce2) => {
									if (Number(ce2.content) <= 0) {
										message.reply('você precisa enviar uma quantia válida e maior que **0*. Por favor, envie a quantia novamente no chat!');
									} else if (Number(ce2.content) > user.mochila.find((a) => a.item === itemEmoji).quantia) {
										message.reply(`você não possui tudo isso de \`${itemEmoji}\`. Por favor, envie a quantia novamente no chat!`);
									} else {
										resposta.stop();
										sim.stop();
										msg.delete();

										message.reply(`você enviou **x${Number(ce2.content)}** \`${itemEmoji}\` para ${member} com sucesso!`);

										if (user.mochila.find((a) => a.item === 'Transferir').quantia <= 1) {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$pull: {
													mochila: {
														item: 'Transferir'
													}
												}
											});
										} else {
											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id,
												'mochila.item': 'Transferir'
											}, {
												$set: {
													'mochila.$.quantia': user.mochila.find((a) => a.item === 'Transferir').quantia -= 1
												}
											});
										}

										if (user.mochila.find((a) => a.item === itemEmoji)) {
											if (Number(ce2.content) < user.mochila.find((a) => a.item === itemEmoji).quantia) {
												if (user2.mochila.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id,
														'mochila.item': itemEmoji
													}, {
														$set: {
															'mochila.$.quantia': user2.mochila.find((a) => a.item === itemEmoji).quantia += Number(ce2.content)
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: itemEmoji,
																emoji: user.mochila.find((a) => a.item === itemEmoji).emoji,
																id: user.mochila.find((a) => a.item === itemEmoji).id,
																quantia: Number(ce2.content)
															}
														}
													});
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'mochila.item': itemEmoji
												}, {
													$set: {
														'mochila.$.quantia': user.mochila.find((a) => a.item === itemEmoji).quantia -= Number(ce2.content)
													}
												});
											} else {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id
												}, {
													$pull: {
														mochila: {
															item: itemEmoji
														}
													}
												});

												if (user2.mochila.find((a) => a.item === itemEmoji)) {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id,
														'mochila.item': itemEmoji
													}, {
														$set: {
															'mochila.$.quantia': user2.mochila.find((a) => a.item === itemEmoji).quantia += user.mochila.find((a) => a.item === itemEmoji).quantia
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: member.id,
														guildId: message.guild.id
													}, {
														$push: {
															mochila: {
																item: itemEmoji,
																emoji: user.mochila.find((a) => a.item === itemEmoji).emoji,
																id: user.mochila.find((a) => a.item === itemEmoji).id,
																quantia: user.mochila.find((a) => a.item === itemEmoji).quantia
															}
														}
													});
												}
											}
										}
									}
								});
							});

							return;
						});
					});
				} else {
					collector.stop();
					msg.delete();
					ce.delete();
					return message.reply('número não encontrado. Por favor, use o comando novamente!');
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.reply('você demorou demais para escolher. Use o comando novamente!');
				}
			});
		});
	}

};
