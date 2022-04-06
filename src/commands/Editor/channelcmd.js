/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Channelcmd extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'channelcmd';
		this.category = 'Editor';
		this.description = 'Bloqueie canals onde irei executar meus comandos!';
		this.usage = 'channelcmd';
		this.aliases = ['channel-cmd'];

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

		if (server.canal.map(a => a.id).includes(message.channel.id)) {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$pull: {
					canal: {
						id: message.channel.id
					}
				}
			});

			return message.reply({
				content: 'Os comandos agora estão **ATIVADOS** nesse canal!'
			});
		} else if (!server.canal.map(a => a.id).includes(message.channel.id)) {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$push: {
					canal: {
						id: message.channel.id
					}
				}
			});

			return message.reply({
				content: 'Os comandos agora estão **DESATIVADOS** nesse canal!'
			});
		}
	}

};
