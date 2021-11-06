module.exports = (time) => {
	const days = Math.floor(time / 86400000);
	const hours = Math.floor((time % 86400000) / 3600000);
	const minutes = Math.floor(((time % 86400000) % 3600000) / 60000);
	const seconds = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000);
	return `\`${days}\`d \`${hours}\`h \`${minutes}\`m \`${seconds}\`s`;
};
