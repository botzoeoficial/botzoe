/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	filledBar
} = require('string-progressbar');

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
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		const itens = user.inventory.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const total = !user.inventory.length ? 0 : user.inventory.map((a) => a.quantia).reduce((a, b) => a + b);

		const embed = new ClientEmbed(author)
			.setTitle(`**Inventário de:** ${member.user.tag}`)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}));

		if (user.inventory.find((a) => a.item === 'Bolso')) {
			embed.setDescription(`***Total de Itens:*** \`${total}\` **${filledBar(400, total || 0, 10)[0]}** (${Math.round(total / 400 * 100)}%)\n\n${itens || 'Inventário vazio.'}`);
		} else {
			embed.setDescription(`***Total de Itens:*** \`${total}\` **${filledBar(200, total || 0, 10)[0]}** (${Math.round(total / 200 * 100)}%)\n\n${itens || 'Inventário vazio.'}`);
		}

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
