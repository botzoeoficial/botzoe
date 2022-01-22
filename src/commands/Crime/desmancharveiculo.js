/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Desmancharveiculo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'desmancharveiculo';
		this.category = 'Crime';
		this.description = 'Destrua carros que estão no Desmanche!';
		this.usage = 'desmancharveiculo';
		this.aliases = ['desmancharveículo', 'destruirveiculo', 'destruircarro', 'desmancharcarro'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = true;
		this.donoLavagem = false;

		this.ajudanteDesmanche = true;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const userAuthor = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const timeout = 60000;

		if (timeout - (Date.now() - userAuthor.cooldown.desmancharCarro) > 0) {
			const faltam = ms(timeout - (Date.now() - userAuthor.cooldown.desmancharCarro));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const desmancheArray = server.desmanche.map((value, index) => ({
				nome: value.nome,
				dono: value.dono,
				modelo: value.modelo,
				valor: value.valore,
				ano: value.nano,
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
				.setTitle('🧑‍🔧 | Desmanche');

			desmancheArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} **Carro:** ${eu.nome} - **Dono:** <@${eu.dono}>\n`);
			embed.setDescription(!server.desmanche.length ? 'Não há carros no **Desmanche** no momento.' : `**Qual veículo você deseja desmanchar?**\n\n${embedMessage}\nDigite \`0\` para cancelar.`);

			message.channel.send(author, embed).then((msg) => {
				if (!server.desmanche.length) return;

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
						const findSelectedEvento = desmancheArray.find((xis) => xis.position === selected);

						if (!findSelectedEvento) {
							message.reply('número não encontrado. Por favor, envie o número novamente!');
							ce.delete();
						}

						sim.stop();
						ce.delete();

						embed.setDescription(`**✅ | Você desmanchou o veículo:**\n\n${findSelectedEvento.nome} - <@${findSelectedEvento.dono}>.\n\nVocê ganhou **10%** do valor de **Desmanche** do Carro.\n<@${findSelectedEvento.dono}> ganhou **90%** do valor de **Desmanche** do carro.`);

						msg.edit(author, embed);

						const user = await this.client.database.users.findOne({
							userId: author.id,
							guildId: message.guild.id
						});

						const user2 = await this.client.database.users.findOne({
							userId: findSelectedEvento.dono,
							guildId: message.guild.id
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								banco: user.banco += (10 / 100) * findSelectedEvento.desmanche,
								'cooldown.desmancharCarro': Date.now()
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: findSelectedEvento.dono,
							guildId: message.guild.id
						}, {
							$set: {
								banco: user2.banco += (90 / 100) * findSelectedEvento.desmanche
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								desmanche: {
									placa: findSelectedEvento.placa
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
	}

};
