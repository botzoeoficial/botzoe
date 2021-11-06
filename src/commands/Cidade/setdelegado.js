/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Setdelegado extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdelegado';
		this.category = 'Cidade';
		this.description = 'Adicione um delegado na Cidade!';
		this.usage = 'setdelegado <usuário>';
		this.aliases = ['set-delegate', 'set-delegado'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = true;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = false;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const timeout = 259200000;

		if (timeout - (Date.now() - server.cidade.setDelegado) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.setDelegado));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

			if (member.user.bot) return message.reply(`você não pode dar função de Delegado para um bot.`);

			if (server.cidade.delegado === member.id) return message.reply('esse usuário já é Delegado desse servidor.');

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.delegado': member.id,
					'cidade.setDelegado': Date.now()
				}
			});

			message.reply(`o usuário ${member} virou Delegado desse servidor agora.`);
		}
	}

};
