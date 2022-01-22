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

		if (user.fabricando) return message.reply('você está fabricando algo, por tanto, não é possível descartar algum item do baú!');

		if (user.casas.tipo === '') return message.reply(`você não possui uma **Casa** comprada. Use o comando \`${prefix}imobiliaria\` para comprar uma!`);

		const itens = user.casas.bau.map((as) => `**${as.emoji} | ${as.item}:** \`x${as.quantia}\``).join('\n');

		const embed = new ClientEmbed(author)
			.setTitle('Descartar do Baú')
			.setDescription(`Qual item você deseja descartar do Baú?\n\n${itens || '**Baú Vazio.**'}`);

		message.channel.send(author, embed).then(async (msg) => {
			if (!user.casas.bau.length) return;

			for (const emoji of user.casas.bau.map((es) => es.id)) await msg.react(emoji);

			const sim = msg.createReactionCollector((reaction, user3) => user.casas.bau.map((es) => es.id).includes(reaction.emoji.id) && user3.id === author.id);

			const objeto = require('../../json/todos.json');

			sim.on('collect', async (collected) => {
				sim.stop();

				const itemEmoji = objeto[collected.emoji.id];

				embed.setDescription(`${author}, você descartou o item **${itemEmoji}** com sucesso do seu Baú!`);

				msg.reactions.removeAll();
				msg.edit(author, embed);

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
