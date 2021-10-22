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
	}
	async run({
		message,
		args,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (!server.card.length) return message.reply('não há cards cadastrados no momento.');

		const nome = args.slice(0).join(' ');

		if (!nome) return message.reply('você precisa colocar o código do card.');

		const embed = new ClientEmbed(author);

		if (!server.card.find((fa) => fa.codigo === nome)) {
			embed.setTitle('💳 Não Autorizado');
			embed.setDescription('❌ | Não existe nenhum Card cadastrado com esse Código.');

			return message.channel.send(author, embed);
		} else {
			const cardsArray = server.card.map((value, index) => ({
				codigo: value.codigo,
				valorZoe: value.valorZoe,
				valorAlfa: value.valorAlfa,
				valorBtc: value.valorBtc,
				valorSonhos: value.valorSonhos,
				ativado: value.ativado,
				ativadoPor: value.ativadoPor,
				position: index
			}));

			const selected = nome;
			const findSelectedCard = cardsArray.find((xis) => xis.codigo === selected);

			if (findSelectedCard.ativado) return message.reply(`esse card já foi usado pelo usuário: \`${await this.client.users.fetch(findSelectedCard.ativadoPor).then(xa => xa.tag)}\``);

			embed.setTitle('🎉 PARABÉNS');
			embed.setDescription(`💳 | Você adicionou:\n\n💵 R$${Utils.numberFormat(findSelectedCard.valorZoe)},00 - Com sucesso a sua conta Zoe\n\n🪙 ${findSelectedCard.valorBtc} bitcoin - Com sucesso a sua conta Zoe\n\n💸 R$${Utils.numberFormat(findSelectedCard.valorAlfa)},00 Apê da Alfacusa - Marque o <@&830972296272543794> para receber.\n\n👩‍🦰 ${Utils.numberFormat(findSelectedCard.valorSonhos)} Sonhos - Marque <@&830972296272543796> para receber.`);

			message.channel.send(author, embed);

			await this.client.database.users.findOneAndUpdate({
				_id: author.id
			}, {
				$set: {
					saldo: user.saldo += findSelectedCard.valorZoe,
					bitcoin: user.bitcoin += findSelectedCard.valorBtc
				}
			});

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id,
				'card.codigo': findSelectedCard.codigo
			}, {
				$set: {
					'card.$.ativado': true,
					'card.$.ativadoPor': author.id
				}
			});
		}
	}

};
