/* eslint-disable max-len */
/* eslint-disable complexity */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const ms = require('parse-ms');
const {
	MessageButton,
	MessageActionRow
} = require('discord-buttons');

module.exports = class Enviardesmanche extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'enviardesmanche';
		this.category = 'Crime';
		this.description = 'Envie sue carro para o desmanche!';
		this.usage = 'enviardesmanche';
		this.aliases = ['enviar-desmanche'];

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
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (user.prisao.isPreso) {
			let presoTime = 0;

			const embedPreso = new ClientEmbed(author)
				.setTitle('👮 | Preso');

			if (user.prisao.prenderCmd) {
				presoTime = user.prisao.prenderMili;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.traficoDrogas) {
				presoTime = 36000000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.prender) {
				presoTime = 43200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.revistar) {
				presoTime = 21600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.roubarVeiculo) {
				presoTime = 180000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.velha) {
				presoTime = 300000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.frentista) {
				presoTime = 600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.joalheria) {
				presoTime = 900000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.agiota) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.casaLoterica) {
				presoTime = 1200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.brazino) {
				presoTime = 2100000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.facebook) {
				presoTime = 2700000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.bancoCentral) {
				presoTime = 3600000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.shopping) {
				presoTime = 7200000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			} else if (user.prisao.crime && user.prisao.banco) {
				presoTime = 14400000;

				if (presoTime - (Date.now() - user.prisao.tempo) > 0) {
					const faltam = ms(presoTime - (Date.now() - user.prisao.tempo));

					embedPreso.setDescription(`<:algema:898326104413188157> | Você não pode usar esse comando, pois você está preso.\nVocê sairá da prisão daqui a: \`${faltam.days}\`:\`${faltam.hours}\`:\`${faltam.minutes}\`:\`${faltam.seconds}\``);
				}
			}

			const buttonPreso = new MessageButton().setStyle('blurple').setEmoji('900544510365405214').setID('preso');
			const botoes = new MessageActionRow().addComponents([buttonPreso]);

			const escolha = await message.channel.send(author, {
				embed: embedPreso,
				components: [botoes]
			});

			const collectorEscolhas = escolha.createButtonCollector((button) => button.clicker.user.id === author.id, {
				max: 1,
				time: 60000
			});

			collectorEscolhas.on('collect', async (b) => {
				if (b.id === 'preso') {
					b.reply.defer();

					const userMochila = await this.client.database.users.findOne({
						userId: author.id,
						guildId: message.guild.id
					});

					if (!userMochila.isMochila) {
						escolha.delete();

						return message.reply('você não tem uma **mochila**. Vá até a Loja > Utilidades e Compre uma!');
					}

					if (!userMochila.mochila.find((a) => a.item === 'Chave Micha')) {
						escolha.delete();

						return message.reply('você não tem uma **Chave Micha** na sua Mochila!');
					}

					if (userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia > 1) {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id,
							'mochila.item': 'Chave Micha'
						}, {
							$set: {
								'mochila.$.quantia': userMochila.mochila.find((a) => a.item === 'Chave Micha').quantia - 1
							}
						});
					} else {
						await this.client.database.users.findOneAndUpdate({
							userId: author.id,
							guildId: message.guild.id
						}, {
							$pull: {
								mochila: {
									item: 'Chave Micha'
								}
							}
						});
					}

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
							'prisao.atirarPrisao': false,
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

					escolha.delete();
					return message.reply(`você usou \`x1\` **Chave Micha** e conseguiu sair da prisão com sucesso!`);
				}
			});

			collectorEscolhas.on('end', async (collected, reason) => {
				if (reason === 'time') {
					return escolha.edit(author, {
						embed: embedPreso,
						components: []
					});
				}
			});
		} else {
			if (!user.garagem.length) return message.reply(`você não possui nenhum carro na **garagem**. Use o comando \`${prefix}roubarcarro\`.`);

			const placa = args.slice(0).join(' ');
			if (!placa) return message.reply('você precisa colocar a placa de um carro seu para ser enviado para o **Desmanche**!');

			if (!user.garagem.find((a) => a.placa === placa)) return message.reply(`não achei nenhum carro seu com essa placa. Use \`${prefix}garagem\` para ver a placa de um!`);

			const carro = user.garagem.find((a) => a.placa === placa);

			if (carro.mecanica) return message.reply('esse carro está na **Oficina**. Retire ele de lá, e use esse comando novamente!');

			const embed = new ClientEmbed(author)
				.setTitle('🧑‍🔧 | Enviar para Desmanche')
				.setDescription(`✅ | Você enviou seu veículo **${carro.nome}** com sucesso para o Desmanche!`);

			message.channel.send(author, embed);

			await this.client.database.guilds.findOneAndUpdate({
				_id: message.guild.id
			}, {
				$push: {
					desmanche: {
						nome: carro.nome,
						dono: carro.dono,
						modelo: carro.modelo,
						valor: carro.valor,
						ano: carro.ano,
						danificado: carro.danificado,
						velocidade: carro.velocidade,
						cavalos: carro.cavalos,
						peso: carro.peso,
						desmanche: carro.desmanche,
						img: carro.img,
						arrumado: carro.arrumado,
						emplacado: carro.emplacado,
						liberado: carro.liberado,
						placa: carro.placa
					}
				}
			});

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$pull: {
					garagem: {
						nome: carro.nome
					}
				}
			});

			return;
		}
	}

};
