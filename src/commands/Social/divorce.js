/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Divorce extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'divorce';
		this.category = 'Social';
		this.description = 'Divorcie-se!';
		this.usage = 'divorce';
		this.aliases = ['divorciar'];

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

		if (!user.marry.has) {
			return message.reply({
				content: `Você não está casado! Use o comando \`${prefix}casar\`.`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('💔 | DIVÓRCIO')
			.setDescription(`💍 | Você realmente deseja se divorciar de: <@${user.marry.user}>?`);

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

					const embed2 = new ClientEmbed(author)
						.setTitle('💔 | DIVÓRCIO')
						.setDescription(`👍  | Você se divorciou de <@${user.marry.user}> com sucesso, mas ele(a) ficou com o violão e seu cachorro!!`);

					message.reply({
						content: author.toString(),
						embeds: [embed2]
					});

					await this.client.database.users.findOneAndUpdate({
						userId: user.marry.user,
						guildId: message.guild.id
					}, {
						$set: {
							'marry.user': 'Ninguém.',
							'marry.has': false,
							familia: []
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'marry.user': 'Ninguém.',
							'marry.has': false,
							familia: []
						}
					});

					return msg.delete();
				} else if (b.customId === 'negar') {
					await b.deferUpdate();

					msg.delete();

					return message.reply({
						content: 'Pelo visto você desistiu de se divorciar! ||É uma pena, você iria ser feliz **solteiro(a)**!||'
					});
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply({
						content: 'Você demorou demais para se divorciar. Use o comando novamente!'
					});
				}
			});
		});
	}

};
