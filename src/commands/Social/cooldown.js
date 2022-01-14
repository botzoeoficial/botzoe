/* eslint-disable complexity */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Cooldown extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cooldown';
		this.category = 'Social';
		this.description = 'Veja o tempo de cada cooldown!';
		this.usage = 'cooldown';
		this.aliases = ['cd'];

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

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		// trabalhar, auxilio, treinar-pet, estudar, fe, trabalho comunitário
		const timeout = 3600000;
		// gf
		const timeout2 = 7200000;
		// minerar
		const timeout3 = 43200000;
		// pescar
		const timeout4 = 600000;
		// beijar, abraçar, dançar, crime
		const timeout5 = 180000;
		// adotar
		const timeout6 = 9000000;
		// salario
		const timeout7 = 86400000;
		// roubar veículo
		const timeout8 = 300000;
		// garimpar
		const timeout9 = 1200000;
		// prisao
		let timeout10 = 0;
		if (user.prisao.isPreso && user.prisao.prenderCmd) {
			timeout10 = user.prisao.prenderMili;
		} else if (user.prisao.isPreso && user.prisao.traficoDrogas) {
			timeout10 = 36000000;
		} else if (user.prisao.isPreso && user.prisao.prender) {
			timeout10 = 43200000;
		} else if (user.prisao.isPreso && user.prisao.revistar) {
			timeout10 = 21600000;
		} else if (user.prisao.isPreso && user.prisao.roubarVeiculo) {
			timeout10 = 180000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.velha) {
			timeout10 = 300000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.frentista) {
			timeout10 = 600000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.joalheria) {
			timeout10 = 900000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.agiota) {
			timeout10 = 1200000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.casaLoterica) {
			timeout10 = 1200000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.brazino) {
			timeout10 = 2100000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.facebook) {
			timeout10 = 2700000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.bancoCentral) {
			timeout10 = 3600000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.shopping) {
			timeout10 = 7200000;
		} else if (user.prisao.crime && user.prisao.isPreso && user.prisao.banco) {
			timeout10 = 14400000;
		}
		// roubar
		const timeout11 = 1800000;

		const embed = new ClientEmbed(author);
		// trabalhar
		if (timeout - (Date.now() - user.cooldown.work) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.work));

			embed.addField(`💼 Trabalhar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`💼 Trabalhar`, `Pode usar!`, true);
		}
		// auxilio
		if (timeout - (Date.now() - user.cooldown.auxilio) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.auxilio));

			embed.addField(`💸 Auxilio`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`💸 Auxilio`, `Pode usar!`, true);
		}
		// estudar
		if (timeout - (Date.now() - user.cooldown.estudar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.estudar));

			embed.addField(`🧑‍🏫 Estudar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🧑‍🏫 Estudar`, `Pode usar!`, true);
		}
		// fe
		if (timeout - (Date.now() - user.cooldown.fe) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.fe));

			embed.addField(`👨‍👩‍👧‍👦 Evento Familiar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`👨‍👩‍👧‍👦 Evento Familiar`, `Pode usar!`, true);
		}
		// gf
		if (timeout2 - (Date.now() - user.cooldown.gf) > 0) {
			const faltam = ms(timeout2 - (Date.now() - user.cooldown.gf));

			embed.addField(`😈 Gozofone`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`😈 Gozofone`, `Pode usar!`, true);
		}
		// salario
		if (timeout7 - (Date.now() - user.cooldown.salario) > 0) {
			const faltam = ms(timeout7 - (Date.now() - user.cooldown.salario));

			embed.addField(`💰 Salário`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`💰 Salário`, `Pode usar!`, true);
		}
		// adotar
		if (timeout6 - (Date.now() - user.cooldown.adotar) > 0) {
			const faltam = ms(timeout6 - (Date.now() - user.cooldown.adotar));

			embed.addField(`🥳 Adotar Pet`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🥳 Adotar Pet`, `Pode usar!`, true);
		}
		// treinar-pet
		if (timeout - (Date.now() - user.cooldown.treinarPet) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.treinarPet));

			embed.addField(`🦴 Treinar Pet`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🦴 Treinar Pet`, `Pode usar!`, true);
		}
		// apostar
		if (timeout9 - (Date.now() - user.cooldown.apostar) > 0) {
			const faltam = ms(timeout9 - (Date.now() - user.cooldown.apostar));

			embed.addField(`🎰 Apostar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🎰 Apostar`, `Pode usar!`, true);
		}
		// minerar
		if (timeout3 - (Date.now() - user.cooldown.minerar) > 0) {
			const faltam = ms(timeout3 - (Date.now() - user.cooldown.minerar));

			embed.addField(`⛏️ Minerar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`⛏️ Minerar`, `Pode usar!`, true);
		}
		// investimentobtc
		if ((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin) > 0) {
			const faltam = ms((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin));

			embed.addField(`📈 InvestimentoBTC`, `\`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`📈 InvestimentoBTC`, `Pode usar!`, true);
		}
		// pescar
		if (timeout4 - (Date.now() - user.cooldown.pescar) > 0) {
			const faltam = ms(timeout4 - (Date.now() - user.cooldown.pescar));

			embed.addField(`🚣‍♂️ Pescar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🚣‍♂️ Pescar`, `Pode usar!`, true);
		}
		// beijar
		if (timeout5 - (Date.now() - user.cooldown.beijar) > 0) {
			const faltam = ms(timeout5 - (Date.now() - user.cooldown.beijar));

			embed.addField(`💋 Beijar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`💋 Beijar`, `Pode usar!`, true);
		}
		// abracar
		if (timeout5 - (Date.now() - user.cooldown.abracar) > 0) {
			const faltam = ms(timeout5 - (Date.now() - user.cooldown.abracar));

			embed.addField(`🫂 Abraçar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🫂 Abraçar`, `Pode usar!`, true);
		}
		// dancar
		if (timeout5 - (Date.now() - user.cooldown.dancar) > 0) {
			const faltam = ms(timeout5 - (Date.now() - user.cooldown.dancar));

			embed.addField(`🕺💃 Dançar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🕺💃 Dançar`, `Pode usar!`, true);
		}
		// garimpar
		if (timeout9 - (Date.now() - user.cooldown.garimpar) > 0) {
			const faltam = ms(timeout9 - (Date.now() - user.cooldown.garimpar));

			embed.addField(`⚒️ Garimpar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`⚒️ Garimpar`, `Pode usar!`, true);
		}
		// crime
		if (timeout4 - (Date.now() - user.cooldown.crime) > 0) {
			const faltam = ms(timeout4 - (Date.now() - user.cooldown.crime));

			embed.addField(`🔫 Crime`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🔫 Crime`, `Pode usar!`, true);
		}
		// roubar veículo
		if (timeout8 - (Date.now() - user.cooldown.roubarVeiculo) > 0) {
			const faltam = ms(timeout8 - (Date.now() - user.cooldown.roubarVeiculo));

			embed.addField(`🔫🚗 Roubar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🔫🚗 Roubar Veículo`, `Pode usar!`, true);
		}
		// trabalho comunitário
		if (timeout - (Date.now() - user.cooldown.trabalhoComunitario) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.trabalhoComunitario));

			embed.addField(`🧹 Trabalho Comunitário`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🧹 Trabalho Comunitário`, `Pode usar!`, true);
		}
		// prisao
		if (timeout10 - (Date.now() - user.prisao.tempo) > 0) {
			const faltam = ms(timeout10 - (Date.now() - user.prisao.tempo));

			embed.addField(`⏰ Tempo de Prisão`, `\`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`⏰ Tempo de Prisão`, `Livre!`, true);
		}
		// roubar
		if (timeout11 - (Date.now() - user.cooldown.roubar) > 0) {
			const faltam = ms(timeout11 - (Date.now() - user.cooldown.roubar));

			embed.addField(`🔫 Roubar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🔫 Roubar`, `Pode usar!`, true);
		}
		// policia
		if (user.policia.isPolice || server.cidade.delegado === author.id) {
			// revistar
			if (timeout - (Date.now() - user.policia.revistar) > 0) {
				const faltam = ms(timeout - (Date.now() - user.policia.revistar));

				embed.addField(`<:algema:898326104413188157> Revistar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`<:algema:898326104413188157> Revistar`, `Pode usar!`, true);
			}
			// prender
			if (timeout - (Date.now() - user.policia.prender) > 0) {
				const faltam = ms(timeout - (Date.now() - user.policia.prender));

				embed.addField(`👮 Prender`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
				embed.addField('\u200b', '\u200b', true);
			} else {
				embed.addField(`👮 Prender`, `Pode usar!`, true);
				embed.addField('\u200b', '\u200b', true);
			}
		}

		embed.setTitle('⏲️ | COOLDOWNS');
		embed.setDescription('Veja o cooldown de cada comando abaixo:');

		message.channel.send(author, embed);
	}

};
