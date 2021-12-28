/* eslint-disable max-len */
/* eslint-disable consistent-return */
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

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
		if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_GUILD'])) return message.reply(`eu preciso das seguintes permissões: \`Gerenciar Canais\`, \`Gerenciar Cargos\` e \`Gerenciar Servidor\`.`);

		const embed = new ClientEmbed(author)
			.setTitle('Configuração Zoe City')
			.setDescription(`Você realmente deseja configurar a ${this.client.user} no seu servidor?\n\nEla irá criar as seguintes coisas:\n\nCategoria **Zoe City**\nCanal: **🦉・zoe¹**\nCanal: **🦉・zoe²**\nCanal: **🏥・hospital**\nCanal: **👮🏻・distrito-policial**\nCanal: **🛕・prefeitura**\nCanal: **🏬・mecânica**\nCanal: **💻・mercado-negro**\nCanal: **🌆・favela**\n\nCargo: **・Prefeito ZoeCity**\nCargo: **・Delegado ZoeCity**\nCargo: **・Policial ZoeCity**\nCargo: **・Carcereiro ZoeCity**\nCargo: **・Diretor Hospital ZoeCity**\nCargo: **・Médico ZoeCity**\nCargo: **・Dono da Favela ZoeCity**\nCargo: **・Integrante Favela ZoeCity**\nCargo: **・Jogador ZoeCity**`);

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
				if (b.id === 'negar') {
					b.reply.defer();

					return msg.delete();
				} else if (b.id === 'aceitar') {
					b.reply.defer();

					await message.guild.channels.create('Zoe City', {
						type: 'category'
					}).then(async (category) => {
						await message.guild.channels.create('🦉・zoe¹', {
							type: 'text'
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
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('🏥・hospital', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('👮🏻・distrito-policial', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('🛕・prefeitura', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('🏬・mecânica', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('💻・mercado-negro', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});

						await message.guild.channels.create('🌆・favela', {
							type: 'text'
						}).then(async (channel) => {
							channel.setParent(category);
						});
					});

					await message.guild.roles.create({
						data: {
							name: '・Prefeito ZoeCity',
							color: '#380338'
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Delegado ZoeCity',
							color: '#0e0d0d'
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Policial ZoeCity',
							color: 3447003
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Carcereiro ZoeCity',
							color: 3447003
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Diretor Hospital ZoeCity',
							color: '#0404c2'
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Médico ZoeCity',
							color: '#fffafa'
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Dono da Favela ZoeCity',
							color: 15844367
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Integrante Favela ZoeCity',
							color: '#RANDOM'
						}
					});

					await message.guild.roles.create({
						data: {
							name: '・Jogador ZoeCity',
							color: '#73972b'
						}
					});

					msg.delete();
					return message.reply('sucesso!');
				}
			});

			collectorBotoes.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();

					return message.reply(`você demorou demais para responder. Use o comando novamente!`);
				}
			});
		});
	}

};
