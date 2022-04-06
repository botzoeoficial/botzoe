/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const Command = require('../../structures/Command');

module.exports = class Tempo extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'tempo';
		this.category = 'Dono';
		this.description = 'Zere tempo de usuários!';
		this.usage = 'tempo <user> <dados>';
		this.aliases = ['zerar'];

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

		if (args[0] === 'todos') {
			const allUsers = await this.client.database.users.find({
				guildId: message.guild.id
			});

			await allUsers.forEach(async (es) => {
				es.cooldown.gf = 0,
				es.cooldown.fe = 0,
				es.cooldown.minerar = 0,
				es.cooldown.auxilio = 0,
				es.cooldown.adotar = 0,
				es.cooldown.usarAdotar = 0,
				es.cooldown.treinarPet = 0,
				es.cooldown.work = 0,
				es.cooldown.bitcoin = 0,
				es.cooldown.estudar = 0,
				es.cooldown.beijar = 0,
				es.cooldown.abracar = 0,
				es.cooldown.dancar = 0,
				es.cooldown.pescar = 0,
				es.cooldown.salario = 0,
				es.cooldown.apostar = 0,
				es.cooldown.usarApostar = 0,
				es.cooldown.crime = 0,
				es.cooldown.trabalhoComunitario = 0,
				es.cooldown.roubarVeiculo = 0,
				es.cooldown.roubar = 0,
				es.cooldown.garimpar = 0,
				es.cooldown.diminuirpena = 0,
				es.estudos.matematica = 0,
				es.estudos.portugues = 0,
				es.estudos.quimica = 0,
				es.estudos.fisica = 0,
				es.estudos.biologia = 0,
				es.estudos.historia = 0,
				es.estudos.geografia = 0,
				es.fabricagem.fabricandoArma = false,
				es.fabricagem.fabricandoDroga = false,
				es.fabricagem.fabricandoChaves = false,
				es.fabricagem.fabricandoMunicao = false,
				es.fabricagem.armas.tempo = 0,
				es.fabricagem.armas.quantia = 0,
				es.fabricagem.armas.nome = '',
				es.fabricagem.armas.emoji = '',
				es.fabricagem.drogas.tempo = 0,
				es.fabricagem.drogas.quantia = 0,
				es.fabricagem.drogas.nome = '',
				es.fabricagem.drogas.emoji = '',
				es.fabricagem.chaves.tempo = 0,
				es.fabricagem.chaves.quantia = 0,
				es.fabricagem.chaves.nome = '',
				es.fabricagem.chaves.emoji = '',
				es.fabricagem.municoes.tempo = 0,
				es.fabricagem.municoes.quantia = 0,
				es.fabricagem.municoes.nome = '',
				es.fabricagem.municoes.emoji = '';

				await es.save();
			});

			return message.reply({
				content: 'Pronto!'
			});
		} else {
			if (!args[0]) {
				return message.reply({
					content: 'Coloque o **ID** de um usuário!'
				});
			}

			const user = await this.client.database.users.findOne({
				userId: args[0],
				guildId: message.guild.id
			});

			if (!user) {
				return message.reply({
					content: 'Não achei esse usuário no **banco de dados** desse servidor!'
				});
			}

			if (!args[1]) {
				return message.reply({
					content: 'Coloque: **cooldown**/**crime**/**prisao**/**policia**/**estudos**/**usos**/**bitcoin**/**fabricagem**/**banco**'
				});
			}

			if (args[1] === 'cooldown') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'cooldown.gf': 0,
						'cooldown.fe': 0,
						'cooldown.minerar': 0,
						'cooldown.auxilio': 0,
						'cooldown.adotar': 0,
						'cooldown.usarAdotar': 0,
						'cooldown.treinarPet': 0,
						'cooldown.work': 0,
						'cooldown.bitcoin': 0,
						'cooldown.estudar': 0,
						'cooldown.beijar': 0,
						'cooldown.abracar': 0,
						'cooldown.dancar': 0,
						'cooldown.pescar': 0,
						'cooldown.salario': 0,
						'cooldown.apostar': 0,
						'cooldown.usarApostar': 0,
						'cooldown.crime': 0,
						'cooldown.trabalhoComunitario': 0,
						'cooldown.roubarVeiculo': 0,
						'cooldown.roubar': 0,
						'cooldown.garimpar': 0,
						'cooldown.diminuirpena': 0
					}
				});
			} else if (args[1] === 'usos') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						usarAdotar: 0,
						usarApostar: 0
					}
				});
			} else if (args[1] === 'bitcoin') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'investimento.investido': 0,
						'investimento.dobro': 0
					}
				});
			} else if (args[1] === 'estudos') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'estudos.matematica': 0,
						'estudos.portugues': 0,
						'estudos.quimica': 0,
						'estudos.fisica': 0,
						'estudos.biologia': 0,
						'estudos.historia': 0,
						'estudos.geografia': 0
					}
				});
			} else if (args[1] === 'policia') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'policia.prender': 0,
						'policia.revistar': 0,
						'policia.prenderRoubar': 0,
						'policia.prenderExportador': 0
					}
				});
			} else if (args[1] === 'prisao') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
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
			} else if (args[1] === 'crime') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'crime.reputacao': 0,
						'crime.feito': 0,
						'crime.dinheiro': 0
					}
				});
			} else if (args[1] === 'fabricagem') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'fabricagem.fabricandoArma': false,
						'fabricagem.fabricandoDroga': false,
						'fabricagem.fabricandoChaves': false,
						'fabricagem.fabricandoMunicao': false,
						'fabricagem.armas.tempo': 0,
						'fabricagem.armas.quantia': 0,
						'fabricagem.armas.nome': '',
						'fabricagem.armas.emoji': '',
						'fabricagem.drogas.tempo': 0,
						'fabricagem.drogas.quantia': 0,
						'fabricagem.drogas.nome': '',
						'fabricagem.drogas.emoji': '',
						'fabricagem.chaves.tempo': 0,
						'fabricagem.chaves.quantia': 0,
						'fabricagem.chaves.nome': '',
						'fabricagem.chaves.emoji': '',
						'fabricagem.municoes.tempo': 0,
						'fabricagem.municoes.quantia': 0,
						'fabricagem.municoes.nome': '',
						'fabricagem.municoes.emoji': ''
					}
				});
			} else if (args[1] === 'banco') {
				await this.client.database.users.findOneAndUpdate({
					userId: args[0],
					guildId: message.guild.id
				}, {
					$set: {
						'payBank.cooldown': 0,
						'payBank.sucess': false
					}
				});
			}

			return message.reply({
				content: 'Pronto!'
			});
		}
	}

};
