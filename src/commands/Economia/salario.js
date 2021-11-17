/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Salario extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'salario';
		this.category = 'Economia';
		this.description = 'Pegue o seu Salario!';
		this.usage = 'salario';
		this.aliases = ['salário', 'daily'];

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

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const timeout = 86400000;

		if (timeout - (Date.now() - user.cooldown.salario) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.salario));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('🏦 Salário');

			if (server.cidade.governador === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$50.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 50000
					}
				});
			} else if (server.cidade.delegado === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$40.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 40000
					}
				});
			} else if (server.cidade.policiais.find((a) => a.id === author.id)) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$35.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 35000
					}
				});
			} else if (server.cidade.carcereiro.find((a) => a.id === author.id)) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$30.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 30000
					}
				});
			} else if (server.cidade.diretorHP === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$40.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 40000
					}
				});
			} else if (server.cidade.medicos.find((a) => a.id === author.id)) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$35.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 35000
					}
				});
			} else if (server.cidade.donoFavela === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$20.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 20000
					}
				});
			} else if (server.cidade.donoFabricadeArmas.find((a) => a.id === author.id)) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$15.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 15000
					}
				});
			} else if (server.cidade.donoFabricadeDrogas.find((a) => a.id === author.id)) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$15.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 15000
					}
				});
			} else if (server.cidade.donoDesmanche === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$15.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 15000
					}
				});
			} else if (server.cidade.donoLavagem === author.id) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$15.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 15000
					}
				});
			} else if (user.fac.isFac || user.fac.createFac) {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$10.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 10000
					}
				});
			} else {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$5.000,00\``);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 5000
					}
				});
			}

			return message.channel.send(author, embed);
		}
	}

};
