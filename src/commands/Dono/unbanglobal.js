/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

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

		const bot = await this.client.database.clientUtils.findOne({
			_id: this.client.user.id
		});

		if (!bot.usersBan.find((a) => a === member.id)) {
			return message.reply({
				content: 'Esse usuário não está banido de usar meus comandos **GLOBALMENTE!**'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('Desbanimento Global')
			.setDescription(`Você está prestes a Desbanir a conta de ${member} Globalmente, assim ele poderá acessar os comandos da ${this.client.user} em todos os Servidores que ela está.\n\nDepois que clicar na reação ✅, você irá Desbanir o usuário e seu acesso ao bot de **TODOS** os servidores em que ela está.\n\nVocê tem  certeza que deseja Desbanir Globalmente a conta deste usuário?`);

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

					await this.client.database.clientUtils.findOneAndUpdate({
						_id: this.client.user.id
					}, {
						$pull: {
							usersBan: member.id
						}
					});

					message.reply({
						content: `Você desbaniu o usuário ${member} de usar minhas funções **GLOBALMENTE** com sucesso!`
					});

					const embed2 = new ClientEmbed(this.client.user)
						.setTitle('Desbanimento Global')
						.setAuthor({
							name: member.user.tag,
							iconURL: member.user.displayAvatarURL({
								dynamic: true
							})
						})
						.setThumbnail(this.client.user.displayAvatarURL())
						.setDescription(`${member}, você foi desbanido de usar minhas funções **GLOBALMENTE**!`);

					return member.send({
						embeds: [embed2]
					}).catch(() => null);
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
