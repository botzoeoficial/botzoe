/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Missoes extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'missoes';
		this.category = 'Utilidades';
		this.description = 'Veja as missões disponíveis no servidor!';
		this.usage = 'missoes';
		this.aliases = ['missões'];

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

		const eventosArray = server.missoes.map((value, index) => ({
			nome: value.nome,
			desc: value.desc,
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
			.setTitle('🔰 | Missões Disponíveis:');

		eventosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Missão:** ${eu.nome}\n`);
		embed.setDescription(!server.missoes.length ? 'Não há missões cadastradas no momento.' : `**DIGITE A POSIÇÃO DA MISSÃO NO CHAT PARA VER INFORMAÇÕES SOBRE ELA!**\n\n${embedMessage}`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			if (!server.missoes.length) return;

			const filter = (m) => {
				return m.author.id === author.id && !isNaN(m.content);
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply({
						content: 'Este número não existe! Por favor, envie o número da missão novamente.'
					}).then((a) => setTimeout(() => a.delete(), 6000));
					ce.delete();
				} else {
					collector.stop();

					embed
						.setTitle(`🔰 | Missão: ${findSelectedEvento.nome}`)
						.setDescription(findSelectedEvento.desc);

					ce.delete();
					return msg.edit({
						content: author.toString(),
						embeds: [embed]
					});
				}
			});
		});
	}

};
