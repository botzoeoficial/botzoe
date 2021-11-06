/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Emojis = require('../../utils/Emojis');

module.exports = class Dançar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'dançar';
		this.category = 'Social';
		this.description = 'Dance com alguém!';
		this.usage = 'dançar <usuário>';
		this.aliases = ['dancar'];

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
		args,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const timeout = 180000;

		if (timeout - (Date.now() - user.cooldown.dancar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.dancar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário!');

			if (member.id === author.id) return message.reply('você não pode se chamar para dançar!');

			if (member.user === member.user.bot) return message.reply('você não pode dançar com um bot!');

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

			if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

			const embed = new ClientEmbed(author)
				.setTitle('👯 | PEDIDO DE DANÇA')
				.setThumbnail(author.displayAvatarURL({
					dynamic: true,
					format: 'png'
				}))
				.setDescription(`${member}, o(a) usuário(a) ${author} está te chamando para dançar!!\n\nVocê aceita?\n✅ - Sim\n❌ - Não`);

			message.channel.send(member, embed).then(async (msg) => {
				await msg.react(Emojis.Okay);
				await msg.react(Emojis.Error);

				const sim = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Okay && u.id === member.id, {
					time: 60000,
					max: 1
				});

				const não = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Error && u.id === member.id, {
					time: 60000,
					max: 1
				});

				sim.on('collect', async () => {
					const dancas = require('../../json/dancar.json');

					const random = Math.floor(Math.random() * dancas.length);

					const embedSim = new ClientEmbed(author)
						.setDescription(`**${author} dançou com ${member}!**`)
						.setImage(dancas[random]);

					message.channel.send(`${author} e ${member}`, embedSim);

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'cooldown.dancar': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.estressado': user.humores.estressado + 30,
							'humores.bravo': user.humores.bravo + 30,
							'humores.fome': user.humores.fome - 40,
							'humores.sede': user.humores.sede - 20,
							'humores.desanimado': user.humores.desanimado + 20,
							'humores.cansado': user.humores.cansado - 40,
							'humores.solitario': user.humores.solitario + 50,
							'humores.triste': user.humores.triste + 40
						}
					});
				});

				não.on('collect', async () => {
					msg.delete();

					return message.channel.send(`${author}, o(a) usuário(a) ${member} recusou seu pedido de dança!`);
				});

				sim.on('end', async (collected, reason) => {
					if (reason === 'time') {
						msg.delete();

						return message.channel.send(`${author}, o(a) usuário(a) ${member} demorou demais para responder seu pedido! Use o comando novamente!`);
					}
				});
			});
		}
	}

};
