/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Mecanica extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'mecanica';
		this.category = 'Mecanico';
		this.description = 'Veja os carros que estão na Mecânica!';
		this.usage = 'mecanica';
		this.aliases = ['mecânica', 'oficina'];

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

		const mecanicaArray = server.mecanica.map((value, index) => ({
			nome: value.nome,
			dono: value.dono,
			arrumado: value.arrumado,
			emplacado: value.emplacado,
			liberado: value.liberado,
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
			9: '9️⃣',
			10: '1️⃣0️⃣',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🧑‍🔧 | Oficina');

		mecanicaArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
		embed.setDescription(!server.mecanica.length ? 'Não há carros na **Oficina** no momento.' : `**Este são os carros que estão na Oficina!**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

		message.channel.send(author, embed).then((msg) => {
			if (!server.mecanica.length) return;

			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				if (Number(ce.content) === 0) {
					msg.delete();
					sim.stop();
					return message.reply(`seleção cancelada com sucesso!`);
				} else {
					const selected = Number(ce.content - 1);
					const findSelectedEvento = mecanicaArray.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						message.reply('número não encontrado! Por favor, envie o número novamente').then(ba => ba.delete({
							timeout: 5000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`**Informações do carro:** **${findSelectedEvento.nome}**`)
							.addField('Nome:', findSelectedEvento.nome, true)
							.addField('Dono:', `<@${findSelectedEvento.dono}>`, true)
							.addField('Arrumado:', !findSelectedEvento.arrumado ? 'Não.' : 'Sim.', true)
							.addField('Emplacado:', !findSelectedEvento.emplacado ? 'Não.' : 'Sim.')
							.addField('Liberado:', !findSelectedEvento.liberado ? 'Não.' : 'Sim.');

						msg.edit(author, embed);
					}
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply(`você demorou demais para escolher o carro. Use o comando novamente!`);
					sim.stop();
					return;
				}
			});
		});
	}

};
