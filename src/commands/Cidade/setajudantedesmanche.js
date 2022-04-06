/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setajudantedesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setajudantedesmanche';
		this.category = 'Cidade';
		this.description = 'Setar um Ajudante do Desmanche!';
		this.usage = 'setajudantedesmanche <usuário>';
		this.aliases = ['addajudantedesmanche', 'set-ajudante-desmanche'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = true;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = true;
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

		if (server.cidade.donoFavela !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id) && server.cidade.donoDesmanche !== author.id) {
			return message.reply({
				content: `Você precisa ser o \`Dono da Favela\` ou \`Dono do Desmanche\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.ajudanteDesmanche.length === 3) {
			return message.reply({
				content: 'Este servidor já possui o máximo de Ajudantes do Desmanche.'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um bot nunca poderá ser Ajudante do Desmanche desse servidor.'
			});
		}

		if (server.cidade.ajudanteDesmanche.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Ajudante do Desmanche do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.ajudanteDesmanche': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Ajudante do Desmanche desse servidor com sucesso.`
		});
	}

};
