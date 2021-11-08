/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Policiais extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'policiais';
		this.category = 'Cidade';
		this.description = 'Veja quem são os Policiais da cidade!';
		this.usage = 'policiais';
		this.aliases = ['delegado', 'carcereiros', 'policial'];

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
		prefix
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const embed = new ClientEmbed(author)
			.setTitle('👮 | Policiais da Cidade!')
			.setDescription(`Aqui você verá o **Delegado**, os **Policiais** e **Carcereiros** da Cidade!`)
			.addField('👨‍✈ | Delegado:', server.cidade.delegado === '' ? `Essa cidade não possui **delegado** ainda! Use o comando \`${prefix}setdelegado\`.` : `<@${server.cidade.delegado}>`)
			.addField('👮 | Policiais:', !server.cidade.policiais.length ? `Essa cidade não possui **policiais** ainda! Use o comando \`${prefix}addpolicial\`.` : server.cidade.policiais.map((a) => `<@${a.id}>`).join('\n'))
			.addField('🙎 | Carcereiros:', !server.cidade.carcereiro.length ? `Essa cidade não possui **carcereiros** ainda! Use o comando \`${prefix}addcarcereiro\`.` : server.cidade.carcereiro.map((a) => `<@${a.id}>`).join('\n'));

		return message.channel.send(author, embed);
	}

};
