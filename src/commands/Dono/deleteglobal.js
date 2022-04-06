/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Deleteglobal extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'deleteglobal';
		this.category = 'Dono';
		this.description = 'Delete os dados de um usuário em todos os servidores!';
		this.usage = 'deleteglobal <usuário>';
		this.aliases = ['delete-global'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		args
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const member = await this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário para deletar!'
			});
		}

		const user = await this.client.database.users.find({
			userId: member.id
		});

		const embed = new ClientEmbed(author)
			.setTitle('Deletar Conta')
			.setDescription(`Você está prestes a deletar a conta de ${member} de todos os Servidores, e todo o progresso dele será deletado/resetado.\n\nDepois que clicar na reação ✅, você deletará/resetará todo o progresso do Banco de Dados deste usuário, como: Informações, Saldo, Bitcoins, Carros, Armas e tudo que ele conquistou em **TODOS** os servidores que ele joga.\n\nVocê tem  certeza que deseja Deletar/Resetar a conta deste usuário?`);

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
				time: 60000,
				max: 1
			});

			collectorBotoes.on('collect', async (b) => {
				if (b.customId === 'aceitar') {
					await b.deferUpdate();

					collectorBotoes.stop();
					msg.delete();

					message.reply({
						content: `Você deletou a conta de ${member} em todos os servidores que ele joga!`
					});

					for (var i = 0; i < user.length; i++) {
						if (user[i].fac.createFac) {
							const fb = user[i]?.fac;
							const random = Math.floor(Math.random() * user[i].fac.membros.length);

							const owner = await this.client.users.fetch(fb.dono);
							const fd = await this.client.database.users
								.findOne({
									userId: owner.id,
									guildId: user[i].guildId
								})
								.then((x) => x.fac);

							await this.client.database.users.findOneAndUpdate({
								userId: await this.client.users.fetch(fd.membros[random]).then((a) => a.id),
								guildId: user[i].guildId
							}, {
								$set: {
									'fac.dono': await this.client.users.fetch(fd.membros[random]).then((a) => a.id)
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: user[i].userId,
								guildId: user[i].guildId
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
								_id: user[i].guildId,
								'faccoes.nome': user[i].fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': user[i].userId
								}
							});
						}

						if (user[i].fac.isFac) {
							const fb = user[i]?.fac;
							const owner = await this.client.users.fetch(fb.dono);

							await this.client.database.users.findOneAndUpdate({
								userId: user[i].userId,
								guildId: user[i].guildId
							}, {
								$set: {
									'fac.isFac': false,
									'fac.tempo': Date.now()
								}
							});

							await this.client.database.users.findOneAndUpdate({
								userId: owner.id,
								guildId: user[i].guildId
							}, {
								$pull: {
									'fac.membros': user[i].userId
								}
							});

							await this.client.database.guilds.findOneAndUpdate({
								_id: user[i].guildId,
								'faccoes.nome': user[i].fac.nome
							}, {
								$pull: {
									'faccoes.$.membros': user[i].userId
								}
							});
						}

						if (user[i].marry.has) {
							await this.client.database.users.findOneAndUpdate({
								userId: user[i].marry.user,
								guildId: user[i].guildId
							}, {
								$set: {
									'marry.user': 'Ninguém.',
									'marry.has': false,
									'cooldown.gf': 0,
									'cooldown.fe': 0
								}
							});
						}

						if (user[i].familia.length >= 0) {
							await this.client.database.users.findOneAndUpdate({
								userId: user[i].marry.user,
								guildId: user[i].guildId
							}, {
								$set: {
									familia: []
								}
							});
						}

						return await this.client.database.users.deleteMany({
							userId: user[i].userId
						});
					}
				} else if (b.customId === 'negar') {
					await b.deferUpdate();

					return msg.delete();
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return msg.delete();
				}
			});
		});
	}

};
