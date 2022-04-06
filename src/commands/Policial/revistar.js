/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Revistar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'revistar';
		this.category = 'Policial';
		this.description = 'Reviste um usuário!';
		this.usage = 'revistar <usuário>';
		this.aliases = ['procurar'];

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

		if (!user.policia.isPolice && server2.cidade.delegado !== author.id) {
			return message.reply({
				content: 'Você não é Policial ou Delegado da Cidade para revistar alguém!'
			});
		}

		if (user.policia.isFolga) {
			return message.reply({
				content: 'O Delegado da Cidade deu uma folga para todos os **Policiais** da Cidade, portanto, você não pode revistar ninguém ainda!'
			});
		}

		if (!user.mochila.find((a) => a.item === 'Algemas') && user.armaEquipada !== 'MP5' && user.armaEquipada !== 'G18') {
			return message.reply({
				content: 'Você precisa ter 1 **Algema** na mochila e uma **MP5** ou **G18** equipada para revistar alguém!'
			});
		}

		const timeout = 3600000;

		if (timeout - (Date.now() - user.policia.revistar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.policia.revistar));

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
					content: 'Você não pode revistar você mesmo.'
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

			if (!user2.isMochila) {
				return message.reply({
					content: 'Esse usuário não possui uma **Mochila** para ser revistada!'
				});
			}

			const embedVerificacao = new ClientEmbed(author)
				.setTitle('👮 | Revistando...')
				.setDescription(`Verificando se há algo de ilegal na mochila de ${member}...`);

			const armas = ['Ak-47', 'UMP', 'MP5', 'ACR', 'KNT-308', 'Desert Eagle', 'Revolver 38', 'G18', 'Munição Metralhadora', 'Munição Pistola', 'Munição KNT'];
			const drogas = ['Maconha', 'Cocaína', 'LSD', 'Metanfetamina'];
			const temPorte = user2.mochila.find((a) => a.item.toLowerCase() === 'porte de armas');
			const armasFilter = user2.mochila.filter((a) => !armas.includes(a.item));
			const drogasFilter = user2.mochila.filter((a) => !drogas.includes(a.item));
			const retiradosArmas = user2.mochila.filter((a) => armas.includes(a.item));
			const retiradosDrogas = user2.mochila.filter((a) => drogas.includes(a.item));
			const tudoFilter = user2.mochila.filter((a) => !armas.includes(a.item) && !drogas.includes(a.item));

			const msgVerificacao = await message.reply({
				content: author.toString(),
				embeds: [embedVerificacao]
			});

			if (!temPorte && retiradosArmas.length && retiradosDrogas.length) {
				embedVerificacao.setTitle('🚨 | Itens Encontrados!');
				embedVerificacao.setDescription(`Lista de Itens que foram retirados abaixo:\n\nOBS: Use agora o comando \`${prefix}prender ${member.id} <tempo>\``);
				embedVerificacao.addField('Armas/Munições Retiradas:', retiradosArmas.map((a) => `**${a.emoji} | ${a.item}:** \`x${a.quantia}\``).join('\n'));
				embedVerificacao.addField('Drogas Retiradas:', retiradosDrogas.map((a) => `**${a.emoji} | ${a.item}:** \`x${a.quantia}\``).join('\n'));

				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						mochila: tudoFilter,
						armaEquipada: 'Nenhuma arma equipada.'
					}
				});
			} else if (!temPorte && retiradosArmas.length) {
				embedVerificacao.setTitle('🚨 | Itens Encontrados!');
				embedVerificacao.setDescription(`Lista de Itens que foram retirados abaixo:\n\nOBS: Use agora o comando \`${prefix}prender ${member.id} <tempo>\``);
				embedVerificacao.addField('Armas/Munições Retiradas:', retiradosArmas.map((a) => `**${a.emoji} | ${a.item}:** \`x${a.quantia}\``).join('\n'));

				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						mochila: armasFilter,
						armaEquipada: 'Nenhuma arma equipada.'
					}
				});
			} else if (retiradosDrogas.length) {
				embedVerificacao.setTitle('🚨 | Itens Encontrados!');
				embedVerificacao.setDescription(`Lista de Itens que foram retirados abaixo:\n\nOBS: Use agora o comando \`${prefix}prender ${member.id} <tempo>\``);
				embedVerificacao.addField('Drogas Retiradas:', retiradosDrogas.map((a) => `**${a.emoji} | ${a.item}:** \`x${a.quantia}\``).join('\n'));

				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						mochila: drogasFilter
					}
				});
			} else {
				embedVerificacao.setTitle('👮 | Revistado...');
				embedVerificacao.fields = [];
				embedVerificacao.setDescription('Esse usuário não possui nada de ilegal na mochila.');
			}

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'policia.revistar': Date.now()
				}
			});

			return setTimeout(async () => {
				msgVerificacao.edit({
					content: author.toString(),
					embeds: [embedVerificacao]
				});
			}, 3000);
		}
	}

};
