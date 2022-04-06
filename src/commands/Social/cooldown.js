/* eslint-disable complexity */
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
		} else if (user.prisao.isPreso && user.prisao.atirarPrisao) {
			timeout10 = 129600000;
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

		const embed = new ClientEmbed(author);

		if (3600000 - (Date.now() - user.cooldown.work) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.work));

			embed.addField(`<:trabalhar:958139188987981834> Trabalhar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:trabalhar:958139188987981834> Trabalhar`, `Pode usar!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.auxilio) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.auxilio));

			embed.addField(`<:auxilio:958138997199212574> Auxilio`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:auxilio:958138997199212574> Auxilio`, `Pode usar!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.estudar) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.estudar));

			embed.addField(`<:estudar:958138296209375303> Estudar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:estudar:958138296209375303> Estudar`, `Pode usar!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.fe) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.fe));

			embed.addField(`<:fe:958138021176303637> Evento Familiar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:fe:958138021176303637> Evento Familiar`, `Pode usar!`, true);
		}

		if (7200000 - (Date.now() - user.cooldown.gf) > 0) {
			const faltam = ms(7200000 - (Date.now() - user.cooldown.gf));

			embed.addField(`😈 Gozofone`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`😈 Gozofone`, `Pode usar!`, true);
		}

		if (86400000 - (Date.now() - user.cooldown.salario) > 0) {
			const faltam = ms(86400000 - (Date.now() - user.cooldown.salario));

			embed.addField(`<:salario:958137043282718720> Salário`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:salario:958137043282718720> Salário`, `Pode usar!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.adotar) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.adotar));

			embed.addField(`<:adotar:958136825678004304> Adotar Pet`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:adotar:958136825678004304> Adotar Pet`, `Pode usar!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.treinarPet) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.treinarPet));

			embed.addField(`<:treinar_pet:958136603031781446> Treinar Pet`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:treinar_pet:958136603031781446> Treinar Pet`, `Pode usar!`, true);
		}

		if (1200000 - (Date.now() - user.cooldown.usarApostar) > 0) {
			const faltam = ms(1200000 - (Date.now() - user.cooldown.usarApostar));

			embed.addField(`<:apostar:958134372253442148> Apostar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:apostar:958134372253442148> Apostar`, `Pode usar!`, true);
		}

		if (43200000 - (Date.now() - user.cooldown.minerar) > 0) {
			const faltam = ms(43200000 - (Date.now() - user.cooldown.minerar));

			embed.addField(`<:minerar:957700475073998909> Minerar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:minerar:957700475073998909> Minerar`, `Pode usar!`, true);
		}

		if ((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin) > 0) {
			const faltam = ms((10 * 24 * 60 * 60 * 1000) - (Date.now() - user.cooldown.bitcoin));

			embed.addField(`<:investimento_btc:958139451148763158> InvestimentoBTC`, `\`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:investimento_btc:958139451148763158> InvestimentoBTC`, `Pode usar!`, true);
		}

		if (600000 - (Date.now() - user.cooldown.pescar) > 0) {
			const faltam = ms(600000 - (Date.now() - user.cooldown.pescar));

			embed.addField(`<:pescar:958133846572929075> Pescar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:pescar:958133846572929075> Pescar`, `Pode usar!`, true);
		}

		if (180000 - (Date.now() - user.cooldown.beijar) > 0) {
			const faltam = ms(180000 - (Date.now() - user.cooldown.beijar));

			embed.addField(`<:beijar:958133237539020800> Beijar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:beijar:958133237539020800> Beijar`, `Pode usar!`, true);
		}

		if (180000 - (Date.now() - user.cooldown.abracar) > 0) {
			const faltam = ms(180000 - (Date.now() - user.cooldown.abracar));

			embed.addField(`<:abracar:958133495316746310> Abraçar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:abracar:958133495316746310> Abraçar`, `Pode usar!`, true);
		}

		if (180000 - (Date.now() - user.cooldown.dancar) > 0) {
			const faltam = ms(180000 - (Date.now() - user.cooldown.dancar));

			embed.addField(`<:dance:958133055917264977> Dançar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:dance:958133055917264977> Dançar`, `Pode usar!`, true);
		}

		if (1800000 - (Date.now() - user.cooldown.roubar) > 0) {
			const faltam = ms(1800000 - (Date.now() - user.cooldown.roubar));

			embed.addField(`<:roubar:957699196931178556> Roubar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:roubar:957699196931178556> Roubar`, `Pode usar!`, true);
		}

		if (600000 - (Date.now() - user.cooldown.crime) > 0) {
			const faltam = ms(600000 - (Date.now() - user.cooldown.crime));

			embed.addField(`<:crime:958132415304466503> Crime`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:crime:958132415304466503> Crime`, `Pode usar!`, true);
		}

		if (300000 - (Date.now() - user.cooldown.roubarVeiculo) > 0) {
			const faltam = ms(300000 - (Date.now() - user.cooldown.roubarVeiculo));

			embed.addField(`<:roubar_carro:957699196830486648> Roubar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:roubar_carro:957699196830486648> Roubar Veículo`, `Pode usar!`, true);
		}

		if (86400000 - (Date.now() - user.cooldown.atirar) > 0) {
			const faltam = ms(86400000 - (Date.now() - user.cooldown.atirar));

			embed.addField(`<:atirar:958139802379776010> Atirar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:atirar:958139802379776010> Atirar`, `Pode usar!`, true);
		}

		if (1200000 - (Date.now() - user.cooldown.garimpar) > 0) {
			const faltam = ms(1200000 - (Date.now() - user.cooldown.garimpar));

			embed.addField(`<:garimpar:957700475556339802> Garimpar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`<:garimpar:957700475556339802> Garimpar`, `Pode usar!`, true);
		}

		if (timeout10 - (Date.now() - user.prisao.tempo) > 0) {
			const faltam = ms(timeout10 - (Date.now() - user.prisao.tempo));

			embed.addField(`⏰ Tempo de Prisão`, `\`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`⏰ Tempo de Prisão`, `Livre!`, true);
		}

		if (3600000 - (Date.now() - user.cooldown.trabalhoComunitario) > 0) {
			const faltam = ms(3600000 - (Date.now() - user.cooldown.trabalhoComunitario));

			embed.addField(`🧹 Trabalho Comunitário`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🧹 Trabalho Comunitário`, `Pode usar!`, true);
		}

		if (user.policia.isPolice || server.cidade.delegado === author.id) {
			if (3600000 - (Date.now() - user.policia.revistar) > 0) {
				const faltam = ms(3600000 - (Date.now() - user.policia.revistar));

				embed.addField(`<:algema:898326104413188157> Revistar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`<:algema:898326104413188157> Revistar`, `Pode usar!`, true);
			}

			if (3600000 - (Date.now() - user.policia.prender) > 0) {
				const faltam = ms(3600000 - (Date.now() - user.policia.prender));

				embed.addField(`👮 Prender/Cmd`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`👮 Prender/Cmd`, `Pode usar!`, true);
			}

			if (5400000 - (Date.now() - user.policia.prenderRoubar) > 0) {
				const faltam = ms(5400000 - (Date.now() - user.policia.prenderRoubar));

				embed.addField(`👮 Prender/Roubo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`👮 Prender/Roubo`, `Pode usar!`, true);
			}

			if (10800000 - (Date.now() - user.policia.prenderAtirar) > 0) {
				const faltam = ms(10800000 - (Date.now() - user.policia.prenderAtirar));

				embed.addField(`👮 Prender/Atirar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`👮 Prender/Atirar`, `Pode usar!`, true);
			}
		}

		if (server.cidade.mecanico.find((a) => a.id === author.id)) {
			if (60000 - (Date.now() - user.cooldown.arrumarVeiculo) > 0) {
				const faltam = ms(60000 - (Date.now() - user.cooldown.arrumarVeiculo));

				embed.addField(`🧑‍🔧 Arrumar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`🧑‍🔧 Arrumar Veículo`, `Pode usar!`, true);
			}

			if (60000 - (Date.now() - user.cooldown.emplacarVeiculo) > 0) {
				const faltam = ms(60000 - (Date.now() - user.cooldown.emplacarVeiculo));

				embed.addField(`🧑‍🔧 Emplacar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`🧑‍🔧 Emplacar Veículo`, `Pode usar!`, true);
			}

			if (60000 - (Date.now() - user.cooldown.liberarVeiculo) > 0) {
				const faltam = ms(60000 - (Date.now() - user.cooldown.liberarVeiculo));

				embed.addField(`🧑‍🔧 Liberar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
			} else {
				embed.addField(`🧑‍🔧 Liberar Veículo`, `Pode usar!`, true);
			}
		}

		if (server.cidade.donoDesmanche === author.id || server.cidade.ajudanteDesmanche.find((a) => a.id === author.id)) {
			if (60000 - (Date.now() - user.cooldown.desmancharCarro) > 0) {
				const faltam = ms(60000 - (Date.now() - user.cooldown.desmancharCarro));

				embed.addField(`🚗 Desmanchar Veículo`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
				embed.addField('\u200b', '\u200b', true);
			} else {
				embed.addField(`🚗 Desmanchar Veículo`, `Pode usar!`, true);
				embed.addField('\u200b', '\u200b', true);
			}
		}

		embed.setTitle('⏲️ | COOLDOWNS');
		embed.setDescription('Veja o cooldown de cada comando abaixo:');

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
