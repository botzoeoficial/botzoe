const mongoose = require('mongoose');
const {
	Schema
} = mongoose;

const commandSchema = new Schema({
	_id: {
		type: String
	},
	manutenção: {
		type: Boolean,
		default: false
	},
	reason: {
		type: String,
		default: ''
	}
});

const Command = mongoose.model('Commands', commandSchema);
module.exports = Command;
