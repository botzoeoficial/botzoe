/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setdiretorhp extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdiretorhp';
		this.category = 'Cidade';
		this.description = 'Adicione um Diretor do Hospital na Cidade!';
		this.usage = 'setdiretorhp <usuário>';
		this.aliases = ['set-diretorhp', 'set-diretor-hp'];

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

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um bot nunca poderá ser Diretor do Hospital desse servidor.'
			});
		}

		if (server.cidade.diretorHP === member.id) {
			return message.reply({
				content: 'Esse usuário já é Diretor do Hospital desse servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.diretorHP': member.id
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Diretor do Hospital desse servidor com sucesso.`
		});
	}

};
