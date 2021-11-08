const Command = require('../../structures/Command');

module.exports = class Cancelarvenda extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cancelarvenda';
		this.category = 'Crime';
		this.description = 'Cancele um item seu do Mercado Negro!';
		this.usage = 'cancelarvenda';
		this.aliases = ['cancelarmercadonegro', 'cancelardarkweb'];

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
		author,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.mercadoNegro.find((a) => a.dono === author.id)) return message.reply('você não possui um item cadastrado no **Mercado Negro**!');

		const nome = args.slice(0).join(' ');
		if (!nome) return message.reply('você precisa colocar o nome do produto que você deseja retirar do **Mercado Negro**!');

		if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome !== nome)) return message.reply('você não possui um produto com este nome do **Mercado Negro**!');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				mercadoNegro: {
					nome: nome
				}
			}
		});

		return message.reply('produto retirado com sucesso do **Mercado Negro**!');
	}

};
