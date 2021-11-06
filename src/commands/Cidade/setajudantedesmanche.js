/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Setajudantedesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'setajudantedesmanche';
		this.category = 'Cidade';
		this.description = 'Setar um Ajudante do Desmanche!';
		this.usage = 'setajudantedesmanche <usuário>';
		this.aliases = ['addajudantedesmanche', 'set-ajudante-desmanche'];

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

		if (member.user.bot) return message.reply(`você não pode dar a função de Ajudante do Desmanche para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.ajudanteDesmanche.length === 1) return message.reply('este servidor já possui o máximo de Ajudantes do Desmanche.');

		if (server.cidade.ajudanteDesmanche.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é Ajudante do Desmanche do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				cidade: {
					ajudanteDesmanche: {
						id: member.id
					}
				}
			}
		});

		message.reply(`o usuário ${member} virou Ajudante do Desmanche desse servidor agora.`);
	}

};
