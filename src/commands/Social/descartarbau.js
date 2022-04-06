/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Descartardobau extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'descartardobau';
		this.category = 'Social';
		this.description = 'Descarte um item do seu Baú!';
		this.usage = 'descartardobau';
		this.aliases = ['descartarbau'];

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
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.fabricando) {
			return message.reply({
				content: 'Você está fabricando algo, por tanto, não é possível descartar algum item do baú!'
			});
		}

		if (user.casas.tipo === '') {
			return message.reply({
				content: `Você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`
			});
		}

		const itens = user.casas.bau.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const embed = new ClientEmbed(author)
			.setTitle('Descartar do Baú')
			.setDescription(`Qual item você deseja descartar do Baú?\n\n${itens || '**Baú Vazio.**'}`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			if (!user.casas.bau.length) return;

			for (const emoji of user.casas.bau.map((es) => es.id)) await msg.react(emoji);

			const filter2 = (reactionFilter, userFilter) => {
				return user.casas.bau.map((es) => es.id).includes(reactionFilter.emoji.id) && userFilter.id === author.id;
			};

			const sim = msg.createReactionCollector({
				filter: filter2
			});

			const objeto = require('../../json/todos.json');

			sim.on('collect', async (collected) => {
				sim.stop();

				const itemEmoji = objeto[collected.emoji.id];

				embed.setDescription(`${author}, você descartou o item **${itemEmoji}** com sucesso do seu Baú!`);

				msg.reactions.removeAll();
				msg.edit({
					content: author.toString(),
					embeds: [embed]
				});

				return await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						'casas.bau': {
							item: itemEmoji
						}
					}
				});
			});
		});
	}

};
