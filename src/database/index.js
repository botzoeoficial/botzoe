/* eslint-disable id-length */
/* eslint-disable no-process-env */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const c = require('colors');

module.exports = {
	start() {
		try {
			mongoose.connect(process.env.DATABASE_CONNECT, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			});

			console.log(c.green(`[DATABASE] - Conectado ao Banco de Dados.`));
		} catch (err) {
			if (err) {
				console.log(c.red(`[DATABASE] - ERROR:`));
				console.error(err);
			}
		}
	}
};
