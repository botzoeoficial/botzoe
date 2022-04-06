/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Card extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cards';
		this.category = 'Dono';
		this.description = 'Veja os cards utilizados e não utilizados';
		this.usage = 'card';
		this.aliases = ['card'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		args
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const client = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		const embed = new ClientEmbed(author);

		const filters = {
			disponivel: client.card.filter((card) => !card.ativado),
			inutilizados: client.card.filter((card) => card.ativado)
		};

		const cardMessage = (type) => filters[type].map((card, index) => `\`${index + 1})\` **${card.codigo}** | 💵 R$${Utils.numberFormat(card.valorZoe)},00 <:btc:908786996535787551> ${card.valorBtc} bitcoin ${card.ativadoPor !== 'Ninguém.' ? `<@${card.ativadoPor}>` : ''}`);

		if (!args[0]) {
			embed.setTitle('💳 Lista de Cards Disponíveis');
			embed.setDescription(!client.card.length ? 'Não há cards disponíveis no momento.' : `${cardMessage('disponivel').join('\n')}`);
		} else if (args.slice(0).join(' ') === 'utilizados') {
			embed.setTitle('💳 Lista de Cards Utilizados');
			embed.setDescription(!client.card.length ? 'Não há cards utilizados no momento.' : `${cardMessage('inutilizados').join('\n')}`);
		}

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
