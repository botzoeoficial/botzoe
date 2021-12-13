/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Gf extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'gf';
		this.category = 'Social';
		this.description = 'Faça um filho!';
		this.usage = 'gf';
		this.aliases = ['gozofone'];

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

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		if (!user.marry.has) return message.reply(`você não está casado! Use o comando \`${prefix}casar\`.`);

		if (user.familia.length >= 25) return message.reply('você já tem o máximo de filhos possíveis.');

		let presoTime = 0;

		const embedPreso = new ClientEmbed(author)
			.setTitle('👮 | Preso');

		if (user.prisao.isPreso && user.prisao.prenderCmd) {
			presoTime = user.prisao.prenderMili;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			presoTime = 36000000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.prender) {
			presoTime = 43200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			presoTime = 21600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			presoTime = 180000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.velha) {
			presoTime = 300000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.frentista) {
			presoTime = 600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.joalheria) {
			presoTime = 900000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.agiota) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.casaLoterica) {
			presoTime = 1200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.brazino) {
			presoTime = 2100000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.facebook) {
			presoTime = 2700000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.bancoCentral) {
			presoTime = 3600000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.shopping) {
			presoTime = 7200000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.banco) {
			presoTime = 14400000;

			if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
				const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

				embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embedPreso);
			}
		} else {
			const timeout = 7200000;

			if (timeout - (Date.now() - user.cooldown.gf) > 0) {
				const faltam = ms(timeout - (Date.now() - user.cooldown.gf));

				const embed = new ClientEmbed(author)
					.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

				return message.channel.send(author, embed);
			} else {
				const embedConfirm = new ClientEmbed(author)
					.setTitle('😈 | GOZOFONE')
					.setDescription(`<@${user.marry.user}>, você aceita fazer **GF** comigo?`);

				const buttonSim = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
				const buttonNao = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
				const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

				message.channel.send(`<@${user.marry.user}>`, {
					embed: embedConfirm,
					components: [botoes]
				}).then(async (confirm) => {
					const collectorBotoes = confirm.createButtonCollector((button) => button.clicker.user.id === user.marry.user, {
						time: 30000,
						max: 1
					});

					collectorBotoes.on('collect', async (b) => {
						if (b.id === 'aceitar') {
							b.reply.defer();
							confirm.delete();

							const user2 = await this.client.database.users.findOne({
								userId: user.marry.user,
								guildId: message.guild.id
							});

							const random = Math.floor(Math.random() * 100);

							if (random < 50) {
								const embed = new ClientEmbed(author)
									.setTitle('😈 | GOZOFONE')
									.setDescription(`😈 | Você fez gozofone com <@${user.marry.user}> e conseguiram ter um filho **homem**! Você tem 30 segundos para digitar no chat o nome dele, ou ele será enviado para adoção. Qual nome você deseja colocar:`);

								message.channel.send(`${author} e <@${user.marry.user}>`, embed).then((msg) => {
									const filter = (m) => m.author.id === message.author.id || m.author.id === user.marry.user;
									const collector = msg.channel.createMessageCollector(filter, {
										time: 30000
									});

									collector.on('collect', async (msg2) => {
										if (parseInt(msg2.content)) {
											message.reply(`o nome do seu filho não pode ser um número! Digite o nome novamente!`);
										} else if (user.familia.map((a) => a.nome).includes(msg2.content) || user2.familia.map((a) => a.nome).includes(msg2.content)) {
											message.reply(`você já tem um filho com esse nome! Digite o nome novamente!`);
										} else {
											collector.stop();
											message.channel.send(`${author}, seu filho **${msg2.content}** nasceu! Você e <@${user.marry.user}> podem usar agora \`${prefix}familia\`!`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													familia: {
														nome: msg2.content,
														idade: 1,
														genero: 'Masculino'
													}
												},
												$set: {
													'cooldown.gf': Date.now()
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: user.marry.user,
												guildId: message.guild.id
											}, {
												$push: {
													familia: {
														nome: msg2.content,
														idade: 1,
														genero: 'Masculino'
													}
												}
											});
										}
									});

									collector.on('end', (collected, reason) => {
										if (reason === 'time') {
											msg.delete();
											collector.stop();
											message.channel.send(`${author} e <@${user.marry.user}>, vocês demoraram demais para dar nome ao filho de vocês, e por isso ele foi para adoção!`);
											return;
										}
									});
								});
							} else {
								const embed = new ClientEmbed(author)
									.setTitle('😈 | GOZOFONE')
									.setDescription(`😈 | Você fez gozofone com <@${user.marry.user}> e conseguiram ter uma filha **mulher**! Você tem 30 segundos para digitar no chat o nome dela, ou ela será enviada para adoção. Qual nome você deseja colocar:`);

								message.channel.send(`${author} e <@${user.marry.user}>`, embed).then((msg) => {
									const filter = (m) => m.author.id === message.author.id || m.author.id === user.marry.user;
									const collector = msg.channel.createMessageCollector(filter, {
										time: 30000
									});

									collector.on('collect', async (msg2) => {
										if (parseInt(msg2.content)) {
											message.reply(`o nome da sua filha não pode ser um número! Digite o nome novamente!`);
										} else if (user.familia.map((a) => a.nome).includes(msg2.content) || user2.familia.map((a) => a.nome).includes(msg2.content)) {
											message.reply(`você já tem uma filha com esse nome! Digite o nome novamente!`);
										} else {
											collector.stop();
											message.channel.send(`${author}, sua filha **${msg2.content}** nasceu! Você e <@${user.marry.user}> podem usar agora \`${prefix}familia\`!`);

											await this.client.database.users.findOneAndUpdate({
												userId: author.id,
												guildId: message.guild.id
											}, {
												$push: {
													familia: {
														nome: msg2.content,
														idade: 1,
														genero: 'Feminino'
													}
												},
												$set: {
													'cooldown.gf': Date.now()
												}
											});

											await this.client.database.users.findOneAndUpdate({
												userId: user.marry.user,
												guildId: message.guild.id
											}, {
												$push: {
													familia: {
														nome: msg2.content,
														idade: 1,
														genero: 'Feminino'
													}
												}
											});
										}
									});

									collector.on('end', (collected, reason) => {
										if (reason === 'time') {
											msg.delete();
											collector.stop();
											message.channel.send(`${author} e <@${user.marry.user}>, vocês demoraram demais para dar nome ao filho de vocês, e por isso ela foi para adoção!`);
											return;
										}
									});
								});
							}
						} else if (b.id === 'negar') {
							b.reply.defer();

							confirm.delete();
							message.channel.send(`${author}, o(a) usuário(a) <@${user.marry.user}> recusou seu pedido de GF!`);
							return;
						}
					});

					collectorBotoes.on('end', async (collected, reason) => {
						if (reason === 'time') {
							confirm.delete();
							return message.channel.send(`${author}, o(a) usuário(a) <@${user.marry.user}> demorou demais para aceitar seu gf!`);
						}
					});
				});
			}
		}
	}

};