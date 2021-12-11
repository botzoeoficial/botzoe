/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');

module.exports = class Trabalhocomunitario extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'trabalhocomunitário';
		this.category = 'Social';
		this.description = 'Diminua 15 minutos do tempo da sua prisão!';
		this.usage = 'trabalhocomunitário';
		this.aliases = ['trabalho-comunitário', 'trabalhocomunitario'];

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

		if (!user.prisao.isPreso) return message.reply('você não está preso(a)!');

		if (user.prisao.isPreso && user.prisao.crime && user.prisao.velha || user.prisao.isPreso && user.prisao.crime && user.prisao.frentista) return message.reply(`você foi preso pelo \`${prefix}crime\` portanto você não pode usar esse comando!`);

		if (user.prisao.isPreso && user.prisao.roubarVeiculo) return message.reply(`você foi preso pelo \`${prefix}roubarcarro\` portanto você não pode usar esse comando!`);

		const timeout = 3600000;

		if (timeout - (Date.now() - user.cooldown.trabalhoComunitario) > 0) {
			const faltam = ms(timeout - (Date.now() - user.cooldown.trabalhoComunitario));

			const embed = new ClientEmbed(author)
				.setDescription(`🕐 | Você está em tempo de espera, aguarde: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);

			return message.channel.send(author, embed);
		} else {
			const embed = new ClientEmbed(author)
				.setTitle('TRABALHO COMUNITÁRIO')
				.setDescription(`💼 | Você fez um trabalho Comunitário e diminuiu 15 minutos no tempo da sua prisão.`);

			message.channel.send(author, embed);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'prisao.tempo': user.prisao.tempo - 15 * 60 * 1000,
					'cooldown.trabalhoComunitario': Date.now()
				}
			});

			setTimeout(async () => {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$set: {
						'prisao.isPreso': false,
						'prisao.tempo': 0,
						'prisao.prenderCmd': false,
						'prisao.prenderMili': 0,
						'prisao.traficoDrogas': false,
						'prisao.crime': false,
						'prisao.prender': false,
						'prisao.revistar': false,
						'prisao.roubarVeiculo': false,
						'prisao.velha': false,
						'prisao.frentista': false,
						'prisao.joalheria': false,
						'prisao.agiota': false,
						'prisao.casaLoterica': false,
						'prisao.brazino': false,
						'prisao.facebook': false,
						'prisao.bancoCentral': false,
						'prisao.shopping': false,
						'prisao.banco': false
					}
				});
			}, user.prisao.tempo - 15 * 60 * 1000);
		}
	}

};
