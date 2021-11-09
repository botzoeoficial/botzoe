/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Emojis = require('../../utils/Emojis');
const fetch = require('node-fetch');

module.exports = class Beijar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'beijar';
		this.category = 'Social';
		this.description = 'Beije alguém!';
		this.usage = 'beijar <usuário>';
		this.aliases = ['kiss'];

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
		args,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const timeout = 180000;

		if (timeout - (Date.now() - user.cooldown.beijar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.beijar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário!');

			if (member.id === author.id) return message.reply('você não pode se beijar!');

			if (member.user === member.user.bot) return message.reply('você não pode beijar um bot!');

			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user2) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

			if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

			const embed = new ClientEmbed(author)
				.setTitle('💋 | PEDIDO DE BEIJO')
				.setThumbnail(author.displayAvatarURL({
					dynamic: true,
					format: 'png'
				}))
				.setDescription(`${member}, o(a) usuário(a) ${author} está te pedindo um beijo!!\n\nVocê aceita?\n✅ - Sim\n❌ - Não`);

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
					const apikey = 'LUU697F9Y5BI';
					const lmt = 50;

					const search_term = 'anime kiss';

					const search_url = `https://g.tenor.com/v1/search?q=${search_term}&key=${apikey}&limit=${lmt}&contentfilter=off`;

					const body = await fetch(search_url).then((res) => res.json());

					const beijos = require('../../json/beijar.json');

					let random = Math.floor(Math.random() * body.results.length);

					const randomNumber = Math.floor(Math.random() * 100);

					const beijosEspeciais = ['https://c.tenor.com/-QJAy2wqJFAAAAAd/french-kiss-tongue.gif', 'https://c.tenor.com/yWGhrAd0cioAAAAC/kissing-couple.gif', 'https://c.tenor.com/DQX85qB9MuEAAAAC/kiss-love.gif', 'https://c.tenor.com/RWV_N4uFraUAAAAC/passionate-kiss-deep-kiss.gif'];

					const randomBeijoEspecial = beijosEspeciais[Math.floor(Math.random() * beijosEspeciais.length)];

					const embedSim = new ClientEmbed(author)
						.setDescription(`**${author} beijou ${member}!**`);

					if ((author.id === '463421520686088192' && member.id === '897148854951104612') || (author.id === '897148854951104612' && member.id === '463421520686088192')) {
						embedSim.setImage(randomBeijoEspecial);
					} else if (randomNumber < 50) {
						random = Math.floor(Math.random() * beijos.length);
						embedSim.setImage(beijos[random]);
					} else if (randomNumber >= 50) {
						random = Math.floor(Math.random() * body.results.length);
						embedSim.setImage(body.results[random].url);
					}

					message.channel.send(`${author} e ${member}`, embedSim);

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'cooldown.beijar': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							'humores.estressado': user.humores.estressado + 20,
							'humores.bravo': user.humores.bravo + 20,
							'humores.fome': user.humores.fome - 30,
							'humores.sede': user.humores.sede - 30,
							'humores.desanimado': user.humores.desanimado + 10,
							'humores.cansado': user.humores.cansado + 10,
							'humores.solitario': user.humores.solitario + 30,
							'humores.triste': user.humores.triste + 20
						}
					});
				});

				não.on('collect', async () => {
					msg.delete();

					return message.channel.send(`${author}, o(a) usuário(a) ${member} recusou seu pedido de beijo!`);
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
