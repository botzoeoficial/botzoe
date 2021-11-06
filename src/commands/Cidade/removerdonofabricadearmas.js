/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerdonofabricadearmas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerdonofabricadearmas';
		this.category = 'Cidade';
		this.description = 'Remova o Dono da Fábrica de Armas do seu servidor!';
		this.usage = 'removerdonofabricadearmas <usuário>';
		this.aliases = ['remover-dono-fabrica-armas', 'remover-donofabrica-armas'];

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

		if (member.user.bot) return message.reply(`um bot não nunca irá ser Dono da Fábrica de Armas.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.donoFabricadeArmas !== member.id) return message.reply('esse usuário não é o Dono da Fábrica de Armas desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				cidade: {
					donoFabricadeArmas: ''
				}
			}
		});

		message.reply('usuário removido do cargo Dono da Fábrica de Armas com sucesso.');
	}

};
