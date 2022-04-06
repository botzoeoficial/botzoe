/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable complexity */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const moment = require('moment');
moment.locale('pt-BR');

module.exports = class Perfil extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'perfil';
		this.category = 'Utilidades';
		this.description = 'Veja o perfil de alguém!';
		this.usage = 'perfil [usuário]';
		this.aliases = ['profile'];

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
		author
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		const server = await this.client.database.users.find({
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		let reputacao = '';

		if (user.crime.reputacao >= 0 && user.crime.reputacao < 2) reputacao = 'Cidadão de Bem';
		else if (user.crime.reputacao > 1 && user.crime.reputacao < 1001) reputacao = 'Nóia';
		else if (user.crime.reputacao > 1000 && user.crime.reputacao < 2001) reputacao = 'Trombadinha';
		else if (user.crime.reputacao > 2000 && user.crime.reputacao < 3001) reputacao = 'Maloqueiro';
		else if (user.crime.reputacao > 3000 && user.crime.reputacao < 4001) reputacao = 'Criminoso';
		else if (user.crime.reputacao > 4000 && user.crime.reputacao < 5001) reputacao = 'Ladrão';
		else if (user.crime.reputacao > 5000 && user.crime.reputacao < 6001) reputacao = 'Traficante';
		else if (user.crime.reputacao > 6000 && user.crime.reputacao < 7001) reputacao = 'Político';
		else if (user.crime.reputacao > 7000 && user.crime.reputacao < 8001) reputacao = 'Assassino Profissional';
		else if (user.crime.reputacao > 8000 && user.crime.reputacao < 9001) reputacao = 'Terrorista';
		else if (user.crime.reputacao > 9000) reputacao = 'Dono do Morro';

		const embed = new ClientEmbed(author)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`🎄 Perfil de ${member.user.tag}`)
			.addField('👤 Nick:', user.nick, true)
			.addField('🏦 Saldo:', `R$${Utils.numberFormat(user.saldo + user.banco)},00`, true)
			.addField('<:btc:908786996535787551> BitCoins:', `ㅤ${Utils.numberFormat(user.bitcoin)}`, true)
			.addField('💵 Empréstimos Zoe:', `R$${Utils.numberFormat(user.emprestimos)},00`, true)
			.addField('📈 Level:', String(user.level), true)
			.addField('💍 Casado(a) com:', user.marry.has ? `<@${await this.client.users.fetch(user.marry.user).then((x) => x.id)}>` : user.marry.user, true)
			.addField('💼 Função na FAC:', !user.fac.isFac && !user.fac.createFac ? 'Não é Dono ou não pertence a nenhuma Facção.' : user.fac.createFac ? 'Dono de Facção' : user.fac.isFac && !user.fac.createFac ? user.fac.emprego.nome : 'Sem Função na Facção', true)
			.addField('\u2800', '\u2800', true)
			.addField('🧑‍💼 Emprego:', user.emprego, true)
			.addField('🕰️ Tempo na FAC:', !user.fac.isFac ? 'Não pertence a nenhuma Facção.' : `${moment(user.fac.tempo).format('ll')} [${moment(user.fac.tempo).fromNow()}]`, true)
			.addField('\u2800', '\u2800', true)
			.addField('🔫 Arma', user.armaEquipada === '' ? 'Nenhuma arma equipada.' : user.armaEquipada, true)
			.addField('⭐ Estrelas:', !user.estrelas.length ? 'Nenhuma Estrela.' : user.estrelas.join(''), true)
			.addField('\u2800', '\u2800', true)
			.addField('<:ovo_1:949360699992326254> Ovos:', Utils.numberFormat(user.ovos.comuns + user.ovos.lendarios), true)
			.addField('🎉 Eventos:', !user.eventos.length ? 'Nenhum Evento Participado.' : `${user.eventos.map(a => `<@&${a}>`).join('\n')}`, true)
			.addField('\u2800', '\u2800', true)
			.addField('🏆 Top Ranking:', `ㅤ#${server.sort((a, b) => (b.banco + b.saldo) - (a.banco + a.saldo)).findIndex((c) => c.userId === user.userId) + 1}º`, true)
			.addField('🗓️ Aniversário:', user.aniversario, true)
			.addField('\u2800', '\u2800', true)
			.addField('🦹🏻 Reputação:', reputacao, true)
			.addField('\u200b', `🎄 **SOBREMIM:**\n${user.sobremim}`);

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
