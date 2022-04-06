/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Liberarveiculo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'liberarveiculo';
		this.category = 'Mecanico';
		this.description = 'Libere o veículo de um cliente!';
		this.usage = 'liberarveiculo';
		this.aliases = ['liberarveículo', 'liberar-veiculo', 'liberar-veículo', 'liberarcarro', 'liberar-carro'];

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

		if (!server.cidade.mecanico.find((a) => a.id === author.id)) {
			return message.reply({
				content: 'Você precisa ser um **Mecânico** na Cidade para liberar algum veículo!'
			});
		}

		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const timeout = 60000;

		if (timeout - (Date.now() - userAuthor.cooldown.liberarVeiculo) > 0) {
			const faltam = ms(timeout - (Date.now() - userAuthor.cooldown.liberarVeiculo));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
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
				placa: value.placa,
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
				.setTitle('🧑‍🔧 | Liberar Veículo');

			mecanicaArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
			embed.setDescription(!server.mecanica.length ? 'Não há carros na **Oficina** no momento.' : `**Qual veículo você deseja liberar?**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

			message.reply({
				content: author.toString(),
				embeds: [embed]
			}).then((msg) => {
				if (!server.mecanica.length) return;

				const filterSim = m => {
					return m.author.id === author.id;
				};

				const sim = msg.channel.createMessageCollector({
					filter: filterSim,
					time: 300000
				});

				sim.on('collect', async (ce) => {
					if (Number(ce.content) === 0) {
						msg.delete();
						sim.stop();
						return message.reply({
							content: 'Seleção cancelada com sucesso!'
						});
					} else {
						const selected = Number(ce.content - 1);
						const findSelectedEvento = mecanicaArray.find((xis) => xis.position === selected);

						if (!findSelectedEvento) {
							message.reply({
								content: 'Número não encontrado. Por favor, envie o número novamente!'
							}).then((a) => a.delete(), 6000);
							ce.delete();
						}

						if (!findSelectedEvento.arrumado) {
							sim.stop();
							ce.delete();
							msg.delete();

							return message.reply({
								content: `Esse carro não está arrumado. Você precisa arrumar ele antes de liberar usando o comando \`${prefix}arrumarveiculo\`!`
							});
						}

						if (!findSelectedEvento.emplacado) {
							sim.stop();
							ce.delete();
							msg.delete();

							return message.reply({
								content: `Esse carro não está emplacado. Você precisa emplacar ele antes de liberar usando o comando \`${prefix}emplacarveiculo\`!`
							});
						}

						if (findSelectedEvento.liberado) {
							sim.stop();
							ce.delete();
							msg.delete();

							return message.reply({
								content: `Esse carro já está liberado. Peça para o dono retirar o carro dele agora usando o comando \`${prefix}retirarveiculo\`!`
							});
						}

						sim.stop();
						ce.delete();

						embed.setDescription(`**✅ | Você liberou o veículo:**\n\n${findSelectedEvento.nome} - <@${findSelectedEvento.dono}>\n\nEle já está disponível para retirada.`);

						msg.edit({
							content: author.toString(),
							embeds: [embed]
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'cooldown.liberarVeiculo': Date.now()
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id,
							'mecanica.nome': findSelectedEvento.nome
						}, {
							$set: {
								'mecanica.$.liberado': true
							}
						});

						return;
					}
				});

				sim.on('end', (collected, reason) => {
					if (reason === 'time') {
						msg.delete();
						message.reply({
							content: 'Você demorou demais para escolher o carro. Use o comando novamente!'
						});
						sim.stop();
						return;
					}
				});
			});
		}
	}

};
