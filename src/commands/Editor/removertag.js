/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removertag extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removertag';
		this.category = 'Editor';
		this.description = 'Remova uma tag de um usuário!';
		this.usage = 'removertag <usuário> <tag>';
		this.aliases = ['remover-tag'];

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

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		const tag = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

		if (!tag) {
			return message.reply({
				content: 'Você precisar mencionar uma tag logo após o usuário no comando.'
			});
		}

		if (tag.managed) {
			return message.reply({
				content: 'Você não pode remover uma tag que é de um bot.'
			});
		}

		if (!user.eventos.find((a) => a === tag.id)) {
			return message.reply({
				content: 'Esse usuário não possui essa tag.'
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$pull: {
				eventos: tag.id
			}
		});

		return message.reply({
			content: `Tag removida do perfil do usuário ${member} com sucesso.`
		});
	}

};
