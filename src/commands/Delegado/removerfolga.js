/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

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

		if (server.cidade.governador !== author.id && server.cidade.delegado !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser o \`Prefeito\` ou \`Delegado\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		if (!server.cidade.policiais.length) {
			return message.reply({
				content: 'Esse servidor não possui Policiais para remover folga.'
			});
		}

		const timeout = 86400000;

		if (timeout - (Date.now() - server.cidade.folgaPoliciaRemove) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.folgaPoliciaRemove));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.folgaPoliciaRemove': 0
				}
			});

			const allUsers = await this.client.database.users.find({
				'policia.isPolice': true,
				guildId: message.guild.id
			});

			allUsers.forEach(async (a) => {
				await this.client.database.users.updateOne({
					userId: a.userId,
					guildId: message.guild.id
				}, {
					'policia.prender': 0,
					'policia.revistar': 0,
					'policia.prenderRoubar': 0,
					'policia.prenderExportador': 0,
					'policia.isFolga': false
				});
			});

			message.reply({
				content: 'Todos os Policiais do servidor voltaram a **ativa** para prenderem e revistarem com sucesso!'
			});
		}
	}

};
