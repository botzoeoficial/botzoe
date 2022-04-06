/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Addcard extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addcard';
		this.category = 'Dono';
		this.description = 'Adicione cards utilizaveis!';
		this.usage = 'addcard';
		this.aliases = ['add-card'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		args
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const client = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		const card = args.slice(0).join(' ');

		if (!card) {
			return message.reply({
				content: 'Você precisa colocar o código de um card.'
			});
		}

		if (client.card.find((fa) => fa.codigo === card)) {
			return message.reply({
				content: 'Esse card já está cadastrado.'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('💳 | Card')
			.setDescription('💵 | Qual Valor você deseja Adicionar na Zoe?')
			.setFooter({
				text: 'DIGITE A PALAVRA cancelar NO CHAT, PARA CANCELAR O CADASTRO DO CARD'
			});

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			const filter = m => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (re) => {
				if (re.content.toLowerCase() === 'cancelar') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Você cancelou o cadastro de um **card** com sucesso!'
					});
				}

				if (isNaN(re.content)) {
					message.reply({
						content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
					}).then((a) => a.delete(), 5000);
					re.delete();
				}

				collector.stop();

				embed.addField('🦉 Valor Zoe:', `R$${Utils.numberFormat(Number(re.content))},00`);
				embed.setDescription('<:btc:908786996535787551> | Quantos BitCoins Você deseja Adicionar?');

				message.reply({
					content: author.toString(),
					embeds: [embed]
				}).then((msg1) => {
					const filter1 = m => {
						return m.author.id === author.id;
					};

					const collector1 = msg1.channel.createMessageCollector({
						filter: filter1,
						time: 60000
					});

					collector1.on('collect', async (re2) => {
						if (re2.content.toLowerCase() === 'cancelar') {
							collector1.stop();
							msg1.delete();
							return message.reply({
								content: 'Você cancelou o cadastro de um **card** com sucesso!'
							});
						}

						if (isNaN(re2.content)) {
							message.reply({
								content: 'Você precisa colocar apenas números, não **letras** ou **números junto com letras**!'
							}).then((a) => a.delete(), 5000);
							re2.delete();
						}

						collector1.stop();

						embed.addField('<:btc:908786996535787551> BitCoins:', `${Utils.numberFormat(Number(re2.content))}`);
						embed.setDescription('***CÓDIGO CADASTRADO COM SUCESSO!***');

						message.reply({
							content: author.toString(),
							embeds: [embed]
						});

						return await this.client.database.clientUtils.findOneAndUpdate({
							_id: this.client.user.id
						}, {
							$push: {
								card: {
									codigo: card,
									valorZoe: Number(re.content),
									valorBtc: Number(re2.content),
									ativado: false,
									ativadoPor: 'Ninguém.'
								}
							}
						});
					});

					collector1.on('end', async (collected, reason) => {
						if (reason === 'time') {
							collector1.stop();
							msg1.delete();
							return message.reply({
								content: 'Você demorou demais para responder. Use o comando novamente!'
							});
						}
					});
				});
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					collector.stop();
					msg.delete();
					return message.reply({
						content: 'Você demorou demais para responder. Use o comando novamente!'
					});
				}
			});
		});
	}

};
