/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setchannelexportador extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setchannelexportador';
		this.category = 'Editor';
		this.description = 'Sete o canal onde será dropado o exportador de drogas!';
		this.usage = 'setchannelexportador <canal>';
		this.aliases = ['setchannel-exportador', 'set-channel-exportador'];

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
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

		if (!channel) return message.reply('você precisa mencionar um canal junto com o comando.');

		if (server.exportador.canal === channel.id) return message.reply('esse canal já está setado como **drop do exportador de drogas**.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'exportador.canal': channel.id
			}
		});

		message.reply(`o canal ${channel} foi setado para receber **drop** do exportador de drogas com sucesso.`);
	}

};
