const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Pets extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'pets';
		this.category = 'Utilidades';
		this.description = 'Veja seus pets!';
		this.usage = 'pets';
		this.aliases = ['animais'];

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

		const embed = new ClientEmbed(author);

		if (user.pets.length <= 0) {
			embed.setTitle(`Pets de: ${author.username}`);
			embed.setDescription(`${author}, você não tem pets! Use o comando \`${prefix}adotar\`.`);
		}

		for (var i = 0; i < user.pets.length; i++) {
			embed.setTitle(`Pets de: ${author.username}`);
			embed.addField(`Nome: ${user.pets[i].nome}`, `Animal: ${user.pets[i].animal}\nForça: ${user.pets[i].forca}\nIdade: ${user.pets[i].idade}`, true);
		}

		message.channel.send(author, embed);
	}

};
