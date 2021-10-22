/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Fe extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fe';
		this.category = 'Utilidades';
		this.description = 'Faça um evento família!';
		this.usage = 'fe';
		this.aliases = ['family-event'];

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

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const user2 = await this.client.database.users.findOne({
			_id: user.marry.user
		});

		if (!user.marry.has) return message.reply(`você não está casado! Use o comando \`${prefix}casar\`.`);

		if (user.familia.length <= 0) return message.reply(`você não tem filhos ainda! Use o comando \`${prefix}gf\`.`);

		const timeout = 3600000;

		if (timeout - (Date.now() - user.cooldown.fe) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.fe));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const randomFilhos = Math.floor(Math.random() * user.familia.length);

			if (user.familia[randomFilhos].idade >= 18) {
				const random = Math.floor(Math.random() * 100);

				if (random <= 30) {
					const mortes = [
						`**${user.familia[randomFilhos].nome}** teve um ataque cardíaco correndo uma Maratona, e morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
						`**${user.familia[randomFilhos].nome}** não olhou para os dois lados ao atravessar um sinal e foi atropelada, ele(a) morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
						`**${user.familia[randomFilhos].nome}** pegou Covid-19, foi internado mas não resistiu aos sintomas, ele(a) morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`,
						`**${user.familia[randomFilhos].nome}** foi vítima de uma bala perdida no RJ e morreu com **${user.familia[randomFilhos].idade}** anos de idade. ⚰️ Meus sentimentos!`
					];

					const resposta = mortes[Math.floor(Math.random() * mortes.length)];

					const embed = new ClientEmbed(author)
						.setTitle('EVENTO FAMÍLIA!')
						.setDescription(`${author}, ${resposta}`);

					message.channel.send(author, embed);

					await this.client.database.users.findOneAndUpdate({
						_id: author.id
					}, {
						$pull: {
							familia: {
								nome: user.familia[randomFilhos].nome
							}
						},
						$set: {
							'cooldown.fe': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						_id: user.marry.user
					}, {
						$pull: {
							familia: {
								nome: user2.familia[randomFilhos].nome
							}
						}
					});
				} else if (random >= 31) {
					await this.client.database.users.findOneAndUpdate({
						_id: author.id,
						'familia.nome': user.familia[randomFilhos].nome
					}, {
						$set: {
							'familia.$.idade': user.familia[randomFilhos].idade += 1,
							'cooldown.fe': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						_id: user.marry.user,
						'familia.nome': user2.familia[randomFilhos].nome
					}, {
						$set: {
							'familia.$.idade': user2.familia[randomFilhos].idade += 1
						}
					});

					const embed = new ClientEmbed(author)
						.setTitle('EVENTO FAMÍLIA!')
						.setDescription(`${author}, **${user.familia[randomFilhos].nome}** completou **${user.familia[randomFilhos].idade}** anos de idade! 🎉`);

					message.channel.send(author, embed);
				}
			} else if (user.familia[randomFilhos].idade <= 17) {
				await this.client.database.users.findOneAndUpdate({
					_id: author.id,
					'familia.nome': user.familia[randomFilhos].nome
				}, {
					$set: {
						'familia.$.idade': user.familia[randomFilhos].idade += 1,
						'cooldown.fe': Date.now()
					}
				});

				await this.client.database.users.findOneAndUpdate({
					_id: user.marry.user,
					'familia.nome': user2.familia[randomFilhos].nome
				}, {
					$set: {
						'familia.$.idade': user2.familia[randomFilhos].idade += 1
					}
				});

				const embed = new ClientEmbed(author)
					.setTitle('EVENTO FAMÍLIA!')
					.setDescription(`${author}, **${user.familia[randomFilhos].nome}** completou **${user.familia[randomFilhos].idade}** anos de idade! 🎉`);

				message.channel.send(author, embed);
			}
		}
	}

};
