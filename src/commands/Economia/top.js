/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
const User = require('../../database/Schemas/User');
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Top extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'top';
		this.category = 'Economia';
		this.description = 'Veja o rank de saldo do servidor!';
		this.usage = 'top';
		this.aliases = ['rank'];

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
		args
	}) {
		const embed = new ClientEmbed(author);

		const emojis = {
				0: '0️⃣',
				1: '1️⃣',
				2: '2️⃣',
				3: '3️⃣',
				4: '4️⃣',
				5: '5️⃣',
				6: '6️⃣',
				7: '7️⃣',
				8: '8️⃣',
				9: '9️⃣'
			},
			medalhas = ['🥇', '🥈', '🥉'];

		if (!args[0]) {
			const users = (await User.find({
				guildId: message.guild.id
			})).map(u => ({
				id: u.userId,
				money: u.banco + u.saldo
			})).sort((a, b) => b.money - a.money).filter(u => u.money).slice(0, 20);

			const string = users.map((u, i) => `[ ${i < 3 ? medalhas[i] : `${`${i + 1}`.split('').map(c => emojis[c]).join('')}`} ] ${this.client.users.cache.get(u.id) || '**Usuário não encontrado**'} - Saldo: **R$${Utils.numberFormat(u.money)},00**`).join('\n');

			embed.setTitle('📈 | Ranking Monetário');
			embed.setDescription(string || '**Sem Usuários no Ranking Monetário!**');

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else if (['bitcoin', 'btc', 'bitcoins'].includes(args[0])) {
			const users = (await User.find({
				guildId: message.guild.id
			})).map(u => ({
				id: u.userId,
				btc: u.bitcoin
			})).sort((a, b) => b.btc - a.btc).filter(u => u.btc).slice(0, 20);

			const string = users.map((u, i) => `[ ${i < 3 ? medalhas[i] : `${`${i + 1}`.split('').map(c => emojis[c]).join('')}`} ] ${this.client.users.cache.get(u.id) || '**Usuário não encontrado**'} - BitCoin: **${Utils.numberFormat(u.btc)}**`).join('\n');

			embed.setTitle('<:btc:908786996535787551> | Ranking BitCoin');
			embed.setDescription(string || '**Sem Usuários no Rankin BitCoin!**');

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		} else if (['ovos', 'ovo', 'pascoa'].includes(args[0])) {
			const users = (await User.find({
				guildId: message.guild.id
			})).map(u => ({
				id: u.userId,
				ovos: u.ovos.comuns + u.ovos.lendarios
			})).sort((a, b) => b.ovos - a.ovos).filter(u => u.ovos).slice(0, 20);

			const string = users.map((u, i) => `[ ${i < 3 ? medalhas[i] : `${`${i + 1}`.split('').map(c => emojis[c]).join('')}`} ] ${this.client.users.cache.get(u.id) || '**Usuário não encontrado**'} - Ovos: **${Utils.numberFormat(u.ovos)}**`).join('\n');

			embed.setTitle('<:ovo_2:949360699971366933> | Ranking Páscoa');
			embed.setDescription(string || '**Sem Usuários no Rankin Páscoa!**');

			return message.reply({
				content: author.toString(),
				embeds: [embed]
			});
		}
	}

};
