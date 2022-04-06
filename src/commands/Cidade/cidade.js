/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const moment = require('moment');
moment.locale('pt-br');

module.exports = class Cidade extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cidade';
		this.category = 'Cidade';
		this.description = 'Veja informações de tempos da Cidade do servidor!';
		this.usage = 'cidade';
		this.aliases = ['city'];

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
			.setTitle(`${message.guild.name} City`)
			.setDescription(`O Prefeito da Cidade é: ${server.cidade.governador === '' ? 'Não existe Prefeito eleito no momento.' : `<@${server.cidade.governador}>`}\n\nVeja os Tempos Disponíveis de Comandos da Cidade.`)
			.addField('Tempo que o Prefeito está no comando:', server.cidade.governador === '' ? `Essa Cidade não possui **Prefeito**. Use o comando \`${prefix}addprefeito\`` : `${moment(server.cidade.tempoGovernador).format('LLL')} [${moment().diff(server.cidade.tempoGovernador, 'days')} dias atrás.]`);

		const eleicao = 604800000;
		const impeachment = 345600000;
		const golpeEstado = 604800000;
		const folgaPolicia = 86400000;
		const alterarBolsa = 43200000;

		if (eleicao - (Date.now() - server.cidade.eleicao.cooldown) > 0) {
			const faltam = ms(eleicao - (Date.now() - server.cidade.eleicao.cooldown));

			embed.addField('Nova Eleição:', `\`${faltam.days}\`dias, \`${faltam.hours}\`horas, \`${faltam.minutes}\`minutos e \`${faltam.seconds}\`segundos`);
		} else {
			embed.addField('Nova Eleição:', `Pronto Para Uso! (\`${prefix}novaeleicao\`)`);
		}

		if (impeachment - (Date.now() - server.cidade.impeachment.cooldown) > 0) {
			const faltam = ms(impeachment - (Date.now() - server.cidade.impeachment.cooldown));

			embed.addField('Impeachment:', `\`${faltam.days}\`dias, \`${faltam.hours}\`horas, \`${faltam.minutes}\`minutos e \`${faltam.seconds}\`segundos`);
		} else {
			embed.addField('Impeachment:', `Pronto Para Uso! (\`${prefix}impeachment\`)`);
		}

		if (golpeEstado - (Date.now() - server.cidade.golpeEstado.cooldown) > 0) {
			const faltam = ms(golpeEstado - (Date.now() - server.cidade.golpeEstado.cooldown));

			embed.addField('Golpe de Estado:', `\`${faltam.days}\`dias, \`${faltam.hours}\`horas, \`${faltam.minutes}\`minutos e \`${faltam.seconds}\`segundos`);
		} else {
			embed.addField('Golpe de Estado:', `Pronto Para Uso! (\`${prefix}golpedeestado\`)`);
		}

		if (folgaPolicia - (Date.now() - server.cidade.folgaPolicia) > 0) {
			const faltam = ms(folgaPolicia - (Date.now() - server.cidade.folgaPolicia));

			embed.addField('Folga Polícia:', `\`${faltam.days}\`dias, \`${faltam.hours}\`horas, \`${faltam.minutes}\`minutos e \`${faltam.seconds}\`segundos`);
		} else {
			embed.addField('Folga Polícia:', `Pronto Para Uso! (\`${prefix}folga\`)`);
		}

		if (alterarBolsa - (Date.now() - server.cidade.alterarBolsa) > 0) {
			const faltam = ms(alterarBolsa - (Date.now() - server.cidade.alterarBolsa));

			embed.addField('Alterar Bolsa:', `\`${faltam.days}\`dias, \`${faltam.hours}\`horas, \`${faltam.minutes}\`minutos e \`${faltam.seconds}\`segundos`);
		} else {
			embed.addField('Alterar Bolsa:', `Pronto Para Uso! (\`${prefix}alterarbolsa\`)`);
		}

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
