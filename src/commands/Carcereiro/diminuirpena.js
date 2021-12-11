/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable id-length */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Diminuirpena extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'diminuirpena';
		this.category = 'Carcereiro';
		this.description = 'Diminua o tempo de prisão de um usuário!';
		this.usage = 'diminuirpena <usuário> <tempo>';
		this.aliases = ['diminuir-pena'];

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
		prefix,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.carcereiro.find((a) => a.id === author.id)) return message.reply('você precisa ser um **Carcereiro** do servidor para usar esse comando!');

		const user = await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		});

		const timeout = 14400000;

		if (timeout - (Date.now() - user.cooldown.diminuirpena) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.diminuirpena));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2.prisao.isPreso) return message.reply('este usuário não está preso.');

			const tempo = this.timeToMilliseconds(args.slice(1).join(' '));

			if (!tempo) return message.reply('por favor, coloque um tempo válido. Ex: **1d** ou **1h**');

			if (tempo > 7200000) return message.reply('o tempo precisa ser abaixo de **2 horas**.');

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'cooldown.diminuirpena': Date.now()
				}
			});

			if (user2.prisao.tempo - tempo <= 0) {
				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						'prisao.isPreso': false,
						'prisao.tempo': 0,
						'prisao.prenderCmd': false,
						'prisao.prenderMili': 0,
						'prisao.traficoDrogas': false,
						'prisao.crime': false,
						'prisao.prender': false,
						'prisao.revistar': false,
						'prisao.roubarVeiculo': false,
						'prisao.velha': false,
						'prisao.frentista': false,
						'prisao.joalheria': false,
						'prisao.agiota': false,
						'prisao.casaLoterica': false,
						'prisao.brazino': false,
						'prisao.facebook': false,
						'prisao.bancoCentral': false,
						'prisao.shopping': false,
						'prisao.banco': false
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						'prisao.tempo': user2.prisao.tempo - tempo
					}
				});

				setTimeout(async () => {
					await this.client.database.users.findOneAndUpdate({
						userId: member.id,
						guildId: message.guild.id
					}, {
						$set: {
							'prisao.isPreso': false,
							'prisao.tempo': 0,
							'prisao.prenderCmd': false,
							'prisao.prenderMili': 0,
							'prisao.traficoDrogas': false,
							'prisao.crime': false,
							'prisao.prender': false,
							'prisao.revistar': false,
							'prisao.roubarVeiculo': false,
							'prisao.velha': false,
							'prisao.frentista': false,
							'prisao.joalheria': false,
							'prisao.agiota': false,
							'prisao.casaLoterica': false,
							'prisao.brazino': false,
							'prisao.facebook': false,
							'prisao.bancoCentral': false,
							'prisao.shopping': false,
							'prisao.banco': false
						}
					});
				}, user2.prisao.tempo - tempo);
			}

			return message.reply(`tempo de prisão diminuido com sucesso.`);
		}
	}

	timeToMilliseconds(time) {
		const timeUnits = time.replace(/[\d\s]/g, _ => '').toLowerCase().split('');
		const formats = ['d', 'h', 'm', 's'];

		const isValid = timeUnits.length === new Set(timeUnits).size && timeUnits.every((u, i, a) => formats.includes(u) && formats.indexOf(a[i - 1]) < formats.indexOf(u));
		if (!isValid) return null;

		const formatted = time.replace(/([a-zA-Z])/g, '$1 ').toLowerCase().trim().split(' ').filter(f => !!f);
		if (formatted.some(e => !/[0-9]/.test(e))) return null;

		const invalid = {
			h: 24,
			m: 60,
			s: 60
		};

		for (const f of formatted) {
			const value = f.replace(/\D/g, '');
			const unit = f.replace(/\d/gi, '');

			if (value >= invalid[unit]) return null;
		}

		const convertions = {
			d: 86_400_000,
			h: 3_600_000,
			m: 60_000,
			s: 1000
		};

		return formatted.reduce((acc, curr, i, a) => acc + parseInt(curr.substring(0, curr.length - 1)) * convertions[curr[curr.length - 1]], 0);
	}

};
