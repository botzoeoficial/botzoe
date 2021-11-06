const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const commandSchema = new Schema({
	_id: {
		type: String
	},
	usages: {
		type: Number,
		default: 0
	},
	manutenção: {
		type: Boolean,
		default: false
	},
	reason: {
		type: String
	}
});

const Command = mongoose.model('Commands', commandSchema);
module.exports = Command;
