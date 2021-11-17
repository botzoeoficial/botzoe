/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Impeachment extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'impeachment';
		this.category = 'Cidade';
		this.description = 'Abra uma votação para tirar o usuário atual do cargo Prefeito!';
		this.usage = 'impeachment';
		this.aliases = [];

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

		if (user.level < 2) return message.reply('você precisa ser level **2** para iniciar um Impeachment!');

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.cidade.governador === '') return message.reply(`essa Cidade não possui Prefeito ainda. Use o comando \`${prefix}addprefeito\`!`);

		const {
			channel
		} = server.cidade.impeachment;
		const msg1 = server.cidade.impeachment.message;

		if (server.cidade.impeachment.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`${author}, já está rolando um **Impeachment** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel}/${msg1})`);

			return message.channel.send(author, embedExistes);
		}

		const timeout = 345600000;

		if (timeout - (Date.now() - server.cidade.impeachment.cooldown) > 0) {
			const faltam = ms(timeout - (Date.now() - server.cidade.impeachment.cooldown));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

			if (!canal) return message.reply('você precisa mencionar um canal onde será iniciado o Impeachment!');

			message.reply(`**Impeachment** iniciado com sucesso no canal: <#${canal.id}>.`);
			message.delete();

			const embed = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`Clique na <:Urna:895779255491911740> para votar na retirada do Poder de Prefeito <@${server.cidade.governador}> da sua Cidade!\n\nSe chegarem a **20** votos na <:Urna:895779255491911740>, o Prefeito irá perder o seu cargo, e a Cidade ficará sem Prefeito até uma nova eleição!`);

			canal.send(embed).then(async (msg) => {
				await this.client.database.guilds.findOneAndUpdate({
					_id: message.guild.id
				}, {
					$set: {
						'cidade.impeachment.existe': true,
						'cidade.impeachment.cooldown': Date.now(),
						'cidade.impeachment.message': msg.id,
						'cidade.impeachment.emoji': '895779255491911740',
						'cidade.impeachment.channel': msg.channel.id,
						'cidade.impeachment.quantia': 0
					}
				});

				await msg.react('895779255491911740');
			});
		}
	}

};
