/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Favela extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'favela';
		this.category = 'Cidade';
		this.description = 'Veja as pessoas da Favela na sua Cidade!';
		this.usage = 'favela';
		this.aliases = ['morro'];

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
			.setTitle('<:favela:908842688802091078> | Favela da Cidade!')
			.setDescription(`Aqui você verá o **Dono da Favela**, **Fabricantes das Armas** e muito mais!`)
			.addField('Dono da Favela:', server.cidade.donoFavela === '' ? `Essa cidade não possui um **Dono da Favela** ainda! Use o comando \`${prefix}setdonofavela\`.` : `<@${server.cidade.donoFavela}>`)
			.addField('Fabricante das Armas:', !server.cidade.donoFabricadeArmas.length ? `Essa cidade não possui **Fabricantes das Armas** ainda! Use o comando \`${prefix}setfabricantearmas\`.` : server.cidade.donoFabricadeArmas.map((a) => `<@${a.id}>`).join('\n'))
			.addField('Fabricante das Drogas:', !server.cidade.donoFabricadeDrogas.length ? `Essa cidade não possui **Fabricantes das Drogas** ainda! Use o comando \`${prefix}setfabricantedrogas\`.` : server.cidade.donoFabricadeDrogas.map((a) => `<@${a.id}>`).join('\n'))
			.addField('Dono do Desmanche:', server.cidade.donoDesmanche === '' ? `Essa cidade não possui um **Dono do Desmanche** ainda! Use o comando \`${prefix}setdonodesmanche\`.` : `<@${server.cidade.donoDesmanche}>`)
			.addField('Ajudantes do Desmanche:', !server.cidade.ajudanteDesmanche.length ? `Essa cidade não possui **Ajudantes do Desmanche** ainda! Use o comando \`${prefix}setajudantedesmanche\`.` : server.cidade.ajudanteDesmanche.map((a) => `<@${a.id}>`).join('\n'))
			.addField('Dono da Lavagem de Dinheiro:', server.cidade.donoLavagem === '' ? `Essa cidade não possui um **Dono da Lavagem de Dinheiro** ainda! Use o comando \`${prefix}setdonolavagem\`.` : `<@${server.cidade.donoLavagem}>`)
			.addField('Ajudantes da Lavagem de Dinheiro:', !server.cidade.ajudanteLavagem.length ? `Essa cidade não possui **Ajudantes da Lavagem de Dinheiro** ainda! Use o comando \`${prefix}setajudantelavagem\`.` : server.cidade.ajudanteLavagem.map((a) => `<@${a.id}>`).join('\n'));

		return message.channel.send(author, embed);
	}

};
