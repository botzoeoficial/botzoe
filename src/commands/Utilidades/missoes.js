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
			9: '9️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🔰 | Missões Disponíveis:');

		eventosArray.forEach((eu) => embedMessage += `[${emojis[eu.position + 1]}] **Missão:** ${eu.nome}\n`);
		embed.setDescription(!server.missoes.length ? 'Não há missões cadastradas no momento.' : `**DIGITE A POSIÇÃO DA MISSÃO NO CHAT PARA VER INFORMAÇÕES SOBRE ELA!**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			if (!server.missoes.length) return;

			const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply(`este número não existe! Por favor, envie o número da missão novamente.`).then(a => a.delete({
						timeout: 5000
					}));
					ce.delete();
				} else {
					collector.stop();

					embed
						.setTitle(`🔰 | Missão: ${findSelectedEvento.nome}`)
						.setDescription(findSelectedEvento.desc);

					ce.delete();
					msg.edit(author, embed);
				}
			});
		});
	}

};
