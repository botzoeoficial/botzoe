/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
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
		prefix,
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

		if (!user) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

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
			.addField('📈 Level:', user.level, true)
			.addField('💍 Casado(a) com:', user.marry.has ? await this.client.users.fetch(user.marry.user).then((x) => x) : user.marry.user, true)
			.addField('💼 Função na FAC:', !user.fac.isFac && !user.fac.createFac ? 'Não é Dono ou não pertence a nenhuma Facção.' : user.fac.createFac ? 'Dono de Facção' : user.fac.isFac && !user.fac.createFac ? user.fac.emprego.nome : 'Sem Função na Facção', true)
			.addField('\u2800', '\u2800', true)
			.addField('🧑‍💼 Emprego:', user.emprego, true)
			.addField('🕰️ Tempo na FAC:', !user.fac.isFac ? 'Não pertence a nenhuma Facção.' : `${moment(user.fac.tempo).format('ll')} [${moment().diff(user.fac.tempo, 'days')} dias atrás.]`, true)
			.addField('\u2800', '\u2800', true)
			.addField('🔫 Arma', user.armaEquipada === '' ? 'Nenhuma arma equipada.' : user.armaEquipada, true)
			.addField('⭐ Estrelas:', !user.estrelas.length ? 'Nenhuma Estrela.' : user.estrelas.join(''))
			.addField('🎉 Eventos:', !user.eventos.length ? 'Nenhum Evento Participado.' : `${user.eventos.map(a => `<@&${a}>`).join('\n')}`, true)
			.addField('\u2800', '\u2800', true)
			.addField('🏆 Top Ranking:', `ㅤ#${server.sort((a, b) => (b.banco + b.saldo) - (a.banco + a.saldo)).findIndex(c => c.userId === user.userId) + 1}º`, true)
			.addField('🗓️ Aniversário:', user.aniversario)
			.addField('\u200b', `🎄 **SOBREMIM:**\n${user.sobremim}`);

		message.channel.send(author, embed);
	}

};
