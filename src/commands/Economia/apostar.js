/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');
const Emojis = require('../../utils/Emojis');

module.exports = class Apostar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'apostar';
		this.category = 'Economia';
		this.description = 'Aposte com um usuário!';
		this.usage = 'apostar <usuário> <saldo>';
		this.aliases = ['aposta'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
	}
	async run({
		message,
		prefix,
		args,
		author
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.id === author.id) return message.reply('você não pode apostar com você mesmo!');

		if (member.user === member.user.bot) return message.reply('você não pode apostar com um bot!');

		const user2 = await this.client.database.users.findOne({
			_id: member.id
		});

		if (!user2) return message.reply('não achei esse usuário no meu **banco de dados**.');

		if (!user2.cadastrado) return message.reply(`esse usuário não está cadastrado no servidor! Peça para ele se cadastrar usando o comando: \`${prefix}cadastrar\`.`);

		const btc = args[1];

		if (!btc) return message.reply('você precisa colocar uma quantia de saldo para apostar.');

		if (!parseInt(btc)) return message.reply('você precisa colocar uma quantia válida.');

		if (parseInt(btc) <= 0) return message.reply('a quantia a ser adicionada precisa ser maior que **0**.');

		if (parseInt(btc) > 100000) return message.reply('a quantia precisa ser abaixo de **R$100.000,00**');

    if (isNaN(btc)) message.reply('você precisa colocar apenas números, não **letras** ou **números junto com letras**!');

		if (parseInt(btc) > user.banco) return message.reply('você não tem esse saldo todo no banco para ser apostado!');

		if (parseInt(btc) > user2.banco) return message.reply('o usuário mencionado não tem esse tanto de saldo no banco para ser apostado!');

		const embed = new ClientEmbed(author)
			.setTitle('🎰 | CONFIRMAÇÃO DE APOSTA')
			.setDescription(`${member}, o(a) usuário(a) ${author} te chamou para uma aposta de **R$${Utils.numberFormat(Number(btc))},00**!\n\nDeseja aceitar?`);

		message.channel.send(member, embed).then(async (msg) => {
			await msg.react(Emojis.Okay);
			await msg.react(Emojis.Error);

			const sim = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Okay && u.id === member.id, {
				time: 60000
			});

			const não = msg.createReactionCollector((r, u) => r.emoji.name === Emojis.Error && u.id === member.id, {
				time: 60000
			});

			sim.on('collect', async () => {
				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						banco: user.banco -= Number(btc)
					}
				});

				await this.client.database.users.findOneAndUpdate({
					_id: member.id
				}, {
					$set: {
						banco: user2.banco -= Number(btc)
					}
				});

				const random = Math.floor(Math.random() * 100);

				if (random <= 50) {
					msg.delete();
					sim.stop();

					const embedMoeda = new ClientEmbed(author)
						.setTitle('🪙 | JOGO DA MOEDA')
						.addField('Se cair 😀:', `O usuário ${author} ganha!`)
						.addField('Se cair 👑:', `O usuário ${member} ganha!`)
						.addField('🏆 Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00** na carteira do vencedor!`);

					const embedWin = new ClientEmbed(author)
						.setAuthor('🪙 | Jogando a moeda, e...');

					const msgLoading = await message.channel.send(`${author} e ${member}`, embedMoeda);

					const arrayEmojis = ['😀', '👑'];

					const randomEmojis = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

					const embedWin2 = new ClientEmbed(author)
						.setTitle('🏆 | TEMOS UM VENCEDOR');

					if (randomEmojis === '😀') {
						embedWin2
							.setDescription(`**Joguei a moeda e caiu \`${randomEmojis}\`**`)
							.addField('Vencedor:', author)
							.addField('Perdedor:', member)
							.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

						await this.client.database.users.findOneAndUpdate({
							_id: author.id
						}, {
							$set: {
								banco: user.banco += Number(btc * 2)
							}
						});
					} else if (randomEmojis === '👑') {
						embedWin2
							.setDescription(`**Joguei a moeda e caiu \`${randomEmojis}\`**`)
							.addField('Vencedor:', member)
							.addField('Perdedor:', author)
							.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

						await this.client.database.users.findOneAndUpdate({
							_id: member.id
						}, {
							$set: {
								banco: user2.banco += Number(btc * 2)
							}
						});
					}

					setTimeout(async () => {
						msgLoading.edit(`${author} e ${member}`, embedWin);
					}, 7000);

					setTimeout(async () => {
						msgLoading.edit(`${author} e ${member}`, embedWin2);
					}, 10000);
				} else if (random > 51) {
					msg.delete();
					sim.stop();

					const embedMoeda = new ClientEmbed(author)
						.setTitle('🎲 | JOGO DO DADO')
						.addField('Se cair número PAR:', `O usuário ${author} ganha!`)
						.addField('Se cair número ÍMPAR:', `O usuário ${member} ganha!`)
						.addField('🏆 Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00** na carteira do vencedor!`);

					const embedWin = new ClientEmbed(author)
						.setAuthor('🎲 | Jogando o dado, e...');

					const msgLoading = await message.channel.send(`${author} e ${member}`, embedMoeda);

					const arrayEmojis = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

					const randomEmojis = arrayEmojis[Math.floor(Math.random() * arrayEmojis.length)];

					const embedWin2 = new ClientEmbed(author)
						.setTitle('🏆 | TEMOS UM VENCEDOR');

					if (randomEmojis === 2 || randomEmojis === 4 || randomEmojis === 6 || randomEmojis === 8 || randomEmojis === 10 || randomEmojis === 12) {
						embedWin2
							.setDescription(`**Joguei o dado e caiu número \`${randomEmojis}\`** (**PAR**)`)
							.addField('Vencedor:', author)
							.addField('Perdedor:', member)
							.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

						await this.client.database.users.findOneAndUpdate({
							_id: author.id
						}, {
							$set: {
								banco: user.banco += Number(btc * 2)
							}
						});
					} else if (randomEmojis === 3 || randomEmojis === 5 || randomEmojis === 7 || randomEmojis === 9 || randomEmojis === 11) {
						embedWin2
							.setDescription(`**Joguei o dado e caiu número \`${randomEmojis}\`** (**ÍMPAR**)`)
							.addField('Vencedor:', member)
							.addField('Perdedor:', author)
							.addField('Prêmio:', `**R$${Utils.numberFormat(Number(btc * 2))},00**`);

						await this.client.database.users.findOneAndUpdate({
							_id: member.id
						}, {
							$set: {
								banco: user2.banco += Number(btc * 2)
							}
						});
					}

					setTimeout(async () => {
						msgLoading.edit(`${author} e ${member}`, embedWin);
					}, 7000);

					setTimeout(async () => {
						msgLoading.edit(`${author} e ${member}`, embedWin2);
					}, 10000);
				}
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();

					return message.channel.send(`${author}, o(a) usuário(a) ${member} demorou demais para aceitar/negar a aposta! Use o comando novamente!`);
				}
			});

			não.on('collect', async () => {
				msg.delete();

				return message.channel.send(`${author}, o(a) usuário(a) ${member} recusou seu pedido de aposta! ||ARREGÃO!||`);
			});
		});
	}

};