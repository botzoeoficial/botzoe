/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const {
	MessageActionRow,
	MessageButton
} = require('discord.js');

module.exports = class Garagem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'garagem';
		this.category = 'Social';
		this.description = 'Veja seus carros na garagem!';
		this.usage = 'garagem';
		this.aliases = ['gr'];

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

		let pagina = 0;

		const embed = new ClientEmbed(author)
			.setTitle('<:garagem:901528229112844308> | Garagem');

		if (!user.garagem.length) {
			embed.setDescription(`${author}, você não tem carros! Use o comando \`${prefix}roubarcarro\`.`);
			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			embed
				.setDescription(`**Você selecionou o Carro:** \`${user.garagem[pagina].nome}\``)
				.addField('Modelo:', user.garagem[pagina].modelo, true)
				.addField('Ano:', String(user.garagem[pagina].ano), true)
				.addField('Valor:', `R$${Utils.numberFormat(Number(user.garagem[pagina].valor))},00`, true)
				.addField('Velocidade:', `${String(user.garagem[pagina].velocidade)} KM/h`, true)
				.addField('Cavalos de Força:', `${String(user.garagem[pagina].cavalos)} HP`, true)
				.addField('Danificado:', `${String(user.garagem[pagina].danificado)}%`, true)
				.addField('Valor para Desmanche:', `R$${Utils.numberFormat(Number(user.garagem[pagina].desmanche))},00`, true)
				.addField('Emplacado:', `**\`${!user.garagem[pagina].emplacado ? 'Não está emplacado.' : 'Está emplacado.'}\`**`, true)
				.addField('Placa:', `**${!user.garagem[pagina].emplacado ? `\`${user.garagem[pagina].placa}\` ❌` : `\`${user.garagem[pagina].placa}\` ✅`}**`, true)
				.addField('Oficina:', `**\`${!user.garagem[pagina].mecanica ? 'Não está na Oficina.' : 'Está na Oficina.'}\`**`, true)
				.addField('Arrumado na Oficina:', `**\`${!user.garagem[pagina].arrumado ? 'Não está arrumado.' : 'Está arrumado.'}\`**`, true)
				.addField('Liberado da Oficina:', `**\`${!user.garagem[pagina].liberado ? 'Não está liberado.' : 'Está liberado.'}\`**`, true)
				.setImage(user.garagem[pagina].img);

			const buttonVoltar = new MessageButton().setCustomId('voltar').setEmoji('⬅️').setStyle('PRIMARY');
			const buttonIr = new MessageButton().setCustomId('ir').setEmoji('➡️').setStyle('PRIMARY');
			const botoes = new MessageActionRow().addComponents([buttonVoltar, buttonIr]);

			const escolha = await message.reply({
				embeds: [embed],
				components: [botoes]
			});

			const filter = (interaction) => interaction.isButton() && ['ir', 'voltar'].includes(interaction.customId) && interaction.user.id === author.id;

			const collectorEscolhas = escolha.createMessageComponentCollector({
				filter,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				if (b.customId === 'voltar') {
					await b.deferUpdate();

					if (pagina <= 0) {
						pagina = 0;
					} else {
						pagina--;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle('<:garagem:901528229112844308> | Garagem')
						.setDescription(`**Você selecionou o Carro:** \`${user.garagem[pagina].nome}\``)
						.addField('Modelo:', user.garagem[pagina].modelo, true)
						.addField('Ano:', String(user.garagem[pagina].ano), true)
						.addField('Valor:', `R$${Utils.numberFormat(Number(user.garagem[pagina].valor))},00`, true)
						.addField('Velocidade:', `${String(user.garagem[pagina].velocidade)} KM/h`, true)
						.addField('Cavalos de Força:', `${String(user.garagem[pagina].cavalos)} HP`, true)
						.addField('Danificado:', `${String(user.garagem[pagina].danificado)}%`, true)
						.addField('Valor para Desmanche:', `R$${Utils.numberFormat(Number(user.garagem[pagina].desmanche))},00`, true)
						.addField('Emplacado:', `**\`${!user.garagem[pagina].emplacado ? 'Não está emplacado.' : 'Está emplacado.'}\`**`, true)
						.addField('Placa:', `**${!user.garagem[pagina].emplacado ? `\`${user.garagem[pagina].placa}\` ❌` : `\`${user.garagem[pagina].placa}\` ✅`}**`, true)
						.addField('Oficina:', `**\`${!user.garagem[pagina].mecanica ? 'Não está na Oficina.' : 'Está na Oficina.'}\`**`, true)
						.addField('Arrumado na Oficina:', `**\`${!user.garagem[pagina].arrumado ? 'Não está arrumado.' : 'Está arrumado.'}\`**`, true)
						.addField('Liberado da Oficina:', `**\`${!user.garagem[pagina].liberado ? 'Não está liberado.' : 'Está liberado.'}\`**`, true)
						.setImage(user.garagem[pagina].img);

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				} else if (b.customId === 'ir') {
					await b.deferUpdate();

					if (pagina >= (user.garagem.length - 1)) {
						pagina = user.garagem.length - 1;
					} else {
						pagina++;
					}

					const embed2 = new ClientEmbed(author)
						.setTitle('<:garagem:901528229112844308> | Garagem')
						.setDescription(`**Você selecionou o Carro:** \`${user.garagem[pagina].nome}\``)
						.addField('Modelo:', user.garagem[pagina].modelo, true)
						.addField('Ano:', String(user.garagem[pagina].ano), true)
						.addField('Valor:', `R$${Utils.numberFormat(Number(user.garagem[pagina].valor))},00`, true)
						.addField('Velocidade:', `${String(user.garagem[pagina].velocidade)} KM/h`, true)
						.addField('Cavalos de Força:', `${String(user.garagem[pagina].cavalos)} HP`, true)
						.addField('Danificado:', `${String(user.garagem[pagina].danificado)}%`, true)
						.addField('Valor para Desmanche:', `R$${Utils.numberFormat(Number(user.garagem[pagina].desmanche))},00`, true)
						.addField('Emplacado:', `**\`${!user.garagem[pagina].emplacado ? 'Não está emplacado.' : 'Está emplacado.'}\`**`, true)
						.addField('Placa:', `**${!user.garagem[pagina].emplacado ? `\`${user.garagem[pagina].placa}\` ❌` : `\`${user.garagem[pagina].placa}\` ✅`}**`, true)
						.addField('Oficina:', `**\`${!user.garagem[pagina].mecanica ? 'Não está na Oficina.' : 'Está na Oficina.'}\`**`, true)
						.addField('Arrumado na Oficina:', `**\`${!user.garagem[pagina].arrumado ? 'Não está arrumado.' : 'Está arrumado.'}\`**`, true)
						.addField('Liberado da Oficina:', `**\`${!user.garagem[pagina].liberado ? 'Não está liberado.' : 'Está liberado.'}\`**`, true)
						.setImage(user.garagem[pagina].img);

					escolha.edit({
						content: author.toString(),
						embeds: [embed2]
					});
				}
			});

			collectorEscolhas.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return escolha.edit({
						content: author.toString(),
						embeds: [embed],
						components: []
					});
				}
			});
		}
	}

};
