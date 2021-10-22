const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const userSchema = new Schema({
	_id: {
		type: String
	},
	nick: {
		type: String,
		default: 'Não Informado.'
	},
	marry: {
		user: {
			type: String,
			default: 'Ninguém.'
		},
		has: {
			type: Boolean,
			default: false
		}
	},
	sobremim: {
		type: String,
		default: 'Use ++sobremim <mensagem> para alterar sua descrição.'
	},
	eventos: {
		type: Array,
		default: []
	},
	saldo: {
		type: Number,
		default: 0
	},
	banco: {
		type: Number,
		default: 0
	},
	bitcoin: {
		type: Number,
		default: 0
	},
	estrelas: {
		type: Array,
		default: []
	},
	emprestimos: {
		type: Number,
		default: 0
	},
	cadastrado: {
		type: Boolean,
		default: false
	},
	idade: {
		type: Number,
		default: 0
	},
	genero: {
		type: String,
		default: 'Não Informado.'
	},
	nomeReal: {
		type: String,
		default: 'Não Informado.'
	},
	orientacaoSexual: {
		type: String,
		default: 'Não Informado.'
	},
	plataformaJogo: {
		type: String,
		default: 'Não Informado.'
	},
	regiao: {
		type: String,
		default: 'Não Informado.'
	},
	funcao: {
		type: String,
		default: 'Não Informado.'
	},
	aniversario: {
		type: String,
		default: 'Não Informado.'
	},
	level: {
		type: Number,
		default: 1
	},
	xp: {
		type: Number,
		default: 1
	},
	inventory: {
		type: Array,
		default: [],
		item: {
			type: String,
			default: ''
		},
		emoji: {
			type: Number,
			default: ''
		}
	},
	familia: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		idade: {
			type: Number,
			default: 1
		},
		genero: {
			type: String,
			default: ''
		}
	},
	cooldown: {
		gf: {
			type: Number,
			default: 0
		},
		fe: {
			type: Number,
			default: 0
		},
		minerar: {
			type: Number,
			default: 0
		},
		auxilio: {
			type: Number,
			default: 0
		},
		adotar: {
			type: Number,
			default: 0
		},
		usarAdotar: {
			type: Number,
			default: 0
		},
		treinarPet: {
			type: Number,
			default: 0
		},
		work: {
			type: Number,
			default: 0
		},
		bitcoin: {
			type: Date,
			default: null
		},
		estudar: {
			type: Number,
			default: 0
		},
		beijar: {
			type: Number,
			default: 0
		},
		abracar: {
			type: Number,
			default: 0
		},
		dancar: {
			type: Number,
			default: 0
		},
		pescar: {
			type: Number,
			default: 0
		},
		salario: {
			type: Number,
			default: 0
		}
	},
	pets: {
		type: Array,
		default: [],
		animal: {
			type: String,
			default: ''
		},
		nome: {
			type: String,
			default: ''
		},
		forca: {
			type: Number,
			default: 1
		},
		idade: {
			type: Number,
			default: 1
		}
	},
	usarAdotar: {
		type: Number,
		default: 0
	},
	emprego: {
		type: String,
		default: 'Desempregado'
	},
	investimento: {
		investido: {
			type: Number,
			default: 0
		},
		dobro: {
			type: Number,
			default: 0
		}
	},
	humores: {
		type: Object,
		default: {
			fome: 100,
			sede: 100,
			bravo: 100,
			triste: 100,
			cansado: 100,
			solitario: 100,
			estressado: 100,
			desanimado: 100
		}
	},
	estudos: {
		matematica: {
			type: Number,
			default: 0
		},
		portugues: {
			type: Number,
			default: 0
		},
		quimica: {
			type: Number,
			default: 0
		},
		fisica: {
			type: Number,
			default: 0
		},
		biologia: {
			type: Number,
			default: 0
		},
		historia: {
			type: Number,
			default: 0
		},
		geografia: {
			type: Number,
			default: 0
		}
	}
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
