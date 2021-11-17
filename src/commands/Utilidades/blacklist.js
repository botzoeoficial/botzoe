/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable max-nested-callbacks */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class BlackList extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'blacklist';
		this.category = 'Utilidades';
		this.description = 'Veja os usuários da blacklist!';
		this.usage = 'blacklist';
		this.aliases = ['bl'];

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const eventosArray = server.blacklist.map((value, index) => ({
			nick: value.nick,
			id: value.id,
			saldo: value.saldo,
			adicionado: value.adicionado,
			motivo: value.motivo,
			position: index
		}));

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('🚫 | BlackList');

		eventosArray.forEach((eu) => embedMessage += `${eu.position + 1} **Usuário:** ${eu.nick} | **ID:** ${eu.id}\n`);
		embed.setDescription(!server.blacklist.length ? 'Não há usuários cadastrados na blacklist no momento.' : `**DIGITE A POSIÇÃO DO USUÁRIO NO CHAT PARA VER INFORMAÇÕES SOBRE ELE!**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			if (!server.blacklist.length) return;

			const sim = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 300000
			});

			sim.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEvento = eventosArray.find((xis) => xis.position === selected);

				if (!findSelectedEvento) {
					message.reply('número não encontrado! Por favor, envie o número novamente').then(ba => ba.delete({
						timeout: 5000
					}));
					ce.delete();
				} else {
					sim.stop();
					ce.delete();

					embed
						.setDescription(`**Informações do usuário:** **${findSelectedEvento.nick}**`)
						.addField('👤 Nick:', findSelectedEvento.nick, true)
						.addField('🆔 ID:', findSelectedEvento.id, true)
						.addField('☑️ Adicionado Por:', `<@${findSelectedEvento.adicionado}>`, true)
						.addField('💵 Saldo:', `R$${Utils.numberFormat(findSelectedEvento.saldo)},00`)
						.addField('🗒️ Motivo:', findSelectedEvento.motivo);

					msg.edit(author, embed).then((msg1) => {
						msg1.react('🗑️');

						const trash = msg1.createReactionCollector((reaction, user) => reaction.emoji.name === '🗑️' && user.id === author.id, {
							max: 1
						});

						trash.on('collect', async () => {
							msg.delete();
						});
					});
				}
			});

			sim.on('end', (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					message.reply(`você demorou demais para escolher o usuário da blacklist! Use o comando novamente!`).then((a) => a.delete({
						timeout: 6000
					}));
					sim.stop();
					return;
				}
			});
		});
	}

};
