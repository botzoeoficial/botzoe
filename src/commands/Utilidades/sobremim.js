/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Sobremim extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'sobremim';
		this.category = 'Utilidades';
		this.description = 'Descreva sobre você no seu perfil (++perfil)!';
		this.usage = 'sobremim <mensagem>';
		this.aliases = ['aboutme'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

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
		prefix,
		author
	}) {
		const mensagem = args.slice(0).join(' ');

		if (!mensagem) return message.reply(`use \`${prefix}sobremim <mensagem>\` para alterar sua descrição.`);

		if (mensagem.length > 1024) return message.reply('a mensagem do SOBREMIM só pode ter no máximo **1024** letras.');

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				sobremim: mensagem
			}
		});

		message.reply(`sobremim alterado com sucesso! Use o comando \`${prefix}perfil\` para ver como ficou.`);
	}

};
