/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Inventario extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'inventario';
		this.category = 'Economia';
		this.description = 'Veja seu inventário';
		this.usage = 'inventario';
		this.aliases = ['inv', 'inventário'];

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
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		const itens = user.inventory.map((as) => `${as.emoji} ${as.item}`);

		const contar = (itens2) => itens2.reduce((a, b) => ({
			...a,
			[b]: (a[b] || 0) + 1
		}), {});

		// console.log(Object.entries(contar(itens)));
		// console.log(user.inventory.indexOf('Vara de Pesca'))

		const quantidade = Object.entries(contar(itens));
		const mds = quantidade.join('\n').toString().replace(/,/g, `: `);

		const total = itens.length;

		const embed = new ClientEmbed(author)
			.setTitle(`**Inventário de:** ${member.user.tag}`)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setDescription(`***Total de Itens:*** \`${total}\`\n\n${mds || 'Inventário vazio.'}`);

		message.channel.send(author, embed);
	}

};
