const modifier = 2.857142;  // Assuming there are 35 different vukkies this can be used to convert a number from 1 to 100 to a number between 1 and 35
module.exports = {
	convert: function(original) {
		let string = original.toString();
		return Math.floor((parseInt(string.slice(-2)) + 1) / modifier); // we are using a last 2 digits of a discord user id which is 0 - 99 so add 1 to it and divide by modifier so it is 1 to 35.
	}
};