/* eslint-disable func-names */
/* eslint-disable consistent-return */
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');

module.exports = class Addvipdoador extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addvipdoador';
		this.category = 'Editor';
		this.description = 'Dê VIP para um usuário durante 7 dias!';
		this.usage = 'addvipdoador <usuário>';
		this.aliases = ['add-vip', 'addvip'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = true;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = false;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		args,
		author
	}) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) return message.reply('você precisa mencionar um usuário junto com o comando.');

		if (member.user.bot) return message.reply(`você não pode dar **VIP** para um bot.`);

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.vip.map(a => a.id).includes(member.id)) return message.reply('esse usuário já é **VIP** do servidor.');

		const embed = new ClientEmbed(author)
			.setTitle('🔅 | VIP SETADO')
			.setDescription(`💎 Parabéns <@${member.id}> 💎\n\n🥳 | Você acaba de se Tornar um <@&830972296260485189>\n\n🗓️ | O prazo do seu plano é de 7 Dias à partir de agora.`);

		message.channel.send(member, embed);

		member.roles.add('830972296260485189');

		Date.prototype.addDays = function (days) {
			const date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};

		const date = new Date(Date.now());

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				vip: {
					id: member.id,
					tempo: date.addDays(7)
				}
			}
		});

		setTimeout(async () => {
			member.roles.remove('830972296260485189');

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$pull: {
					vip: {
						id: member.id
					}
				}
			});
		}, 604800000);
	}

};
