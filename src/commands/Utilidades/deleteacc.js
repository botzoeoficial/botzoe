/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Deleteacc extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'deleteacc';
		this.category = 'Utilidades';
		this.description = 'Delete seus dados do servidor!';
		this.usage = 'deleteacc';
		this.aliases = ['deletarconta'];

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

		const embed = new ClientEmbed(author)
			.setTitle('Deletar Conta')
			.setDescription(`Você está prestes a deletar/resetar a sua conta de todos os Servidores em que possui acesso na Zoe.\n\nDepois que clicar na reação ✅, você terá todos os seus dados deletados/resetados, do Banco de Dados de nosso Bot como: Informações, Saldo, Bitcoins, Carros, Armas e todo o progresso que você conquistou em **TODOS** os Servidores que você joga.\n\nPara que o seu progresso seja Resetado apenas neste Servidor, peça para que um dos Adms ou Editor use o comando \`++deleteuser <@${author.id}>\`, aqui no servidor.\n\nVocê tem  certeza que deseja Deletar/Resetar, a sua conta agora?`);

		const buttonSim = new MessageButton().setCustomId('aceitar').setEmoji('✅').setStyle('PRIMARY');
		const buttonNao = new MessageButton().setCustomId('negar').setEmoji('❌').setStyle('PRIMARY');
		const botoes = new MessageActionRow().addComponents([buttonSim, buttonNao]);

		message.reply({
			content: author.toString(),
			embeds: [embed],
			components: [botoes]
		}).then(async (msg) => {
			const filter = (interaction) => interaction.isButton() && ['aceitar', 'negar'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorBotoes = msg.createMessageComponentCollector({
				filter,
				time: 60000
			});

			collectorBotoes.on('collect', async (b) => {
				if (b.customId === 'aceitar') {
					await b.deferUpdate();

					msg.delete();

					message.reply({
						content: `Sua conta no servidor ${message.guild.name} foi deletada com sucesso!`
					});

					const server = await this.client.database.guilds.findOne({
						_id: message.guild.id
					});

					if (server.editor.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								editor: {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.governador === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.governador': ''
							}
						});
					}

					if (server.cidade.delegado === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.delegado': ''
							}
						});
					}

					if (server.cidade.policiais.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.policiais': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.carcereiro.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.carcereiro': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.diretorHP === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.diretorHP': ''
							}
						});
					}

					if (server.cidade.medicos.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.medicos': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.donoFavela === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoFavela': ''
							}
						});
					}

					if (server.cidade.donoFabricadeArmas.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.donoFabricadeArmas': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.donoFabricadeDrogas.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.donoFabricadeDrogas': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.donoDesmanche === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoDesmanche': ''
							}
						});
					}

					if (server.cidade.donoLavagem === author.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoLavagem': ''
							}
						});
					}

					if (server.cidade.ajudanteDesmanche.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.ajudanteDesmanche': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.ajudanteLavagem.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.ajudanteLavagem': {
									id: author.id
								}
							}
						});
					}

					if (server.cidade.mecanico.find((f) => f.id === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'cidade.mecanico': {
									id: author.id
								}
							}
						});
					}

					if (server.mecanica.find((f) => f.dono === author.id)) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'mecanica.dono': author.id
							}
						});
					}

					if (user.fac.createFac) {
						const fb = user?.fac;

						for (var i = 0; i < fb.membros.length; i++) {
							await this.client.database.users.findOneAndUpdate({
								userId: fb.membros[i],
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.createFac': false
								}
							});
						}

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$pull: {
								'faccoes.nome': fb.nome
							}
						});
					}

					if (user.fac.isFac) {
						const fb = user?.fac;
						const owner = await this.client.users.fetch(fb.dono);

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'fac.isFac': false,
								'fac.createFac': false
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: owner.id,
							guildId: message.guild.id
						}, {
							$pull: {
								'fac.membros': author.id
							}
						});

						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id,
							'faccoes.nome': user.fac.nome
						}, {
							$pull: {
								'faccoes.$.membros': author.id
							}
						});
					}

					if (user.marry.has) {
						await this.client.database.users.findOneAndUpdate({
							userId: user.marry.user,
							guildId: message.guild.id
						}, {
							$set: {
								'marry.user': 'Ninguém.',
								'marry.has': false,
								'cooldown.gf': 0,
								'cooldown.fe': 0,
								familia: []
							}
						});
					}

					await this.client.database.users.findOneAndDelete({
						userId: author.id,
						guildId: message.guild.id
					});

					return;
				} else if (b.customId === 'negar') {
					await b.deferUpdate();

					return msg.delete();
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply({
						content: 'Você demorou demais para responder. Use o comando novamente!'
					});
				}
			});
		});
	}

};
