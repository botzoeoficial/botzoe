/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Mochila extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'mochila';
		this.category = 'Crime';
		this.description = 'Veja os itens da sua Mochila';
		this.usage = 'mochila';
		this.aliases = ['backpack'];

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

		if (!user.isMochila) return message.reply(`você não possui uma **Mochila**, vá até a Loja > Utilidades e Compre uma!`);

		const arma = user.mochila.find((a) => a.item === user.armaEquipada)?.item;

		let arma2 = '';

		if (['Ak-47', 'UMP', 'MP5', 'ACR', 'KNT-308', 'Desert Eagle', 'Revolver 38', 'G18'].includes(arma)) {
			arma2 = '(Equipada)';
		} else {
			arma2 = '';
		}

		const itens = user.mochila.filter((a) => a.item === user.armaEquipada).map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\` ${arma2}`).join('\n');
		const itens2 = user.mochila.filter((a) => a.item !== user.armaEquipada).map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const total = !user.mochila.length ? 0 : user.mochila.map((a) => a.quantia).reduce((a, b) => a + b);

		const embed = new ClientEmbed(author)
			.setTitle(`<:mochila:899007409006215188> | Sua Mochila`)
			.setThumbnail(author.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setDescription(`***Total de Itens na Mochila:*** \`${total}\`\n\n${`${itens}\n${itens2}` || 'Mochila Vazia.'}`);

		message.channel.send(author, embed);
	}

};
