/* eslint-disable id-length */
const Command = require('../../structures/Command');

module.exports = class Cancelarvenda extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'cancelarvenda';
		this.category = 'Crime';
		this.description = 'Cancele um item seu do Mercado Negro!';
		this.usage = 'cancelarvenda';
		this.aliases = ['cancelarmercadonegro', 'cancelardarkweb'];

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
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.mercadoNegro.find((a) => a.dono === author.id)) {
			return message.reply({
				content: 'Você não possui um item cadastrado no **Mercado Negro**!'
			});
		}

		const nome = args.slice(0).join(' ');
		if (!nome) {
			return message.reply({
				content: 'Você precisa colocar o nome do produto que você deseja retirar do **Mercado Negro**!'
			});
		}

		if (server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome !== nome)) {
			return message.reply({
				content: 'Você não possui um produto com este nome do **Mercado Negro**!'
			});
		}

		const item = server.mercadoNegro.filter((a) => a.dono === author.id).find((a) => a.nome === nome);

		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.mochila.find((x) => x.item === item.nome)) {
			if (user.mochila.find((x) => x.item === item.nome).quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'mochila.item': item.nome
				}, {
					$set: {
						'mochila.$.quantia': user.mochila.find((a) => a.item === item.nome).quantia += Number(item.quantia)
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$push: {
						mochila: {
							item: item.nome,
							emoji: item.emoji,
							id: item.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
							quantia: Number(item.quantia)
						}
					}
				});
			}
		} else {
			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$push: {
					mochila: {
						item: item.nome,
						emoji: item.emoji,
						id: item.emoji.match(/<a?:\w{2,32}:(\d{17,18})>/)[1],
						quantia: Number(item.quantia)
					}
				}
			});
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$pull: {
				mercadoNegro: {
					nome: nome
				}
			}
		});

		return message.reply({
			content: 'Produto retirado com sucesso do **Mercado Negro**!'
		});
	}

};
