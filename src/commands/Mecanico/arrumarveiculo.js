/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Arrumarveiculo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'arrumarveiculo';
		this.category = 'Mecanico';
		this.description = 'Arrume o veículo de um cliente!';
		this.usage = 'arrumarveiculo';
		this.aliases = ['arrumarveículo', 'arrumar-veiculo', 'arrumar-veículo'];

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

		if (!server.cidade.mecanico.find((a) => a.id === author.id)) return message.reply('você precisa ser um **Mecânico** na cidade para emplacar algum veículo!');

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

		const embed = new ClientEmbed(author)
			.setTitle('🧑‍🔧 | Arrumar Veículo');

		mecanicaArray.forEach((eu) => embedMessage += `${eu.position + 1} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
		embed.setDescription(!server.mecanica.length ? 'Não há carros na **Oficina** no momento.' : `**Qual veículo você deseja arrumar?**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

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

					if (findSelectedEvento.arrumado) {
						sim.stop();
						ce.delete();
						msg.delete();
						return message.reply(`esse carro já está arrumado. Você precisa emplacar ele agora usando o comando \`${prefix}emplacarveiculo\`!`).then(ba => ba.delete({
							timeout: 5000
						}));
					}

					sim.stop();
					ce.delete();

					embed.setDescription(`**✅ | Você arrumou o veículo:**\n\n${findSelectedEvento.nome} - <@${findSelectedEvento.dono}>\n\nEle já está disponível para emplacamento.`);

					msg.edit(author, embed);

					return await this.client.database.guilds.findOneAndUpdate({
						_id: message.guild.id,
						'mecanica.nome': findSelectedEvento.nome
					}, {
						$set: {
							'mecanica.$.arrumado': true,
							'mecanica.$.danificado': 0
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
