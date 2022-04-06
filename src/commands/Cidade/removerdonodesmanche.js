/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerdonodesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerdonodesmanche';
		this.category = 'Cidade';
		this.description = 'Remova o Dono do Desmanche do seu servidor!';
		this.usage = 'removerdonodesmanche <usuário>';
		this.aliases = ['remover-dono-desmanche', 'remover-donodesmanche'];

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

		if (server.cidade.donoFavela !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id)) {
			return message.reply({
				content: `Você precisa ser o \`Dono da Favela\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
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
				content: 'Um bot não nunca irá ser Dono do Desmanche desse servidor.'
			});
		}

		if (server.cidade.donoDesmanche !== member.id) {
			return message.reply({
				content: 'Esse usuário não é o Dono do Desmanche desse servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.donoDesmanche': ''
			}
		});

		return message.reply({
			content: `O usuário ${member} saiu do cargo de Dono do Desmanche desse servidor com sucesso.`
		});
	}

};
