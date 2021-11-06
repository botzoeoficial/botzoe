/* eslint-disable max-len */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	filledBar
} = require('string-progressbar');

module.exports = class Humores extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'humor';
		this.category = 'Social';
		this.description = 'Veja o seus humores!';
		this.usage = 'humores';
		this.aliases = ['humores'];

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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
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

		if (user.humores.fome < 0) user.humores.fome = 0;
		else if (user.humores.fome > 150) user.humores.fome = 150;
		if (user.humores.sede < 0) user.humores.sede = 0;
		else if (user.humores.sede > 150) user.humores.sede = 150;
		if (user.humores.bravo < 0) user.humores.bravo = 0;
		else if (user.humores.bravo > 150) user.humores.bravo = 150;
		if (user.humores.triste < 0) user.humores.triste = 0;
		else if (user.humores.triste > 150) user.humores.triste = 150;
		if (user.humores.cansado < 0) user.humores.cansado = 0;
		else if (user.humores.cansado > 150) user.humores.cansado = 150;
		if (user.humores.solitario < 0) user.humores.solitario = 0;
		else if (user.humores.solitario > 150) user.humores.solitario = 150;
		if (user.humores.estressado < 0) user.humores.estressado = 0;
		else if (user.humores.estressado > 150) user.humores.estressado = 150;
		if (user.humores.desanimado < 0) user.humores.desanimado = 0;
		else if (user.humores.desanimado > 150) user.humores.desanimado = 150;

		user.save();

		const embed = new ClientEmbed(author)
			.setThumbnail(author.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`Humores de ${author.tag}`)
			.setDescription(`🍽️ **Fome:** ${filledBar(150, user.humores.fome, 10)[0]} ${user.humores.fome} de 150% 😋\n🥤 **Sede:** ${filledBar(150, user.humores.sede, 10)[0]} ${user.humores.sede} de 150% 🤤\n😡 **Bravo:** ${filledBar(150, user.humores.bravo, 10)[0]} ${user.humores.bravo} de 150% 😌\n😭 **Triste:** ${filledBar(150, user.humores.triste, 10)[0]} ${user.humores.triste} de 150% 😁\n😰 **Cansado:** ${filledBar(150, user.humores.cansado, 10)[0]} ${user.humores.cansado} de 150% 🤪\n🥺 **Solitário:** ${filledBar(150, user.humores.solitario, 10)[0]} ${user.humores.solitario} de 150% 🤣\n🤯 **Estressado:** ${filledBar(150, user.humores.estressado, 10)[0]} ${user.humores.estressado} de 150% 🥳\n😵‍💫 **Desanimado:** ${filledBar(150, user.humores.desanimado, 10)[0]} ${user.humores.desanimado} de 150% 🙃`);

		message.channel.send(author, embed);

		console.log(`Usuário: ${message.author.tag}`, user.humores);
	}

};
