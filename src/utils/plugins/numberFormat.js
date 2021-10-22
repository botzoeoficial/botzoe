module.exports = (number) => {
	var numero = number.toFixed(0).split('.');
	numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
	return numero.join(',');
};
