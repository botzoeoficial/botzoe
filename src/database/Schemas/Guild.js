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
		default: '++'
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
		valorAlfa: {
			type: Number,
			default: 0
		},
		valorSonhos: {
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
			type: Date,
			default: null
		}
	}
});

const Guild = mongoose.model('Guilds', guildSchema);
module.exports = Guild;
