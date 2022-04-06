/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setajudantelavagem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setajudantelavagem';
		this.category = 'Cidade';
		this.description = 'Setar um Ajudante da Lavagem de Dinheiro!';
		this.usage = 'setajudantelavagem <usuário>';
		this.aliases = ['addajudantelavagem', 'set-ajudante-lavagem'];

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
		this.donoLavagem = true;

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

		if (server.cidade.donoFavela !== author.id && !message.member.permissions.has('ADMINISTRATOR') && !server.editor.find((a) => a.id === author.id) && server.cidade.donoLavagem !== author.id) {
			return message.reply({
				content: `Você precisa ser o \`Dono da Favela\` ou \`Dono da Lavagem de Dinheiro\` da Cidade ou ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
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
				content: 'Um bot nunca poderá ser Ajudante da Lavagem de Dinheiro desse servidor.'
			});
		}

		if (server.cidade.ajudanteLavagem.length === 3) {
			return message.reply({
				content: 'Este servidor já possui o máximo de Ajudantes da Lavagem de Dinheiro.'
			});
		}

		if (server.cidade.ajudanteLavagem.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Ajudante da Lavagem de Dinheiro do servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.ajudanteLavagem': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Ajudante da Lavagem de Dinheiro desse servidor com sucesso.`
		});
	}

};
