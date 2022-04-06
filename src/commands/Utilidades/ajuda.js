/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const CommandC = require('../../database/Schemas/Command');
const {
	MessageSelectMenu,
	MessageActionRow
} = require('discord.js');

module.exports = class Ajuda extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'ajuda';
		this.category = 'Utilidades';
		this.description = 'Veja todos os comandos do bot!';
		this.usage = 'ajuda <comando>';
		this.aliases = ['help'];

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
		args,
		prefix,
		author
	}) {
		const {
			commands
		} = message.client;

		const AJUDA = new ClientEmbed(author)
			.setAuthor({
				name: `Central de Ajuda - ${this.client.user.username}`,
				iconURL: this.client.user.displayAvatarURL()
			})
			.setThumbnail(this.client.user.displayAvatarURL());

		if (args[0]) {
			CommandC.findOne({
				_id: args[0].toLowerCase()
			}, async (err, cmd) => {
				const name = args[0].toLowerCase();
				const comando = commands.get(name) || commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

				if (!comando) {
					return message.reply({
						content: `Não achei nenhum comando com o nome/alternativo: \`${name}\``
					});
				}

				AJUDA.setDescription(!comando.description.length ? `\`Comando Sem Descrição.\`` : `**\`${comando.description}\`**`);
				AJUDA.addField('Comando:', `\`${comando.name}\``);
				AJUDA.addField('Alternativos:', !comando.aliases.length ? `\`Comando Sem Alternativos.\`` : comando.aliases.map(a => `**\`${a}\`**`).join(', '));
				AJUDA.addField('Modo de Uso:', `\`${prefix}${comando.usage}\``);

				if (cmd?.manutenção) {
					AJUDA.addField('Em Manutenção:', `\`Sim.\`\nMotivo: **${cmd.reason}**`);
				}

				AJUDA.addField(`Cidade ${message.guild.name}:`, `**Prefeito:** ${comando.governador ? `\`Sim\`` : `\`Não\``}. (\`${prefix}addprefeito\`)\n**Delegado:** ${comando.delegado ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setdelegado\`)\n**Diretor do Hospital:** ${comando.diretorHP ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setdiretorhp\`)\n**Dono da Favela:** ${comando.donoFavela ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setdonofavela\`)\n**Fabricante de Armas:** ${comando.donoArmas ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setfabricantearmas\`)\n**Fabricante de Drogas:** ${comando.donoDrogas ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setfabricantedrogas\`)\n**Dono do Desmanche:** ${comando.donoDesmanche ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setdonodesmanche\`)\n**Ajudante do Desmanche:** ${comando.ajudanteDesmanche ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setajudantedesmanche\`)\n**Dono da Lavagem:** ${comando.donoLavagem ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setdonolavagem\`)\n**Ajudante da Lavagem:** ${comando.ajudanteLavagem ? `\`Sim\`` : `\`Não\``}. (\`${prefix}setajudantelavagem\`)`);

				return message.reply({
					content: author.toString(),
					embeds: [AJUDA]
				});
			});
		} else {
			const row = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('ajuda')
						.setPlaceholder('Clique aqui para escolher uma categoria de comando.')
						.addOptions([{
							label: 'Voltar',
							description: 'Volte para o Menu Principal.',
							value: 'Voltar',
							emoji: '⬅️'
						},
						{
							label: 'Carcereiro',
							description: 'Comandos para os Carcereiros do Servidor.',
							value: 'Carcereiro',
							emoji: '🙎'
						},
						{
							label: 'Cidade',
							description: 'Comandos referentes a Cidade do Servidor.',
							value: 'Cidade',
							emoji: '🌆'
						},
						{
							label: 'Crime',
							description: 'Comandos para cometer atos ilícitos.',
							value: 'Crime',
							emoji: '899431985980796959'
						},
						{
							label: 'Delegado',
							description: 'Comandos para o Delegado do Servidor.',
							value: 'Delegado',
							emoji: '👮'
						},
						{
							label: 'Dono/Suporte',
							description: 'Comandos para os Donos da Zoe.',
							value: 'Dono/Suporte',
							emoji: '👑'
						},
						{
							label: 'Economia',
							description: 'Comandos de Economia para o Servidor.',
							value: 'Economia',
							emoji: '💸'
						},
						{
							label: 'Editor',
							description: 'Comandos para os Editores do Servidor.',
							value: 'Editor',
							emoji: '⚙️'
						},
						{
							label: 'Hospital',
							description: 'Comandos para os Médicos do Servidor.',
							value: 'Hospital',
							emoji: '🏥'
						},
						{
							label: 'Mecânica',
							description: 'Comandos para os Mecânicos do Servidor.',
							value: 'Mecânica',
							emoji: '🧑‍🔧'
						},
						{
							label: 'Polícia',
							description: 'Comandos para os Policiais do Servidor.',
							value: 'Polícia',
							emoji: '👮‍♂️'
						},
						{
							label: 'Social',
							description: 'Comandos para os Interações dos membros do Servidor.',
							value: 'Social',
							emoji: '🗣️'
						},
						{
							label: 'Utilidades',
							description: 'Comandos Úteis para membros do Servidor.',
							value: 'Utilidades',
							emoji: '🔔'
						},
						{
							label: 'Premium',
							description: 'Comandos para VIPS do Servidor.',
							value: 'Premium',
							emoji: '💎'
						}
						])
				);

			const chat = new ClientEmbed(author)
				.setAuthor({
					name: `Central de Ajuda - ${this.client.user.username}`,
					iconURL: this.client.user.displayAvatarURL()
				})
				.setThumbnail(this.client.user.displayAvatarURL())
				.setDescription(`${message.author.username}, menu de ajuda da **${this.client.user.tag}**.\n\nOBS: Caso queira saber mais sobre algum comando, use: **\`++ajuda <comando/aliases>\`**.`);

			const msg = await message.reply({
				content: author.toString(),
				embeds: [chat],
				components: [row]
			});

			const collector = msg.createMessageComponentCollector({
				componentType: 'SELECT_MENU',
				time: 180000
			});

			collector.on('collect', async (interaction) => {
				if (interaction.user.id !== author.id) {
					return interaction.reply({
						content: 'Você não usou este comando, por isso não pode usar isso aqui.',
						ephemeral: true
					});
				}

				if (interaction.values.includes('Voltar')) {
					interaction.deferUpdate();

					chat.description = '';
					chat.fields = [];
					chat.setDescription(`${message.author.username}, menu de ajuda da **${this.client.user.tag}**.\n\nOBS: Caso queira saber mais sobre algum comando, use: **\`++ajuda <comando/aliases>\`**.`);
				} else if (interaction.values.includes('Carcereiro')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Carcereiros do Servidor.';
					chat.fields = [];
					chat.addField(`🙎 Carcereiro [${comandos('Carcereiro').size}]`, comandos('Carcereiro').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Cidade')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Cidadãos do Servidor.';
					chat.fields = [];
					chat.addField(`🌆 Cidade [${comandos('Cidade').size}]`, comandos('Cidade').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Crime')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Criminosos do Servidor.';
					chat.fields = [];
					chat.addField(`<:preso:899431985980796959> Crime [${comandos('Crime').size}]`, comandos('Crime').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Delegado')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para o Delegado do Servidor.';
					chat.fields = [];
					chat.addField(`👨‍✈ Delegado [${comandos('Delegado').size}]`, comandos('Delegado').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Dono/Suporte')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Criadores da Zoe.';
					chat.fields = [];
					chat.addField(`👑 Dono/Suporte [${comandos('Dono').size}]`, comandos('Dono').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Economia')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para a Economia do Servidor.';
					chat.fields = [];
					chat.addField(`💸 Economia [${comandos('Economia').size}]`, comandos('Economia').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Editor')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Editores do Servidor.';
					chat.fields = [];
					chat.addField(`⚙️ Editor [${comandos('Editor').size}]`, comandos('Editor').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Hospital')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Médicos do Servidor.';
					chat.fields = [];
					chat.addField(`🏥 Hospital [${comandos('Hospital').size}]`, comandos('Hospital').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Mecânica')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Mecânicos do Servidor.';
					chat.fields = [];
					chat.addField(`🧑‍🔧 Mecânica [${comandos('Mecanico').size}]`, comandos('Mecanico').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Polícia')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os Policiais do Servidor.';
					chat.fields = [];
					chat.addField(`👮‍♂️ Polícia [${comandos('Policial').size}]`, comandos('Policial').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Social')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para Interação dos Cidadãos do Servidor.';
					chat.fields = [];
					chat.addField(`🗣️ Social [${comandos('Social').size}]`, comandos('Social').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Utilidades')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para Úteis para os Cidadãos do Servidor.';
					chat.fields = [];
					chat.addField(`🔔 Utilidades [${comandos('Utilidades').size}]`, comandos('Utilidades').map((comando) => `\`${comando.name}\``).join(', '));
				} else if (interaction.values.includes('Premium')) {
					interaction.deferUpdate();

					chat.description = 'Comandos para os VIPS do Servidor.';
					chat.fields = [];
					chat.addField(`💎 Premium [${comandos('Vip').size}]`, comandos('Vip').map((comando) => `\`${comando.name}\``).join(', '));
				}

				await msg.edit({
					content: author.toString(),
					embeds: [chat]
				});
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return msg.delete();
				}
			});
		}

		function comandos(categoria) {
			return commands.filter((ce) => ce.category === categoria);
		}
	}

};
