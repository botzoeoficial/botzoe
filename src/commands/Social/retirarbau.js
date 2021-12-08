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

		const itens = user.casas.bau.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const embed = new ClientEmbed(author)
			.setTitle('Retirar do Baú')
			.setDescription(`Qual item você deseja retirar do Baú?\n\n${itens || '**Baú Vazio.**'}`);

		message.channel.send(author, embed).then(async (msg) => {
			if (!user.casas.bau.length) return;

			for (const emoji of user.casas.bau.map((es) => es.id)) await msg.react(emoji);

			const sim = msg.createReactionCollector((reaction, user3) => user.casas.bau.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

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
				'898324362279669851': 'Máscara',
				'899007409006215188': 'Mochila',
				'899766443757928489': 'Porte de Armas',
				'900544627097108531': 'Transferir',
				'898326104413188157': 'Algemas',
				'901117948180168724': 'MP5',
				'901117282003075072': 'G18',
				'905653668643241985': 'Munição Pistola',
				'905653521846784080': 'Munição Metralhadora',
				'908780753884696706': 'Bolso',
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
				'905653583171706980': 'Munição KNT',
				'901590892727660564': 'Alumínio',
				'901590941033435157': 'Borracha',
				'901590641274921030': 'Caulim',
				'901590776545431613': 'Cobre',
				'901590546441715782': 'Ferro',
				'901590709235253338': 'Plástico',
				'901590833151746128': 'Prata'
			};

			sim.on('collect', async (collected) => {
				sim.stop();

				const itemEmoji = objeto[collected.emoji.id];

				embed.setDescription(`Você deseja adicionar o item **${itemEmoji}** aonde:\n\n1️⃣ - Inventário\n2️⃣ - Mochila\n\nDigite \`0\` para sair.`);

				msg.reactions.removeAll();
				msg.edit(author, embed).then(async (msg1) => {
					const collector = msg1.channel.createMessageCollector((m) => m.author.id === author.id, {
						time: 60000
					});

					collector.on('collect', async (ce) => {
						if (ce.content === '0') {
							collector.stop();
							msg1.delete();
							return message.reply('cancelado com sucesso.');
						} else if (ce.content === '1') {
							collector.stop();
							ce.delete();

							if (user.inventory.length > 0) {
								if (user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 400) {
										msg1.delete();

										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								} else if (!user.inventory.find((a) => a.item === 'Bolso')) {
									if (user.inventory.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
										msg1.delete();

										return message.reply('seu **inventário** está cheio. Use algum item, para liberar espaço!').then((b) => b.delete({
											timeout: 5000
										}));
									}
								}
							}

							message.reply(`item **${itemEmoji}** enviado com sucesso para seu Inventário!`);

							if (user.inventory.find((a) => a.item === itemEmoji)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'inventory.item': itemEmoji
								}, {
									$set: {
										'inventory.$.quantia': user.inventory.find((a) => a.item === itemEmoji).quantia + user.casas.bau.find((a) => a.item === itemEmoji).quantia
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
											emoji: user.casas.bau.find((a) => a.item === itemEmoji).emoji,
											id: user.casas.bau.find((a) => a.item === itemEmoji).id,
											quantia: user.casas.bau.find((a) => a.item === itemEmoji).quantia
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
						} else if (ce.content === '2') {
							const user2 = await this.client.database.users.findOne({
								userId: author.id,
								guildId: message.guild.id
							});

							if (!user2.isMochila) {
								collector.stop();
								ce.delete();
								msg1.delete();
								return message.reply('você não possui uma **Mochila**. Vá até a Loja > Utilidades e Compre uma!');
							}

							collector.stop();
							ce.delete();

							if (user2.mochila.length > 0) {
								if (user2.mochila.map((a) => a.quantia).reduce((a, b) => a + b) >= 200) {
									msg1.delete();

									return message.reply('sua **mochila** está cheia. Use algum item, para liberar espaço!').then((b) => b.delete({
										timeout: 5000
									}));
								}
							}

							message.reply(`item **${itemEmoji}** enviado com sucesso para sua Mochila!`);

							if (user2.mochila.find((a) => a.item === itemEmoji)) {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id,
									'mochila.item': itemEmoji
								}, {
									$set: {
										'mochila.$.quantia': user2.mochila.find((a) => a.item === itemEmoji).quantia + user2.casas.bau.find((a) => a.item === itemEmoji).quantia
									}
								});
							} else {
								await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$push: {
										mochila: {
											item: itemEmoji,
											emoji: user2.casas.bau.find((a) => a.item === itemEmoji).emoji,
											id: user2.casas.bau.find((a) => a.item === itemEmoji).id,
											quantia: user2.casas.bau.find((a) => a.item === itemEmoji).quantia
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
						} else {
							collector.stop();
							msg1.delete();
							ce.delete();
							return message.reply('número não encontrado. Por favor, use o comando novamente!');
						}
					});

					collector.on('end', async (collected2, reason) => {
						if (reason === 'time') {
							collector.stop();
							msg1.delete();
							return message.reply('você demorou demais para escolher. Use o comando novamente!');
						}
					});
				});
			});
		});
	}

};
