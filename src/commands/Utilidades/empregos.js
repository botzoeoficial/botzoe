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
	}
	async run({
		message,
		author
	}) {
		const user = await this.client.database.users.findOne({
			_id: author.id
		});

		const empregos = require('../../json/empregos.json');

		const empregosArray = empregos.map((value, index) => ({
			level: value.level,
			salario: value.salario,
			trabalho: value.trabalho,
			position: index
		}));

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
			9: '9️⃣',
			10: '1️⃣0️⃣'
		};

		let embedMessage = '';

		const embed = new ClientEmbed(author)
			.setTitle('Agência de Empregos');

		empregosArray.forEach((eu) => embedMessage += `${emojis[eu.position + 1]} - **Emprego:** ${eu.trabalho} | **Level:** ${eu.level} - R$${Utils.numberFormat(Number(eu.salario))},00\n`);
		embed.setDescription(`**➡️ | Digite o número da Profissão que deseja entrar:**\n\n${embedMessage}`);

		message.channel.send(author, embed).then((msg) => {
			const collector = msg.channel.createMessageCollector((xes) => xes.author.id === author.id && !isNaN(xes.content), {
				time: 60000
			});

			collector.on('collect', async (ce) => {
				const selected = Number(ce.content - 1);
				const findSelectedEmprego = empregosArray.find((xis) => xis.position === selected);

				if (!findSelectedEmprego) {
					message.reply(`este número não existe! Por favor, envie o número do emprego novamente.`).then(a => a.delete({
						timeout: 5000
					}));
					ce.delete();
				} else if (user.level < findSelectedEmprego.level) {
					message.reply(`você precisa ser level **${findSelectedEmprego.level}** para pegar esse emprego!`).then(a => a.delete({
						timeout: 5000
					}));
				} else if (user.emprego === findSelectedEmprego.trabalho) {
					message.reply('você já possui esse emprego! Por favor, selecione outro.').then(a => a.delete({
						timeout: 5000
					}));
				} else {
					collector.stop();

					const embed2 = new ClientEmbed(author)
						.setAuthor(`💼 | Emprego Escolhido: ${findSelectedEmprego.trabalho}`);

					ce.delete();
					msg.delete();
					message.channel.send(author, embed2);

					await this.client.database.users.findOneAndUpdate({
						_id: author.id
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
