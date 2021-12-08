/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

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
		this.editor = false;
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

		const buttonSim = new MessageButton().setStyle('blurple').setEmoji('✅').setID('aceitar');
		const buttonNao = new MessageButton().setStyle('blurple').setEmoji('❌').setID('negar');
		const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

		message.channel.send(author, {
			embed: embed,
			components: [botoes]
		}).then(async (msg) => {
			const collectorBotoes = msg.createButtonCollector((button) => button.clicker.user.id === author.id, {
				time: 60000,
				max: 1
			});

			collectorBotoes.on('collect', async (b) => {
				if (b.id === 'aceitar') {
					msg.delete();

					message.reply(`você deletou os dados de todos os usuários do servidor **${message.guild.name}** com sucesso!`);

					for (var i = 0; i < membersServer.length; i++) {
						const server = await this.client.database.guilds.findOne({
							_id: message.guild.id
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								mecanica: []
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								faccoes: []
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								mercadoNegro: []
							}
						});

						if (server.editor.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									editor: {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.governador === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.governador': ''
								}
							});
						}

						if (server.cidade.delegado === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.delegado': ''
								}
							});
						}

						if (server.cidade.policiais.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.policiais': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.carcereiro.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.carcereiro': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.diretorHP === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.diretorHP': ''
								}
							});
						}

						if (server.cidade.medicos.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.medicos': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.donoFavela === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoFavela': ''
								}
							});
						}

						if (server.cidade.donoFabricadeArmas.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.donoFabricadeArmas': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.donoFabricadeDrogas.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.donoFabricadeDrogas': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.donoDesmanche === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoDesmanche': ''
								}
							});
						}

						if (server.cidade.donoLavagem === membersServer[i].userId) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoLavagem': ''
								}
							});
						}

						if (server.cidade.ajudanteDesmanche.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.ajudanteDesmanche': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.ajudanteLavagem.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.ajudanteLavagem': {
										id: membersServer[i].userId
									}
								}
							});
						}

						if (server.cidade.mecanico.find((f) => f.id === membersServer[i].userId)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.mecanico': {
										id: membersServer[i].userId
									}
								}
							});
						}

						return await this.client.database.users.findOneAndDelete({
							userId: membersServer[i].userId,
							guildId: message.guild.id
						});
					}
				} else if (b.id === 'negar') {
					b.reply.defer();

					return msg.delete();
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply('você demorou demais para escolher. Use o comando novamente!');
				}
			});
		});
	}

};
