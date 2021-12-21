/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Retirarbau extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'retirarbau';
		this.category = 'Social';
		this.description = 'Retire um item do seu baú!';
		this.usage = 'retirarbau';
		this.aliases = ['retirar-bau'];

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

		if (user.casas.tipo === '') return message.reply(`você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`);

		const embed = new ClientEmbed(author)
			.setTitle('Retirar do Baú')
			.setDescription(`Você deseja retirar e adicionar o item aonde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

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
					ce.delete();
					collector.stop();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itensInvFilter = user2.casas.bau.filter((a) => ['Água', 'Suco', 'Refrigerante', 'Café', 'Energético', 'Cerveja', 'Sanduíche', 'Pizza', 'Batata Frita', 'Misto Quente', 'Carne', 'Tacos', 'Miojo', 'Rosquinha', 'Chocolate', 'Pipoca', 'Bolo', 'Cookie', 'Remédio', 'Vara de Pesca', 'Transferir', 'Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator', 'Agricultor', 'Alumínio', 'Borracha', 'Caulim', 'Cobre', 'Ferro', 'Plástico', 'Prata'].includes(a.item));

					const itensMap = itensInvFilter.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar no Inventário?\n\n${itensMap || '**Você não possui item de Inventário no baú.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						for (const emoji of itensInvFilter.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => itensInvFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
							time: 60000,
							max: 1
						});

						const objeto = {
							'897849546409906228': 'Água',
							'897849547294916638': 'Suco',
							'891034945085120572': 'Refrigerante',
							'897849547244593162': 'Café',
							'891035343262990366': 'Energético',
							'897849547085217822': 'Cerveja',
							'897849546695147551': 'Sanduíche',
							'897849547089399848': 'Pizza',
							'897849547957612574': 'Batata Frita',
							'897849547143913472': 'Misto Quente',
							'897849547538186300': 'Carne',
							'897849547206840410': 'Tacos',
							'897849546783223829': 'Miojo',
							'897849546992930867': 'Rosquinha',
							'897849546804174848': 'Chocolate',
							'897849547215212584': 'Pipoca',
							'897849546913247292': 'Bolo',
							'897849546720305175': 'Cookie',
							'897849546862919740': 'Remédio',
							'891297733774819328': 'Vara de Pesca',
							'900544627097108531': 'Transferir',
							'911706991783735306': 'Semente de Maçã',
							'911706991297187851': 'Semente de Banana',
							'911706992056365176': 'Semente de Laranja',
							'911706991217496075': 'Semente de Limão',
							'911706991796301874': 'Semente de Pêra',
							'911706991280410755': 'Semente de Morango',
							'911706991599173653': 'Semente de Tomate',
							'911706991804678144': 'Semente de Abacaxi',
							'911706991766933574': 'Semente de Melão',
							'911706991594995732': 'Semente de Manga',
							'911706991632736316': 'Semente de Pêssego',
							'911706991934734406': 'Semente de Cereja',
							'911706991808884776': 'Semente de Melancia',
							'911706991615950898': 'Semente de Café',
							'911706992400298056': 'Semente de Milho',
							'911706991670493214': 'Semente de Arroz',
							'898326104782299166': 'Adubo',
							'898326105126215701': 'Fertilizante',
							'898326105361113099': 'Irrigação',
							'911776845144416287': 'Aluguel Trator',
							'911776844724969532': 'Agricultor',
							'918835445780074507': 'Alumínio',
							'918835444794400799': 'Borracha',
							'918835445700378684': 'Caulim',
							'918835446040133652': 'Cobre',
							'918835445746532412': 'Ferro',
							'918835445838774322': 'Plástico',
							'918835445939458088': 'Prata'
						};

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji = objeto[collected.emoji.id];

							const user4 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (user4.inventory.length > 0) {
								if (user4.inventory.find((a) => a.item === 'Bolso')) {
									if (user4.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msg1.delete();

										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user4.inventory.find((a) => a.item === 'Bolso')) {
									if (user4.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msg1.delete();

										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							msg1.delete();
							message.reply(`item **${itemEmoji}** enviado com sucesso para seu Inventário!`);

							if (user4.inventory.find((a) => a.item === itemEmoji)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': itemEmoji
								}, {
									$set: {
										'inventory.$.quantia': user4.inventory.find((a) => a.item === itemEmoji).quantia + user4.casas.bau.find((a) => a.item === itemEmoji).quantia
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										inventory: {
											item: itemEmoji,
											emoji: user4.casas.bau.find((a) => a.item === itemEmoji).emoji,
											id: user4.casas.bau.find((a) => a.item === itemEmoji).id,
											quantia: user4.casas.bau.find((a) => a.item === itemEmoji).quantia
										}
									}
								});
							}

							return await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$pull: {
									'casas.bau': {
										item: itemEmoji
									}
								}
							});
						});
					});
				} else if (ce.content === '2') {
					ce.delete();
					collector.stop();

					const user2 = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					const itensMochilaFilter = user2.casas.bau.filter((a) => ['Máscara', 'Porte de Armas', 'Algemas', 'MP5', 'G18', 'Munição Pistola', 'Munição Metralhadora', 'Ak-47', 'UMP', 'ACR', 'KNT-308', 'Desert Eagle', 'Revolver 38', 'Chave Micha', 'Maconha', 'Cocaína', 'LSD', 'Metanfetamina', 'Munição KNT'].includes(a.item));

					const itensMap = itensMochilaFilter.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

					embed.setDescription(`Qual item você deseja colocar na Mochila?\n\n${itensMap || '**Você não possui item de Mochila no baú.**'}`);

					msg.edit(author, embed).then(async (msg1) => {
						for (const emoji of itensMochilaFilter.map((es) => es.id)) await msg1.react(emoji);

						const sim = msg1.createReactionCollector((reaction, user3) => itensMochilaFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
							time: 60000,
							max: 1
						});

						const objeto = {
							'898324362279669851': 'Máscara',
							'899766443757928489': 'Porte de Armas',
							'898326104413188157': 'Algemas',
							'901117948180168724': 'MP5',
							'901117282003075072': 'G18',
							'905653668643241985': 'Munição Pistola',
							'905653521846784080': 'Munição Metralhadora',
							'901118225520136243': 'Ak-47',
							'901117871764144200': 'UMP',
							'901118143735402536': 'ACR',
							'901118040245149736': 'KNT-308',
							'901117192110739516': 'Desert Eagle',
							'901117447065702501': 'Revolver 38',
							'900544510365405214': 'Chave Micha',
							'898326104866177084': 'Maconha',
							'901118422774071326': 'Cocaína',
							'901118376951304262': 'LSD',
							'901118279530217552': 'Metanfetamina',
							'905653583171706980': 'Munição KNT'
						};

						sim.on('collect', async (collected) => {
							sim.stop();

							const itemEmoji2 = objeto[collected.emoji.id];

							const user5 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user5.isMochila) {
								collector.stop();
								ce.delete();
								msg1.delete();
								return message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e Compre uma!');
							}

							if (user5.mochila.length > 0) {
								if (user5.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									msg1.delete();

									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							msg1.delete();
							message.reply(`item **${itemEmoji2}** enviado com sucesso para sua Mochila!`);

							if (user5.mochila.find((a) => a.item === itemEmoji2)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': itemEmoji2
								}, {
									$set: {
										'mochila.$.quantia': user5.mochila.find((a) => a.item === itemEmoji2).quantia + user5.casas.bau.find((a) => a.item === itemEmoji2).quantia
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: itemEmoji2,
											emoji: user5.casas.bau.find((a) => a.item === itemEmoji2).emoji,
											id: user5.casas.bau.find((a) => a.item === itemEmoji2).id,
											quantia: user5.casas.bau.find((a) => a.item === itemEmoji2).quantia
										}
									}
								});
							}

							return await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$pull: {
									'casas.bau': {
										item: itemEmoji2
									}
								}
							});
						});
					});
				}
			});
		});
	}

};
