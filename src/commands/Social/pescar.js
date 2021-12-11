/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Pescar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pescar';
		this.category = 'Social';
		this.description = 'Pesque um pouco!';
		this.usage = 'pescar';
		this.aliases = ['pescaria'];

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

		const timeout = 600000;

		if (timeout - (Date.now() - user.cooldown.pescar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.pescar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const hasItem = user.inventory.find((xs) => xs.item === 'Vara de Pesca');

			if (!hasItem) {
				return message.reply('você não possui uma **Vara de Pesca** no seu inventário!');
			} else {
				const embed = new ClientEmbed(author)
					.setTitle('<:Varadepescar:891297733774819328> | PESCARIA')
					.setDescription(`<:Varadepescar:891297733774819328> | Você pescou para relaxar, e conseguiu as seguintes melhorias:\n\n🤯 **Estressado:** +50\n😡 **Bravo:** +20\n<:Varadepescar:891297733774819328> **Vara de Pesca:** -1`);

				message.channel.send(author, embed);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'humores.estressado': user.humores.estressado += 50,
						'humores.bravo': user.humores.bravo += 20
					}
				});

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.pescar': Date.now()
					}
				});

				if (user.inventory.find((x) => x.item === 'Vara de Pesca').quantia > 1) {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id,
						'inventory.item': 'Vara de Pesca'
					}, {
						$set: {
							'inventory.$.quantia': user.inventory.find((x) => x.item === 'Vara de Pesca').quantia - 1
						}
					});
				} else {
					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$pull: {
							inventory: {
								item: 'Vara de Pesca'
							}
						}
					});
				}
			}
		}
	}

};
