/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Resetdb extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'resetdb';
		this.category = 'Editor';
		this.description = 'Resete os dados de todos os usuários do servidor atual!';
		this.usage = 'resetdb';
		this.aliases = ['resetar-db'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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
		const membersServer = await this.client.database.users.find({
			guildId: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle(`Resetar ${this.client.user.username} no Servidor.`)
			.setDescription(`Este Comando irá resetar os dados de **todos os usários neste servidor**, fazendo com que tudo comece do Zero.\n\nVocê tem certeza que deseja resetar?`);

		message.channel.send(author, embed).then(async (msg) => {
			await msg.react('✅');
			await msg.react('❌');

			const sim = msg.createReactionCollector((r, u) => r.emoji.name === '✅' && u.id === author.id, {
				time: 60000,
				max: 1
			});

			const não = msg.createReactionCollector((r, u) => r.emoji.name === '❌' && u.id === author.id, {
				time: 60000,
				max: 1
			});

			sim.on('collect', async () => {
				sim.stop();
				não.stop();
				msg.delete();

				message.reply(`você deletou os dados de todos os usuários do servidor **${message.guild.name}** com sucesso!`);

				for (var i = 0; i < membersServer.length; i++) {
					await this.client.database.users.findOneAndDelete({
						userId: membersServer[i].userId,
						guildId: message.guild.id
					});
				}
			});

			não.on('collect', async () => {
				sim.stop();
				não.stop();
				msg.delete();
				return;
			});
		});
	}

};
