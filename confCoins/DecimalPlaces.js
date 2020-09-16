const formatDecimal = 10;

/**
 * Ajustes casas decimais.
 *
 * @author Tiago Ferreira Dídimo
 */
let decimalPlaces = function (value, decimalPlaces) {
    const og = Math.pow(formatDecimal, decimalPlaces);
    return Math.floor(value * og) / og;
};
module.exports = decimalPlaces;