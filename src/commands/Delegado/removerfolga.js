/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const User = require('../../database/Schemas/User');

module.exports = class Removerfolga extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerfolga';
		this.category = 'Delegado';
		this.description = 'Deixe todos os Policiais de volta a ativa na cidade!';
		this.usage = 'removerfolga';
		this.aliases = ['remover-folga'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = true;
		this.delegado = true;
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

		if (!server.cidade.policiais.length) return message.reply('esse servidor não possui Policiais para remover folga.');

		const timeout = 86400000;

		if (timeout - (Date.now() - server.cidade.folgaPoliciaRemove) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.folgaPoliciaRemove));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.folgaPoliciaRemove': 0
				}
			});

			const allUsers = await User.find({
				guildId: message.guild.id
			});

			allUsers.forEach(async (a) => {
				if (a.policia.isPolice) {
					a.policia.prender = 0;
					a.policia.revistar = 0;

					a.save();
				}
			});

			message.reply('todos os Policiais do servidor voltaram a **ativa** para prenderem e revistarem!');
		}
	}

};
