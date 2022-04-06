/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Reputações extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'reputações';
		this.category = 'Crime';
		this.description = 'Veja as reputações de um criminoso!';
		this.usage = 'reputações';
		this.aliases = ['reps'];

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
		prefix,
		author
	}) {
		const embed = new ClientEmbed(author)
			.setTitle('REPUTAÇÕES')
			.setThumbnail(message.guild.iconURL({
				dynamic: true
			}))
			.setDescription(`**Essas são as reputações de um Criminoso.**\n*Digite \`${prefix}reputação\` para ver sua reputação!*`)
			.addFields({
				name: '0 - Cidadão de Bem',
				value: `Rep. - \`0\``
			}, {
				name: '1 - Nóia',
				value: `Rep. - de \`1 até 1000\``
			}, {
				name: '2 - Trombadinha',
				value: `Rep. - de \`1001 até 2000\``
			}, {
				name: '3 - Maloqueiro',
				value: `Rep. - de \`2001 até 3000\``
			}, {
				name: '4 - Criminoso',
				value: `Rep. - de \`3001 até 4000\``
			}, {
				name: '5 - Ladrão',
				value: `Rep. - de \`4001 até 5000\``
			}, {
				name: '6 - Traficante',
				value: `Rep. - de \`5001 até 6000\``
			}, {
				name: '7 - Político',
				value: `Rep. - de \`6001 até 7000\``
			}, {
				name: '8 - Assassino Profissional',
				value: `Rep. - de \`7001 até 8000\``
			}, {
				name: '9 - Terrorista',
				value: `Rep. - de \`8001 até 9000\``
			}, {
				name: '10 - Dono do Morro',
				value: `Rep. - de \`9001 até 10000\``
			});

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
