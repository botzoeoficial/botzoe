/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const User = require('../../database/Schemas/User');

module.exports = class Folga extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'folga';
		this.category = 'Delegado';
		this.description = 'Deixe todos os Policiais da cidade sem prender/revistar por 6 horas!';
		this.usage = 'folga';
		this.aliases = ['dar-folga'];

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

		if (server.cidade.golpeEstado.caos) return message.reply('a Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!');

		if (!server.cidade.policiais.length) return message.reply('esse servidor não possui Policiais para dar folga.');

		const timeout = 86400000;

		if (timeout - (Date.now() - server.cidade.folgaPolicia) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.folgaPolicia));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.folgaPolicia': Date.now()
				}
			});

			const allUsers = await User.find({
				guildId: message.guild.id
			});

			allUsers.forEach(async (a) => {
				if (a.policia.isPolice) {
					a.policia.prender = Date.now();
					a.policia.revistar = Date.now();
					a.policia.prenderRoubar = Date.now();
					a.policia.prenderExportador = Date.now();
					a.policia.isFolga = true;

					a.save();
				}
			});

			message.reply('todos os Policiais do servidor ficaram em cooldown de **6 horas** para prenderem e revistarem!');

			setTimeout(async () => {
				allUsers.forEach(async (a) => {
					if (a.policia.isPolice) {
						a.policia.prender = 0;
						a.policia.revistar = 0;
						a.policia.prenderRoubar = 0;
						a.policia.prenderExportador = 0;
						a.policia.isFolga = false;

						a.save();
					}
				});
			}, 21600000);
		}
	}

};
