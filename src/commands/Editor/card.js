/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Card extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cards';
		this.category = 'Editor';
		this.description = 'Veja os cards utilizados e não utilizados';
		this.usage = 'card';
		this.aliases = ['card'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const embed = new ClientEmbed(author);

		const filters = {
			disponivel: server.card.filter((card) => !card.ativado),
			inutilizados: server.card.filter((card) => card.ativado)
		};

		const cardMessage = (type) => filters[type].map((card, index) => `\`${index + 1})\` **${card.codigo}** | 💵 R$${Utils.numberFormat(card.valorZoe)},00 <:btc:908786996535787551> ${card.valorBtc} bitcoin ${card.ativadoPor !== 'Ninguém.' ? `<@${card.ativadoPor}>` : ''}`);

		if (!args[0]) {
			embed.setTitle('💳 Lista de Cards Disponíveis');
			embed.setDescription(!server.card.length ? 'Não há cards disponíveis no momento.' : `${cardMessage('disponivel').join('\n')}`);
		} else if (args.slice(0).join(' ') === 'utilizados') {
			embed.setTitle('💳 Lista de Cards Utilizados');
			embed.setDescription(!server.card.length ? 'Não há cards utilizados no momento.' : `${cardMessage('inutilizados').join('\n')}`);
		}

		message.channel.send(author, embed);
	}

};
