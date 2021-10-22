/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Salario extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'salario';
		this.category = 'Economia';
		this.description = 'Pegue o seu Salario!';
		this.usage = 'salario';
		this.aliases = ['salário', 'daily'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
	}
	async run({
		message,
		author
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		const timeout = 86400000;

		if (timeout - (Date.now() - user.cooldown.salario) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.salario));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('🏦 Salário');

			if (message.member.roles.highest.id === '830972296272543796') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$20.000,00\`\n🪙 \`5\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 20000,
						bitcoin: user.bitcoin += 5
					}
				});
			} else if (message.member.roles.highest.id === '830972296272543794') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$15.000,00\`\n🪙 \`4\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 15000,
						bitcoin: user.bitcoin += 4
					}
				});
			} else if (message.member.roles.highest.id === '830972296272543795') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$10.000,00\`\n🪙 \`3\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 10000,
						bitcoin: user.bitcoin += 3
					}
				});
			} else if (message.member.roles.highest.id === '830972296260485198') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$8.000,00\`\n🪙 \`2\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 8000,
						bitcoin: user.bitcoin += 2
					}
				});
			} else if (message.member.roles.highest.id === '830972296260485191') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$7.000,00\`\n🪙 \`1\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 7000,
						bitcoin: user.bitcoin += 1
					}
				});
			} else if (message.member.roles.highest.id === '830972296260485190') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$6.000,00\`\n🪙 \`1\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 6000,
						bitcoin: user.bitcoin += 1
					}
				});
			} else if (message.member.roles.highest.id === '831007436990971905') {
				embed.setDescription(`✅ | Você recebeu seu pagamento diário.\n\n💵 \`R$5.000,00\`\n🪙 \`1\` Bitcoins`);

				await this.client.database.users.findOneAndUpdate({
					_id: author.id
				}, {
					$set: {
						'cooldown.salario': Date.now(),
						saldo: user.saldo += 5000,
						bitcoin: user.bitcoin += 1
					}
				});
			}

			return message.channel.send(author, embed);
		}
	}

};
