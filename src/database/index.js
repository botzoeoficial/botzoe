/* eslint-disable id-length */
/* eslint-disable no-process-env */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const c = require('colors');

module.exports = {
	start() {
		try {
			mongoose.connect('mongodb+srv://zoe:zoetd2@cluster0.sx7ct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			});
			console.log(c.green(`[DATABASE] - Conectado ao Banco de Dados.`));
		} catch (err) {
			if (err) return console.log(c.red(`[DATABASE] - ERROR:`, +err));
		}
	}
};
