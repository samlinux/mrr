/**
 * Base model for one subscription
 *
 * @author rbole <rbole@samlinux.at>
 */

(function(){
	'use strict';

	var SubsModel = function(){
		this.month = '';
		this.subscriptions = [];
	};	

	/**
	 * Returns the revenue per month
	 * @returns {double}
	 */
	SubsModel.prototype.getTurnover = function(){
		var revenue = 0;
		var anz = this.subscriptions.length;

		for(var i=0; i<anz;i++){
			//console.log(this.subscriptions[i]);
			if(this.subscriptions[i].typ === 'monthly'){
				revenue += this.subscriptions[i].amount;	
			}
			else if(this.subscriptions[i].typ === 'yearly'){
				revenue += (this.subscriptions[i].amount / 12);		
			}
			else if(this.subscriptions[i].typ === 'quarterly'){
				revenue += (this.subscriptions[i].amount / 3);		
			}
			// TODO: 
			else if(this.subscriptions[i].typ === 'daily'){
				var daysInMonth = 0;
				revenue += (this.subscriptions[i].amount * daysInMonth);		
			}
		}

		return revenue;				
	};

	/**
	 * Returns the number of subscripers per month
	 * @returns {number}
	 */
	SubsModel.prototype.getSubscriberSum = function(){
		var anz = this.subscriptions.length;
		return anz;				
	};

	module.exports = SubsModel;
})();