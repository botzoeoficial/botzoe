/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Liberarveiculo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'liberarveiculo';
		this.category = 'Mecanico';
		this.description = 'Libere o veículo de um cliente!';
		this.usage = 'liberarveiculo';
		this.aliases = ['liberarveículo', 'liberar-veiculo', 'liberar-veículo'];

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
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.mecanico.map((a) => a.id).includes(author.id)) return message.reply('você precisa ser um **Mecânico** na cidade para liberar algum veículo!');

		const mecanicaArray = server.mecanica.map((value, index) => ({
			nome: value.nome,
			modelo: value.modelo,
			valor: value.valor,
			ano: value.ano,
			danificado: value.danificado,
			velocidade: value.velocidade,
			cavalos: value.cavalos,
			peso: value.peso,
			desmanche: value.desmanche,
			dono: value.dono,
			img: value.img,
			arrumado: true,
			emplacado: true,
			liberado: false,
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
			.setTitle('🧑‍🔧 | Liberar Veículo');

		mecanicaArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
		embed.setDescription(!server.mecanica.length ? 'Não há carros na **Oficina** no momento.' : `**Qual veículo você deseja liberar?**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

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
						message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
							timeout: 5000
						}));
						ce.delete();
					} else if (findSelectedEvento.arrumado && !findSelectedEvento.emplacado) {
						sim.stop();
						ce.delete();
						message.reply(`esse veículo não está emplacado ainda. Use o comando \`${prefix}emplacarveiculo\`!`).then(ba => ba.delete({
							timeout: 5000
						}));
					} else {
						sim.stop();
						ce.delete();

						embed
							.setDescription(`**✅ | Você liberou o veículo:**\n\n${findSelectedEvento.nome} - <@${findSelectedEvento.dono}>\n\nEle já está disponível para retirada.`);

						msg.edit(author, embed);

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id,
							'mecanica.nome': findSelectedEvento.nome
						}, {
							$set: {
								'mecanica.$.liberado': true
							}
						});
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
