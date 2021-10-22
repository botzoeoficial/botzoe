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
	}
	async run({
		message,
		args,
		prefix,
		author
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		const user = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user) return message.reply('não achei esse usuário no meu **banco de dados**.');

		if (!user.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author)
			.setThumbnail(member.user.displayAvatarURL({
				dynamic: true,
				format: 'png'
			}))
			.setTitle(`Perfil do(a) ${member.user.tag}`)
			.addField('👤 Nick:', user.nick, true)
			.addField('🏦 Saldo:', `R$${Utils.numberFormat(user.saldo + user.banco)},00`, true)
			.addField('🪙 BitCoins:', `${Utils.numberFormat(user.bitcoin)}`, true)
			.addField('💵 Empréstimos Alfacusa:', `R$${Utils.numberFormat(user.emprestimos)},00`, true)
			.addField('📈 Level:', user.level, true)
			.addField('💍 Casado(a) com:', user.marry.has ? await this.client.users.fetch(user.marry.user).then((x) => x) : user.marry.user, true)
			.addField('💼 Função na FAC:', user.funcao, true)
			.addField('\u2800', '\u2800', true)
			.addField('🧑‍💼 Emprego:', user.emprego, true)
			.addField('🕰️ Tempo na FAC:', `${moment(member.joinedAt).format('ll')} [${moment().diff(member.joinedAt, 'days')} dias atrás.]`)
			.addField('⭐ Estrelas:', !user.estrelas.length ? 'Nenhuma Estrela.' : user.estrelas.join(''))
			.addField('🗓️ Aniversário:', user.aniversario)
			.addField('🎉 Eventos:', !user.eventos.length ? 'Nenhum Evento Participado.' : `${user.eventos.map(a => `<@&${a}>`).join('\n')}`)
			.addField('\u200b', `**SOBREMIM:**\n${user.sobremim}`);

		message.channel.send(author, embed);
	}

};
