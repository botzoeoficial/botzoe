/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class BlackList extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'blacklist';
		this.category = 'Utilidades';
		this.description = 'Veja os usuários da blacklist!';
		this.usage = 'blacklist';
		this.aliases = ['bl'];

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

		const eventosArray = server.blacklist.map((value, index) => ({
			nick: value.nick,
			id: value.id,
			saldo: value.saldo,
			adicionado: value.adicionado,
			motivo: value.motivo,
			position: index
		}));

		let embedMessage = '';

		const emojis = {
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '🔟',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣',
			21: '2️⃣1️⃣',
			22: '2️⃣2️⃣',
			23: '2️⃣3️⃣',
			24: '2️⃣4️⃣',
			25: '2️⃣5️⃣',
			26: '2️⃣6️⃣',
			27: '2️⃣7️⃣',
			28: '2️⃣8️⃣',
			29: '2️⃣9️⃣',
			30: '3️⃣0️⃣'
		};

		const embed = new ClientEmbed(author)
			.setTitle('🚫 | BlackList');

		eventosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Usuário:** ${eu.nick} | **ID:** ${eu.id}\n`);
		embed.setDescription(!server.blacklist.length ? 'Não há usuários cadastrados na blacklist no momento.' : `**DIGITE A POSIÇÃO DO USUÁRIO NO CHAT PARA VER INFORMAÇÕES SOBRE ELE!**\n\n${embedMessage}`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			if (!server.blacklist.length) return;

			const filter2 = (m) => {
				return m.author.id === author.id && !isNaN(m.content);
			};

			const sim = msg.channel.createMessageCollector({
				filter: filter2,
				time: 300000
			});

			sim.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply({
						content: 'Número não encontrado. Por favor, envie o número novamente!'
					}).then((a) => setTimeout(() => a.delete(), 6000));
					ce.delete();
				} else {
					sim.stop();
					ce.delete();

					embed
						.setDescription(`**Informações do usuário:** **${findSelectedEvento.nick}**`)
						.addField('👤 Nick:', findSelectedEvento.nick, true)
						.addField('🆔 ID:', findSelectedEvento.id, true)
						.addField('☑️ Adicionado Por:', `<@${findSelectedEvento.adicionado}>`, true)
						.addField('💵 Saldo:', `R$${Utils.numberFormat(findSelectedEvento.saldo)},00`)
						.addField('🗒️ Motivo:', findSelectedEvento.motivo);

					return msg.edit({
						content: author.toString(),
						embeds: [embed]
					});
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply({
						content: 'Você demorou demais para escolher o usuário da blacklist. Use o comando novamente!'
					});
					sim.stop();
					return;
				}
			});
		});
	}

};
