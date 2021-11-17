/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');

module.exports = class Removerprefeito extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'removerprefeito';
		this.category = 'Cidade';
		this.description = 'Remova o Prefeito da Cidade do seu servidor!';
		this.usage = 'removerprefeito <usuário>';
		this.aliases = ['remover-prefeito'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		const {
			channel
		} = server.cidade.impeachment;
		const msg1 = server.cidade.impeachment.message;

		if (server.cidade.impeachment.existe) {
			const embedExistes = new ClientEmbed(author)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`${author}, você não pode remover um Prefeito na Cidade pois está rolando um **Impeachment** neste momento.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel}/${msg1})`);

			return message.channel.send(author, embedExistes);
		}

		const channel2 = server.cidade.eleicao.channel;
		const msg2 = server.cidade.eleicao.message;

		if (server.cidade.eleicao.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Eleição')
				.setDescription(`${author}, você não pode remover um Prefeito na Cidade pois está rolando uma **Eleição** na Cidade.\n\n> [Clique Aqui para Ir Nela](https://discord.com/channels/${message.guild.id}/${channel2}/${msg2})`);

			return message.channel.send(author, embedExistes);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`um bot não nunca irá ser Prefeito da cidade.`);

		if (server.cidade.governador !== member.id) return message.reply('esse usuário não é o Prefeito desse servidor.');

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.governador': '',
				'cidade.tempoGovernador': 0
			}
		});

		message.reply('usuário removido do cargo Prefeito com sucesso.');
	}

};
