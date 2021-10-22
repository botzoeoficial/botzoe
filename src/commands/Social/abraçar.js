/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const Emojis = require('../../utils/Emojis');

module.exports = class Abraçar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'abraçar';
		this.category = 'Social';
		this.description = 'Abrace alguém!';
		this.usage = 'abraçar <usuário>';
		this.aliases = ['abracar'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author,
		args,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		if (Object.values(user.humores).filter(humor => +humor <= 0).length >= 5) return message.reply(`você está com **5 humores** zerados ou abaixo de 0, ou seja, está doente. Use o comando \`${prefix}remedio\` para curar-se.`);

		const timeout = 180000;

		if (timeout - (Date.now() - user.cooldown.abracar) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.abracar));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!member) return message.reply('você precisa mencionar um usuário!');

			if (member.id === author.id) return message.reply('você não pode se abraçar!');

			if (member.user === member.user.bot) return message.reply('você não pode abraçar um bot!');

			const user2 = await this.client.database.users.findOne({
				_id: member.id
			});

			if (!user2) return message.reply('não achei esse usuário no meu **banco de dados**.');

			if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado! Mande ele usar o comando \`${prefix}cadastrar\`.`);

			const embed = new ClientEmbed(author)
				.setTitle('🫂 | PEDIDO DE ABRAÇO')
				.setThumbnail(author.displayAvatarURL({
					dynamic: true,
					format: 'png'
				}))
				.setDescription(`${member}, o(a) usuário(a) ${author} está te pedindo um abraço!!\n\nVocê aceita?\n✅ - Sim\n❌ - Não`);

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
					const abracos = require('../../json/abracar.json');

					const random = Math.floor(Math.random() * abracos.length);

					const embedSim = new ClientEmbed(author)
						.setTitle('🫂 | PEDIDO ACEITO')
						.setThumbnail(author.displayAvatarURL({
							dynamic: true,
							format: 'png'
						}))
						.setDescription(`${author} abraçou o usuário ${member}!`)
						.setImage(abracos[random]);

					message.channel.send(`${author} e ${member}`, embedSim);

					await this.client.database.users.findOneAndUpdate({
						_id: author.id
					}, {
						$set: {
							'cooldown.abracar': Date.now()
						}
					});

					await this.client.database.users.findOneAndUpdate({
						_id: author.id
					}, {
						$set: {
							'humores.estressado': user.humores.estressado += 10,
							'humores.bravo': user.humores.bravo += 20,
							'humores.fome': user.humores.fome -= 30,
							'humores.sede': user.humores.sede -= 20,
							'humores.desanimado': user.humores.desanimado += 20,
							'humores.cansado': user.humores.cansado -= 20,
							'humores.solitario': user.humores.solitario += 40,
							'humores.triste': user.humores.triste += 30
						}
					});
				});

				não.on('collect', async () => {
					msg.delete();

					return message.channel.send(`${author}, o(a) usuário(a) ${member} recusou seu pedido de abraço!`);
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
