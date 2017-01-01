/**
 * calculates the MRR
 *
 * @author rbole <rbole@samlinux.at>
 */

(function(){
	'use strict';
	var _ = require('lodash');
	var moment = require('moment');
	var SubsModel = require('./SubsModel.js');
	/**
 	 * Represents a CalcMerr object
 	 * @constructor
 	 */
	var CalcMrr = function(config,data){
		// Some config data in particular start- and enddate for the required periode
		this.Config = config;

		// basedata for calculation
		this.Data = data;
		
		// includes the result
		this.Result = [];

		// Period start value
		this.StartMoment = {};

		// Period end value
		this.EndMoment = {};

		// for debugging
		this.Debug = false;

		// starts the calculation
		this.init();
	};	

	/**
	 * starts the calculation
	 */
	CalcMrr.prototype.init = function(){
		// setup the timeframe 
		this.setTimeFrame();

		// create the base model based on the timeframe
		this.createDataGrid();

		// to the calc
		this.calcRevenue();
	};

	/**
	 * assign the subscription to the current month
	 */
	CalcMrr.prototype.calcRevenue = function(){
		var _this = this;
		var _currentMonthBeginn, _currentMonthBeginnEnd;
		
		_.forEach(this.Result, function(month, keyResult){
			_currentMonthBeginn = _this.getFirstOfMonth(month.month);
			_currentMonthBeginnEnd = _this.getLastOfMonth(month.month);
			
			if(_this.Debug) console.log(month.month);
			
			_.forEach(_this.Data, function(subscription, subscriptionKey){
				if(moment(subscription.beginn).isSameOrBefore(_currentMonthBeginnEnd,'month')){
					// there is an end
					if(_.has(subscription,'end')){
						if(moment(subscription.end).isSameOrAfter(_currentMonthBeginnEnd,'month')){
							if(_this.Debug) console.log('--',subscription.beginn,subscription.amount);	

							_this.Result[keyResult].subscriptions.push(subscription);
						}
					}
					// there is no end at this time
					else {
						if(_this.Debug) console.log('--',subscription.beginn,subscription.amount);	
					
						_this.Result[keyResult].subscriptions.push(subscription);
					}
				}
			});
			if(_this.Debug) console.log('------');
		});
	};

	/**
	 * create the base structure
	 */
	CalcMrr.prototype.createDataGrid = function(){
		var model = {};
		var startMoment = _.cloneDeep(this.StartMoment);
		var endMoment = this.EndMoment;

		for (startMoment; startMoment.isBefore(endMoment); startMoment.add(1, 'month')) {
			model = new SubsModel();
			_.set(model,'month',startMoment.format('YYYY-MM-DD'));
			_.set(model,'subscriptions',[]);
			
			this.Result.push(model);
		}
	};

	/**
	 * set the monthly raster
	 */
	CalcMrr.prototype.setTimeFrame = function(){
		this.StartMoment = moment(this.Config.start);
		this.EndMoment = moment(this.Config.end);
	};

	/**
	 * helper: get the first date of a month
	 */
	CalcMrr.prototype.getFirstOfMonth = function(month){
		var firstOfMonth = moment(month).format('YYYY-MM');
			firstOfMonth += '-01';
		return firstOfMonth;
	};

	/**
	 * helper: get the last date of a month
	 */
	CalcMrr.prototype.getLastOfMonth = function(month){
		var lastOfMonth = moment(month).format('YYYY-MM');
		lastOfMonth += '-'+moment(month).endOf('month').format('DD');
		return lastOfMonth;
	};

	/**
	 * Returns the calculated MRR for the given periode
	 * @returns {Array}
	 */
	CalcMrr.prototype.getResult = function(){
		return this.Result;
	};

	module.exports = CalcMrr;
})();