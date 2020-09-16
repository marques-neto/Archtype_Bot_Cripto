/**
 * Rotacao de moeda, loop repassando as moedas .
 *
 * @author Tiago Ferreira Dídimo
 */
let currencyChange = function (position, coins) {
    if (position.position === (coins.length - 1)) {
        position.position = 0;
    } else {
        position.position++;
    }
};
module.exports = currencyChange;