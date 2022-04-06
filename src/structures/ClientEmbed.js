const {
	MessageEmbed
} = require('discord.js');

module.exports = class ClientEmbed extends MessageEmbed {

	constructor(author, options) {
		super(options);

		this.setColor('#C27C0E');
	}

};
