/* eslint-disable camelcase */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Emojis = require('../../utils/Emojis');
const fetch = require('node-fetch');

module.exports = class Casar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'casar';
		this.category = 'Utilidades';
		this.description = 'Case com alguém!';
		this.usage = 'casar <usuário>';
		this.aliases = ['marry'];

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
		args,
		author,
		prefix
	}) {
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!user) return message.reply(`você deve mencionar com quem deseja casar.`);

		const doc = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.id === author.id) return message.reply(`você não pode casar com si mesmo.`);

		if (doc.marry.has) return message.reply(`você já está casado.`);

		const target = await this.client.database.users.findOne({
			userId: user.id,
			guildId: message.guild.id
		});

		if (!target) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!target.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		if (target.marry.has) return message.reply(`o(a) membro(a) já está casado com o(a) **\`${await this.client.users.fetch(target.marry.user).then((x) => x.tag)}\`**.`);

		const casamentos = require('../../json/casamento.json');
		const random = Math.floor(Math.random() * casamentos.length);

		const embed = new ClientEmbed(author)
			.setTitle('❤️ | Casamento')
			.setImage(casamentos[random])
			.setDescription(`${user}, você deseja se casar com o(a) ${author}?`);

		message.channel.send(user, embed).then(async (msg) => {
			await msg.react(Emojis.Okay);
			await msg.react(Emojis.Error);

			const sim = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Okay && u.id === user.id, {
				time: 60000,
				max: 1
			});

			const não = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Error && u.id === user.id, {
				time: 60000,
				max: 1
			});

			sim.on('collect', async () => {
				sim.stop();
				msg.delete();

				const apikey = 'LUU697F9Y5BI';
				const lmt = 50;

				const search_term = 'married anime';

				const search_url = `https://g.tenor.com/v1/search?q=${search_term}&key=${apikey}&limit=${lmt}&contentfilter=off`;

				const body = await fetch(search_url).then((res) => res.json());

				const randomCasamento = Math.floor(Math.random() * body.results.length);

				const embedFim = new ClientEmbed(author)
					.setTitle('❤️ | Casamento')
					.setImage(body.results[randomCasamento].url)
					.setDescription(`${user}, você deseja se casar com o(a) ${author}?`);

				message.channel.send(`${author} 💕 ${user}`, embedFim);

				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'marry.user': user.id,
						'marry.has': true
					}
				});

				await this.client.database.users.findOneAndUpdate({
					userId: user.id,
					guildId: message.guild.id
				}, {
					$set: {
						'marry.user': author.id,
						'marry.has': true
					}
				});

				return;
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					não.stop();
					msg.delete();

					return message.reply(`o(a) ${user} demorou para te responder.`);
				}
			});

			não.on('collect', async () => {
				sim.stop();
				não.stop();
				msg.delete();

				return message.reply(`${user} recusou seu pedido de casamento.`);
			});
		});
	}

};
