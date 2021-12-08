/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

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
		const member = await this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário para deletar!');

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor!`);

		const embed = new ClientEmbed(author)
			.setTitle('Deletar Conta')
			.setDescription(`Você está prestes a deletar a conta de ${member} deste Servidor, e todo o progresso dele será deletado/resetado.\n\nDepois que clicar na reação ✅, você deletará/resetará todo o progresso do Banco de Dados deste usuário, como: Informações, Saldo, Bitcoins, Carros, Armas e tudo que ele conquistou **Neste** servidor.\n\nVocê tem  certeza que deseja Deletar/Resetar a conta deste usuário?`);

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
					b.reply.defer();

					msg.delete();

					message.reply(`a conta de ${member} no servidor ${message.guild.name} foi deletada com sucesso!`);

					const server = await this.client.database.guilds.findOne({
						_id: message.guild.id
					});

					if (server.editor.find((f) => f.id === member.id)) {
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

					if (server.cidade.governador === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.governador': ''
							}
						});
					}

					if (server.cidade.delegado === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.delegado': ''
							}
						});
					}

					if (server.cidade.policiais.find((f) => f.id === member.id)) {
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

					if (server.cidade.carcereiro.find((f) => f.id === member.id)) {
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

					if (server.cidade.diretorHP === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.diretorHP': ''
							}
						});
					}

					if (server.cidade.medicos.find((f) => f.id === member.id)) {
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

					if (server.cidade.donoFavela === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoFavela': ''
							}
						});
					}

					if (server.cidade.donoFabricadeArmas.find((f) => f.id === member.id)) {
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

					if (server.cidade.donoFabricadeDrogas.find((f) => f.id === member.id)) {
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

					if (server.cidade.donoDesmanche === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoDesmanche': ''
							}
						});
					}

					if (server.cidade.donoLavagem === member.id) {
						await this.client.database.guilds.findOneAndUpdate({
							_id: message.guild.id
						}, {
							$set: {
								'cidade.donoLavagem': ''
							}
						});
					}

					if (server.cidade.ajudanteDesmanche.find((f) => f.id === member.id)) {
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

					if (server.cidade.ajudanteLavagem.find((f) => f.id === member.id)) {
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

					if (server.cidade.mecanico.find((f) => f.id === member.id)) {
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

					if (server.mecanica.dono.find((f) => f === member.id)) {
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
