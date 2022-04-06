/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');

module.exports = class Autoconfig extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'autoconfig';
		this.category = 'Editor';
		this.description = 'Configure a Zoe no seu Servidor!';
		this.usage = 'autoconfig';
		this.aliases = ['auto-config'];

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
		author,
		message
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (!message.guild.me.permissions.has(['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_GUILD'])) {
			return message.reply({
				content: `Eu preciso das seguintes permissões: \`Gerenciar Canais\`, \`Gerenciar Cargos\` e \`Gerenciar Servidor\`.`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('Configuração Zoe City')
			.setDescription(`Você realmente deseja configurar a ${this.client.user} no seu servidor?\n\nEla irá criar as seguintes coisas:\n\nCategoria **Zoe City**\nCanal: **🦉・zoe¹**\nCanal: **🦉・zoe²**\nCanal: **🏥・hospital**\nCanal: **👮🏻・distrito-policial**\nCanal: **🛕・prefeitura**\nCanal: **🏬・mecânica**\nCanal: **💻・mercado-negro**\nCanal: **🌆・favela**\n\nCargo: **・Prefeito ZoeCity**\nCargo: **・Delegado ZoeCity**\nCargo: **・Policial ZoeCity**\nCargo: **・Carcereiro ZoeCity**\nCargo: **・Diretor Hospital ZoeCity**\nCargo: **・Médico ZoeCity**\nCargo: **・Dono da Favela ZoeCity**\nCargo: **・Integrante Favela ZoeCity**\nCargo: **・Jogador ZoeCity**`);

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

			collectorBotoes.on('collect', async (x) => {
				switch (x.customId) {
					case 'aceitar':
						await x.deferUpdate();

						await message.guild.channels.create('Zoe City', {
							type: 'GUILD_CATEGORY'
						}).then(async (category) => {
							await message.guild.channels.create('🦉・zoe¹', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);

								await this.client.database.guilds.findOneAndUpdate({
									_id: message.guild.id
								}, {
									$set: {
										'exportador.canal': channel.id
									}
								});
							});

							await message.guild.channels.create('🦉・zoe²', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('🏥・hospital', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('👮🏻・distrito-policial', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('🛕・prefeitura', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('🏬・mecânica', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('💻・mercado-negro', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});

							await message.guild.channels.create('🌆・favela', {
								type: 'GUILD_TEXT'
							}).then(async (channel) => {
								channel.setParent(category);
							});
						});

						await message.guild.roles.create({
							name: '・Prefeito ZoeCity',
							color: '#380338'
						});

						await message.guild.roles.create({
							name: '・Delegado ZoeCity',
							color: '#0e0d0d'
						});

						await message.guild.roles.create({
							name: '・Policial ZoeCity',
							color: 3447003
						});

						await message.guild.roles.create({
							name: '・Carcereiro ZoeCity',
							color: 3447003
						});

						await message.guild.roles.create({
							name: '・Diretor Hospital ZoeCity',
							color: '#0404c2'
						});

						await message.guild.roles.create({
							name: '・Médico ZoeCity',
							color: '#fffafa'
						});

						await message.guild.roles.create({
							name: '・Dono da Favela ZoeCity',
							color: 15844367
						});

						await message.guild.roles.create({
							name: '・Integrante Favela ZoeCity',
							color: 'RANDOM'
						});

						await message.guild.roles.create({
							name: '・Jogador ZoeCity',
							color: '#73972b'
						});

						msg.delete();
						return message.reply({
							content: 'Configurada com sucesso!'
						});

					case 'negar':
						await x.deferUpdate();

						message.reply({
							content: 'Cancelado com sucesso!'
						});
						return msg.delete();
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					message.reply({
						content: 'Você demorou demais para escolher, por favor use o comando novamente!'
					});
					return msg.delete();
				}
			});
		});
	}

};
