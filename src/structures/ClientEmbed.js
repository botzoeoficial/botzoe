/* eslint-disable no-process-env */
const { MessageEmbed } = require('discord.js');

module.exports = class ClientEmbed extends MessageEmbed {

	constructor(author, options) {
		super(options);

		this.setTimestamp();
		this.setColor(process.env.EMBED);
		this.setFooter(
			`Comando executado por: ${author.tag}`,
			author.displayAvatarURL({
				dynamic: true,
				format: 'png'
			})
		);
	}

};
