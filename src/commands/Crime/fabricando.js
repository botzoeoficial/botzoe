/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Command = require('../../structures/Command');
const ms = require('parse-ms');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Fabricando extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'fabricando';
		this.category = 'Crime';
		this.description = 'Veja o que você está fabricando!';
		this.usage = 'fabricando';
		this.aliases = ['fb'];

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

		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		let timeout;

		const embed = new ClientEmbed(author)
			.setTitle('⏱️ | Fabricação em Andamento...');

		if (server.cidade.donoFabricadeArmas.find((a) => a.id === author.id) || server.cidade.donoFavela === author.id) {
			if (user.fabricagem.fabricandoArma) {
				if (user.fabricagem.armas.nome === 'Ak-47') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 10000800 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 7200000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 5400000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 3600000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'UMP') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 50000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'MP5') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 150000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'ACR') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 180000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'KNT-308') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 240000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 180000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'Desert Eagle') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 45000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'Revolver 38') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 180000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 120000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				} else if (user.fabricagem.armas.nome === 'G18') {
					if (user.fabricagem.armas.quantia >= 1 && user.fabricagem.armas.quantia <= 5) {
						timeout = 90000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 5 && user.fabricagem.armas.quantia <= 10) {
						timeout = 60000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 10 && user.fabricagem.armas.quantia <= 20) {
						timeout = 45000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					} else if (user.fabricagem.armas.quantia > 20) {
						timeout = 30000 * user.fabricagem.armas.quantia;

						if (timeout - (Date.now() - user.fabricagem.armas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.armas.tempo));

							embed.setDescription(`Arma: \`${user.fabricagem.armas.nome}\`\nQuantia: \`x${user.fabricagem.armas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua arma **${user.fabricagem.armas.nome}**.`);
						}
					}
				}

				return message.channel.send(author, embed);
			} else {
				embed.setDescription(`Você está fabricando nenhuma arma no momento. Use o comando \`${prefix}fabricarma\`!`);
				return message.channel.send(author, embed);
			}
		} else if (server.cidade.donoFabricadeDrogas.find((a) => a.id === author.id) || server.cidade.donoFavela === author.id) {
			if (user.fabricagem.fabricandoDroga) {
				if (user.fabricagem.drogas.nome === 'Maconha') {
					if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
						timeout = 43200000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
						timeout = 21600000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
						timeout = 16200000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 20) {
						timeout = 10800000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					}
				} else if (user.fabricagem.drogas.nome === 'Cocaína') {
					if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
						timeout = 54000000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
						timeout = 30600000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
						timeout = 21600000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 20) {
						timeout = 16200000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					}
				} else if (user.fabricagem.drogas.nome === 'LSD') {
					if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
						timeout = 1050000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
						timeout = 36000000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
						timeout = 30600000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 20) {
						timeout = 21600000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					}
				} else if (user.fabricagem.drogas.nome === 'Metanfetamina') {
					if (user.fabricagem.drogas.quantia >= 1 && user.fabricagem.drogas.quantia <= 5) {
						timeout = 72000000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 5 && user.fabricagem.drogas.quantia <= 10) {
						timeout = 43200000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 10 && user.fabricagem.drogas.quantia <= 20) {
						timeout = 37800000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					} else if (user.fabricagem.drogas.quantia > 20) {
						timeout = 28800000 * user.fabricagem.drogas.quantia;

						if (timeout - (Date.now() - user.fabricagem.drogas.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.drogas.tempo));

							embed.setDescription(`Droga: \`${user.fabricagem.drogas.nome}\`\nQuantia: \`x${user.fabricagem.drogas.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua droga **${user.fabricagem.drogas.nome}**.`);
						}
					}
				}

				return message.channel.send(author, embed);
			} else {
				embed.setDescription(`Você está fabricando nenhuma droga no momento. Use o comando \`${prefix}fabricardroga\`!`);
				return message.channel.send(author, embed);
			}
		} else if (server.cidade.carcereiro.find((a) => a.id === author.id) || server.cidade.donoFavela === author.id) {
			if (user.fabricagem.fabricandoChaves) {
				if (user.fabricagem.chaves.nome === 'Chave Micha') {
					if (user.fabricagem.chaves.quantia >= 1 && user.fabricagem.chaves.quantia <= 5) {
						timeout = 28800000 * user.fabricagem.chaves.quantia;

						if (timeout - (Date.now() - user.fabricagem.chaves.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.chaves.tempo));

							embed.setDescription(`Chave: \`${user.fabricagem.chaves.nome}\`\nQuantia: \`x${user.fabricagem.chaves.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua chave **${user.fabricagem.chaves.nome}**.`);
						}
					} else if (user.fabricagem.chaves.quantia > 5 && user.fabricagem.chaves.quantia <= 10) {
						timeout = 25200000 * user.fabricagem.chaves.quantia;

						if (timeout - (Date.now() - user.fabricagem.chaves.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.chaves.tempo));

							embed.setDescription(`Chave: \`${user.fabricagem.chaves.nome}\`\nQuantia: \`x${user.fabricagem.chaves.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua chave **${user.fabricagem.chaves.nome}**.`);
						}
					} else if (user.fabricagem.chaves.quantia > 10 && user.fabricagem.chaves.quantia <= 20) {
						timeout = 19080000 * user.fabricagem.chaves.quantia;

						if (timeout - (Date.now() - user.fabricagem.chaves.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.chaves.tempo));

							embed.setDescription(`Chave: \`${user.fabricagem.chaves.nome}\`\nQuantia: \`x${user.fabricagem.chaves.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua chave **${user.fabricagem.chaves.nome}**.`);
						}
					} else if (user.fabricagem.chaves.quantia > 20) {
						timeout = 14400000 * user.fabricagem.chaves.quantia;

						if (timeout - (Date.now() - user.fabricagem.chaves.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.chaves.tempo));

							embed.setDescription(`Chave: \`${user.fabricagem.chaves.nome}\`\nQuantia: \`x${user.fabricagem.chaves.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua chave **${user.fabricagem.chaves.nome}**.`);
						}
					}
				}

				return message.channel.send(author, embed);
			} else {
				embed.setDescription(`Você está fabricando nenhuma chave no momento. Use o comando \`${prefix}fabricarchaves\`!`);
				return message.channel.send(author, embed);
			}
		} else if (server.cidade.donoDesmanche === author.id || server.cidade.ajudanteDesmanche.find((a) => a.id === author.id) || server.cidade.donoFavela === author.id) {
			if (user.fabricagem.fabricandoMunicao) {
				if (user.fabricagem.municoes.nome === 'Munição Metralhadora') {
					if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
						timeout = 28800000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
						timeout = 25200000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
						timeout = 19800000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 20) {
						timeout = 14400000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					}
				} else if (user.fabricagem.municoes.nome === 'Munição Pistola') {
					if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
						timeout = 18000000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
						timeout = 14400000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
						timeout = 12600000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 20) {
						timeout = 7200000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					}
				} else if (user.fabricagem.municoes.nome === 'Munição KNT') {
					if (user.fabricagem.municoes.quantia >= 1 && user.fabricagem.municoes.quantia <= 5) {
						timeout = 36000000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 5 && user.fabricagem.municoes.quantia <= 10) {
						timeout = 28800000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 10 && user.fabricagem.municoes.quantia <= 20) {
						timeout = 18000000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					} else if (user.fabricagem.municoes.quantia > 20) {
						timeout = 14400000 * user.fabricagem.municoes.quantia;

						if (timeout - (Date.now() - user.fabricagem.municoes.tempo) > 0) {
							const faltam = ms(timeout - (Date.now() - user.fabricagem.municoes.tempo));

							embed.setDescription(`Munição: \`${user.fabricagem.municoes.nome}\`\nQuantia: \`x${user.fabricagem.municoes.quantia}\`\n\nRestam \`${faltam.days}\`d \`${faltam.hours}\`h \`${faltam.minutes}\`m \`${faltam.seconds}\`s para a fabricação da sua munição **${user.fabricagem.municoes.nome}**.`);
						}
					}
				}

				return message.channel.send(author, embed);
			} else {
				embed.setDescription(`Você está fabricando nenhuma munição no momento. Use o comando \`${prefix}fabricarmunição\`!`);
				return message.channel.send(author, embed);
			}
		} else {
			return message.reply('você não tem função na favela da Cidade!');
		}
	}

};
