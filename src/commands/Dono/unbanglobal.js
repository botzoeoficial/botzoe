/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Unbanglobal extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'unbanglobal';
		this.category = 'Dono';
		this.description = 'Desbana um usuário de usar a Zoe!';
		this.usage = 'unbanglobal <usuário>';
		this.aliases = ['desbanirusuario'];

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
		const member = await this.client.users.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário para deletar!');

		const bot = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		if (!bot.usersBan.find((a) => a === member.id)) return message.reply('esse usuário não está banido de usar meus comandos **GLOBALMENTE!**');

		const embed = new ClientEmbed(author)
			.setTitle('Desbanimento Global')
			.setDescription(`Você está prestes a Desbanir a conta de ${member} Globalmente, assim ele poderá acessar os comandos da ${this.client.user} em todos os Servidores que ela está.\n\nDepois que clicar na reação ✅, você irá Desbanir o usuário e seu acesso ao bot de **TODOS** os servidores em que ela está.\n\nVocê tem  certeza que deseja Desbanir Globalmente a conta deste usuário?`);

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

				await this.client.database.clientUtils.findOneAndUpdate({
					_id: this.client.user.id
				}, {
					$pull: {
						usersBan: member.id
					}
				});

				message.reply(`você desbaniu o usuário ${member} de usar minhas funções **GLOBALMENTE** com sucesso!`);

				const embed2 = new ClientEmbed(this.client.user)
					.setTitle('Desbanimento Global')
					.setAuthor(member.user.tag, member.user.displayAvatarURL({
						dynamic: true
					}))
					.setThumbnail(this.client.user.displayAvatarURL())
					.setDescription(`${member}, você foi desbanido de usar minhas funções **GLOBALMENTE**!`);

				member.send(embed2).catch(() => null);
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
