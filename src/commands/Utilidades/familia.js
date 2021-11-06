/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Familia extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'familia';
		this.category = 'Utilidades';
		this.description = 'Veja sua família!';
		this.usage = 'familia';
		this.aliases = ['family'];

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
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.marry.has) return message.reply(`você não está casado! Use o comando \`${prefix}casar\`.`);

		const embed = new ClientEmbed(author);

		if (user.familia.length <= 0) {
			embed.setTitle(`Família de: ${author.username} e ${await this.client.users.fetch(user.marry.user).then((x) => x.username)}`);
			embed.setDescription('Família sem filhos.');
		}

		for (var i = 0; i < user.familia.length; i++) {
			embed.setTitle(`Família de: ${author.username} e ${await this.client.users.fetch(user.marry.user).then((x) => x.username)}`);
			embed.addField(`Nome: ${user.familia[i].nome}`, `Idade: ${user.familia[i].idade}\nGênero: ${user.familia[i].genero}`, true);
		}

		message.channel.send(author, embed);
	}

};
