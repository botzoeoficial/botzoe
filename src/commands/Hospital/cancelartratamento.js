/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Cancelartratamento extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cancelartratamento';
		this.category = 'Hospital';
		this.description = 'Cancele seu tratamento atual e saida do Hospital!';
		this.usage = 'cancelartratamento';
		this.aliases = ['cancelar-tratamento'];

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

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!user.hp.tratamento) {
			return message.reply({
				content: 'Você não está em **tratamento hospitalar**.'
			});
		}

		if (server.hospital.find((a) => a.usuario === author.id)) {
			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$pull: {
					hospital: {
						usuario: author.id
					}
				}
			});
		}

		await this.client.database.users.findOneAndUpdate({
			userId: author.id,
			guildId: message.guild.id
		}, {
			$set: {
				'hp.tratamento': false,
				'hp.vida': user.hp.vida
			}
		});

		const embed = new ClientEmbed(author)
			.setTitle('🩸 | Tratamento')
			.setDescription('Você cancelou seu **Tratamento Hospitalar** com sucesso.');

		return message.reply({
			content: author.toString(),
			embeds: [embed]
		});
	}

};
