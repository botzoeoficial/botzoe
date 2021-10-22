/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Trabalhar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'trabalhar';
		this.category = 'Utilidades';
		this.description = 'Trabalhe no seu emprego atual!';
		this.usage = 'trabalhar';
		this.aliases = ['work'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (user.emprego === 'Desempregado') return message.reply(`você está desempregado! Use o comando \`${prefix}empregos\`.`);

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const timeout = 3600000;

		if (timeout - (Date.now() - user.cooldown.work) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.work));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('🧑‍💼 | TRABALHO');

			if (user.emprego === 'Jovem Aprendiz') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(899)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 899,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Recepcionista') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(1750)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 1750,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Editor') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(2600)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 2600,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Jornalista') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(3950)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 3950,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Professor') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(5100)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 5100,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Designer') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(7375)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 7375,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Gerente Geral') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(9550)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 9550,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Advogado') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(11850)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 11850,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Engenheiro Químico') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(14000)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 14000,
						'cooldown.work': Date.now()
					}
				});
			} else if (user.emprego === 'Empresário') {
				embed.setDescription(`💼 | Você trabalhou de **${user.emprego}** e ganhou **R$${Utils.numberFormat(18350)},00**.`);

				message.channel.send(author, embed);

				return await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						saldo: user.saldo += 18350,
						'cooldown.work': Date.now()
					}
				});
			}
		}
	}

};