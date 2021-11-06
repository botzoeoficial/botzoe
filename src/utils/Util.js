const abbrev = require('./plugins/abbrev.js');
const formatNumber = require('./plugins/numberFormat');
const getRandomNumber = require('./plugins/randomNumber');
const convertMs = require('./plugins/convertMS');

module.exports = class Util {

	static toAbbrev(num) {
		return abbrev(num);
	}

	static numberFormat(num) {
		return formatNumber(num);
	}

	static randomNumber(min, max) {
		return getRandomNumber(min, max);
	}

	static convertMS(time) {
		return convertMs(time);
	}

};
