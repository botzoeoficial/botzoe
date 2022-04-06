/* eslint-disable id-length */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Deleteuser extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'deleteuser';
		this.category = 'Editor';
		this.description = 'Delete os dados de um usuário do servidor!';
		this.usage = 'deleteuser <usuário>';
		this.aliases = ['deletarusuário', 'deletarusuario'];

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
		author,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		const member = await this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário para deletar!'
			});
		}

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle('Deletar Conta')
			.setDescription(`Você está prestes a deletar a conta de ${member} deste Servidor, e todo o progresso dele será deletado/resetado.\n\nDepois que clicar na reação ✅, você deletará/resetará todo o progresso do Banco de Dados deste usuário, como: Informações, Saldo, Bitcoins, Carros, Armas e tudo que ele conquistou **Neste** servidor.\n\nVocê tem  certeza que deseja Deletar/Resetar a conta deste usuário?`);

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
				switch (b.customId) {
					case 'negar':
						await b.deferUpdate();

						return msg.delete();

					case 'aceitar':
						msg.delete();

						message.reply({
							content: `A conta de ${member} no servidor ${message.guild.name} foi deletada com sucesso!`
						});

						const server2 = await this.client.database.guilds.findOne({
							_id: message.guild.id
						});

						if (server2.editor.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									editor: {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.governador === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.governador': ''
								}
							});
						}

						if (server2.cidade.delegado === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.delegado': ''
								}
							});
						}

						if (server2.cidade.policiais.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.policiais': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.carcereiro.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.carcereiro': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.diretorHP === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.diretorHP': ''
								}
							});
						}

						if (server2.cidade.medicos.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.medicos': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.donoFavela === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoFavela': ''
								}
							});
						}

						if (server2.cidade.donoFabricadeArmas.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.donoFabricadeArmas': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.donoFabricadeDrogas.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.donoFabricadeDrogas': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.donoDesmanche === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoDesmanche': ''
								}
							});
						}

						if (server2.cidade.donoLavagem === member.id) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$set: {
									'cidade.donoLavagem': ''
								}
							});
						}

						if (server2.cidade.ajudanteDesmanche.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.ajudanteDesmanche': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.ajudanteLavagem.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.ajudanteLavagem': {
										id: member.id
									}
								}
							});
						}

						if (server2.cidade.mecanico.find((f) => f.id === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'cidade.mecanico': {
										id: member.id
									}
								}
							});
						}

						if (server2.mecanica.dono.find((f) => f === member.id)) {
							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id
							}, {
								$pull: {
									'mecanica.dono': member.id
								}
							});
						}

						if (user.fac.createFac) {
							const fb = user?.fac;
							const random = Math.floor(Math.random() * user.fac.membros.length);

							const owner = await this.client.users.fetch(fb.dono);
							const fd = await this.client.database.users
								.findOne({
									userId: owner.id,
									guildId: message.guild.id
								})
								.then((x) => x.fac);

							await this.client.database.users.findOneAndUpdate({
								userId: await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
								guildId: message.guild.id
							}, {
								$set: {
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id)
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
									'fac.isFac': false,
									'fac.createFac': false,
									'fac.membros': [],
									'fac.tempo': Date.now()
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id,
								'faccoes.nome': user.fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': member.id
								}
							});
						}

						if (user.fac.isFac) {
							const fb = user?.fac;
							const owner = await this.client.users.fetch(fb.dono);

							await this.client.database.users.findOneAndUpdate({
								userId: member.id,
								guildId: message.guild.id
							}, {
								$set: {
									'fac.isFac': false,
									'fac.tempo': Date.now()
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: owner.id,
								guildId: message.guild.id
							}, {
								$pull: {
									'fac.membros': member.id
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: message.guild.id,
								'faccoes.nome': user.fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': member.id
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
									'cooldown.fe': 0
								}
							});
						}

						if (user.familia.length >= 0) {
							await this.client.database.users.findOneAndUpdate({
								userId: user.marry.user,
								guildId: message.guild.id
							}, {
								$set: {
									familia: []
								}
							});
						}

						return await this.client.database.users.findOneAndDelete({
							userId: member.id,
							guildId: message.guild.id
						});
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply({
						content: 'Você demorou demais para escolher. Use o comando novamente!'
					});
				}
			});
		});
	}

};
