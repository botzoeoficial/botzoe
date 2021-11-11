/* eslint-disable max-len */
/* eslint-disable id-length */
/* eslint-disable consistent-return */
/* eslint-disable no-process-env */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const moment = require('moment');
moment.locale('pt-BR');

module.exports = class Cadastro extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cadastro';
		this.category = 'Utilidades';
		this.description = 'Veja o seu cadastro!';
		this.usage = 'cadastro';
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
		args,
		prefix,
		author
	}) {
		if (['463421520686088192', '707677540583735338', '804677047959027714'].includes(message.author.id)) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

			const user = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (!user) return message.reply('não achei esse usuário no **banco de dados** desse servidor.');

			if (member.user.id === author.id && !user.cadastrado) return message.reply(`você não está cadastrado neste servidor! Use o comando \`${prefix}cadastrar\`.`);

			if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

			const embed = new ClientEmbed(author)
				.setTitle(`📋 | Cadastro do(a) ${member.user.tag}`)
				.addField('🎴 Nome Real:', user.nomeReal, true)
				.addField('👤 Nick:', user.nick, true)
				.addField('🔞 Idade:', user.idade, true)
				.addField('♀️♂️ Gênero:', user.genero, true)
				.addField('🖥️ Plataforma de Jogo:', user.plataformaJogo, true)
				.addField('🌎 Região:', user.regiao, true)
				.addField('🏦 Saldo:', `R$${Utils.numberFormat(user.saldo + user.banco)},00`, true)
				.addField('🪙 BitCoins:', `${Utils.numberFormat(user.bitcoin)}`, true)
				.addField('💵 Empréstimos Zoe:', `R$${Utils.numberFormat(user.emprestimos)},00`, true)
				.addField('⚧ Orientação Sexual:', user.orientacaoSexual, true)
				.addField('📈 Level:', user.level, true)
				.addField('💼 Função na FAC:', !user.fac.isFac && !user.fac.createFac ? 'Não é Dono ou não pertence a nenhuma Facção.' : user.fac.createFac ? 'Dono de Facção' : user.fac.isFac && !user.fac.createFac ? user.fac.emprego.nome : 'Sem Função na Facção', true)
				.addField('🕰️ Tempo na FAC:', !user.fac.isFac ? 'Não pertence a nenhuma Facção.' : `${moment(user.fac.tempo).format('ll')} [${moment().diff(user.fac.tempo, 'days')} dias atrás.]`)
				.addField('💍 Casado(a) com:', user.marry.has ? await this.client.users.fetch(user.marry.user).then((x) => x.tag) : user.marry.user)
				.addField('⭐ Estrelas:', !user.estrelas.length ? 'Nenhuma Estrela.' : user.estrelas.join(' '))
				.addField('🗓️ Aniversário:', user.aniversario)
				.addField('🎉 Eventos:', !user.eventos.length ? 'Nenhum Evento Participado.' : `${user.eventos.map(a => `<@&${a}>`).join('\n')}`)
				.addField('\u200b', `**SOBREMIM:**\n${user.sobremim}`);

			message.channel.send(author, embed);
		} else {
			const user = await this.client.database.users.findOne({
				userId: author.id,
				guildId: message.guild.id
			});

			if (!user) return message.reply('você não está no **banco de dados** desse servidor.');

			if (!user.cadastrado) return message.reply(`você não está cadastrado neste servidor! Use o comando: \`${prefix}cadastrar\`.`);

			const embed = new ClientEmbed(author)
				.setTitle(`📋 | Seu Cadastro`)
				.addField('🎴 Nome Real:', user.nomeReal, true)
				.addField('👤 Nick:', user.nick, true)
				.addField('🔞 Idade:', user.idade, true)
				.addField('♀️♂️ Gênero:', user.genero, true)
				.addField('🖥️ Plataforma de Jogo:', user.plataformaJogo, true)
				.addField('🌎 Região:', user.regiao, true)
				.addField('🏦 Saldo:', `R$${Utils.numberFormat(user.saldo + user.banco)},00`, true)
				.addField('🪙 BitCoins:', `${user.bitcoin}`, true)
				.addField('💵 Empréstimos Zoe:', `R$${Utils.numberFormat(user.emprestimos)},00`, true)
				.addField('⚧ Orientação Sexual:', user.orientacaoSexual, true)
				.addField('📈 Level:', user.level, true)
				.addField('💼 Função na FAC:', !user.fac.isFac && !user.fac.createFac ? 'Não é Dono ou não pertence a nenhuma Facção.' : user.fac.createFac ? 'Dono de Facção' : user.fac.isFac && !user.fac.createFac ? user.fac.emprego.nome : 'Sem Função na Facção', true)
				.addField('🕰️ Tempo na FAC:', !user.fac.isFac ? 'Não pertence a nenhuma Facção.' : `${moment(user.fac.tempo).format('ll')} [${moment().diff(user.fac.tempo, 'days')} dias atrás.]`)
				.addField('💍 Casado(a) com:', user.marry.has ? await this.client.users.fetch(user.marry.user).then((x) => x.tag) : user.marry.user)
				.addField('⭐ Estrelas:', !user.estrelas.length ? 'Nenhuma Estrela.' : user.estrelas.join(' '))
				.addField('🗓️ Aniversário:', user.aniversario)
				.addField('🎉 Eventos:', !user.eventos.length ? 'Nenhum Evento Participado.' : `${user.eventos.map(a => `<@&${a}>`).join('\n')}`)
				.addField('\u200b', `**SOBREMIM:**\n${user.sobremim}`);

			message.channel.send(author, embed);
		}
	}

};
