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

		if (server.cidade.governador !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser o \`Prefeito\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		const timeout = 259200000;

		if (timeout - (Date.now() - server.cidade.setDelegado) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.setDelegado));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author,
				embeds: [embed]
			});
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) {
				return message.reply({
					content: 'Você precisa mencionar um usuário junto com o comando.'
				});
			}

			if (member.user.bot) {
				return message.reply({
					content: 'Um bot nunca poderá ser Delegado desse servidor.'
				});
			}

			if (server.cidade.delegado === member.id) {
				return message.reply({
					content: 'Esse usuário já é Delegado desse servidor.'
				});
			}

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$set: {
					'cidade.delegado': member.id,
					'cidade.setDelegado': Date.now()
				}
			});

			return message.reply({
				content: `O usuário ${member} entrou no cargo de Delegado desse servidor com sucesso.`
			});
		}
	}

};
