/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Descartardobau extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'descartardobau';
		this.category = 'Social';
		this.description = 'Descarte um item do seu Baú!';
		this.usage = 'descartardobau';
		this.aliases = ['descartarbau'];

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
			.setTitle('Descartar do Baú')
			.setDescription(`Qual item você deseja descartar do Baú?\n\n${itens || '**Baú Vazio.**'}`);

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
				'918835445780074507': 'Alumínio',
				'918835444794400799': 'Borracha',
				'918835445700378684': 'Caulim',
				'918835446040133652': 'Cobre',
				'918835445746532412': 'Ferro',
				'918835445838774322': 'Plástico',
				'901590833151746128': 'Prata'
			};

			sim.on('collect', async (collected) => {
				sim.stop();

				const itemEmoji = objeto[collected.emoji.id];

				embed.setDescription(`${author}, você descartou o item **${itemEmoji}** com sucesso do seu Baú!`);

				msg.reactions.removeAll();
				msg.edit(author, embed);

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
	}

};
