/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerajudantedesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerajudantedesmanche';
		this.category = 'Cidade';
		this.description = 'Remova um Ajudante do Desmanche!';
		this.usage = 'removerajudantedesmanche <usuário>';
		this.aliases = ['remover-ajudantedesmanche', 'remover-ajudante-desmanche'];

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
		this.donoDesmanche = true;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`um bot nunca irá ser Ajudante do Desmanche.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.ajudanteDesmanche.length) return message.reply('este servidor não possui Ajudantes para o Desmanche.');

		if (!server.cidade.ajudanteDesmanche.map(a => a.id).includes(member.id)) return message.reply('esse usuário não é Ajudante do Desmanche do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.ajudanteDesmanche': {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} não é mais Ajudante do Desmanche desse servidor agora.`);
	}

};
