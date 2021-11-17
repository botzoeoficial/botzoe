/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

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

				message.reply(`a conta de ${member} no servidor ${message.guild.name} foi deletada com sucesso!`);

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
