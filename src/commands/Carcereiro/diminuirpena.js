/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable id-length */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');
const msTime = require('ms');

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

		if (!server.cidade.carcereiro.find((a) => a.id === author.id)) return message.reply('você precisa ser um **Carcereiro** da Cidade para diminuir a pena de alguém!');

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

			if (!args.slice(1).join(' ')) return message.reply('por favor, coloque um tempo.');

			const tempo = msTime(args.slice(1).join(' '));

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

			await this.client.database.users.findOneAndUpdate({
				userId: member.id,
				guildId: message.guild.id
			}, {
				$set: {
					'prisao.tempo': user2.prisao.tempo - tempo
				}
			});

			return message.reply(`tempo de prisão diminuido com sucesso.`);
		}
	}

};
