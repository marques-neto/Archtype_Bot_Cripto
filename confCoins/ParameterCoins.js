const Coins = require('./Coins');
let Parameter_Coins = [];
for (let i = 0; i < Coins.length; i++) {
    Parameter_Coins.push(
        {
            name: Coins[i],
            priceCurrent: 0,
            priceAltered: 0,
            priceBuy: 0,
            decimal: 0,
            quantity: 0,
            isBuy: false,
            purchaseValue: 0
        }
    ); 
}
module.exports = Parameter_Coins;