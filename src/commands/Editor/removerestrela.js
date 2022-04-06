/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerestrela extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerestrela';
		this.category = 'Editor';
		this.description = 'Retire uma estrela de um usuário!';
		this.usage = 'remover-estrela <usuário>';
		this.aliases = ['remover-estrela', 'removeestrela'];

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

		if (!user.estrelas.length) {
			return message.reply({
				content: 'Esse usuário não possui nenhuma estrela para ser retirada.'
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$pull: {
				estrelas: '⭐'
			}
		});

		return message.reply({
			content: `Estrela retirada com sucesso do usuário ${member}.`
		});
	}

};
