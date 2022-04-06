/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Desequipararma extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'desequipararma';
		this.category = 'Crime';
		this.description = 'Desequipe sua arma!';
		this.usage = 'desequipararma';
		this.aliases = ['desequipar-arma'];

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

		if (user.armaEquipada === 'Nenhuma arma equipada.') {
			return message.reply({
				content: 'Você não possui nenhuma arma equipada ainda.'
			});
		}

		const itensFilter = user.mochila.filter((a) => ['Ak-47', 'UMP', 'MP5', 'ACR', 'KNT-308', 'Desert Eagle', 'Revolver 38', 'G18'].includes(a.item));

		const itensMap = itensFilter.map((as) => `**${as.emoji} | ${as.item}**`).join('\n');

		const embed = new ClientEmbed(author)
			.setTitle('🔫 | Desequipar Arma')
			.setThumbnail(author.displayAvatarURL({
				dynamic: true
			}))
			.setDescription(itensMap || '**Você não possui nenhuma Arma na sua mochila ainda.**');

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then(async (msg) => {
			for (const emoji of itensFilter.map((es) => es.id)) await msg.react(emoji);

			const filter = (reaction, user2) => {
				return itensFilter.map((es) => es.id).includes(reaction.emoji.id) && user2.id === author.id;
			};

			const sim = msg.createReactionCollector({
				filter,
				time: 60000,
				max: 1
			});

			const objeto = {
				'901118225520136243': 'Ak-47',
				'901117871764144200': 'UMP',
				'901117948180168724': 'MP5',
				'901118143735402536': 'ACR',
				'901118040245149736': 'KNT-308',
				'901117192110739516': 'Desert Eagle',
				'901117447065702501': 'Revolver 38',
				'901117282003075072': 'G18'
			};

			sim.on('collect', async (collected) => {
				const itemEmoji = objeto[collected._emoji.id];

				if (user.armaEquipada !== itemEmoji) {
					msg.delete();
					return message.reply({
						content: 'Você não está com essa arma equipada. Por favor, escolha outra!'
					});
				} else {
					sim.stop();
					msg.delete();

					await this.client.database.users.findOneAndUpdate({
						userId: author.id,
						guildId: message.guild.id
					}, {
						$set: {
							armaEquipada: 'Nenhuma arma equipada.'
						}
					});

					return message.reply({
						content: `Você desequipou a arma **${itemEmoji}** com sucesso!`
					});
				}
			});

			sim.on('end', async (collected, reason) => {
				if (reason === 'time') {
					sim.stop();
					msg.delete();
					return;
				}
			});
		});
	}

};
