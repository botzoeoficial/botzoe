/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Enviarmecanica extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'enviarmecanica';
		this.category = 'Mecanico';
		this.description = 'Envie sue carro para a mecânica!';
		this.usage = 'enviarmecanica';
		this.aliases = ['enviar-mecanica', 'enviarmecânica', 'enviaroficina'];

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

		if (!user.garagem.length) {
			return message.reply({
				content: `Você não possui nenhum carro na **garagem**. Use o comando \`${prefix}roubarcarro\`.`
			});
		}

		const placa = args.slice(0).join(' ');
		if (!placa) {
			return message.reply({
				content: 'Você precisa colocar a placa de um carro seu para ser enviado para a **Oficina**!'
			});
		}

		if (!user.garagem.find((a) => a.placa === placa)) {
			return message.reply({
				content: `Não achei nenhum carro seu com essa placa. Use \`${prefix}garagem\` para ver a placa de um!`
			});
		}

		const carro = user.garagem.find((a) => a.placa === placa);

		if (carro.arrumado) {
			return message.reply({
				content: 'Esse carro já está **arrumado**. Por favor, use o comando novamente caso você tenha outro carro!'
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('🧑‍🔧 | Enviar para Mecânica')
			.setDescription(`✅ | Você enviou seu veículo **${carro.nome}** com sucesso para a Mecânica!`);

		message.reply({
			content: author.toString(),
			embeds: [embed]
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

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				mecanica: {
					nome: carro.nome,
					dono: author.id,
					modelo: carro.modelo,
					valor: Number(carro.valor),
					ano: Number(carro.ano),
					danificado: Number(carro.danificado),
					velocidade: Number(carro.velocidade),
					cavalos: Number(carro.cavalos),
					peso: Number(carro.peso),
					desmanche: Number(carro.desmanche),
					img: carro.img,
					mecanica: carro.mecanica,
					arrumado: carro.arrumado,
					emplacado: carro.emplacado,
					liberado: carro.liberado,
					placa: carro.placa
				}
			}
		});

		return;
	}

};
