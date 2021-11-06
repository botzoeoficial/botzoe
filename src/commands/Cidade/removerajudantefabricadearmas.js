/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerajudantefabricadearmas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerajudantefabricadearmas';
		this.category = 'Cidade';
		this.description = 'Remova um Ajudante da Fábrica de Armas!';
		this.usage = 'removerajudantefabricadearmas <usuário>';
		this.aliases = ['remover-ajudantefabricadearmas', 'remover-ajudante-fabrica-armas'];

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
		this.donoArmas = true;
		this.donoDrogas = false;
		this.donoDesmanche = false;
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

		if (member.user.bot) return message.reply(`um bot nunca irá ser Ajudante da Fábrica de Armas.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.ajudanteArmas.length) return message.reply('este servidor não possui Ajudantes para a Fábrica de Armas.');

		if (!server.cidade.ajudanteArmas.map(a => a.id).includes(member.id)) return message.reply('esse usuário não é Ajudante da Fábrica de Armas do servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.ajudanteArmas': {
					id: member.id
				}
			}
		});

		message.reply(`o usuário ${member} não é mais Ajudante da Fábrica de Armas desse servidor agora.`);
	}

};
