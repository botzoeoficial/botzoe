/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Tratamento extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'tratamento';
		this.category = 'Hospital';
		this.description = 'Trate algum usuário ferido!';
		this.usage = 'tratar <usuário>';
		this.aliases = ['tratar', 'cuidar', 'curar'];

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
		args,
		prefix
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (!server.cidade.medicos.find((a) => a.id === author.id) && server.cidade.diretorHP !== author.id) {
			return message.reply({
				content: 'Você precisa ser um **Médico** ou **Diretor do Hospital** na Cidade para tratar um ferido!'
			});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			return message.reply({
				content: 'Você precisa mencionar um usuário para iniciar o **Tratamento Hospitalar** nele!'
			});
		}

		if (!server.hospital.find((a) => a.usuario === member.id)) {
			return message.reply({
				content: `Esse usuário não está no **Hospital ${message.guild.name}**! Mande ele dar entrada no **Hospital** usando o comando \`${prefix}entradahospital\`.`
			});
		}

		if (member.id === author.id) {
			return message.reply({
				content: 'Você não pode se auto tratar.'
			});
		}

		const user = await this.client.database.users.findOne({
			userId: member.id,
			guildId: message.guild.id
		});

		if (!user) {
			return message.reply({
				content: 'Não achei esse usuário no **banco de dados** desse servidor.'
			});
		}

		if (user.hp.vida >= 50) {
			return message.reply({
				content: 'Este usuário não está ferido!'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('💉 | Início de Tratamento')
			.setDescription(`Você está tratando o paciente ${member}.\nAssim que acabar o **Tratamento Hospitalar**, ele receberá alta.`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
		});

		await this.client.database.users.findOneAndUpdate({
			userId: member.id,
			guildId: message.guild.id
		}, {
			$set: {
				'hp.tratamento': true
			}
		});

		setInterval(async () => {
			const user2 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			await this.client.database.users.findOneAndUpdate({
				userId: member.id,
				guildId: message.guild.id
			}, {
				$set: {
					'hp.vida': user2.hp.vida += 1
				}
			});

			const user3 = await this.client.database.users.findOne({
				userId: member.id,
				guildId: message.guild.id
			});

			if (user3.hp.vida === 100) {
				await this.client.database.users.findOneAndUpdate({
					userId: member.id,
					guildId: message.guild.id
				}, {
					$set: {
						'hp.tratamento': false,
						'hp.vida': 100,
						'hp.saiu': Date.now()
					}
				});

				await this.client.database.guilds.findOneAndUpdate({
					_id: message.guild.id
				}, {
					$pull: {
						hospital: {
							usuario: member.id
						}
					}
				});

				return;
			}
		}, 30000);

		return;
	}

};
