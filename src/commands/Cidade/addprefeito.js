/* eslint-disable max-len */
/* eslint-disable consistent-return */
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');

module.exports = class Addprefeito extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addprefeito';
		this.category = 'Cidade';
		this.description = 'Escolha um Prefeito para seu servidor.';
		this.usage = 'addprefeito <usuário>';
		this.aliases = ['add-prefeito'];

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
		author,
		args
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.editor.find((a) => a.id === author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
			return message.reply({
				content: `Você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`
			});
		}

		if (server.cidade.golpeEstado.caos) {
			return message.reply({
				content: 'A Cidade sofreu um **Golpe de Estado** e por isso está em **caos** por 5 horas. Espere acabar as **5 horas**!'
			});
		}

		const {
			channel
		} = server.cidade.impeachment;
		const msg1 = server.cidade.impeachment.message;

		if (server.cidade.impeachment.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Impeachment')
				.setDescription(`${author}, não é possível adicionar um Prefeito, pois está rolando um **Impeachment** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel}/${msg1})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const channel2 = server.cidade.eleicao.channel;
		const msg2 = server.cidade.eleicao.message;

		if (server.cidade.eleicao.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('<:Urna:895779255491911740> | Eleição')
				.setDescription(`${author}, não é possível adicionar um Prefeito, pois está rolando uma **Eleição** na Cidade.\n\n> [Clique Aqui para Ir Nela](https://discord.com/channels/${message.guild.id}/${channel2}/${msg2})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const channel3 = server.cidade.golpeEstado.channel;
		const msg3 = server.cidade.golpeEstado.message;

		if (server.cidade.golpeEstado.existe) {
			const embedExistes = new ClientEmbed(this.client.user)
				.setTitle('🕵️ | Golpe de Estado')
				.setDescription(`${author}, não é possível adicionar um Prefeito, pois está rolando um **Golpe de Estado** na Cidade.\n\n> [Clique Aqui para Ir Nele](https://discord.com/channels/${message.guild.id}/${channel3}/${msg3})`);

			return message.reply({
				content: author.toString(),
				embeds: [embedExistes]
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Um bot nunca será Prefeito do servidor.'
			});
		}

		if (server.cidade.governador === member.id) {
			return message.reply({
				content: 'Esse usuário já é Prefeito desse servidor.'
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$set: {
				'cidade.governador': member.id,
				'cidade.tempoGovernador': Date.now()
			}
		});

		return message.reply({
			content: `O usuário ${member} entrou no cargo de Prefeito desse servidor com sucesso.`
		});
	}

};
