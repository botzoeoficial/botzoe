/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Removerdonofabricadedrogas extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerdonofabricadedrogas';
		this.category = 'Cidade';
		this.description = 'Remova o Dono da Fábrica de Drogas do seu servidor!';
		this.usage = 'removerdonofabricadedrogas <usuário>';
		this.aliases = ['remover-dono-fabrica-drogas', 'remover-donofabrica-drogas'];

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

		if (member.user.bot) return message.reply(`um bot não nunca irá ser Dono da Fábrica de Drogas.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.donoFabricadeDrogas !== member.id) return message.reply('esse usuário não é o Dono da Fábrica de Drogas desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				cidade: {
					donoFabricadeDrogas: ''
				}
			}
		});

		message.reply('usuário removido do cargo Dono da Fábrica de Drogas com sucesso.');
	}

};
