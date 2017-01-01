#MRR (monthly recurring revenue)

This project calculates to MRR for a given period. 

The result is an array with a monthly-raster and all subscriptions which belongs to the current month. With a loop you can get all result like described above

```
_.forEach(mrr, function(month){
    console.log(month.month, 'Turnover:', month.getTurnover(),'Subscriper: ',month.getSubscriberSum()); 
});
```


## Data-source
Example see mockData.js

As data-source the program expected the following structure:

```
var data = [];
var sub = {
    'beginn':'2017-01-01',
    'typ':'monthly',
    'amount':1200
};
data.push(sub);
```

## Run the program
node index.js 
