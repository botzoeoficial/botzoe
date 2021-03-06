/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
const ClientEmbed = require('../../structures/ClientEmbed');
const Command = require('../../structures/Command');

module.exports = class Addvipdoador extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addvipdoador';
		this.category = 'Dono';
		this.description = 'Dê VIP para um usuário durante 7 dias!';
		this.usage = 'addvipdoador <usuário>';
		this.aliases = ['add-vip', 'addvip'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		args,
		author
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário junto com o comando.'
			});
		}

		if (member.user.bot) {
			return message.reply({
				content: 'Você não pode dar **VIP** para um bot.'
			});
		}

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.vip.map(a => a.id).includes(member.id)) {
			return message.reply({
				content: 'Esse usuário já é **VIP** desse servidor.'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('🔅 | VIP SETADO')
			.setDescription(`💎 Parabéns <@${member.id}> 💎\n\n🥳 | Você acaba de se Tornar um ${message.guild.id === '885645282614861854' ? '<@&885645282644213812>' : '**❪💎❯❱❱ ❱ VIP Premium**'}\n\n🗓️ | O prazo do seu plano é de 30 Dias à partir de agora.`);

		message.reply({
			content: member.toString(),
			embeds: [embed]
		});

		if (message.guild.id === '885645282614861854') {
			member.roles.add('885645282644213812');
		}

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				vip: {
					id: member.id,
					tempo: Date.now()
				}
			}
		});

		this.extendedSetTimeout(async () => {
			if (message.guild.id === '885645282614861854') {
				member.roles.remove('885645282644213812');
			}

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$pull: {
					vip: {
						id: member.id
					}
				}
			});
		}, 30 * 24 * 60 * 60 * 1000);

		return;
	}

	extendedSetTimeout(callback, ms) {
		const biggestInt = (2 ** 31) - 1;
		const max = ms > biggestInt ? biggestInt : ms;

		setTimeout(() => ms > max ? extendedSetTimeout(callback, ms - max) : callback(), max);
	}

};
