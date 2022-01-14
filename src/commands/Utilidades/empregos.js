/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const Utils = require('../../utils/Util');

module.exports = class Empregos extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'empregos';
		this.category = 'Utilidades';
		this.description = 'Escolha um emprego!';
		this.usage = 'empregos';
		this.aliases = ['trabalhos'];

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
		author
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const empregos = require('../../json/empregos.json');

		const empregosArray = empregos.map((value, index) => ({
			level: value.level,
			salario: value.salario,
			trabalho: value.trabalho,
			position: index
		}));

		const emojis = {
			1: '1️⃣',
			2: '2️⃣',
			3: '3️⃣',
			4: '4️⃣',
			5: '5️⃣',
			6: '6️⃣',
			7: '7️⃣',
			8: '8️⃣',
			9: '9️⃣',
			10: '🔟',
			11: '1️⃣1️⃣',
			12: '1️⃣2️⃣',
			13: '1️⃣3️⃣',
			14: '1️⃣4️⃣',
			15: '1️⃣5️⃣',
			16: '1️⃣6️⃣',
			17: '1️⃣7️⃣',
			18: '1️⃣8️⃣',
			19: '1️⃣9️⃣',
			20: '2️⃣0️⃣',
			21: '2️⃣1️⃣',
			22: '2️⃣2️⃣',
			23: '2️⃣3️⃣',
			24: '2️⃣4️⃣',
			25: '2️⃣5️⃣',
			26: '2️⃣6️⃣',
			27: '2️⃣7️⃣',
			28: '2️⃣8️⃣',
			29: '2️⃣9️⃣',
			30: '3️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('Agência de Empregos');

		empregosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **Emprego:** ${eu.trabalho} | **Level:** ${eu.level} - R$${Utils.numberFormat(Number(eu.salario))},00\n`);
		embed.setDescription(`**➡️ | Digite o número da Profissão que deseja entrar:**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id, {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEmprego = empregosArray.find((xis) => xis.position === selected);

				if (!findSelectedEmprego) {
					ce.delete();
					msg.delete();
					collector.stop();

					return message.reply(`número do emprego não encontrado. Por favor, use o comando novamente!`);
				} else if (user.level < findSelectedEmprego.level) {
					ce.delete();
					msg.delete();
					collector.stop();

					return message.reply(`você precisa ser level **${findSelectedEmprego.level}** para escolher esse emprego. Por favor, use o comando novamente!`);
				} else if (user.emprego === findSelectedEmprego.trabalho) {
					ce.delete();
					msg.delete();
					collector.stop();

					return message.reply('você já possui esse emprego. Por favor, use o comando novamente!');
				} else {
					collector.stop();

					const embed2 = new ClientEmbed(author)
						.setAuthor(`💼 | Emprego Escolhido: ${findSelectedEmprego.trabalho}`);

					ce.delete();
					msg.delete();
					message.channel.send(author, embed2);

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							emprego: findSelectedEmprego.trabalho
						}
					});
				}
			});

			collector.on('end', async (collected, reason) => {
				if (reason === 'time') {
					msg.delete();
					collector.stop();

					return message.reply('você demorou demais para escolher o emprego! Use o comando novamente!');
				}
			});
		});
	}

};
