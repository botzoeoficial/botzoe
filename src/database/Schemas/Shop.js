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
				preco: 25000,
				desc: 'Libera 25 espaços na sua Mochila para itens.\nQtde: Máx 1 mochila'
			},
			{
				emoji: '<:Portedearmas:899766443757928489>',
				item: 'Porte de Armas',
				preco: 20000,
				desc: 'Libera o uso de Armas sem ser preso, expira em 10 dias.\nQtde: Máx 1 porte de armas'
			}
			],
			pm: [{
				emoji: '<:algema:898326104413188157>',
				item: 'Algemas',
				preco: 2000,
				desc: 'Usado para algemar e Prender um meliante.\nQtde: Máx 1 algema'
			},
			{
				emoji: '<:Mp5:901117948180168724>',
				item: 'MP5',
				preco: 55000,
				desc: 'Arma específica para policial, necessário para prender em qualquer ocasião.\nQtde: Máx 1 MP5'
			},
			{
				emoji: '<:G18:901117282003075072>',
				item: 'G18',
				preco: 28000,
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
				preco: 150,
				desc: 'Aumenta +200 a quantidade de itens no seu inventário no servidor que você comprar.\nQtde: Só pode ser comprado 1 vez'
			}]
		}
	}
});

const Shop = mongoose.model('Shops', shopSchema);
module.exports = Shop;
