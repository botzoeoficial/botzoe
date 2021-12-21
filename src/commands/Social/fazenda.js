/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Fazenda extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fazenda';
		this.category = 'Social';
		this.description = 'Veja suas Fazendas e Plantações!';
		this.usage = 'fazenda';
		this.aliases = ['plantacao', 'farm', 'plantacão'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const fazendasArray = user.fazendas.map((value, index) => ({
			nome: value.nome,
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
			.setTitle('<:sementes:898326105361100830> | Plantação');

		fazendasArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - ${eu.nome}\n`);
		embed.setDescription(!user.fazendas.length ? 'Você não possui nenhuma Fazenda no momento.' : `**Escolha qual Fazenda você quer verificar:**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			if (!user.fazendas.length) return;

			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = fazendasArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply('número não encontrado. Por favor, envie o número novamente!').then(ba => ba.delete({
						timeout: 7000
					}));
					ce.delete();
				} else {
					ce.delete();
					sim.stop();

					const findFazenda = user.fazendas.findIndex(f => f.nome === findSelectedEvento.nome);

					if (findSelectedEvento.nome === 'Fazenda 1') {
						let timeout;

						if (user.fazendas[findFazenda].lote1.fruta2 === 'Maçã') {
							timeout = 28800000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Banana') {
							timeout = 43200000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Laranja') {
							timeout = 57600000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Limão') {
							timeout = 72000000;
						}

						let timeout2;

						if (user.fazendas[findFazenda].lote2.fruta2 === 'Maçã') {
							timeout2 = 28800000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Banana') {
							timeout2 = 43200000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Laranja') {
							timeout2 = 57600000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Limão') {
							timeout2 = 72000000;
						}

						let timeout3;

						if (user.fazendas[findFazenda].lote3.fruta2 === 'Maçã') {
							timeout3 = 28800000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Banana') {
							timeout3 = 43200000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Laranja') {
							timeout3 = 57600000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Limão') {
							timeout3 = 72000000;
						}

						let timeout4;

						if (user.fazendas[findFazenda].lote4.fruta2 === 'Maçã') {
							timeout4 = 28800000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Banana') {
							timeout4 = 43200000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Laranja') {
							timeout4 = 57600000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Limão') {
							timeout4 = 72000000;
						}

						let timeout5;

						if (user.fazendas[findFazenda].lote5.fruta2 === 'Maçã') {
							timeout5 = 28800000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Banana') {
							timeout5 = 43200000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Laranja') {
							timeout5 = 57600000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Limão') {
							timeout5 = 72000000;
						}

						embed
							.setTitle(findSelectedEvento.nome.toUpperCase())
							.addField('Lote 1:', `${user.fazendas[findFazenda].lote1.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 1️⃣\n(Clique na reação 1️⃣ para desbloquear.)` : `${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`} - Clique em 1️⃣ para abrir o **Lote 1**.`}`)
							.addField('Lote 2:', `${user.fazendas[findFazenda].lote2.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 2️⃣\n(Clique na reação 2️⃣ para desbloquear.)` : `${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`} - Clique em 2️⃣ para abrir o **Lote 2**.`}`)
							.addField('Lote 3:', `${user.fazendas[findFazenda].lote3.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 3️⃣\n(Clique na reação 3️⃣ para desbloquear.)` : `${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`} - Clique em 3️⃣ para abrir o **Lote 3**.`}`)
							.addField('Lote 4:', `${user.fazendas[findFazenda].lote4.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 4️⃣\n(Clique na reação 4️⃣ para desbloquear.)` : `${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`} - Clique em 4️⃣ para abrir o **Lote 4**.`}`)
							.addField('Lote 5:', `${user.fazendas[findFazenda].lote5.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 5️⃣\n(Clique na reação 5️⃣ para desbloquear.)` : `${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`} - Clique em 5️⃣ para abrir o **Lote 5**.`}`)
							.setDescription(`Você está visualizando a **${findSelectedEvento.nome}**\n`);

						const buttonDesbloquear1 = new MessageButton().setStyle('blurple').setEmoji('1️⃣').setID('desbloquear1');
						const buttonDesbloquear2 = new MessageButton().setStyle('blurple').setEmoji('2️⃣').setID('desbloquear2');
						const buttonDesbloquear3 = new MessageButton().setStyle('blurple').setEmoji('3️⃣').setID('desbloquear3');
						const buttonDesbloquear4 = new MessageButton().setStyle('blurple').setEmoji('4️⃣').setID('desbloquear4');
						const buttonDesbloquear5 = new MessageButton().setStyle('blurple').setEmoji('5️⃣').setID('desbloquear5');
						const botoes = new MessageActionRow().addComponents([buttonDesbloquear1, buttonDesbloquear2, buttonDesbloquear3, buttonDesbloquear4]);
						const botoes2 = new MessageActionRow().addComponents([buttonDesbloquear5]);

						msg.edit(author, {
							embed: embed,
							components: [botoes, botoes2]
						}).then(async (msg1) => {
							const desbloquear1 = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
								max: 1
							});

							desbloquear1.on('collect', async (b) => {
								if (b.id === 'desbloquear1') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 1**\n\n${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote1.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote1.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote1.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991783735306': 'Semente de Maçã',
												'911706991297187851': 'Semente de Banana',
												'911706992056365176': 'Semente de Laranja',
												'911706991217496075': 'Semente de Limão',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote1.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote1.id;

												if (user.fazendas[findFazenda].lote1.fruta === itemEmoji2) {
													if (timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote1.fruta2}**! Espere: \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote1.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote1.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote1.fruta': '',
																'fazendas.$.lote1.fruta2': '',
																'fazendas.$.lote1.emoji': '',
																'fazendas.$.lote1.id': '',
																'fazendas.$.lote1.cooldown': 0,
																'fazendas.$.lote1.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote1.fruta2}** do **Lote 1** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991783735306': 'Semente de Maçã',
											'911706991297187851': 'Semente de Banana',
											'911706992056365176': 'Semente de Laranja',
											'911706991217496075': 'Semente de Limão',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Maçã') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Maçã',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Maçã').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Maçã'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Maçã').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Maçã'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Maçã** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Banana') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Banana',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Banana').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Banana'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Banana').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Banana'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Banana** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Laranja') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Laranja',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Laranja').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Laranja'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Laranja').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Laranja'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Laranja** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Limão') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Limão',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Limão').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Limão'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Limão').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Limão'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Limão** com sucesso no **Lote 1**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear2') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 2**\n\n${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote2.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote2.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote2.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991783735306': 'Semente de Maçã',
												'911706991297187851': 'Semente de Banana',
												'911706992056365176': 'Semente de Laranja',
												'911706991217496075': 'Semente de Limão',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote2.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote2.id;

												if (user.fazendas[findFazenda].lote2.fruta === itemEmoji2) {
													if (timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote2.fruta2}**! Espere: \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote2.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote2.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote2.fruta': '',
																'fazendas.$.lote2.fruta2': '',
																'fazendas.$.lote2.emoji': '',
																'fazendas.$.lote2.id': '',
																'fazendas.$.lote2.cooldown': 0,
																'fazendas.$.lote2.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote2.fruta2}** do **Lote 2** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991783735306': 'Semente de Maçã',
											'911706991297187851': 'Semente de Banana',
											'911706992056365176': 'Semente de Laranja',
											'911706991217496075': 'Semente de Limão',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Maçã') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Maçã',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Maçã').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Maçã'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Maçã').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Maçã'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Maçã** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Banana') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Banana',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Banana').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Banana'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Banana').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Banana'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Banana** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Laranja') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Laranja',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Laranja').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Laranja'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Laranja').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Laranja'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Laranja** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Limão') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Limão',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Limão').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Limão'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Limão').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Limão'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Limão** com sucesso no **Lote 2**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear3') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote3.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 3**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote3.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 3** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 3**\n\n${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote3.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote3.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote3.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991783735306': 'Semente de Maçã',
													'911706991297187851': 'Semente de Banana',
													'911706992056365176': 'Semente de Laranja',
													'911706991217496075': 'Semente de Limão',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote3.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote3.id;

													if (user.fazendas[findFazenda].lote3.fruta === itemEmoji2) {
														if (timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote3.fruta2}**! Espere: \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote3.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote3.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote3.fruta': '',
																	'fazendas.$.lote3.fruta2': '',
																	'fazendas.$.lote3.emoji': '',
																	'fazendas.$.lote3.id': '',
																	'fazendas.$.lote3.cooldown': 0,
																	'fazendas.$.lote3.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote3.fruta2}** do **Lote 3** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991783735306': 'Semente de Maçã',
												'911706991297187851': 'Semente de Banana',
												'911706992056365176': 'Semente de Laranja',
												'911706991217496075': 'Semente de Limão',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Maçã') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Maçã',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Maçã').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Maçã'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Maçã').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Maçã'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Maçã** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Banana') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Banana',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Banana').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Banana'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Banana').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Banana'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Banana** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Laranja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Laranja',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Laranja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Laranja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Laranja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Laranja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Laranja** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Limão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Limão',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Limão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Limão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Limão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Limão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Limão** com sucesso no **Lote 3**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear4') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote4.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 4**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote4.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 4** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 4**\n\n${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote4.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote4.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote4.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991783735306': 'Semente de Maçã',
													'911706991297187851': 'Semente de Banana',
													'911706992056365176': 'Semente de Laranja',
													'911706991217496075': 'Semente de Limão',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote4.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote4.id;

													if (user.fazendas[findFazenda].lote4.fruta === itemEmoji2) {
														if (timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote4.fruta2}**! Espere: \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote4.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote4.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote4.fruta': '',
																	'fazendas.$.lote4.fruta2': '',
																	'fazendas.$.lote4.emoji': '',
																	'fazendas.$.lote4.id': '',
																	'fazendas.$.lote4.cooldown': 0,
																	'fazendas.$.lote4.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote4.fruta2}** do **Lote 4** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991783735306': 'Semente de Maçã',
												'911706991297187851': 'Semente de Banana',
												'911706992056365176': 'Semente de Laranja',
												'911706991217496075': 'Semente de Limão',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Maçã') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Maçã',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Maçã').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Maçã'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Maçã').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Maçã'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Maçã** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Banana') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Banana',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Banana').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Banana'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Banana').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Banana'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Banana** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Laranja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Laranja',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Laranja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Laranja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Laranja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Laranja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Laranja** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Limão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Limão',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Limão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Limão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Limão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Limão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Limão** com sucesso no **Lote 4**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear5') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote5.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 5**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote5.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 5** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Maçã', 'Semente de Banana', 'Semente de Laranja', 'Semente de Limão', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 5**\n\n${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote5.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote5.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote5.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991783735306': 'Semente de Maçã',
													'911706991297187851': 'Semente de Banana',
													'911706992056365176': 'Semente de Laranja',
													'911706991217496075': 'Semente de Limão',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote5.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote5.id;

													if (user.fazendas[findFazenda].lote5.fruta === itemEmoji2) {
														if (timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote5.fruta2}**! Espere: \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote5.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote5.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote5.fruta': '',
																	'fazendas.$.lote5.fruta2': '',
																	'fazendas.$.lote5.emoji': '',
																	'fazendas.$.lote5.id': '',
																	'fazendas.$.lote5.cooldown': 0,
																	'fazendas.$.lote5.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote5.fruta2}** do **Lote 5** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991783735306': 'Semente de Maçã',
												'911706991297187851': 'Semente de Banana',
												'911706992056365176': 'Semente de Laranja',
												'911706991217496075': 'Semente de Limão',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Maçã') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Maçã',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Maçã').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Maçã'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Maçã').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Maçã'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Maçã** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Banana') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Banana',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Banana').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Banana'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Banana').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Banana'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Banana** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Laranja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Laranja',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Laranja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Laranja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Laranja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Laranja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Laranja** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Limão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Limão',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Limão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Limão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Limão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Limão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Limão** com sucesso no **Lote 5**.`);
												}
											});
										});
									}
								}
							});
						});
					} else if (findSelectedEvento.nome === 'Fazenda 2') {
						let timeout;

						if (user.fazendas[findFazenda].lote1.fruta2 === 'Pêra') {
							timeout = 43200000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Morango') {
							timeout = 64800000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Tomate') {
							timeout = 86400000;
						}

						let timeout2;

						if (user.fazendas[findFazenda].lote2.fruta2 === 'Pêra') {
							timeout2 = 43200000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Morango') {
							timeout2 = 64800000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Tomate') {
							timeout2 = 86400000;
						}

						let timeout3;

						if (user.fazendas[findFazenda].lote3.fruta2 === 'Pêra') {
							timeout3 = 43200000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Morango') {
							timeout3 = 64800000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Tomate') {
							timeout3 = 86400000;
						}

						let timeout4;

						if (user.fazendas[findFazenda].lote4.fruta2 === 'Pêra') {
							timeout4 = 43200000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Morango') {
							timeout4 = 64800000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Tomate') {
							timeout4 = 86400000;
						}

						let timeout5;

						if (user.fazendas[findFazenda].lote5.fruta2 === 'Pêra') {
							timeout5 = 43200000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Morango') {
							timeout5 = 64800000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Tomate') {
							timeout5 = 86400000;
						}

						embed
							.setTitle(findSelectedEvento.nome.toUpperCase())
							.addField('Lote 1:', `${user.fazendas[findFazenda].lote1.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 1️⃣\n(Clique na reação 1️⃣ para desbloquear.)` : `${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`} - Clique em 1️⃣ para abrir o **Lote 1**.`}`)
							.addField('Lote 2:', `${user.fazendas[findFazenda].lote2.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 2️⃣\n(Clique na reação 2️⃣ para desbloquear.)` : `${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`} - Clique em 2️⃣ para abrir o **Lote 2**.`}`)
							.addField('Lote 3:', `${user.fazendas[findFazenda].lote3.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 3️⃣\n(Clique na reação 3️⃣ para desbloquear.)` : `${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`} - Clique em 3️⃣ para abrir o **Lote 3**.`}`)
							.addField('Lote 4:', `${user.fazendas[findFazenda].lote4.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 4️⃣\n(Clique na reação 4️⃣ para desbloquear.)` : `${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`} - Clique em 4️⃣ para abrir o **Lote 4**.`}`)
							.addField('Lote 5:', `${user.fazendas[findFazenda].lote5.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 5️⃣\n(Clique na reação 5️⃣ para desbloquear.)` : `${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`} - Clique em 5️⃣ para abrir o **Lote 5**.`}`)
							.setDescription(`Você está visualizando a **${findSelectedEvento.nome}**\n`);

						const buttonDesbloquear1 = new MessageButton().setStyle('blurple').setEmoji('1️⃣').setID('desbloquear1');
						const buttonDesbloquear2 = new MessageButton().setStyle('blurple').setEmoji('2️⃣').setID('desbloquear2');
						const buttonDesbloquear3 = new MessageButton().setStyle('blurple').setEmoji('3️⃣').setID('desbloquear3');
						const buttonDesbloquear4 = new MessageButton().setStyle('blurple').setEmoji('4️⃣').setID('desbloquear4');
						const buttonDesbloquear5 = new MessageButton().setStyle('blurple').setEmoji('5️⃣').setID('desbloquear5');
						const botoes = new MessageActionRow().addComponents([buttonDesbloquear1, buttonDesbloquear2, buttonDesbloquear3, buttonDesbloquear4]);
						const botoes2 = new MessageActionRow().addComponents([buttonDesbloquear5]);

						msg.edit(author, {
							embed: embed,
							components: [botoes, botoes2]
						}).then(async (msg1) => {
							const desbloquear1 = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
								max: 1
							});

							desbloquear1.on('collect', async (b) => {
								if (b.id === 'desbloquear1') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 1**\n\n${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote1.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote1.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote1.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991796301874': 'Semente de Pêra',
												'911706991280410755': 'Semente de Morango',
												'911706991599173653': 'Semente de Tomate',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote1.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote1.id;

												if (user.fazendas[findFazenda].lote1.fruta === itemEmoji2) {
													if (timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote1.fruta2}**! Espere: \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote1.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote1.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote1.fruta': '',
																'fazendas.$.lote1.fruta2': '',
																'fazendas.$.lote1.emoji': '',
																'fazendas.$.lote1.id': '',
																'fazendas.$.lote1.cooldown': 0,
																'fazendas.$.lote1.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote1.fruta2}** do **Lote 1** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991796301874': 'Semente de Pêra',
											'911706991280410755': 'Semente de Morango',
											'911706991599173653': 'Semente de Tomate',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Pêra') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Pêra',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Pêra').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Pêra'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêra').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Pêra'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Pêra** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Morango') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Morango',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Morango').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Morango'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Morango').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Morango'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Morango** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Tomate') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Tomate',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Tomate').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Tomate'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Tomate').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Tomate'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Tomate** com sucesso no **Lote 1**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear2') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 2**\n\n${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote2.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote2.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote2.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991796301874': 'Semente de Pêra',
												'911706991280410755': 'Semente de Morango',
												'911706991599173653': 'Semente de Tomate',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote2.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote2.id;

												if (user.fazendas[findFazenda].lote2.fruta === itemEmoji2) {
													if (timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote2.fruta2}**! Espere: \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote2.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote2.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote2.fruta': '',
																'fazendas.$.lote2.fruta2': '',
																'fazendas.$.lote2.emoji': '',
																'fazendas.$.lote2.id': '',
																'fazendas.$.lote2.cooldown': 0,
																'fazendas.$.lote2.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote2.fruta2}** do **Lote 2** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991796301874': 'Semente de Pêra',
											'911706991280410755': 'Semente de Morango',
											'911706991599173653': 'Semente de Tomate',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Pêra') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Pêra',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Pêra').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Pêra'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêra').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Pêra'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Pêra** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Morango') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Morango',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Morango').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Morango'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Morango').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Morango'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Morango** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Tomate') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Tomate',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Tomate').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Tomate'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Tomate').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Tomate'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Tomate** com sucesso no **Lote 2**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear3') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote3.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 3**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote3.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 3** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 3**\n\n${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote3.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote3.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote3.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991796301874': 'Semente de Pêra',
													'911706991280410755': 'Semente de Morango',
													'911706991599173653': 'Semente de Tomate',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote3.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote3.id;

													if (user.fazendas[findFazenda].lote3.fruta === itemEmoji2) {
														if (timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote3.fruta2}**! Espere: \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote3.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote3.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote3.fruta': '',
																	'fazendas.$.lote3.fruta2': '',
																	'fazendas.$.lote3.emoji': '',
																	'fazendas.$.lote3.id': '',
																	'fazendas.$.lote3.cooldown': 0,
																	'fazendas.$.lote3.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote3.fruta2}** do **Lote 3** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991796301874': 'Semente de Pêra',
												'911706991280410755': 'Semente de Morango',
												'911706991599173653': 'Semente de Tomate',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêra') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Pêra',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêra').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêra'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêra').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêra'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêra** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Morango') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Morango',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Morango').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Morango'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Morango').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Morango'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Morango** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Tomate') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Tomate',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Tomate').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Tomate'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Tomate').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Tomate'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Tomate** com sucesso no **Lote 3**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear4') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote4.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 4**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote4.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 4** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 4**\n\n${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote4.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote4.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote4.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991796301874': 'Semente de Pêra',
													'911706991280410755': 'Semente de Morango',
													'911706991599173653': 'Semente de Tomate',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote4.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote4.id;

													if (user.fazendas[findFazenda].lote4.fruta === itemEmoji2) {
														if (timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote4.fruta2}**! Espere: \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote4.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote4.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote4.fruta': '',
																	'fazendas.$.lote4.fruta2': '',
																	'fazendas.$.lote4.emoji': '',
																	'fazendas.$.lote4.id': '',
																	'fazendas.$.lote4.cooldown': 0,
																	'fazendas.$.lote4.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote4.fruta2}** do **Lote 4** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991796301874': 'Semente de Pêra',
												'911706991280410755': 'Semente de Morango',
												'911706991599173653': 'Semente de Tomate',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêra') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Pêra',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêra').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêra'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêra').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêra'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêra** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Morango') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Morango',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Morango').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Morango'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Morango').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Morango'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Morango** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Tomate') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Tomate',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Tomate').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Tomate'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Tomate').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Tomate'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Tomate** com sucesso no **Lote 4**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear5') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote5.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 5**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote5.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 5** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêra', 'Semente de Morango', 'Semente de Tomate', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 5**\n\n${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote5.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote5.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote5.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991796301874': 'Semente de Pêra',
													'911706991280410755': 'Semente de Morango',
													'911706991599173653': 'Semente de Tomate',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote5.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote5.id;

													if (user.fazendas[findFazenda].lote5.fruta === itemEmoji2) {
														if (timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote5.fruta2}**! Espere: \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote5.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote5.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote5.fruta': '',
																	'fazendas.$.lote5.fruta2': '',
																	'fazendas.$.lote5.emoji': '',
																	'fazendas.$.lote5.id': '',
																	'fazendas.$.lote5.cooldown': 0,
																	'fazendas.$.lote5.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote5.fruta2}** do **Lote 5** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991796301874': 'Semente de Pêra',
												'911706991280410755': 'Semente de Morango',
												'911706991599173653': 'Semente de Tomate',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêra') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Pêra',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêra').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêra'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêra').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêra'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêra** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Morango') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Morango',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Morango').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Morango'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Morango').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Morango'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Morango** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Tomate') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Tomate',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Tomate').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Tomate'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Tomate').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Tomate'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Tomate** com sucesso no **Lote 5**.`);
												}
											});
										});
									}
								}
							});
						});
					} else if (findSelectedEvento.nome === 'Fazenda 3') {
						let timeout;

						if (user.fazendas[findFazenda].lote1.fruta2 === 'Abacaxi') {
							timeout = 57600000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Melão') {
							timeout = 64800000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Manga') {
							timeout = 86400000;
						}

						let timeout2;

						if (user.fazendas[findFazenda].lote2.fruta2 === 'Abacaxi') {
							timeout2 = 57600000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Melão') {
							timeout2 = 64800000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Manga') {
							timeout2 = 86400000;
						}

						let timeout3;

						if (user.fazendas[findFazenda].lote3.fruta2 === 'Abacaxi') {
							timeout3 = 57600000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Melão') {
							timeout3 = 64800000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Manga') {
							timeout3 = 86400000;
						}

						let timeout4;

						if (user.fazendas[findFazenda].lote4.fruta2 === 'Abacaxi') {
							timeout4 = 57600000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Melão') {
							timeout4 = 64800000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Manga') {
							timeout4 = 86400000;
						}

						let timeout5;

						if (user.fazendas[findFazenda].lote5.fruta2 === 'Abacaxi') {
							timeout5 = 57600000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Melão') {
							timeout5 = 64800000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Manga') {
							timeout5 = 86400000;
						}

						embed
							.setTitle(findSelectedEvento.nome.toUpperCase())
							.addField('Lote 1:', `${user.fazendas[findFazenda].lote1.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 1️⃣\n(Clique na reação 1️⃣ para desbloquear.)` : `${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`} - Clique em 1️⃣ para abrir o **Lote 1**.`}`)
							.addField('Lote 2:', `${user.fazendas[findFazenda].lote2.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 2️⃣\n(Clique na reação 2️⃣ para desbloquear.)` : `${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`} - Clique em 2️⃣ para abrir o **Lote 2**.`}`)
							.addField('Lote 3:', `${user.fazendas[findFazenda].lote3.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 3️⃣\n(Clique na reação 3️⃣ para desbloquear.)` : `${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`} - Clique em 3️⃣ para abrir o **Lote 3**.`}`)
							.addField('Lote 4:', `${user.fazendas[findFazenda].lote4.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 4️⃣\n(Clique na reação 4️⃣ para desbloquear.)` : `${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`} - Clique em 4️⃣ para abrir o **Lote 4**.`}`)
							.addField('Lote 5:', `${user.fazendas[findFazenda].lote5.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 5️⃣\n(Clique na reação 5️⃣ para desbloquear.)` : `${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`} - Clique em 5️⃣ para abrir o **Lote 5**.`}`)
							.setDescription(`Você está visualizando a **${findSelectedEvento.nome}**\n`);

						const buttonDesbloquear1 = new MessageButton().setStyle('blurple').setEmoji('1️⃣').setID('desbloquear1');
						const buttonDesbloquear2 = new MessageButton().setStyle('blurple').setEmoji('2️⃣').setID('desbloquear2');
						const buttonDesbloquear3 = new MessageButton().setStyle('blurple').setEmoji('3️⃣').setID('desbloquear3');
						const buttonDesbloquear4 = new MessageButton().setStyle('blurple').setEmoji('4️⃣').setID('desbloquear4');
						const buttonDesbloquear5 = new MessageButton().setStyle('blurple').setEmoji('5️⃣').setID('desbloquear5');
						const botoes = new MessageActionRow().addComponents([buttonDesbloquear1, buttonDesbloquear2, buttonDesbloquear3, buttonDesbloquear4]);
						const botoes2 = new MessageActionRow().addComponents([buttonDesbloquear5]);

						msg.edit(author, {
							embed: embed,
							components: [botoes, botoes2]
						}).then(async (msg1) => {
							const desbloquear1 = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
								max: 1
							});

							desbloquear1.on('collect', async (b) => {
								if (b.id === 'desbloquear1') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 1**\n\n${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote1.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote1.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote1.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991804678144': 'Semente de Abacaxi',
												'911706991766933574': 'Semente de Melão',
												'911706991594995732': 'Semente de Manga',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote1.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote1.id;

												if (user.fazendas[findFazenda].lote1.fruta === itemEmoji2) {
													if (timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote1.fruta2}**! Espere: \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote1.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote1.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote1.fruta': '',
																'fazendas.$.lote1.fruta2': '',
																'fazendas.$.lote1.emoji': '',
																'fazendas.$.lote1.id': '',
																'fazendas.$.lote1.cooldown': 0,
																'fazendas.$.lote1.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote1.fruta2}** do **Lote 1** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991804678144': 'Semente de Abacaxi',
											'911706991766933574': 'Semente de Melão',
											'911706991594995732': 'Semente de Manga',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Abacaxi') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Abacaxi',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Abacaxi'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Abacaxi'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Abacaxi** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Melão') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Melão',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Melão').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Melão'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melão').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Melão'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Melão** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Manga') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Manga',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Manga').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Manga'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Manga').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Manga'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Manga** com sucesso no **Lote 1**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear2') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 2**\n\n${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote2.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote2.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote2.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991804678144': 'Semente de Abacaxi',
												'911706991766933574': 'Semente de Melão',
												'911706991594995732': 'Semente de Manga',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote2.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote2.id;

												if (user.fazendas[findFazenda].lote2.fruta === itemEmoji2) {
													if (timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote2.fruta2}**! Espere: \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote2.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote2.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote2.fruta': '',
																'fazendas.$.lote2.fruta2': '',
																'fazendas.$.lote2.emoji': '',
																'fazendas.$.lote2.id': '',
																'fazendas.$.lote2.cooldown': 0,
																'fazendas.$.lote2.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote2.fruta2}** do **Lote 2** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991804678144': 'Semente de Abacaxi',
											'911706991766933574': 'Semente de Melão',
											'911706991594995732': 'Semente de Manga',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Abacaxi') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Abacaxi',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Abacaxi'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Abacaxi'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Abacaxi** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Melão') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Melão',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Melão').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Melão'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melão').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Melão'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Melão** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Manga') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Manga',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Manga').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Manga'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Manga').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Manga'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Manga** com sucesso no **Lote 2**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear3') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote3.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 3**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote3.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 3** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 3**\n\n${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote3.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote3.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote3.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991804678144': 'Semente de Abacaxi',
													'911706991766933574': 'Semente de Melão',
													'911706991594995732': 'Semente de Manga',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote3.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote3.id;

													if (user.fazendas[findFazenda].lote3.fruta === itemEmoji2) {
														if (timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote3.fruta2}**! Espere: \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote3.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote3.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote3.fruta': '',
																	'fazendas.$.lote3.fruta2': '',
																	'fazendas.$.lote3.emoji': '',
																	'fazendas.$.lote3.id': '',
																	'fazendas.$.lote3.cooldown': 0,
																	'fazendas.$.lote3.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote3.fruta2}** do **Lote 3** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991804678144': 'Semente de Abacaxi',
												'911706991766933574': 'Semente de Melão',
												'911706991594995732': 'Semente de Manga',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Abacaxi') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Abacaxi',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Abacaxi'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Abacaxi'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Abacaxi** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Melão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Melão',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melão** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Manga') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Manga',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Manga').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Manga'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Manga').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Manga'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Manga** com sucesso no **Lote 3**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear4') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote4.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 4**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote4.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 4** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 4**\n\n${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote4.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote4.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote4.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991804678144': 'Semente de Abacaxi',
													'911706991766933574': 'Semente de Melão',
													'911706991594995732': 'Semente de Manga',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote4.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote4.id;

													if (user.fazendas[findFazenda].lote4.fruta === itemEmoji2) {
														if (timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote4.fruta2}**! Espere: \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote4.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote4.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote4.fruta': '',
																	'fazendas.$.lote4.fruta2': '',
																	'fazendas.$.lote4.emoji': '',
																	'fazendas.$.lote4.id': '',
																	'fazendas.$.lote4.cooldown': 0,
																	'fazendas.$.lote4.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote4.fruta2}** do **Lote 4** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991804678144': 'Semente de Abacaxi',
												'911706991766933574': 'Semente de Melão',
												'911706991594995732': 'Semente de Manga',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Abacaxi') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Abacaxi',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Abacaxi'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Abacaxi'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Abacaxi** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Melão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Melão',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melão** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Manga') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Manga',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Manga').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Manga'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Manga').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Manga'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Manga** com sucesso no **Lote 4**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear5') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote5.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 5**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote5.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 5** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Abacaxi', 'Semente de Melão', 'Semente de Manga', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 5**\n\n${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote5.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote5.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote5.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991804678144': 'Semente de Abacaxi',
													'911706991766933574': 'Semente de Melão',
													'911706991594995732': 'Semente de Manga',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote5.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote5.id;

													if (user.fazendas[findFazenda].lote5.fruta === itemEmoji2) {
														if (timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote5.fruta2}**! Espere: \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote5.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote5.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote5.fruta': '',
																	'fazendas.$.lote5.fruta2': '',
																	'fazendas.$.lote5.emoji': '',
																	'fazendas.$.lote5.id': '',
																	'fazendas.$.lote5.cooldown': 0,
																	'fazendas.$.lote5.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote5.fruta2}** do **Lote 5** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991804678144': 'Semente de Abacaxi',
												'911706991766933574': 'Semente de Melão',
												'911706991594995732': 'Semente de Manga',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Abacaxi') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Abacaxi',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Abacaxi'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Abacaxi').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Abacaxi'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Abacaxi** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Melão') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Melão',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melão').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melão'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melão').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melão'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melão** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Manga') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Manga',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Manga').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Manga'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Manga').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Manga'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Manga** com sucesso no **Lote 5**.`);
												}
											});
										});
									}
								}
							});
						});
					} else if (findSelectedEvento.nome === 'Fazenda 4') {
						let timeout;

						if (user.fazendas[findFazenda].lote1.fruta2 === 'Pêssego') {
							timeout = 86400000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Cereja') {
							timeout = 57600000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Melancia') {
							timeout = 72000000;
						}

						let timeout2;

						if (user.fazendas[findFazenda].Lote2.fruta2 === 'Pêssego') {
							timeout2 = 86400000;
						} else if (user.fazendas[findFazenda].Lote2.fruta2 === 'Cereja') {
							timeout2 = 57600000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Melancia') {
							timeout2 = 72000000;
						}

						let timeout3;

						if (user.fazendas[findFazenda].lote3.fruta2 === 'Pêssego') {
							timeout3 = 86400000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Cereja') {
							timeout3 = 57600000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Melancia') {
							timeout3 = 72000000;
						}

						let timeout4;

						if (user.fazendas[findFazenda].lote4.fruta2 === 'Pêssego') {
							timeout4 = 86400000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Cereja') {
							timeout4 = 57600000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Melancia') {
							timeout4 = 72000000;
						}

						let timeout5;

						if (user.fazendas[findFazenda].lote5.fruta2 === 'Pêssego') {
							timeout5 = 86400000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Cereja') {
							timeout5 = 57600000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Melancia') {
							timeout5 = 72000000;
						}

						embed
							.setTitle(findSelectedEvento.nome.toUpperCase())
							.addField('Lote 1:', `${user.fazendas[findFazenda].lote1.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 1️⃣\n(Clique na reação 1️⃣ para desbloquear.)` : `${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`} - Clique em 1️⃣ para abrir o **Lote 1**.`}`)
							.addField('Lote 2:', `${user.fazendas[findFazenda].lote2.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 2️⃣\n(Clique na reação 2️⃣ para desbloquear.)` : `${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`} - Clique em 2️⃣ para abrir o **Lote 2**.`}`)
							.addField('Lote 3:', `${user.fazendas[findFazenda].lote3.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 3️⃣\n(Clique na reação 3️⃣ para desbloquear.)` : `${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`} - Clique em 3️⃣ para abrir o **Lote 3**.`}`)
							.addField('Lote 4:', `${user.fazendas[findFazenda].lote4.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 4️⃣\n(Clique na reação 4️⃣ para desbloquear.)` : `${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`} - Clique em 4️⃣ para abrir o **Lote 4**.`}`)
							.addField('Lote 5:', `${user.fazendas[findFazenda].lote5.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 5️⃣\n(Clique na reação 5️⃣ para desbloquear.)` : `${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`} - Clique em 5️⃣ para abrir o **Lote 5**.`}`)
							.setDescription(`Você está visualizando a **${findSelectedEvento.nome}**\n`);

						const buttonDesbloquear1 = new MessageButton().setStyle('blurple').setEmoji('1️⃣').setID('desbloquear1');
						const buttonDesbloquear2 = new MessageButton().setStyle('blurple').setEmoji('2️⃣').setID('desbloquear2');
						const buttonDesbloquear3 = new MessageButton().setStyle('blurple').setEmoji('3️⃣').setID('desbloquear3');
						const buttonDesbloquear4 = new MessageButton().setStyle('blurple').setEmoji('4️⃣').setID('desbloquear4');
						const buttonDesbloquear5 = new MessageButton().setStyle('blurple').setEmoji('5️⃣').setID('desbloquear5');
						const botoes = new MessageActionRow().addComponents([buttonDesbloquear1, buttonDesbloquear2, buttonDesbloquear3, buttonDesbloquear4]);
						const botoes2 = new MessageActionRow().addComponents([buttonDesbloquear5]);

						msg.edit(author, {
							embed: embed,
							components: [botoes, botoes2]
						}).then(async (msg1) => {
							const desbloquear1 = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
								max: 1
							});

							desbloquear1.on('collect', async (b) => {
								if (b.id === 'desbloquear1') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 1**\n\n${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote1.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote1.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote1.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991632736316': 'Semente de Pêssego',
												'911706991934734406': 'Semente de Cereja',
												'911706991808884776': 'Semente de Melancia',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote1.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote1.id;

												if (user.fazendas[findFazenda].lote1.fruta === itemEmoji2) {
													if (timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote1.fruta2}**! Espere: \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote1.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote1.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote1.fruta': '',
																'fazendas.$.lote1.fruta2': '',
																'fazendas.$.lote1.emoji': '',
																'fazendas.$.lote1.id': '',
																'fazendas.$.lote1.cooldown': 0,
																'fazendas.$.lote1.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote1.fruta2}** do **Lote 1** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991632736316': 'Semente de Pêssego',
											'911706991934734406': 'Semente de Cereja',
											'911706991808884776': 'Semente de Melancia',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Pêssego') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Pêssego',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Pêssego'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Pêssego'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Pêssego** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Cereja') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Cereja',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Cereja').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Cereja'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Cereja').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Cereja'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Cereja** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Melancia') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Melancia',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Melancia').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Melancia'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melancia').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Melancia'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Melancia** com sucesso no **Lote 1**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear2') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 2**\n\n${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote2.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote2.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote2.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991632736316': 'Semente de Pêssego',
												'911706991934734406': 'Semente de Cereja',
												'911706991808884776': 'Semente de Melancia',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote2.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote2.id;

												if (user.fazendas[findFazenda].lote2.fruta === itemEmoji2) {
													if (timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote2.fruta2}**! Espere: \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote2.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote2.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote2.fruta': '',
																'fazendas.$.lote2.fruta2': '',
																'fazendas.$.lote2.emoji': '',
																'fazendas.$.lote2.id': '',
																'fazendas.$.lote2.cooldown': 0,
																'fazendas.$.lote2.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote2.fruta2}** do **Lote 2** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991632736316': 'Semente de Pêssego',
											'911706991934734406': 'Semente de Cereja',
											'911706991808884776': 'Semente de Melancia',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Pêssego') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Pêssego',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Pêssego'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Pêssego'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Pêssego** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Cereja') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Cereja',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Cereja').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Cereja'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Cereja').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Cereja'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Cereja** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Melancia') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Melancia',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Melancia').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Melancia'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melancia').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Melancia'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Melancia** com sucesso no **Lote 2**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear3') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote3.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 3**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote3.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 3** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 3**\n\n${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote3.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote3.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote3.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991632736316': 'Semente de Pêssego',
													'911706991934734406': 'Semente de Cereja',
													'911706991808884776': 'Semente de Melancia',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote3.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote3.id;

													if (user.fazendas[findFazenda].lote3.fruta === itemEmoji2) {
														if (timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote3.fruta2}**! Espere: \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote3.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote3.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote3.fruta': '',
																	'fazendas.$.lote3.fruta2': '',
																	'fazendas.$.lote3.emoji': '',
																	'fazendas.$.lote3.id': '',
																	'fazendas.$.lote3.cooldown': 0,
																	'fazendas.$.lote3.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote3.fruta2}** do **Lote 3** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991632736316': 'Semente de Pêssego',
												'911706991934734406': 'Semente de Cereja',
												'911706991808884776': 'Semente de Melancia',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêssego') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Pêssego',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêssego'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêssego'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêssego** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Cereja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Cereja',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Cereja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Cereja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Cereja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Cereja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Cereja** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Melancia') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Melancia',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melancia').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melancia'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melancia').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melancia'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melancia** com sucesso no **Lote 3**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear4') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote4.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 4**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote4.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 4** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 4**\n\n${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote4.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote4.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote4.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991632736316': 'Semente de Pêssego',
													'911706991934734406': 'Semente de Cereja',
													'911706991808884776': 'Semente de Melancia',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote4.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote4.id;

													if (user.fazendas[findFazenda].lote4.fruta === itemEmoji2) {
														if (timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote4.fruta2}**! Espere: \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote4.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote4.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote4.fruta': '',
																	'fazendas.$.lote4.fruta2': '',
																	'fazendas.$.lote4.emoji': '',
																	'fazendas.$.lote4.id': '',
																	'fazendas.$.lote4.cooldown': 0,
																	'fazendas.$.lote4.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote4.fruta2}** do **Lote 4** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991632736316': 'Semente de Pêssego',
												'911706991934734406': 'Semente de Cereja',
												'911706991808884776': 'Semente de Melancia',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêssego') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Pêssego',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêssego'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêssego'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêssego** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Cereja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Cereja',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Cereja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Cereja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Cereja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Cereja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Cereja** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Melancia') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Melancia',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melancia').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melancia'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melancia').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melancia'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melancia** com sucesso no **Lote 4**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear5') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote5.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 5**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote5.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 5** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Pêssego', 'Semente de Cereja', 'Semente de Melancia', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 5**\n\n${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote5.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote5.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote5.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991632736316': 'Semente de Pêssego',
													'911706991934734406': 'Semente de Cereja',
													'911706991808884776': 'Semente de Melancia',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote5.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote5.id;

													if (user.fazendas[findFazenda].lote5.fruta === itemEmoji2) {
														if (timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote5.fruta2}**! Espere: \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote5.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote5.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote5.fruta': '',
																	'fazendas.$.lote5.fruta2': '',
																	'fazendas.$.lote5.emoji': '',
																	'fazendas.$.lote5.id': '',
																	'fazendas.$.lote5.cooldown': 0,
																	'fazendas.$.lote5.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote5.fruta2}** do **Lote 5** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991632736316': 'Semente de Pêssego',
												'911706991934734406': 'Semente de Cereja',
												'911706991808884776': 'Semente de Melancia',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Pêssego') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Pêssego',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Pêssego'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Pêssego').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Pêssego'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Pêssego** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Cereja') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Cereja',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Cereja').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Cereja'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Cereja').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Cereja'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Cereja** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Melancia') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Melancia',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Melancia').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Melancia'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Melancia').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Melancia'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Melancia** com sucesso no **Lote 5**.`);
												}
											});
										});
									}
								}
							});
						});
					} else if (findSelectedEvento.nome === 'Fazenda 5') {
						let timeout;

						if (user.fazendas[findFazenda].lote1.fruta2 === 'Café') {
							timeout = 43200000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Milho') {
							timeout = 57600000;
						} else if (user.fazendas[findFazenda].lote1.fruta2 === 'Arroz') {
							timeout = 86400000;
						}

						let timeout2;

						if (user.fazendas[findFazenda].lote2.fruta2 === 'Café') {
							timeout2 = 43200000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Milho') {
							timeout2 = 57600000;
						} else if (user.fazendas[findFazenda].lote2.fruta2 === 'Arroz') {
							timeout2 = 86400000;
						}

						let timeout3;

						if (user.fazendas[findFazenda].lote3.fruta2 === 'Café') {
							timeout3 = 43200000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Milho') {
							timeout3 = 57600000;
						} else if (user.fazendas[findFazenda].lote3.fruta2 === 'Arroz') {
							timeout3 = 86400000;
						}

						let timeout4;

						if (user.fazendas[findFazenda].lote4.fruta2 === 'Café') {
							timeout4 = 43200000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Milho') {
							timeout4 = 57600000;
						} else if (user.fazendas[findFazenda].lote4.fruta2 === 'Arroz') {
							timeout4 = 86400000;
						}

						let timeout5;

						if (user.fazendas[findFazenda].lote5.fruta2 === 'Café') {
							timeout5 = 43200000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Milho') {
							timeout5 = 57600000;
						} else if (user.fazendas[findFazenda].lote5.fruta2 === 'Arroz') {
							timeout5 = 86400000;
						}

						embed
							.setTitle(findSelectedEvento.nome.toUpperCase())
							.addField('Lote 1:', `${user.fazendas[findFazenda].lote1.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 1️⃣\n(Clique na reação 1️⃣ para desbloquear.)` : `${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`} - Clique em 1️⃣ para abrir o **Lote 1**.`}`)
							.addField('Lote 2:', `${user.fazendas[findFazenda].lote2.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 2️⃣\n(Clique na reação 2️⃣ para desbloquear.)` : `${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`} - Clique em 2️⃣ para abrir o **Lote 2**.`}`)
							.addField('Lote 3:', `${user.fazendas[findFazenda].lote3.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 3️⃣\n(Clique na reação 3️⃣ para desbloquear.)` : `${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`} - Clique em 3️⃣ para abrir o **Lote 3**.`}`)
							.addField('Lote 4:', `${user.fazendas[findFazenda].lote4.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 4️⃣\n(Clique na reação 4️⃣ para desbloquear.)` : `${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`} - Clique em 4️⃣ para abrir o **Lote 4**.`}`)
							.addField('Lote 5:', `${user.fazendas[findFazenda].lote5.bloqueado ? `\`Bloqueado\` - Desbloqueie gastando \`25\` BitCoins. ---> 5️⃣\n(Clique na reação 5️⃣ para desbloquear.)` : `${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`} - Clique em 5️⃣ para abrir o **Lote 5**.`}`)
							.setDescription(`Você está visualizando a **${findSelectedEvento.nome}**\n`);

						const buttonDesbloquear1 = new MessageButton().setStyle('blurple').setEmoji('1️⃣').setID('desbloquear1');
						const buttonDesbloquear2 = new MessageButton().setStyle('blurple').setEmoji('2️⃣').setID('desbloquear2');
						const buttonDesbloquear3 = new MessageButton().setStyle('blurple').setEmoji('3️⃣').setID('desbloquear3');
						const buttonDesbloquear4 = new MessageButton().setStyle('blurple').setEmoji('4️⃣').setID('desbloquear4');
						const buttonDesbloquear5 = new MessageButton().setStyle('blurple').setEmoji('5️⃣').setID('desbloquear5');
						const botoes = new MessageActionRow().addComponents([buttonDesbloquear1, buttonDesbloquear2, buttonDesbloquear3, buttonDesbloquear4]);
						const botoes2 = new MessageActionRow().addComponents([buttonDesbloquear5]);

						msg.edit(author, {
							embed: embed,
							components: [botoes, botoes2]
						}).then(async (msg1) => {
							const desbloquear1 = msg1.createButtonCollector((button) => button.clicker.user.id === author.id, {
								max: 1
							});

							desbloquear1.on('collect', async (b) => {
								if (b.id === 'desbloquear1') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 1**\n\n${timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote1.fruta}** - \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote1.emoji}** (\`x${user.fazendas[findFazenda].lote1.quantia}\`)` : user.fazendas[findFazenda].lote1.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote1.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote1.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote1.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote1.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991615950898': 'Semente de Café',
												'911706992400298056': 'Semente de Milho',
												'911706991670493214': 'Semente de Arroz',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote1.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote1.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote1.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote1.id;

												if (user.fazendas[findFazenda].lote1.fruta === itemEmoji2) {
													if (timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote1.fruta2}**! Espere: \`${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).hours}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).minutes}:${ms(timeout - (Date.now() - user.fazendas[findFazenda].lote1.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote1.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote1.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote1.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote1.fruta': '',
																'fazendas.$.lote1.fruta2': '',
																'fazendas.$.lote1.emoji': '',
																'fazendas.$.lote1.id': '',
																'fazendas.$.lote1.cooldown': 0,
																'fazendas.$.lote1.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote1.fruta2}** do **Lote 1** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991615950898': 'Semente de Café',
											'911706992400298056': 'Semente de Milho',
											'911706991670493214': 'Semente de Arroz',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote1.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote1.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.cooldown': user.fazendas[findFazenda].lote1.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote1.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 1** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Café') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Café',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Café').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Café'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Café').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Café'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Café** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Milho') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Milho',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Milho').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Milho'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Milho').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Milho'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Milho** com sucesso no **Lote 1**.`);
											} else if (itemEmoji === 'Semente de Arroz') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote1.fruta': itemEmoji,
														'fazendas.$.lote1.fruta2': 'Arroz',
														'fazendas.$.lote1.emoji': emoji.emoji,
														'fazendas.$.lote1.id': emoji.id,
														'fazendas.$.lote1.cooldown': Date.now(),
														'fazendas.$.lote1.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Arroz').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Arroz'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Arroz').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Arroz'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Arroz** com sucesso no **Lote 1**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear2') {
									b.reply.defer();

									const itensFilter = user.inventory.filter((a) => ['Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

									const itensMap = itensFilter.map((as) => as.emoji).join(' ');

									const tempos = 3600000;

									embed.fields = [];

									embed
										.setDescription(`Você está visualizando o **Lote 2**\n\n${timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote2.fruta}** - \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote2.emoji}** (\`x${user.fazendas[findFazenda].lote2.quantia}\`)` : user.fazendas[findFazenda].lote2.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote2.emoji}`}\n`)
										.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
										.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
										.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

									msg.edit(author, {
										embed: embed,
										components: []
									}).then(async (as) => {
										if (user.fazendas[findFazenda].lote2.fruta === '') {
											for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
										} else {
											const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

											await as.react(user.fazendas[findFazenda].lote2.id);

											for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

											const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote2.id && user3.id === author.id, {
												max: 1
											});

											const objeto2 = {
												'911706991615950898': 'Semente de Café',
												'911706992400298056': 'Semente de Milho',
												'911706991670493214': 'Semente de Arroz',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											usarItem.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												if (itemEmoji2 === 'Adubo') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Irrigação') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji2 === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote2.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote2.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
												}
											});

											colherFruta.on('collect', async (collected) => {
												const itemEmoji2 = objeto2[collected.emoji.id];

												const emoji2 = user.fazendas[findFazenda].lote2.emoji;
												const emoji2Id = user.fazendas[findFazenda].lote2.id;

												if (user.fazendas[findFazenda].lote2.fruta === itemEmoji2) {
													if (timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown) > 0) {
														msg.delete();
														return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote2.fruta2}**! Espere: \`${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).hours}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).minutes}:${ms(timeout2 - (Date.now() - user.fazendas[findFazenda].lote2.cooldown)).seconds}\``);
													} else {
														if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2)) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'caixote.item': user.fazendas[findFazenda].lote2.fruta2
															}, {
																$set: {
																	'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote2.fruta2).quantia + 5
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$push: {
																	caixote: {
																		item: user.fazendas[findFazenda].lote2.fruta2,
																		emoji: emoji2,
																		id: emoji2Id,
																		quantia: 5
																	}
																}
															});
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote2.fruta': '',
																'fazendas.$.lote2.fruta2': '',
																'fazendas.$.lote2.emoji': '',
																'fazendas.$.lote2.id': '',
																'fazendas.$.lote2.cooldown': 0,
																'fazendas.$.lote2.quantia': 0
															}
														});

														msg.delete();
														return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote2.fruta2}** do **Lote 2** com sucesso!`);
													}
												}
											});

											return;
										}

										const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
											max: 1
										});

										const objeto = {
											'911706991615950898': 'Semente de Café',
											'911706992400298056': 'Semente de Milho',
											'911706991670493214': 'Semente de Arroz',
											'898326104782299166': 'Adubo',
											'898326105126215701': 'Fertilizante',
											'898326105361113099': 'Irrigação',
											'911776845144416287': 'Aluguel Trator'
										};

										plantando.on('collect', async (collected) => {
											const itemEmoji = objeto[collected.emoji.id];

											const emoji = user.inventory.find((a) => a.item === itemEmoji);

											if (itemEmoji === 'Adubo') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo) > 0) {
													const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.adubo));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.adubo': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Adubo'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Adubo'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Adubo** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Fertilizante') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante) > 0) {
													const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.fertilizante));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.fertilizante': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Fertilizante'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Fertilizante'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Fertilizante** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Irrigação') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao) > 0) {
													const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.irrigacao));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.irrigacao': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Irrigação'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Irrigação'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Irrigação** usada com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Aluguel Trator') {
												if (user.fazendas[findFazenda].lote2.fruta === '') {
													msg.delete();
													return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
												}

												if (tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator) > 0) {
													const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote2.trator));

													msg.delete();
													return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
												}

												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.cooldown': user.fazendas[findFazenda].lote2.cooldown - (15 * 60 * 1000),
														'fazendas.$.lote2.trator': Date.now()
													}
												});

												if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Aluguel Trator'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Aluguel Trator'
															}
														}
													});
												}

												msg.delete();
												return message.reply('**Trator** usado com sucesso no **Lote 2** e diminuiu 15min da sua plantação.');
											} else if (itemEmoji === 'Semente de Café') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Café',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Café').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Café'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Café').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Café'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Café** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Milho') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Milho',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Milho').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Milho'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Milho').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Milho'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Milho** com sucesso no **Lote 2**.`);
											} else if (itemEmoji === 'Semente de Arroz') {
												await this.client.database.users.findOneAndUpdate({
													userId: author.id,
													guildId: message.guild.id,
													'fazendas.nome': findSelectedEvento.nome
												}, {
													$set: {
														'fazendas.$.lote2.fruta': itemEmoji,
														'fazendas.$.lote2.fruta2': 'Arroz',
														'fazendas.$.lote2.emoji': emoji.emoji,
														'fazendas.$.lote2.id': emoji.id,
														'fazendas.$.lote2.cooldown': Date.now(),
														'fazendas.$.lote2.quantia': 1
													}
												});

												if (user.inventory.find((a) => a.item === 'Semente de Arroz').quantia > 1) {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'inventory.item': 'Semente de Arroz'
													}, {
														$set: {
															'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Arroz').quantia - 1
														}
													});
												} else {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id
													}, {
														$pull: {
															inventory: {
																item: 'Semente de Arroz'
															}
														}
													});
												}

												msg.delete();
												return message.reply(`você plantou \`x1\` **Semente de Arroz** com sucesso no **Lote 2**.`);
											}
										});
									});
								} else if (b.id === 'desbloquear3') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote3.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 3**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote3.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 3** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 3**\n\n${timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote3.fruta}** - \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote3.emoji}** (\`x${user.fazendas[findFazenda].lote3.quantia}\`)` : user.fazendas[findFazenda].lote3.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote3.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote3.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote3.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote3.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991615950898': 'Semente de Café',
													'911706992400298056': 'Semente de Milho',
													'911706991670493214': 'Semente de Arroz',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote3.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote3.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote3.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote3.id;

													if (user.fazendas[findFazenda].lote3.fruta === itemEmoji2) {
														if (timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote3.fruta2}**! Espere: \`${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).hours}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).minutes}:${ms(timeout3 - (Date.now() - user.fazendas[findFazenda].lote3.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote3.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote3.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote3.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote3.fruta': '',
																	'fazendas.$.lote3.fruta2': '',
																	'fazendas.$.lote3.emoji': '',
																	'fazendas.$.lote3.id': '',
																	'fazendas.$.lote3.cooldown': 0,
																	'fazendas.$.lote3.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote3.fruta2}** do **Lote 3** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991615950898': 'Semente de Café',
												'911706992400298056': 'Semente de Milho',
												'911706991670493214': 'Semente de Arroz',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote3.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote3.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.cooldown': user.fazendas[findFazenda].lote3.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote3.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 3** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Café') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Café',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Café').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Café'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Café').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Café'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Café** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Milho') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Milho',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Milho').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Milho'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Milho').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Milho'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Milho** com sucesso no **Lote 3**.`);
												} else if (itemEmoji === 'Semente de Arroz') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote3.fruta': itemEmoji,
															'fazendas.$.lote3.fruta2': 'Arroz',
															'fazendas.$.lote3.emoji': emoji.emoji,
															'fazendas.$.lote3.id': emoji.id,
															'fazendas.$.lote3.cooldown': Date.now(),
															'fazendas.$.lote3.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Arroz').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Arroz'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Arroz').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Arroz'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Arroz** com sucesso no **Lote 3**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear4') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote4.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 4**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote4.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 4** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 4**\n\n${timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote4.fruta}** - \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote4.emoji}** (\`x${user.fazendas[findFazenda].lote4.quantia}\`)` : user.fazendas[findFazenda].lote4.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote4.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote4.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote4.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote4.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991615950898': 'Semente de Café',
													'911706992400298056': 'Semente de Milho',
													'911706991670493214': 'Semente de Arroz',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote4.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote4.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote4.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote4.id;

													if (user.fazendas[findFazenda].lote4.fruta === itemEmoji2) {
														if (timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote4.fruta2}**! Espere: \`${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).hours}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).minutes}:${ms(timeout4 - (Date.now() - user.fazendas[findFazenda].lote4.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote4.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote4.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote4.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote4.fruta': '',
																	'fazendas.$.lote4.fruta2': '',
																	'fazendas.$.lote4.emoji': '',
																	'fazendas.$.lote4.id': '',
																	'fazendas.$.lote4.cooldown': 0,
																	'fazendas.$.lote4.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote4.fruta2}** do **Lote 4** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991615950898': 'Semente de Café',
												'911706992400298056': 'Semente de Milho',
												'911706991670493214': 'Semente de Arroz',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote4.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote4.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.cooldown': user.fazendas[findFazenda].lote4.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote4.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 4** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Café') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Café',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Café').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Café'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Café').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Café'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Café** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Milho') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Milho',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Milho').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Milho'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Milho').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Milho'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Milho** com sucesso no **Lote 4**.`);
												} else if (itemEmoji === 'Semente de Arroz') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote4.fruta': itemEmoji,
															'fazendas.$.lote4.fruta2': 'Arroz',
															'fazendas.$.lote4.emoji': emoji.emoji,
															'fazendas.$.lote4.id': emoji.id,
															'fazendas.$.lote4.cooldown': Date.now(),
															'fazendas.$.lote4.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Arroz').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Arroz'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Arroz').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Arroz'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Arroz** com sucesso no **Lote 4**.`);
												}
											});
										});
									}
								} else if (b.id === 'desbloquear5') {
									b.reply.defer();

									if (user.fazendas[findFazenda].lote5.bloqueado) {
										const user2 = await this.client.database.users.findOne({
											userId: author.id,
											guildId: message.guild.id
										});

										if (user2.bitcoin < 25) {
											msg.delete();
											return message.reply('você não tem **bitcoins** suficientes para desbloquear o **Lote 5**!');
										}

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id,
											'fazendas.nome': findSelectedEvento.nome
										}, {
											$set: {
												'fazendas.$.lote5.bloqueado': false
											}
										});

										await this.client.database.users.findOneAndUpdate({
											userId: author.id,
											guildId: message.guild.id
										}, {
											$set: {
												bitcoin: user2.bitcoin -= 25
											}
										});

										user2.save();

										msg.delete();
										return message.reply('**Lote 5** desbloqueado com sucesso!').then((a) => a.delete({
											timeout: 7000
										}));
									} else {
										const itensFilter = user.inventory.filter((a) => ['Semente de Café', 'Semente de Milho', 'Semente de Arroz', 'Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

										const itensMap = itensFilter.map((as) => as.emoji).join(' ');

										const tempos = 3600000;

										embed.fields = [];

										embed
											.setDescription(`Você está visualizando o **Lote 5**\n\n${timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0 ? `**${user.fazendas[findFazenda].lote5.fruta}** - \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\` - **${user.fazendas[findFazenda].lote5.emoji}** (\`x${user.fazendas[findFazenda].lote5.quantia}\`)` : user.fazendas[findFazenda].lote5.fruta === '' ? `\`Pronto para Uso\`` : `\`Pronto para Colheita\` - ${user.fazendas[findFazenda].lote5.emoji}`}\n`)
											.addField('Clique na Fruta que você Deseja Plantar A __Semente__:', itensMap || 'Você não possui nenhuma **Semente de Fruta** ainda.')
											.addField('<:adubo:898326104782299166> | Adubo:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:fertilizante:898326105126215701> | Fertilizante:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:irrigador:898326105361113099> | Irrigação:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`)
											.addField('<:trator:911776845144416287> | Aluguel Trator:', tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0 ? `\`${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).minutes}:${ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator)).seconds}\` - ❌` : `\`Pronto para Uso\` - ✅`);

										msg.edit(author, {
											embed: embed,
											components: []
										}).then(async (as) => {
											if (user.fazendas[findFazenda].lote5.fruta === '') {
												for (const emoji of itensFilter.map((es) => es.id)) await as.react(emoji);
											} else {
												const itensFilter2 = user.inventory.filter((a) => ['Adubo', 'Fertilizante', 'Irrigação', 'Aluguel Trator'].includes(a.item));

												await as.react(user.fazendas[findFazenda].lote5.id);

												for (const emoji of itensFilter2.map((es) => es.id)) await as.react(emoji);

												const usarItem = as.createReactionCollector((reaction, user3) => itensFilter2.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
													max: 1
												});

												const colherFruta = as.createReactionCollector((reaction, user3) => reaction.emoji.id === user.fazendas[findFazenda].lote5.id && user3.id === author.id, {
													max: 1
												});

												const objeto2 = {
													'911706991615950898': 'Semente de Café',
													'911706992400298056': 'Semente de Milho',
													'911706991670493214': 'Semente de Arroz',
													'898326104782299166': 'Adubo',
													'898326105126215701': 'Fertilizante',
													'898326105361113099': 'Irrigação',
													'911776845144416287': 'Aluguel Trator'
												};

												usarItem.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													if (itemEmoji2 === 'Adubo') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
															const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.adubo': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Adubo'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Adubo'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Fertilizante') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
															const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.fertilizante': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Fertilizante'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Fertilizante'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Irrigação') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
															const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.irrigacao': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Irrigação'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Irrigação'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													} else if (itemEmoji2 === 'Aluguel Trator') {
														if (user.fazendas[findFazenda].lote5.fruta === '') {
															msg.delete();
															return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
														}

														if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
															const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

															msg.delete();
															return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
														}

														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'fazendas.nome': findSelectedEvento.nome
														}, {
															$set: {
																'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
																'fazendas.$.lote5.trator': Date.now()
															}
														});

														if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'inventory.item': 'Aluguel Trator'
															}, {
																$set: {
																	'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
																}
															});
														} else {
															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id
															}, {
																$pull: {
																	inventory: {
																		item: 'Aluguel Trator'
																	}
																}
															});
														}

														msg.delete();
														return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
													}
												});

												colherFruta.on('collect', async (collected) => {
													const itemEmoji2 = objeto2[collected.emoji.id];

													const emoji2 = user.fazendas[findFazenda].lote5.emoji;
													const emoji2Id = user.fazendas[findFazenda].lote5.id;

													if (user.fazendas[findFazenda].lote5.fruta === itemEmoji2) {
														if (timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown) > 0) {
															msg.delete();
															return message.reply(`você não pode colher ainda sua(seu) **${user.fazendas[findFazenda].lote5.fruta2}**! Espere: \`${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).hours}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).minutes}:${ms(timeout5 - (Date.now() - user.fazendas[findFazenda].lote5.cooldown)).seconds}\``);
														} else {
															if (user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2)) {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id,
																	'caixote.item': user.fazendas[findFazenda].lote5.fruta2
																}, {
																	$set: {
																		'caixote.$.quantia': user.caixote.find((a) => a.item === user.fazendas[findFazenda].lote5.fruta2).quantia + 5
																	}
																});
															} else {
																await this.client.database.users.findOneAndUpdate({
																	userId: author.id,
																	guildId: message.guild.id
																}, {
																	$push: {
																		caixote: {
																			item: user.fazendas[findFazenda].lote5.fruta2,
																			emoji: emoji2,
																			id: emoji2Id,
																			quantia: 5
																		}
																	}
																});
															}

															await this.client.database.users.findOneAndUpdate({
																userId: author.id,
																guildId: message.guild.id,
																'fazendas.nome': findSelectedEvento.nome
															}, {
																$set: {
																	'fazendas.$.lote5.fruta': '',
																	'fazendas.$.lote5.fruta2': '',
																	'fazendas.$.lote5.emoji': '',
																	'fazendas.$.lote5.id': '',
																	'fazendas.$.lote5.cooldown': 0,
																	'fazendas.$.lote5.quantia': 0
																}
															});

															msg.delete();
															return message.reply(`você colheu \`x5\` **${user.fazendas[findFazenda].lote5.fruta2}** do **Lote 5** com sucesso!`);
														}
													}
												});

												return;
											}

											const plantando = as.createReactionCollector((reaction, user3) => itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id, {
												max: 1
											});

											const objeto = {
												'911706991615950898': 'Semente de Café',
												'911706992400298056': 'Semente de Milho',
												'911706991670493214': 'Semente de Arroz',
												'898326104782299166': 'Adubo',
												'898326105126215701': 'Fertilizante',
												'898326105361113099': 'Irrigação',
												'911776845144416287': 'Aluguel Trator'
											};

											plantando.on('collect', async (collected) => {
												const itemEmoji = objeto[collected.emoji.id];

												const emoji = user.inventory.find((a) => a.item === itemEmoji);

												if (itemEmoji === 'Adubo') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Adubo**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo) > 0) {
														const faltamAdubo = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.adubo));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamAdubo.hours}:${faltamAdubo.minutes}:${faltamAdubo.seconds}\` para usar o **Adubo** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.adubo': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Adubo').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Adubo'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Adubo').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Adubo'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Adubo** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Fertilizante') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Fertilizante**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante) > 0) {
														const faltamFertilizante = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.fertilizante));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamFertilizante.hours}:${faltamFertilizante.minutes}:${faltamFertilizante.seconds}\` para usar o **Fertilizante** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.fertilizante': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Fertilizante').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Fertilizante'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Fertilizante').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Fertilizante'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Fertilizante** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Irrigação') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar a **Irrigação**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao) > 0) {
														const faltamIrrigacao = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.irrigacao));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamIrrigacao.hours}:${faltamIrrigacao.minutes}:${faltamIrrigacao.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.irrigacao': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Irrigação').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Irrigação'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Irrigação').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Irrigação'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Irrigação** usada com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Aluguel Trator') {
													if (user.fazendas[findFazenda].lote5.fruta === '') {
														msg.delete();
														return message.reply('você precisa plantar alguma **Semente** antes de usar o **Trator**!');
													}

													if (tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator) > 0) {
														const faltamTrator = ms(tempos - (Date.now() - user.fazendas[findFazenda].lote5.trator));

														msg.delete();
														return message.reply(`você precisa esperar \`0${faltamTrator.hours}:${faltamTrator.minutes}:${faltamTrator.seconds}\` para usar a **Irrigação** novamente!`);
													}

													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.cooldown': user.fazendas[findFazenda].lote5.cooldown - (15 * 60 * 1000),
															'fazendas.$.lote5.trator': Date.now()
														}
													});

													if (user.inventory.find((a) => a.item === 'Aluguel Trator').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Aluguel Trator'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Aluguel Trator').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Aluguel Trator'
																}
															}
														});
													}

													msg.delete();
													return message.reply('**Trator** usado com sucesso no **Lote 5** e diminuiu 15min da sua plantação.');
												} else if (itemEmoji === 'Semente de Café') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Café',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Café').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Café'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Café').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Café'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Café** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Milho') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Milho',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Milho').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Milho'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Milho').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Milho'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Milho** com sucesso no **Lote 5**.`);
												} else if (itemEmoji === 'Semente de Arroz') {
													await this.client.database.users.findOneAndUpdate({
														userId: author.id,
														guildId: message.guild.id,
														'fazendas.nome': findSelectedEvento.nome
													}, {
														$set: {
															'fazendas.$.lote5.fruta': itemEmoji,
															'fazendas.$.lote5.fruta2': 'Arroz',
															'fazendas.$.lote5.emoji': emoji.emoji,
															'fazendas.$.lote5.id': emoji.id,
															'fazendas.$.lote5.cooldown': Date.now(),
															'fazendas.$.lote5.quantia': 1
														}
													});

													if (user.inventory.find((a) => a.item === 'Semente de Arroz').quantia > 1) {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id,
															'inventory.item': 'Semente de Arroz'
														}, {
															$set: {
																'inventory.$.quantia': user.inventory.find((a) => a.item === 'Semente de Arroz').quantia - 1
															}
														});
													} else {
														await this.client.database.users.findOneAndUpdate({
															userId: author.id,
															guildId: message.guild.id
														}, {
															$pull: {
																inventory: {
																	item: 'Semente de Arroz'
																}
															}
														});
													}

													msg.delete();
													return message.reply(`você plantou \`x1\` **Semente de Arroz** com sucesso no **Lote 5**.`);
												}
											});
										});
									}
								}
							});
						});
					}
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply(`você demorou demais para escolher a Fazenda. Use o comando novamente!`).then((a) => a.delete({
						timeout: 6000
					}));
					sim.stop();
					return;
				}
			});
		});
	}

};
