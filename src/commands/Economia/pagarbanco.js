/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const ms = require('parse-ms');

module.exports = class Pagarbanco extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pagarbanco';
		this.category = 'Economia';
		this.description = 'Pague o banco!';
		this.usage = 'pagarbanco';
		this.aliases = ['pagar-banco', 'paybank'];

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

		const timeout = 518400000;

		if (timeout - (Date.now() - user.payBank.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - user.payBank.cooldown));

			const embed = new ClientEmbed(author)
				.setTitle(`Banco Central ${message.guild.name}`)
				.setThumbnail('https://media.discordapp.net/attachments/887089600726720512/905147390204444692/195488.png')
				.addField('Você precisa esperar:', `${faltam.days}d ${faltam.hours}h ${faltam.minutes}m ${faltam.seconds}s para pagar o **Banco** novamente!`);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		}

		if (user.saldo >= 0 && user.saldo <= 50000) {
			message.reply({
				content: `Você pagou **R$${Utils.numberFormat(0)},00** ao banco.`
			});

			const server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					saldo: user.saldo -= 0,
					'payBank.cooldown': Date.now()
				}
			});

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					bank: server.bank += 0
				}
			});

			return setInterval(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						saldo: user.banco,
						banco: 0
					}
				});
			}, timeout);
		} else if (user.saldo >= 50001 && user.saldo <= 100000) {
			const porcentagem = user.saldo * 0.10;

			message.reply({
				content: `Você pagou **R$${Utils.numberFormat(porcentagem)},00** ao banco.`
			});

			const server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					saldo: user.saldo -= porcentagem,
					'payBank.cooldown': Date.now()
				}
			});

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					bank: server.bank += porcentagem
				}
			});

			return setInterval(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						saldo: user.banco,
						banco: 0
					}
				});
			}, timeout);
		} else if (user.saldo >= 100001 && user.saldo <= 1000000) {
			const porcentagem = user.saldo * 0.05;

			message.reply({
				content: `Você pagou **R$${Utils.numberFormat(porcentagem)},00** ao banco.`
			});

			const server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					saldo: user.saldo -= porcentagem,
					'payBank.cooldown': Date.now()
				}
			});

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					bank: server.bank += porcentagem
				}
			});

			return setInterval(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						saldo: user.banco,
						banco: 0
					}
				});
			}, timeout);
		} else if (user.saldo >= 1000001) {
			const porcentagem = user.saldo * 0.03;

			message.reply({
				content: `Você pagou **R$${Utils.numberFormat(porcentagem)},00** ao banco.`
			});

			const server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					saldo: user.saldo -= porcentagem,
					'payBank.cooldown': Date.now()
				}
			});

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					bank: server.bank += porcentagem
				}
			});

			return setInterval(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						saldo: user.banco,
						banco: 0
					}
				});
			}, timeout);
		}
	}

};
