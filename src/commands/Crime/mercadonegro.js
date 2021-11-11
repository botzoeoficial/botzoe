/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');
const Emojis = require('../../utils/Emojis');

module.exports = class Mercadonegro extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'mercadonegro';
		this.category = 'Crime';
		this.description = 'Veja a lista de produtos a venda no Mercado Negro!';
		this.usage = 'mercadonegro';
		this.aliases = ['deepweb', 'darkweb'];

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

		const mapProdutos = server.mercadoNegro.map((value, index) => ({
			nome: value.nome,
			quantia: value.quantia,
			preco: value.preco,
			dono: value.dono,
			tempo: value.tempo,
			tempo2: value.tempo2,
			emoji: value.emoji,
			position: index
		}));

		const emojis = {
			0: '0️⃣',
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '1️⃣0️⃣',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🏴‍☠️ | Mercado Negro');

		mapProdutos.slice(0, 10).forEach((eu) => {
			const faltam = ms(eu.tempo - (Date.now() - eu.tempo2));

			embedMessage += `${emojis[eu.position + 1]} - **${eu.nome}** - \`x${eu.quantia}\` - R$${Utils.numberFormat(eu.preco)},00 - <@${eu.dono}> - ${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s\n`;
		});

		embed.setDescription(`Estes são os Itens disponíveis no Mercado Negro neste momento:\nDigite o número do item que você deseja comprar.\n\n${!server.mercadoNegro.length ? '**Sem Itens no Mercado Negro no momento!**\n' : embedMessage}\nDigite \`0\` para cancelar a seleção.`);

		message.channel.send(author, embed).then(async (msg) => {
			if (!server.mercadoNegro.length) return;

			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();
					return message.reply(`seleção cancelada com sucesso!`);
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = mapProdutos.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
							timeout: 5000
						}));
						ce.delete();
					} else if (findSelectedEvento.dono === author.id) {
						message.reply('você não pode comprar seu próprio produto. Por favor, escolha outro!').then(ba => ba.delete({
							timeout: 5000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						const faltam = ms(findSelectedEvento.tempo - (Date.now() - findSelectedEvento.tempo2));

						embed.setDescription(`Você deseja comprar o item?`);
						embed.addField(`Produto:`, findSelectedEvento.nome);
						embed.addField(`Quantia:`, `\`x${findSelectedEvento.quantia}\``);
						embed.addField(`Preço:`, `R$${Utils.numberFormat(findSelectedEvento.preco)},00`);
						embed.addField(`Quem colocou:`, `<@${findSelectedEvento.dono}>`);
						embed.addField(`Tempo restante:`, `${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s`);

						msg.edit(author, embed).then(async (msg1) => {
							await msg1.react(Emojis.Okay);
							await msg1.react(Emojis.Error);

							const sim2 = msg1.createReactionCollector((r, u) => r.emoji.name === Emojis.Okay && u.id === author.id, {
								time: 60000
							});

							const não2 = msg1.createReactionCollector((r, u) => r.emoji.name === Emojis.Error && u.id === author.id, {
								time: 60000,
								max: 1
							});

							sim2.on('collect', async () => {
								const user = await this.client.database.users.findOne({
									userId: author.id,
									guildId: message.guild.id
								});

								const user2 = await this.client.database.users.findOne({
									userId: findSelectedEvento.dono,
									guildId: message.guild.id
								});

								if (!user.isMochila) {
									return message.reply('você não tem uma **Mochila**. Vá até Loja > Utilidades e Compre uma!');
								} else if (user.banco < findSelectedEvento.preco) {
									message.reply('você não tem esse saldo todo no **banco** para comprar este produto!').then((ba) => ba.delete({
										timeout: 5000
									}));
								} else {
									sim2.stop();

									embed.setDescription(`Produto Comprado com Sucesso!`);
									embed.fields = [];

									msg.edit(author, embed);
									msg.reactions.removeAll();

									await this.client.database.users.findOneAndUpdate({
										userId: author.id,
										guildId: message.guild.id
									}, {
										$set: {
											banco: user.banco -= findSelectedEvento.preco
										}
									});

									await this.client.database.users.findOneAndUpdate({
										userId: findSelectedEvento.dono,
										guildId: message.guild.id
									}, {
										$set: {
											banco: user2.banco += findSelectedEvento.preco
										}
									});

									if (user2.mochila.find((a) => a.item === findSelectedEvento.nome)) {
										await this.client.database.users.findOneAndUpdate({
											userId: findSelectedEvento.dono,
											guildId: message.guild.id,
											'mochila.item': findSelectedEvento.nome
										}, {
											$set: {
												'mochila.$.quantia': user2.mochila.find((a) => a.item === findSelectedEvento.nome).quantia - findSelectedEvento.quantia
											}
										});
									} else {
										await this.client.database.users.findOneAndUpdate({
											userId: findSelectedEvento.dono,
											guildId: message.guild.id
										}, {
											$pull: {
												mochila: {
													item: findSelectedEvento.nome
												}
											}
										});
									}

									if (user2.mochila.find((a) => a.item === findSelectedEvento.nome).quantia === 0) {
										await this.client.database.users.findOneAndUpdate({
											userId: findSelectedEvento.dono,
											guildId: message.guild.id
										}, {
											$pull: {
												mochila: {
													item: findSelectedEvento.nome
												}
											}
										});
									}

									if (user.mochila.find((a) => a.item === findSelectedEvento.nome)) {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'mochila.item': findSelectedEvento.nome
										}, {
											$set: {
												'mochila.$.quantia': user.mochila.find((a) => a.item === findSelectedEvento.nome).quantia + findSelectedEvento.quantia
											}
										});
									} else {
										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$push: {
												mochila: {
													item: findSelectedEvento.nome,
													emoji: findSelectedEvento.emoji,
													id: findSelectedEvento.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
													quantia: findSelectedEvento.quantia
												}
											}
										});
									}

									await this.client.database.guilds.findOneAndUpdate({
										_id: message.guild.id
									}, {
										$pull: {
											mercadoNegro: {
												nome: findSelectedEvento.nome
											}
										}
									});
								}
							});

							não2.on('collect', async () => {
								sim.stop();
								não2.stop();
								sim2.stop();
								msg.delete();
							});
						});
					}
				}
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();
					return message.reply('você demorou demais para responder. Use o comando novamente!');
				}
			});
		});
	}

};
