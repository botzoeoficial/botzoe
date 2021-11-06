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

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
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

		if (!user.policia.isPolice) return message.reply('você não é Policial do servidor para usar esse comando!');

		if (user.policia.isFolga) return message.reply('o Delegado do servidor deu uma folga para todos os **Policiais** do servidor, por tanto, você não pode esse comando ainda!');

		if (!user.mochila.find((a) => a.item === 'Algemas') && user.armaEquipada !== 'MP5' && user.armaEquipada !== 'G18') {
			return message.reply('você precisa ter 1 **Algema** na mochila e uma **MP5** ou **G18** equipada para revistar alguém!');
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

			if (!user2.isMochila) return message.reply('esse usuário não possui uma **Mochila** para ser revistada!');

			const itens = user2.mochila.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

			const embed = new ClientEmbed(author)
				.setTitle(`Mochila de ${member.user.tag}`)
				.setThumbnail(member.user.displayAvatarURL({
					dynamic: true
				}))
				.setDescription(itens || '**Mochila Vazia.**');

			message.channel.send(author, embed).then(async (msg) => {
				for (const emoji of user2.mochila.map((es) => es.id)) await msg.react(emoji);

				const filter = (reaction, user3) => user2.mochila.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id;

				const sim = msg.createReactionCollector(filter);

				const objeto = {
					'898324362279669851': 'Máscara',
					'899766443757928489': 'Porte de Armas',
					'898326104866177084': 'Maconha',
					'901118422774071326': 'Cocaína',
					'901118376951304262': 'LSD',
					'901118279530217552': 'Metanfetamina',
					'901118225520136243': 'Ak-47',
					'901117871764144200': 'UMP',
					'901117948180168724': 'MP5',
					'901118143735402536': 'ACR',
					'901118040245149736': 'KNT-308',
					'901117192110739516': 'Desert Eagle',
					'901117447065702501': 'Revolver 38',
					'901117282003075072': 'G18',
					'905653521846784080': 'Munição Metralhadora',
					'905653668643241985': 'Munição Pistola',
					'905653583171706980': 'Munição KNT',
					'900544510365405214': 'Chave Micha'
				};

				sim.on('collect', async (collected) => {
					sim.stop();

					const itemEmoji = objeto[collected.emoji.id];

					const userItens = user2.mochila;

					if (userItens.find((a) => a.item === itemEmoji).quantia > 3) {
						const random = Math.floor(Math.random() * userItens.find((a) => a.item === itemEmoji).quantia);

						message.channel.send(`${author}, você retirou **${Number(random)}** \`${itemEmoji}(s)\` da Mochila de ${member} com sucesso!`);

						await this.client.database.users.findOneAndUpdate({
							userId: member.id,
							guildId: message.guild.id,
							'mochila.item': itemEmoji
						}, {
							$set: {
								'mochila.$.quantia': userItens.find((a) => a.item === itemEmoji).quantia - Number(random)
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'policia.revistar': Date.now()
							}
						});

						user2.save();
						msg.delete();
					} else {
						message.channel.send(`${author}, você retirou 1 \`${itemEmoji}\` da Mochila de ${member} com sucesso!`);

						await this.client.database.users.findOneAndUpdate({
							userId: member.id,
							guildId: message.guild.id
						}, {
							$pull: {
								mochila: {
									item: itemEmoji
								}
							}
						});

						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$set: {
								'policia.revistar': Date.now()
							}
						});

						user2.save();
						msg.delete();
					}
				});

				sim.on('end', async (collected, reason) => {
					if (reason === 'time') {
						sim.stop();
						msg.delete();
					}
				});
			});
		}
	}

};
