/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerfabricantearmas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerfabricantearmas';
		this.category = 'Cidade';
		this.description = 'Remova o Fabricante das Armas do seu servidor!';
		this.usage = 'removerfabricantearmas <usuário>';
		this.aliases = ['remover-fabricantearmas', 'remover-fabricante-armas'];

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
		args
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`um bot não nunca irá ser Fabricante das Armas.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.donoFabricadeArmas.length) return message.reply('esse servidor não possui Fabricante de Armas ainda.');

		if (!server.cidade.donoFabricadeArmas.map((a) => a.id).includes(member.id)) return message.reply('esse usuário não é o Fabricante das Armas desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				'cidade.donoFabricadeArmas': {
					id: member.id
				}
			}
		});

		message.reply('usuário removido do cargo Fabricante das Armas com sucesso.');
	}

};
