const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
	_id: {
		type: String
	},
	manutenção: {
		type: Boolean,
		default: false
	},
	reason: {
		type: String
	}
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
