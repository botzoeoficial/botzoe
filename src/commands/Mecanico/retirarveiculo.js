/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Retirarveiculo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'retirarveiculo';
		this.category = 'Mecanico';
		this.description = 'Retire o veículo de um cliente da Oficina!';
		this.usage = 'retirarveiculo';
		this.aliases = ['retirarveículo', 'retirar-veiculo', 'retirar-veículo'];

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

		const mecanicaArray = server.mecanica.map((value, index) => ({
			nome: value.nome,
			dono: value.dono,
			modelo: value.modelo,
			valor: value.valor,
			ano: value.ano,
			danificado: value.danificado,
			velocidade: value.velocidade,
			cavalos: value.cavalos,
			peso: value.peso,
			desmanche: value.desmanche,
			img: value.img,
			arrumado: value.arrumado,
			emplacado: value.emplacado,
			liberado: value.liberado,
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
			.setTitle('🧑‍🔧 | Retirar Veículo');

		mecanicaArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
		embed.setDescription(!server.mecanica.length ? 'Não há carros na **Oficina** no momento.' : `**Qual veículo você deseja retirar?**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

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
					}

					if (findSelectedEvento.dono !== author.id) {
						ce.delete();
						message.reply(`esse veículo não é seu. Escolha outro veículo por favor!`).then(ba => ba.delete({
							timeout: 5000
						}));
					}

					if (!findSelectedEvento.arrumado) {
						sim.stop();
						ce.delete();
						msg.delete();
						return message.reply(`seu veículo não está arrumado ainda. Peça para o Mecânico do servidor usar o comando \`${prefix}arrumarveiculo\`!`).then(ba => ba.delete({
							timeout: 5000
						}));
					}

					if (!findSelectedEvento.emplacado) {
						sim.stop();
						ce.delete();
						msg.delete();
						return message.reply(`seu veículo não está emplacado ainda. Peça para o Mecânico do servidor usar o comando \`${prefix}emplacarveiculo\`!`).then(ba => ba.delete({
							timeout: 5000
						}));
					}

					if (!findSelectedEvento.liberado) {
						sim.stop();
						ce.delete();
						msg.delete();
						return message.reply(`seu veículo não está liberado ainda. Peça para o Mecânico do servidor usar o comando \`${prefix}liberarveiculo\`!`).then(ba => ba.delete({
							timeout: 5000
						}));
					}

					sim.stop();
					ce.delete();

					embed.setDescription(`**✅ | Você retirou o veículo:**\n\n${findSelectedEvento.nome} - <@${findSelectedEvento.dono}>\n\nEle já está disponível na sua garagem.`);

					msg.edit(author, embed);

					await this.client.database.users.findOneAndUpdate({
						userId: findSelectedEvento.dono,
						guildId: message.guild.id
					}, {
						$push: {
							garagem: {
								nome: findSelectedEvento.nome,
								dono: findSelectedEvento.dono,
								modelo: findSelectedEvento.modelo,
								valor: findSelectedEvento.valor,
								ano: findSelectedEvento.ano,
								danificado: findSelectedEvento.danificado,
								velocidade: findSelectedEvento.velocidade,
								cavalos: findSelectedEvento.cavalos,
								peso: findSelectedEvento.peso,
								desmanche: findSelectedEvento.desmanche,
								img: findSelectedEvento.img,
								mecanica: false,
								arrumado: true,
								emplacado: true,
								liberado: true
							}
						}
					});

					return await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id
					}, {
						$pull: {
							mecanica: {
								nome: findSelectedEvento.nome
							}
						}
					});
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
