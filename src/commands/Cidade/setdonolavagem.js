/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setdonolavagem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setdonolavagem';
		this.category = 'Cidade';
		this.description = 'Seta quem vai comandar a Lavagem de Dinheiro!';
		this.usage = 'setdonolavagem <usuário>';
		this.aliases = ['set-donolavagem', 'set-dono-lavagem'];

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
				content: 'Um bot nunca poderá ser Dono da Lavagem de Dinheiro desse servidor.'
			});
		}

		if (server.cidade.donoLavagem === member.id) {
			return message.reply({
				content: 'Esse usuário já é Dono da Lavagem de Dinheiro desse servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.donoLavagem': member.id
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Dono da Lavagem de Dinheiro desse servidor com sucesso.`
		});
	}

};
