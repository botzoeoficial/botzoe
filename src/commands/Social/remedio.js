/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Remedio extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'remédio';
		this.category = 'Economia';
		this.description = 'Cure-se para usar alguns comandos!';
		this.usage = 'remédio';
		this.aliases = ['remedio'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (Object.values(user.humores).filter(humor => humor > 0).length >= 5) return message.reply('você não está doente!');

		const hasItem = user.inventory.find((xa) => xa.item.includes('Remédio'));

		if (!hasItem) {
			return message.reply('você não possui um **Remédio** no seu inventário!');
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('💊 | CURADO')
				.setDescription(`💊 | Você tomou um **Remédio** e conseguiu melhorar todos os seus humores em 150%:\n\n🍽️ **Fome:** 150%\n🥤 **Sede:** 150%\n😡 **Bravo:** 150%\n😭 **Triste:** 150%\n😰 **Cansado:** 150%\n🥺 **Solitário:** 150%\n🤯 **Estressado:** 150%\n😵‍💫 **Desanimado:** 150%`);

			message.channel.send(author, embed);

			const findRemedio = user.inventory.findIndex(({
				item
			}) => item === 'Remédio');

			user.inventory.splice(findRemedio, 1);

			await this.client.database.users.findOneAndUpdate({
				_id: author.id
			}, {
				$set: {
					'humores.fome': 150,
					'humores.sede': 150,
					'humores.bravo': 150,
					'humores.triste': 150,
					'humores.cansado': 150,
					'humores.solitario': 150,
					'humores.estressado': 150,
					'humores.desanimado': 150
				}
			});

			user.save();
		}
	}

};
