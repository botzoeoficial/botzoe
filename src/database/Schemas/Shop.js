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
				emoji: '🥤',
				item: 'Água',
				preco: 1500,
				desc: '+50 sede +30 cansado +20 bravo +0 solitário'
			},
			{
				emoji: '🧃',
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
				emoji: '☕',
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
				emoji: '🍻',
				item: 'Cerveja',
				preco: 2000,
				desc: '+50 sede -20 cansado -10 bravo +50 solitário'
			}
			],
			comidas: [{
				emoji: '🍔',
				item: 'Sanduíche',
				preco: 2000,
				desc: '+90 fome -10 cansado +20 solitário'
			},
			{
				emoji: '🍕',
				item: 'Pizza',
				preco: 1500,
				desc: '+80 fome -20 cansado +60 solitário'
			},
			{
				emoji: '🍟',
				item: 'Batata Frita',
				preco: 900,
				desc: '+50 fome +30 cansado +20 solitário'
			},
			{
				emoji: '🥪',
				item: 'Misto Quente',
				preco: 600,
				desc: '+30 fome -10 cansado -20 solitário'
			},
			{
				emoji: '🥩',
				item: 'Carne',
				preco: 1000,
				desc: '+50 fome +40 cansado +20 solitário'
			},
			{
				emoji: '🌮',
				item: 'Tacos',
				preco: 1200,
				desc: '+60 fome -20 cansado +40 solitário'
			},
			{
				emoji: '🍜',
				item: 'Miojo',
				preco: 500,
				desc: '+40 fome -10 cansado -30 solitário'
			}
			],
			doces: [{
				emoji: '🍩',
				item: 'Rosquinha',
				preco: 300,
				desc: '+10 fome +20 triste +30 desanimado +30 solitário -20 estressado'
			},
			{
				emoji: '🍫',
				item: 'Chocolate',
				preco: 750,
				desc: '-30 fome +40 triste +40 desanimado +60 solitário +40 estressado'
			},
			{
				emoji: '🍿',
				item: 'Pipoca',
				preco: 450,
				desc: '-10 fome +20 triste +40 desanimado +40 solitário +30 estressado'
			},
			{
				emoji: '🍰',
				item: 'Bolo',
				preco: 700,
				desc: '+30 fome +30 triste +20 desanimado +20 solitário +20 estressado'
			},
			{
				emoji: '🍪',
				item: 'Cookie',
				preco: 550,
				desc: '+10 fome +20 triste +10 desanimado +10 solitário -10 estressado'
			}
			],
			utilidades: [{
				emoji: '💊',
				item: 'Remédio',
				preco: 50000,
				desc: '+100 em todos os humores'
			},
			{
				emoji: '<:Varadepescar:891297733774819328>',
				item: 'Vara de Pesca',
				preco: 2000,
				desc: '+50 estressado +20 bravo\nQtde: Máx 5 varas'
			}
			]
		}
	}
});

const Shop = mongoose.model('Shops', shopSchema);
module.exports = Shop;
