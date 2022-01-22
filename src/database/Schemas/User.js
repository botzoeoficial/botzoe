const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const userSchema = new Schema({
	userId: {
		type: String
	},
	guildId: {
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
		},
		id: {
			type: String,
			default: ''
		},
		quantia: {
			type: Number,
			default: 0
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
		visitaintima: {
			type: Number,
			default: 0
		},
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
			type: Number,
			default: 0
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
		},
		apostar: {
			type: Number,
			default: 0
		},
		usarApostar: {
			type: Number,
			default: 0
		},
		crime: {
			type: Number,
			default: 0
		},
		trabalhoComunitario: {
			type: Number,
			default: 0
		},
		roubarVeiculo: {
			type: Number,
			default: 0
		},
		roubar: {
			type: Number,
			default: 0
		},
		garimpar: {
			type: Number,
			default: 0
		},
		diminuirpena: {
			type: Number,
			default: 0
		},
		atirar: {
			type: Number,
			default: 0
		},
		desmancharCarro: {
			type: Number,
			default: 0
		},
		arrumarVeiculo: {
			type: Number,
			default: 0
		},
		emplacarVeiculo: {
			type: Number,
			default: 0
		},
		liberarVeiculo: {
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
	usarApostar: {
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
			fome: 150,
			sede: 150,
			bravo: 150,
			triste: 150,
			cansado: 150,
			solitario: 150,
			estressado: 150,
			desanimado: 150
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
	},
	policia: {
		isPolice: {
			type: Boolean,
			default: false
		},
		prender: {
			type: Number,
			default: 0
		},
		revistar: {
			type: Number,
			default: 0
		},
		isFolga: {
			type: Boolean,
			default: false
		},
		prenderRoubar: {
			type: Number,
			default: 0
		},
		prenderExportador: {
			type: Number,
			default: 0
		},
		prenderAtirar: {
			type: Number,
			default: 0
		}
	},
	prisao: {
		isPreso: {
			type: Boolean,
			default: false
		},
		tempo: {
			type: Number,
			default: 0
		},
		prenderCmd: {
			type: Boolean,
			default: false
		},
		prenderMili: {
			type: Number,
			default: 0
		},
		traficoDrogas: {
			type: Boolean,
			default: false
		},
		crime: {
			type: Boolean,
			default: false
		},
		prender: {
			type: Boolean,
			default: false
		},
		revistar: {
			type: Boolean,
			default: false
		},
		roubarVeiculo: {
			type: Boolean,
			default: false
		},
		atirarPrisao: {
			type: Boolean,
			default: false
		},
		velha: {
			type: Boolean,
			default: false
		},
		frentista: {
			type: Boolean,
			default: false
		},
		joalheria: {
			type: Boolean,
			default: false
		},
		agiota: {
			type: Boolean,
			default: false
		},
		casaLoterica: {
			type: Boolean,
			default: false
		},
		brazino: {
			type: Boolean,
			default: false
		},
		facebook: {
			type: Boolean,
			default: false
		},
		bancoCentral: {
			type: Boolean,
			default: false
		},
		shopping: {
			type: Boolean,
			default: false
		},
		banco: {
			type: Boolean,
			default: false
		}
	},
	fac: {
		isFac: {
			type: Boolean,
			default: false
		},
		createFac: {
			type: Boolean,
			default: false
		},
		nome: {
			type: String,
			default: ''
		},
		dono: {
			type: String,
			default: ''
		},
		level: {
			type: Number,
			default: 1
		},
		cargos: {
			type: Array,
			default: [],
			nome: {
				type: String,
				default: ''
			}
		},
		membros: {
			type: Array,
			default: []
		},
		money: {
			type: Number,
			default: 0
		},
		xp: {
			type: Number,
			default: 0
		},
		lastWork: {
			type: Number,
			default: 0
		},
		emprego: {
			nome: {
				type: String,
				default: ''
			},
			numero: {
				type: Number,
				default: 0
			}
		},
		registro: {
			type: Array,
			default: [],
			tempo: {
				type: Number,
				default: 0
			},
			money: {
				type: Number,
				default: 0
			},
			xp: {
				type: Number,
				default: 0
			}
		}
	},
	crime: {
		reputacao: {
			type: Number,
			default: 0
		},
		feito: {
			type: Number,
			default: 0
		},
		dinheiro: {
			type: Number,
			default: 0
		}
	},
	isMochila: {
		type: Boolean,
		default: false
	},
	mochila: {
		type: Array,
		default: [],
		item: {
			type: String,
			default: ''
		},
		emoji: {
			type: Number,
			default: ''
		},
		id: {
			type: String,
			default: ''
		},
		quantia: {
			type: Number,
			default: 0
		}
	},
	garagem: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		modelo: {
			type: String,
			default: ''
		},
		valor: {
			type: Number,
			default: 0
		},
		ano: {
			type: Number,
			default: 0
		},
		danificado: {
			type: Number,
			default: 0
		},
		velocidade: {
			type: Number,
			default: 0
		},
		cavalos: {
			type: Number,
			default: 0
		},
		peso: {
			type: Number,
			default: 0
		},
		desmanche: {
			type: Number,
			default: 0
		},
		dono: {
			type: String,
			default: ''
		},
		img: {
			type: String,
			default: ''
		},
		mecanica: {
			type: Boolean,
			default: false
		},
		arrumado: {
			type: Boolean,
			default: false
		},
		emplacado: {
			type: Boolean,
			default: false
		},
		liberado: {
			type: Boolean,
			default: false
		},
		placa: {
			type: String,
			default: ''
		}
	},
	fabricagem: {
		fabricandoArma: {
			type: Boolean,
			default: false
		},
		fabricandoDroga: {
			type: Boolean,
			default: false
		},
		fabricandoChaves: {
			type: Boolean,
			default: false
		},
		fabricandoMunicao: {
			type: Boolean,
			default: false
		},
		armas: {
			tempo: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			nome: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			}
		},
		drogas: {
			tempo: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			nome: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			}
		},
		chaves: {
			tempo: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			nome: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			}
		},
		municoes: {
			tempo: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			nome: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			}
		}
	},
	armaEquipada: {
		type: String,
		default: 'Nenhuma arma equipada.'
	},
	payBank: {
		cooldown: {
			type: Number,
			default: 0
		},
		sucess: {
			type: Boolean,
			default: false
		}
	},
	casas: {
		tipo: {
			type: String,
			default: ''
		},
		nome: {
			type: String,
			default: ''
		},
		valor: {
			type: Number,
			default: 0
		},
		gif: {
			type: String,
			default: ''
		},
		quantiaItens: {
			type: Number,
			default: 0
		},
		bau: {
			type: Array,
			default: [],
			item: {
				type: String,
				default: ''
			},
			emoji: {
				type: Number,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			quantia: {
				type: Number,
				default: 0
			}
		}
	},
	fazendas: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		lote1: {
			bloqueado: {
				type: Boolean,
				default: false
			},
			fruta: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			cooldown: {
				type: Number,
				default: 0
			},
			adubo: {
				type: Number,
				default: 0
			},
			fertilizante: {
				type: Number,
				default: 0
			},
			irrigacao: {
				type: Number,
				default: 0
			},
			trator: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			id: {
				type: String,
				default: ''
			},
			fruta2: {
				type: String,
				default: ''
			}
		},
		lote2: {
			bloqueado: {
				type: Boolean,
				default: false
			},
			fruta: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			cooldown: {
				type: Number,
				default: 0
			},
			adubo: {
				type: Number,
				default: 0
			},
			fertilizante: {
				type: Number,
				default: 0
			},
			irrigacao: {
				type: Number,
				default: 0
			},
			trator: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			id: {
				type: String,
				default: ''
			},
			fruta2: {
				type: String,
				default: ''
			}
		},
		lote3: {
			bloqueado: {
				type: Boolean,
				default: true
			},
			fruta: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			cooldown: {
				type: Number,
				default: 0
			},
			adubo: {
				type: Number,
				default: 0
			},
			fertilizante: {
				type: Number,
				default: 0
			},
			irrigacao: {
				type: Number,
				default: 0
			},
			trator: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			id: {
				type: String,
				default: ''
			},
			fruta2: {
				type: String,
				default: ''
			}
		},
		lote4: {
			bloqueado: {
				type: Boolean,
				default: true
			},
			fruta: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			cooldown: {
				type: Number,
				default: 0
			},
			adubo: {
				type: Number,
				default: 0
			},
			fertilizante: {
				type: Number,
				default: 0
			},
			irrigacao: {
				type: Number,
				default: 0
			},
			trator: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			id: {
				type: String,
				default: ''
			},
			fruta2: {
				type: String,
				default: ''
			}
		},
		lote5: {
			bloqueado: {
				type: Boolean,
				default: true
			},
			fruta: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			cooldown: {
				type: Number,
				default: 0
			},
			adubo: {
				type: Number,
				default: 0
			},
			fertilizante: {
				type: Number,
				default: 0
			},
			irrigacao: {
				type: Number,
				default: 0
			},
			trator: {
				type: Number,
				default: 0
			},
			quantia: {
				type: Number,
				default: 0
			},
			id: {
				type: String,
				default: ''
			},
			fruta2: {
				type: String,
				default: ''
			}
		}
	},
	caixote: {
		type: Array,
		default: [],
		item: {
			type: String,
			default: ''
		},
		emoji: {
			type: Number,
			default: ''
		},
		id: {
			type: String,
			default: ''
		},
		quantia: {
			type: Number,
			default: 0
		}
	},
	presentes: {
		type: Number,
		default: 0
	},
	hp: {
		ferido: {
			type: Boolean,
			default: false
		},
		vida: {
			type: Number,
			default: 100
		}
	},
	cadastrandoItem: {
		type: Boolean,
		default: false
	},
	porteDeArmas: {
		type: Number,
		default: 0
	},
	fabricando: {
		type: Boolean,
		default: false
	}
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
