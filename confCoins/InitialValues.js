const Coins = require('./Coins');
let Initial_Values = [{name: 'BTC', value: 0}];
for (let i = 0; i < Coins.length; i++) {
    Initial_Values.push(
        {
            name: Coins[i],
            value: 0
        }
    );
}
module.exports = Initial_Values;