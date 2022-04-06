/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Utils = require('../../utils/Util');
const msTime = require('ms');

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
		args
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const server2 = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
			return message.reply({
				content: 'Você não é Policial ou Delegado da Cidade para prender alguém!'
			});
		}

		if (user.policia.isFolga) {
			return message.reply({
				content: 'O Delegado da Cidade deu uma folga para todos os **Policiais** da Cidade, portanto, você não pode prender ninguém ainda!'
			});
		}

		if (!user.mochila.find((a) => a.item === 'Algemas') && user.armaEquipada !== 'MP5' && user.armaEquipada !== 'G18') {
			return message.reply({
				content: 'Você precisa ter 1 **Algema** na mochila e uma **MP5** ou **G18** equipada para prender alguém!'
			});
		}

		const timeout = 3600000;

		if (timeout - (Date.now() - user.policia.prender) > 0) {
			const faltam = ms(timeout - (Date.now() - user.policia.prender));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) {
				return message.reply({
					content: 'Você precisa mencionar um usuário junto com o comando.'
				});
			}

			if (member.id === author.id) {
				return message.reply({
					content: 'Você não pode prender você mesmo.'
				});
			}

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2) {
				return message.reply({
					content: 'Não achei esse usuário no **banco de dados** desse servidor.'
				});
			}

			if (!args.slice(1).join(' ')) {
				return message.reply({
					content: 'Por favor, coloque um tempo.'
				});
			}

			const tempo = msTime(args.slice(1).join(' '));

			if (!tempo) {
				return message.reply({
					content: 'Por favor, coloque um tempo válido. Ex: **1d** ou **1h**'
				});
			}

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'policia.prender': Date.now()
				}
			});

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

			message.reply({
				content: `Usuário ${member} preso por ${Utils.convertMS(tempo)} com sucesso.`
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
						'prisao.prenderMili': 0
					}
				});
			}, tempo);

			return;
		}
	}

};
