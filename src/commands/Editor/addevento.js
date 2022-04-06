/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Addevento extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addevento';
		this.category = 'Editor';
		this.description = 'Adicione um evento programado para seu servidor!';
		this.usage = 'addevento <tag do cargo> <data do evento> <hora do evento> <nome do evento>';
		this.aliases = ['add-evento'];

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
		message,
		args,
		prefix,
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.eventos.length >= 12) {
			return message.reply({
				content: 'Este servidor já possui o máximo de eventos cadastrados.'
			});
		}

		const tag = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

		if (!tag) {
			return message.reply({
				content: 'Você precisa mencionar uma tag junto com o comando.'
			});
		}

		if (tag.managed) {
			return message.reply({
				content: 'Essa tag é de um bot.'
			});
		}

		const data = args[1];

		if (!data) {
			return message.reply({
				content: 'Você precisa falar a data do evento logo após a menção da tag.'
			});
		}

		const hora = args[2];

		if (!hora) {
			return message.reply({
				content: 'Você precisa falar a hora logo após a data do evento.'
			});
		}

		const evento = args.slice(3).join(' ');

		if (!evento) {
			return message.reply({
				content: 'Você precisa por o nome do evento logo após a hora do evento.'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('🎉 | EVENTO ADICIONADO')
			.addField('Nome do Evento:', evento)
			.addField('Tag do Cargo:', tag)
			.addField('Data do Evento:', data, true)
			.addField('Hora:', hora, true)
			.addField('Usar Evento:', `**${prefix}eventos**`, true);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		});

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				eventos: {
					nome: evento,
					tag: tag,
					date: data,
					hour: hora
				}
			}
		});

		return;
	}

};
