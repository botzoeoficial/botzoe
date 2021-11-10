/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Enviarmecanica extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'enviarmecanica';
		this.category = 'Mecanico';
		this.description = 'Envie sue carro para a mecânica!';
		this.usage = 'enviarmecanica';
		this.aliases = ['enviar-mecanica', 'enviarmecânica', 'enviaroficina'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle('Enviar para Mecânica');

		const carrosArray = user.garagem.map((value, index) => ({
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
			mecanica: value.mecanica,
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

		carrosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **${eu.nome}** (${!eu.mecanica ? `**\`Não está na Mecânica.\`**` : `**\`Está na Mecânica.\`**`}) [${!eu.arrumado ? `**\`Não está arrumado.\`**` : `**\`Está arrumado.\`**`}] [${!eu.liberado ? `**\`Não está liberado.\`**` : `**\`Está liberado.\`**`}]\n`);
		embed.setDescription(!user.garagem.length ? `**Você ainda não possui carros na garagem. Use o comando \`${prefix}roubarveiculo\`!**` : `Qual carro você deseja enviar para a Mecânica?\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

		message.channel.send(author, embed).then(async (msg) => {
			if (!user.garagem.length) return;

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
					const findSelectedEvento = carrosArray.find((xis) => xis.position === selected);

					if (!findSelectedEvento) {
						message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
							timeout: 5000
						}));
						ce.delete();
					} else {
						sim.stop();
						ce.delete();

						embed.setDescription(`✅ | Você enviou seu veículo **${findSelectedEvento.nome}** com suceso para a Mecânica!`);

						msg.edit(author, embed);

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$pull: {
								garagem: {
									nome: findSelectedEvento.nome
								}
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$push: {
								mecanica: {
									nome: findSelectedEvento.nome,
									dono: author.id,
									modelo: findSelectedEvento.modelo,
									valor: findSelectedEvento.valor,
									ano: findSelectedEvento.ano,
									danificado: findSelectedEvento.danificado,
									velocidade: findSelectedEvento.velocidade,
									cavalos: findSelectedEvento.cavalos,
									peso: findSelectedEvento.peso,
									desmanche: findSelectedEvento.desmanche,
									img: findSelectedEvento.img,
									arrumado: false,
									emplacado: false,
									liberado: false
								}
							}
						});
					}
				}
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();
					return message.reply('você demorou demais para escolher o carro que deseja enviar para a **Mecânica**. Use o comando novamente!');
				}
			});
		});
	}

};
