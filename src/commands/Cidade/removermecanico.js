/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removermecanico extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removermecanico';
		this.category = 'Cidade';
		this.description = 'Remova um Mecânico do seu servidor!';
		this.usage = 'removermecanico <usuário>';
		this.aliases = ['remover-mecanico', 'remove-mecânico'];

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

		if (!server.cidade.mecanico.length) {
			return message.reply({
				content: 'Não há Mecânicos nesse servidor.'
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
				content: 'Um bot nunca irá ser Mecânico desse servidor.'
			});
		}

		if (!server.cidade.mecanico.find((f) => f.id === member.id)) {
			return message.reply({
				content: 'Esse usuário não é um Mecânico do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.mecanico': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} saiu do cargo de Mecânico desse servidor com sucesso.`
		});
	}

};
