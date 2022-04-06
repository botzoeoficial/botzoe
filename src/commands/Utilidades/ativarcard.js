/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Ativarcard extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'ativarcard';
		this.category = 'Utilidades';
		this.description = 'Ative cards e ganhe prêmio!';
		this.usage = 'ativarcard';
		this.aliases = ['ativar-card'];

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
		args,
		author
	}) {
		const client = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!client.card.length) {
			return message.reply({
				content: 'Não há cards cadastrados no momento.'
			});
		}

		const nome = args.slice(0).join(' ');

		if (!nome) {
			return message.reply({
				content: 'Você precisa colocar o código do card.'
			});
		}

		const embed = new ClientEmbed(author);

		if (!client.card.find((fa) => fa.codigo === nome)) {
			embed.setTitle('💳 Não Autorizado');
			embed.setDescription('❌ | Não existe nenhum Card cadastrado com esse Código.');

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			const cardsArray = client.card.map((value, index) => ({
				codigo: value.codigo,
				valorZoe: value.valorZoe,
				valorBtc: value.valorBtc,
				ativado: value.ativado,
				ativadoPor: value.ativadoPor,
				position: index
			}));

			const selected = nome;
			const findSelectedCard = cardsArray.find((xis) => xis.codigo === selected);

			if (findSelectedCard.ativado) {
				return message.reply({
					content: `Esse card já foi usado pelo usuário: \`${await this.client.users.fetch(findSelectedCard.ativadoPor).then(xa => xa.tag)}\``
				});
			}

			embed.setTitle('🎉 PARABÉNS');
			embed.setDescription(`💳 | Você adicionou:\n\n💵 R$${Utils.numberFormat(findSelectedCard.valorZoe)},00 - Com sucesso a sua conta Zoe\n\n<:btc:908786996535787551> ${findSelectedCard.valorBtc} bitcoin - Com sucesso a sua conta Zoe.`);

			message.reply({
				content: author.toString(),
				embeds: [embed]
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					saldo: user.saldo += findSelectedCard.valorZoe,
					bitcoin: user.bitcoin += findSelectedCard.valorBtc
				}
			});

			await this.client.database.clientUtils.findOneAndUpdate({
				_id: this.client.user.id,
				'card.codigo': findSelectedCard.codigo
			}, {
				$set: {
					'card.$.ativado': true,
					'card.$.ativadoPor': author.id
				}
			});

			return;
		}
	}

};
