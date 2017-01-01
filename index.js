/**
 * calculates the MRR
 *
 * @author rbole <rbole@samlinux.at>
 */
var _ = require('lodash');
var CalcMrr = require('./app/CalcMrr.js');


var data = require('./mockData.js');
var config = {
	'start':'2017-01-01',
	'end':'2017-12-31'
};

var calcMrr = new CalcMrr(config,data);
var mrr = calcMrr.getResult();

_.forEach(mrr, function(month){
	console.log(month.month, 'MRR per month:', month.getTurnover(),'subscriper: ',month.getSubscriberSum());	
});



