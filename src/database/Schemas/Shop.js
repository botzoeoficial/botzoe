const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const shopSchema = new Schema({
	_id: {
		type: String
	},
	loja: {
		type: Object,
		default: {
			bebidas: [{
				emoji: '<:waterbottle:897849546409906228>',
				item: 'Água',
				preco: 1500,
				desc: '+50 sede +30 cansado +20 bravo +0 solitário'
			},
			{
				emoji: '<:strawberryjuice:897849547294916638>',
				item: 'Suco',
				preco: 2000,
				desc: '+40 sede +30 cansado +10 bravo +0 solitário'
			},
			{
				emoji: '<:pink_soda:891034945085120572>',
				item: 'Refrigerante',
				preco: 1800,
				desc: '+30 sede +20 cansado +0 bravo +10 solitário'
			},
			{
				emoji: '<:coffee:897849547244593162>',
				item: 'Café',
				preco: 800,
				desc: '+0 sede +60 cansado -20 bravo +30 solitario'
			},
			{
				emoji: '<:MonsterEnergyDrink:891035343262990366>',
				item: 'Energético',
				preco: 1200,
				desc: '+50 sede +30 cansado +0 bravo +0 solitário'
			},
			{
				emoji: '<:beer:897849547085217822>',
				item: 'Cerveja',
				preco: 2000,
				desc: '+50 sede -20 cansado -10 bravo +50 solitário'
			}
			],
			comidas: [{
				emoji: '<:burger:897849546695147551>',
				item: 'Sanduíche',
				preco: 2000,
				desc: '+90 fome -10 cansado +20 solitário'
			},
			{
				emoji: '<:pizza:897849547089399848>',
				item: 'Pizza',
				preco: 1500,
				desc: '+80 fome -20 cansado +60 solitário'
			},
			{
				emoji: '<:friedpotatoes:897849547957612574>',
				item: 'Batata Frita',
				preco: 900,
				desc: '+50 fome +30 cansado +20 solitário'
			},
			{
				emoji: '<:sandwich:897849547143913472>',
				item: 'Misto Quente',
				preco: 600,
				desc: '+30 fome -10 cansado -20 solitário'
			},
			{
				emoji: '<:beef:897849547538186300>',
				item: 'Carne',
				preco: 1000,
				desc: '+50 fome +40 cansado +20 solitário'
			},
			{
				emoji: '<:tacos:897849547206840410>',
				item: 'Tacos',
				preco: 1200,
				desc: '+60 fome -20 cansado +40 solitário'
			},
			{
				emoji: '<:ramen:897849546783223829>',
				item: 'Miojo',
				preco: 500,
				desc: '+40 fome -10 cansado -30 solitário'
			}
			],
			doces: [{
				emoji: '<:donut:897849546992930867>',
				item: 'Rosquinha',
				preco: 300,
				desc: '+10 fome +20 triste +30 desanimado +30 solitário -20 estressado'
			},
			{
				emoji: '<:chocolate:897849546804174848>',
				item: 'Chocolate',
				preco: 750,
				desc: '-30 fome +40 triste +40 desanimado +60 solitário +40 estressado'
			},
			{
				emoji: '<:popcorn:897849547215212584>',
				item: 'Pipoca',
				preco: 450,
				desc: '-10 fome +20 triste +40 desanimado +40 solitário +30 estressado'
			},
			{
				emoji: '<:cake:897849546913247292>',
				item: 'Bolo',
				preco: 700,
				desc: '+30 fome +30 triste +20 desanimado +20 solitário +20 estressado'
			},
			{
				emoji: '<:cookie:897849546720305175>',
				item: 'Cookie',
				preco: 550,
				desc: '+10 fome +20 triste +10 desanimado +10 solitário -10 estressado'
			}
			],
			utilidades: [{
				emoji: '<:pills:897849546862919740>',
				item: 'Remédio',
				preco: 50000,
				desc: '+100 em todos os humores\nQtde: Máx 1 remédio'
			},
			{
				emoji: '<:Varadepescar:891297733774819328>',
				item: 'Vara de Pesca',
				preco: 2000,
				desc: '+50 estressado +20 bravo\nQtde: Máx 5 varas'
			},
			{
				emoji: '<:mascara:898324362279669851>',
				item: 'Máscara',
				preco: 5000,
				desc: 'Ignora o tempo de roubar.\nQtde: 1 máscara'
			},
			{
				emoji: '<:mochila:899007409006215188>',
				item: 'Mochila',
				preco: 150000,
				desc: 'Libera 25 espaços na sua Mochila para itens.\nQtde: Máx 1 mochila'
			},
			{
				emoji: '<:Portedearmas:899766443757928489>',
				item: 'Porte de Armas',
				preco: 20000,
				desc: 'Libera o uso de Armas sem ser preso, expira em 10 dias.\nQtde: Máx 1 porte de armas'
			},
			{
				emoji: '<:transferir:900544627097108531>',
				item: 'Transferir',
				preco: 10000,
				desc: 'Transfira um item da sua **mochila** ou **inventário** para outro usuário.\nQtde: 1 transferir'
			}
			],
			pm: [{
				emoji: '<:algema:898326104413188157>',
				item: 'Algemas',
				preco: 20000,
				desc: 'Usado para algemar e Prender um meliante.\nQtde: Máx 1 algema'
			},
			{
				emoji: '<:Mp5:901117948180168724>',
				item: 'MP5',
				preco: 350000,
				desc: 'Arma específica para policial, necessário para prender em qualquer ocasião.\nQtde: Máx 1 MP5'
			},
			{
				emoji: '<:G18:901117282003075072>',
				item: 'G18',
				preco: 200000,
				desc: 'Arma específica para policial, necessário para prender em qualquer ocasião.\nQtde: Máx 1 G18'
			},
			{
				emoji: '<:bala:905653668643241985>',
				item: 'Munição Pistola',
				preco: 15000,
				desc: 'Munição para Pistola.\nQtde: 1 (vem 5)'
			},
			{
				emoji: '<:balaassalto:905653521846784080>',
				item: 'Munição Metralhadora',
				preco: 25000,
				desc: 'Munição para Metralhadora.\nQtde: 1 (vem 5)'
			}
			],
			bitcoin: [{
				emoji: '<:bolso:908780753884696706>',
				item: 'Bolso',
				preco: 100,
				desc: 'Aumenta +200 a quantidade de itens no seu inventário no servidor que você comprar.\nQtde: Só pode ser comprado 1 vez'
			}, {
				emoji: '<:bulletproofvest:919034790940921906>',
				item: 'Colete à Prova de Balas',
				preco: 10,
				desc: 'Diminui em 70% a chance de ser atingido por um tiro.\nQtde: Só pode ser comprado 1 vez'
			}],
			sementes: [{
				emoji: '<:maca:911706991783735306>',
				item: 'Semente de Maçã',
				preco: 800,
				desc: 'Maçã só pode ser plantada em **Fazenda 1**\nQtde: 5 sementes',
				venda: 421
			},
			{
				emoji: '<:banana:911706991297187851>',
				item: 'Semente de Banana',
				preco: 900,
				desc: 'Banana só pode ser plantada em **Fazenda 1**\nQtde: 5 sementes',
				venda: 685
			},
			{
				emoji: '<:laranja:911706992056365176>',
				item: 'Semente de Laranja',
				preco: 1100,
				desc: 'Laranja só pode ser plantada em **Fazenda 1**\nQtde: 5 sementes',
				venda: 790
			},
			{
				emoji: '<:limao:911706991217496075>',
				item: 'Semente de Limão',
				preco: 750,
				desc: 'Limão só pode ser plantada em **Fazenda 1**\nQtde: 5 sementes',
				venda: 1000
			},
			{
				emoji: '<:pera:911706991796301874>',
				item: 'Semente de Pêra',
				preco: 1500,
				desc: 'Pêra só pode ser plantada em **Fazenda 2**\nQtde: 5 sementes',
				venda: 948
			},
			{
				emoji: '<:morango:911706991280410755>',
				item: 'Semente de Morango',
				preco: 1800,
				desc: 'Morango só pode ser plantada em **Fazenda 2**\nQtde: 5 sementes',
				venda: 1369
			},
			{
				emoji: '<:tomate:911706991599173653>',
				item: 'Semente de Tomate',
				preco: 2100,
				desc: 'Tomate só pode ser plantada em **Fazenda 2**\nQtde: 5 sementes',
				venda: 2106
			},
			{
				emoji: '<:abacaxi:911706991804678144>',
				item: 'Semente de Abacaxi',
				preco: 2500,
				desc: 'Abacaxi só pode ser plantada em **Fazenda 3**\nQtde: 5 sementes',
				venda: 1632
			},
			{
				emoji: '<:melao:911706991766933574>',
				item: 'Semente de Melão',
				preco: 2900,
				desc: 'Melão só pode ser plantada em **Fazenda 3**\nQtde: 5 sementes',
				venda: 1790
			},
			{
				emoji: '<:manga:911706991594995732>',
				item: 'Semente de Manga',
				preco: 3300,
				desc: 'Manga só pode ser plantada em **Fazenda 3**\nQtde: 5 sementes',
				venda: 2790
			},
			{
				emoji: '<:pessego:911706991632736316>',
				item: 'Semente de Pêssego',
				preco: 3900,
				desc: 'Pêssego só pode ser plantada em **Fazenda 4**\nQtde: 5 sementes',
				venda: 3105
			},
			{
				emoji: '<:cereja:911706991934734406>',
				item: 'Semente de Cereja',
				preco: 4400,
				desc: 'Cereja só pode ser plantada em **Fazenda 4**\nQtde: 5 sementes',
				venda: 2211
			},
			{
				emoji: '<:melancia:911706991808884776>',
				item: 'Semente de Melancia',
				preco: 5000,
				desc: 'Melancia só pode ser plantada em **Fazenda 4**\nQtde: 5 sementes',
				venda: 2579
			},
			{
				emoji: '<:cafe:911706991615950898>',
				item: 'Semente de Café',
				preco: 3900,
				desc: 'Café só pode ser plantada em **Fazenda 5**\nQtde: 5 sementes',
				venda: 4100
			},
			{
				emoji: '<:milho:911706992400298056>',
				item: 'Semente de Milho',
				preco: 4400,
				desc: 'Milho só pode ser plantada em **Fazenda 5**\nQtde: 5 sementes',
				venda: 3237
			},
			{
				emoji: '<:arroz:911706991670493214>',
				item: 'Semente de Arroz',
				preco: 5000,
				desc: 'Arroz só pode ser plantada em **Fazenda 5**\nQtde: 5 sementes',
				venda: 5263
			}
			],
			utilidadesAgro: [{
				emoji: '<:adubo:898326104782299166>',
				item: 'Adubo',
				preco: 100,
				desc: 'Diminui em 15 min o tempo de plantação, pode ser usado a cada 1 hora.\nQtde: 1'
			},
			{
				emoji: '<:fertilizante:898326105126215701>',
				item: 'Fertilizante',
				preco: 150,
				desc: 'Diminui em 15 min o tempo de plantação, pode ser usado a cada 1 hora.\nQtde: 1'
			},
			{
				emoji: '<:irrigador:898326105361113099>',
				item: 'Irrigação',
				preco: 130,
				desc: 'Diminui em 15 min o tempo de plantação, pode ser usado a cada 1 hora.\nQtde: 1'
			},
			{
				emoji: '<:trator:911776845144416287>',
				item: 'Aluguel Trator',
				preco: 300,
				desc: 'Diminui em 15 min o tempo de plantação, pode ser usado a cada 1 hora.\nQtde: 1'
			},
			{
				emoji: '<:agricultor:911776844724969532>',
				item: 'Agricultor',
				preco: 200000,
				desc: 'O Agricultor irá plantar e colher suas plantações por 3 dias.\nQtde: 1'
			}
			]
		}
	}
});

const Shop = mongoose.model('Shops', shopSchema);
module.exports = Shop;
