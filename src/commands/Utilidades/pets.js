/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

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

		let pagina = 0;

		const embed = new ClientEmbed(author)
			.setTitle(`Pets de: ${author.username}`);

		if (user.pets.length <= 0) {
			embed.setDescription(`${author}, você não tem pets! Use o comando \`${prefix}adotar\`.`);
			return message.channel.send(author, embed);
		} else {
			user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
				embed.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
			});

			const buttonVoltar = new MessageButton().setStyle('blurple').setEmoji('⬅️').setID('voltar');
			const buttonIr = new MessageButton().setStyle('blurple').setEmoji('➡️').setID('ir');
			const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonIr]);

			const escolha = await message.channel.send(author, {
				embed: embed,
				components: [botoes]
			});

			const collectorEscolhas = escolha.createButtonCollector((button) => button.clicker.user.id === author.id);

			collectorEscolhas.on('collect', async (b) => {
				if (b.id === 'voltar') {
					b.reply.defer();

					if (pagina <= 0) {
						pagina = 0;
					} else {
						pagina--;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`Pets de: ${author.username}`);

					user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
					});

					b.message.edit(author, {
						embed: embed2
					});
				} else if (b.id === 'ir') {
					b.reply.defer();

					if (pagina !== ~~(user.pets.length / 6)) {
						pagina++;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle(`Pets de: ${author.username}`);

					user.pets.slice(pagina * 6, pagina * 6 + 6).forEach((est) => {
						embed2.addField(`Nome: ${est.nome}`, `Animal: ${est.animal}\nForça: ${est.forca}\nIdade: ${est.idade}`, true);
					});

					b.message.edit(author, {
						embed: embed2
					});
				}
			});
		}
	}

};
