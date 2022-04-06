/* eslint-disable consistent-return */
const Command = require('../../structures/Command');

module.exports = class Descartarmochila extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'descartarmochila';
		this.category = 'Crime';
		this.description = 'Descarte sua mochila e tudo que há dentro dela!';
		this.usage = 'descartarmochila';
		this.aliases = ['descartar-mochila'];

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
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.isMochila) {
			return message.reply({
				content: 'Você não possui uma **Mochila**, vá até a Loja > Utilidades e Compre uma!'
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				isMochila: false,
				mochila: []
			}
		});

		return message.reply({
			content: '**Mochila** descartada com todos os itens dentro dela com sucesso!'
		});
	}

};
