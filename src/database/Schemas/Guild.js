const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const guildSchema = new Schema({
	_id: {
		type: String
	},
	prefix: {
		type: String,
		default: '//'
	},
	editor: {
		type: Array,
		default: [],
		id: {
			type: String,
			default: ''
		}
	},
	eventos: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		tag: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: ''
		},
		hour: {
			type: String,
			default: ''
		}
	},
	blacklist: {
		type: Array,
		default: [],
		nick: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ''
		},
		saldo: {
			type: Number,
			default: 0
		},
		adicionado: {
			type: String,
			default: ''
		},
		motivo: {
			type: String,
			default: ''
		}
	},
	missoes: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		desc: {
			type: String,
			default: ''
		}
	},
	banco: {
		type: Array,
		default: [],
		nick: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ''
		},
		valor: {
			type: Number,
			default: 0
		},
		dia: {
			type: String,
			default: ''
		},
		hora: {
			type: String,
			default: ''
		},
		status: {
			type: String,
			default: ''
		},
		timestamps: {
			type: Number
		}
	},
	canal: {
		type: Array,
		default: [],
		id: {
			type: String,
			default: ''
		}
	},
	bolsa: {
		valor: {
			type: Number,
			default: 0
		},
		tempo: {
			type: Number,
			default: Date.now()
		}
	},
	card: {
		type: Array,
		default: [],
		codigo: {
			type: String,
			default: ''
		},
		valorZoe: {
			type: Number,
			default: 0
		},
		valorBtc: {
			type: Number,
			default: 0
		},
		ativado: {
			type: Boolean,
			default: false
		},
		ativadoPor: {
			type: String,
			default: ''
		}
	},
	vip: {
		type: Array,
		default: [],
		id: {
			type: String,
			default: ''
		},
		tempo: {
			type: Number,
			default: 0
		}
	},
	cidade: {
		governador: {
			type: String,
			default: ''
		},
		delegado: {
			type: String,
			default: ''
		},
		policiais: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		carcereiro: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		diretorHP: {
			type: String,
			default: ''
		},
		medicos: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		impeachment: {
			existe: {
				type: Boolean,
				default: false
			},
			cooldown: {
				type: Number,
				default: 0
			},
			message: {
				type: String,
				default: ''
			},
			emoji: {
				type: String,
				default: ''
			},
			channel: {
				type: String,
				default: ''
			},
			quantia: {
				type: Number,
				default: 0
			}
		},
		eleicao: {
			existe: {
				type: Boolean,
				default: false
			},
			cooldown: {
				type: Number,
				default: 0
			},
			message: {
				type: String,
				default: ''
			},
			channel: {
				type: String,
				default: ''
			}
		},
		golpeEstado: {
			existe: {
				type: Boolean,
				default: false
			},
			cooldown: {
				type: Number,
				default: 0
			},
			message: {
				type: String,
				default: ''
			},
			channel: {
				type: String,
				default: ''
			},
			caos: {
				type: Boolean,
				default: false
			}
		},
		alterarBolsa: {
			type: Number,
			default: 0
		},
		setDelegado: {
			type: Number,
			default: 0
		},
		folgaPolicia: {
			type: Number,
			default: 0
		},
		folgaPoliciaRemove: {
			type: Number,
			default: 0
		},
		donoFavela: {
			type: String,
			default: ''
		},
		donoFabricadeArmas: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		donoFabricadeDrogas: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		donoDesmanche: {
			type: String,
			default: ''
		},
		donoLavagem: {
			type: String,
			default: ''
		},
		ajudanteDesmanche: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		ajudanteLavagem: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		mecanico: {
			type: Array,
			default: [],
			id: {
				type: String,
				default: ''
			}
		},
		tempoGovernador: {
			type: Number,
			default: 0
		}
	},
	faccoes: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		criado: {
			type: String,
			default: ''
		},
		membros: {
			type: Array,
			default: []
		},
		level: {
			type: Number,
			default: 0
		},
		money: {
			type: Number,
			default: 0
		}
	},
	mercadoNegro: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		quantia: {
			type: Number,
			default: 0
		},
		preco: {
			type: Number,
			default: 0
		},
		dono: {
			type: String,
			default: ''
		},
		tempo: {
			type: Number,
			default: 0
		},
		tempo2: {
			type: Number,
			default: 0
		},
		emoji: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			default: ''
		},
		comprado: {
			type: Boolean,
			default: false
		}
	},
	mecanica: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		dono: {
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
		img: {
			type: String,
			default: ''
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
		}
	},
	bank: {
		type: Number,
		default: 0
	},
	exportador: {
		canal: {
			type: String,
			default: ''
		},
		precisandoQuantia: {
			type: Number,
			default: 0
		},
		precisandoDroga: {
			type: String,
			default: 'Nenhuma Droga'
		},
		irEmbora: {
			type: Number,
			default: 0
		},
		quantiaQueFalta: {
			type: Number,
			default: 0
		}
	},
	desmanche: {
		type: Array,
		default: [],
		nome: {
			type: String,
			default: ''
		},
		dono: {
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
		img: {
			type: String,
			default: ''
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
		}
	},
	hospital: {
		type: Array,
		default: [],
		usuario: {
			type: String,
			default: ''
		},
		entrada: {
			type: Number,
			default: Date.now()
		}
	}
});

const Guild = mongoose.model('Guilds', guildSchema);
module.exports = Guild;
