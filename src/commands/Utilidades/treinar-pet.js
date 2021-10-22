/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Treinarpet extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'treinar-pet';
		this.category = 'Economia';
		this.description = 'Treine um pet aleatório seu';
		this.usage = 'treinar-pet';
		this.aliases = ['treinarpet'];

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

		if (!user.pets.length) return message.reply(`você não tem pets ainda! Use o comando \`${prefix}adotar\`.`);

		const timeout = 3600000;

		if (timeout - (Date.now() - user.cooldown.treinarPet) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.treinarPet));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const randomPet = Math.floor(Math.random() * user.pets.length);

			const randomNumber = Math.floor(Math.random() * 100);

			if (randomNumber >= 0 && randomNumber <= 6) {
				const embed = new ClientEmbed(author)
					.setTitle('TREINO DO PET!')
					.setDescription(`${author}, seu pet **${user.pets[randomPet].nome}** morreu!`);

				message.channel.send(author, embed);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$pull: {
						pets: {
							nome: user.pets[randomPet].nome
						}
					},
					$set: {
						'cooldown.treinarPet': Date.now()
					}
				});
			} else if (randomNumber > 6 && randomNumber <= 60) {
				await this.client.database.users.findOneAndUpdate({
					_id: author.id,
					'pets.forca': user.pets[randomPet].forca
				}, {
					$set: {
						'pets.$.forca': user.pets[randomPet].forca += 1,
						'cooldown.treinarPet': Date.now()
					}
				});

				const embed = new ClientEmbed(author)
					.setTitle('TREINO DO PET!')
					.setDescription(`${author}, seu pet **${user.pets[randomPet].nome}** melhorou a sua força!\n\nForça Atual: **${user.pets[randomPet].forca}**`);

				message.channel.send(author, embed);
			} else if (randomNumber > 60) {
				await this.client.database.users.findOneAndUpdate({
					_id: author.id,
					'pets.idade': user.pets[randomPet].idade
				}, {
					$set: {
						'pets.$.idade': user.pets[randomPet].idade += 1,
						'cooldown.treinarPet': Date.now()
					}
				});

				const embed = new ClientEmbed(author)
					.setTitle('TREINO DO PET!')
					.setDescription(`${author}, seu pet **${user.pets[randomPet].nome}** melhorou a sua idade!\n\nIdade Atual: **${user.pets[randomPet].idade}**`);

				message.channel.send(author, embed);
			}
		}
	}

};
