/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setfabricantedrogas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setfabricantedrogas';
		this.category = 'Cidade';
		this.description = 'Seta quem vai comandar a Fábrica de Drogas!';
		this.usage = 'setfabricantedrogas <usuário>';
		this.aliases = ['set-fabricantedrogas', 'set-fabricante-drogas'];

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
				content: 'Um bot nunca poderá ser Fabricante das Drogas desse servidor.'
			});
		}

		if (server.cidade.donoFabricadeDrogas.length === 3) {
			return message.reply({
				content: 'Esse servidor já possui muitos Fabricantes de Drogas.'
			});
		}

		if (server.cidade.donoFabricadeDrogas.map((a) => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é Fabricante das Drogas desse servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				'cidade.donoFabricadeDrogas': {
					id: member.id
				}
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Fabricante das Drogas desse servidor com sucesso.`
		});
	}

};
