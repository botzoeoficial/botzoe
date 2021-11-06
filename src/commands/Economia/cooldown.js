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
		this.category = 'Economia';
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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
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

		// trabalhar, auxilio, treinar-pet, estudar, fe, trabalho comunitário
		const timeout = 3600000;
		// gf
		const timeout2 = 7200000;
		// minerar
		const timeout3 = 18000000;
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
			embed.addField('\u2800', '\u2800', true);
		} else {
			embed.addField(`🦴 Treinar Pet`, `Pode usar!`, true);
			embed.addField('\u2800', '\u2800', true);
		}
		// minerar
		if (timeout3 - (Date.now() - user.cooldown.minerar) > 0) {
			const faltam = ms(timeout3 - (Date.now() - user.cooldown.minerar));

			embed.addField(`⛏️ Minerar`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`⛏️ Minerar`, `Pode usar!`, true);
		}
		// investimentobtc
		if (new Date(user.cooldown.bitcoin).getTime() - Date.now() > 0) {
			const faltam = ms(new Date(user.cooldown.bitcoin).getTime() - Date.now());

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
		// trabalho comunitário
		if (timeout - (Date.now() - user.cooldown.trabalhoComunitario) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.trabalhoComunitario));

			embed.addField(`🧹 Trabalho Comunitário`, `\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``, true);
		} else {
			embed.addField(`🧹 Trabalho Comunitário`, `Pode usar!`, true);
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

		embed.setTitle('⏲️ | COOLDOWNS');
		embed.setDescription('Veja o cooldown de cada comando abaixo:');

		message.channel.send(author, embed);
	}

};
