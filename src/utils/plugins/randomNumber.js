module.exports = (minValue, maxValue) => {
	var math = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
	return math;
};
