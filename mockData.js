var data = [];

var sub = {
	'beginn':'2017-01-01',
	'typ':'monthly',
	'amount':350
};
data.push(sub);

var sub = {
	'beginn':'2017-01-01',
	'typ':'yearly',
	'amount':1200
};
data.push(sub);

var sub = {
	'beginn':'2017-01-01',
	'typ':'quarterly',
	'amount':300
};
data.push(sub);

var sub = {
	'beginn':'2017-01-10',
	'typ':'monthly',
	'amount':650
};
data.push(sub);

sub = {
	'beginn':'2017-02-01',
	'end':'2017-06-30',
	'typ':'monthly',
	'amount':650
};
data.push(sub);

sub = {
	'beginn':'2017-04-01',
	'end':'2017-10-01',
	'typ':'monthly',
	'amount':650
};

data.push(sub);

module.exports = data;