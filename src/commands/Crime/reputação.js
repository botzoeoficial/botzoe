/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Reputação extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'reputação';
		this.category = 'Crime';
		this.description = 'Veja o nível de reputação de um usuário no crime!';
		this.usage = 'reputação [usuário]';
		this.aliases = ['reputacao'];

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
		args,
		prefix,
		author
	}) {
		const USER = this.client.users.cache.get(args[0]) || message.mentions.users.first() || author;

		const user = await this.client.database.users.findOne({
			userId: USER.id,
			guildId: message.guild.id
		});

		if (!user) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		let reputacao = '';
		let faltam;

		const embed = new ClientEmbed(author)
			.setTitle(`Reputação de ${USER.username}`)
			.setThumbnail(USER.displayAvatarURL({
				dynamic: true
			}));

		if (USER.id === author.id) {
			if (user.crime.reputacao >= 0 && user.crime.reputacao < 2) {
				reputacao = 'Cidadão de Bem';
				faltam = 1;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 1 && user.crime.reputacao < 1001) {
				reputacao = 'Nóia';
				faltam = 1000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 1000 && user.crime.reputacao < 2001) {
				reputacao = 'Trombadinha';
				faltam = 2000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 2000 && user.crime.reputacao < 3001) {
				reputacao = 'Maloqueiro';
				faltam = 3000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 3000 && user.crime.reputacao < 4001) {
				reputacao = 'Criminoso';
				faltam = 4000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 4000 && user.crime.reputacao < 5001) {
				reputacao = 'Ladrão';
				faltam = 5000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 5000 && user.crime.reputacao < 6001) {
				reputacao = 'Traficante';
				faltam = 6000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 6000 && user.crime.reputacao < 7001) {
				reputacao = 'Político';
				faltam = 7000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 7000 && user.crime.reputacao < 8001) {
				reputacao = 'Assassino Profissional';
				faltam = 8000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 8000 && user.crime.reputacao < 9001) {
				reputacao = 'Terrorista';
				faltam = 9000;
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 9000) {
				reputacao = 'Dono do Morro';
				embed.setDescription(`Você é um: \`${reputacao}\`\n\n> Você está no cargo máximo de reputação.`);
			}

			message.channel.send(author, embed);
		} else {
			if (user.crime.reputacao >= 0 && user.crime.reputacao < 2) {
				reputacao = 'Cidadão de Bem';
				faltam = 1;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 1 && user.crime.reputacao < 1001) {
				reputacao = 'Nóia';
				faltam = 1000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 1000 && user.crime.reputacao < 2001) {
				reputacao = 'Trombadinha';
				faltam = 2000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 2000 && user.crime.reputacao < 3001) {
				reputacao = 'Maloqueiro';
				faltam = 3000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 3000 && user.crime.reputacao < 4001) {
				reputacao = 'Criminoso';
				faltam = 4000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 4000 && user.crime.reputacao < 5001) {
				reputacao = 'Ladrão';
				faltam = 5000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 5000 && user.crime.reputacao < 6001) {
				reputacao = 'Traficante';
				faltam = 6000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 6000 && user.crime.reputacao < 7001) {
				reputacao = 'Político';
				faltam = 7000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 7000 && user.crime.reputacao < 8001) {
				reputacao = 'Assassino Profissional';
				faltam = 8000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 8000 && user.crime.reputacao < 9001) {
				reputacao = 'Terrorista';
				faltam = 9000;
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Faltam: ${user.crime.reputacao}/${faltam} para o próximo nível.`);
			} else if (user.crime.reputacao > 9000) {
				reputacao = 'Dono do Morro';
				embed.setDescription(`Esse usuário é um: \`${reputacao}\`\n\n> Ele está no cargo máximo de reputação.`);
			}

			message.channel.send(author, embed);
		}
	}

};
