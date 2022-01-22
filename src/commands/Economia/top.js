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

		const medalhas = {
			0: '🥇',
			1: '🥈',
			2: '🥉',
			3: '4️⃣',
			4: '5️⃣',
			5: '6️⃣',
			6: '7️⃣',
			7: '8️⃣',
			8: '9️⃣',
			9: '🔟',
			10: '1️⃣1️⃣',
			11: '1️⃣2️⃣',
			12: '1️⃣3️⃣',
			13: '1️⃣4️⃣',
			14: '1️⃣5️⃣',
			15: '1️⃣6️⃣',
			16: '1️⃣7️⃣',
			17: '1️⃣8️⃣',
			18: '1️⃣9️⃣',
			19: '2️⃣0️⃣'
		};

		if (!args[0]) {
			const users = (await User.find({ guildId: message.guild.id })).map(u => ({
				id: u.userId,
				money: u.banco + u.saldo
			})).sort((a, b) => b.money - a.money).filter(u => u.money).slice(0, 20);

			const list = users.map((u, i) => `[ ${medalhas[i] || i + 1} ] ${this.client.users.cache.get(u.id) || '**Usuário não encontrado**'} - Saldo: **R$${Utils.numberFormat(u.money)},00**`);

			embed.setTitle('📈 | Ranking Monetário');
			embed.setDescription(list.join('\n') || '**Sem Usuários no Ranking Monetário!**');

			return message.channel.send(author, embed);
		} else if (['bitcoin', 'btc', 'bitcoins'].includes(args[0])) {
			const users = (await User.find({ guildId: message.guild.id })).map(u => ({
				id: u.userId,
				btc: u.bitcoin
			})).sort((a, b) => b.btc - a.btc).filter(u => u.btc).slice(0, 20);

			const list = users.map((u, i) => `[ ${medalhas[i] || i + 1} ] ${this.client.users.cache.get(u.id) || '**Usuário não encontrado**'} - BitCoin: **${Utils.numberFormat(u.btc)}**`);

			embed.setTitle('<:btc:908786996535787551> | Ranking BitCoin');
			embed.setDescription(list.join('\n') || '**Sem Usuários no Rankin BitCoin!**');

			return message.channel.send(author, embed);
		}
	}

};
