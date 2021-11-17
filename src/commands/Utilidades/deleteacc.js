/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

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
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.cadastrado) return message.reply(`você não está cadastrado no servidor! Use o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author)
			.setTitle('Deletar Conta')
			.setDescription(`Você está prestes a deletar/resetar a sua conta de todos os Servidores em que possui acesso na Zoe.\n\nDepois que clicar na reação ✅, você terá todos os seus dados deletados/resetados, do Banco de Dados de nosso Bot como: Informações, Saldo, Bitcoins, Carros, Armas e todo o progresso que você conquistou em **TODOS** os Servidores que você joga.\n\nPara que o seu progresso seja Resetado apenas neste Servidor, peça para que um dos Adms ou Editor use o comando \`++deleteuser <@${author.id}>\`, aqui no servidor.\n\nVocê tem  certeza que deseja Deletar/Resetar, a sua conta agora?`);

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

				message.reply(`sua conta no servidor ${message.guild.name} foi deletada com sucesso!`);

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
						userId: author.id,
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
							'faccoes.$.membros': author.id
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
							'fac.tempo': Date.now()
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
					userId: author.id,
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
