/* eslint-disable no-unused-vars */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');

module.exports = class Prender extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'prender';
		this.category = 'Policial';
		this.description = 'Prenda um usuário!';
		this.usage = 'prender <usuário>';
		this.aliases = ['apreender'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server2 = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!user.policia.isPolice && server2.cidade.delegado !== author.id) return message.reply('você não é Policial ou Delegado do servidor para usar esse comando!');

		if (user.policia.isFolga) return message.reply('o Delegado do servidor deu uma folga para todos os **Policiais** do servidor, por tanto, você não pode prender ninguém ainda!');

		if (!user.mochila.find((a) => a.item === 'Algemas') && user.armaEquipada !== 'MP5' && user.armaEquipada !== 'G18') {
			return message.reply('você precisa ter 1 **Algema** na mochila e uma **MP5** ou **G18** equipada para prender alguém!');
		}

		const timeout = 3600000;

		if (timeout - (Date.now() - user.policia.revistar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.policia.revistar));

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

			if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

			if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

			if (user2.prisao.isPreso) return message.reply('este usuário já está preso.');

			const tempo = this.timeToMilliseconds(args.slice(1).join(' '));

			if (!tempo) return message.reply('por favor, coloque um tempo válido. Ex: **1d** ou **1h**');

			await this.client.database.users.findOneAndUpdate({
				userId: member.id,
				guildId: message.guild.id
			}, {
				$set: {
					'prisao.isPreso': true,
					'prisao.tempo': Date.now(),
					'prisao.prenderCmd': true,
					'prisao.prenderMili': tempo
				}
			});

			message.reply(`usuário ${member} preso por ${Utils.convertMS(tempo)}.`);

			setTimeout(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						'prisao.isPreso': false,
						'prisao.tempo': 0,
						'prisao.prenderCmd': false,
						'prisao.prenderMili': 0
					}
				});
			}, tempo);

			return;
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
		}

		return formatted.reduce((acc, curr, i, a) => acc + parseInt(curr.substring(0, curr.length - 1)) * convertions[curr[curr.length - 1]], 0);
	}

};
