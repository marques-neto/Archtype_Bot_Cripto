const RSI = require('technicalindicators').RSI;
const Constants = require('../const/Constants');

/**
 * Aqui temos os parâmetros de configuração e os candles selecionados para realização das
 * estratégias.
 *
 * @param list
 *      Lista vazia que ira ser usada para quardar os valores de fechando retornado da binance.
 *
 * @param resultRSI {resultRSI: ''}
 *      Variável que irá receber o calculo feito pelo indicador SRSI e popular os candles.
 *
 * @param candles {candlesRsi: ''}
 *      Os Candles que serão usados para interação dentro da estratégia É usado apenas 5 (cinco) candles
 *      fora o índice oscilante.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
let ConfigurationParameters = function (list, resultRSI, candles) {
    resultRSI.resultRSI = RSI.calculate({
        values: list,
        period: Constants.period
    });
    candles.candlesRsi = {
        oscillatingIndex: resultRSI.resultRSI[Constants.candleOscillatingIndex],
        one: resultRSI.resultRSI[Constants.candleOne],
        two: resultRSI.resultRSI[Constants.candleTwo],
        three: resultRSI.resultRSI[Constants.candleThree],
        four: resultRSI.resultRSI[Constants.candleFour],
        five: resultRSI.resultRSI[Constants.candleFive]
    };
};
module.exports = ConfigurationParameters;