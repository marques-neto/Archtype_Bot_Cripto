const MACD = require('technicalindicators').MACD;
const Constants = require('../const/Constants');

/**
 * Aqui temos os parâmetros de configuração e os candles selecionados para realização das
 * estratégias.
 *
 * @param list
 *      Lista vazia que ira ser usada para quardar os valores de fechando retornado da binance.
 *
 * @param resultMACD  {resultMACD: ''}
 *      Variável que irá receber o calculo feito pelo indicador SRSI e popular os candles.
 *
 * @param candles {candlesMacd: ''}
 *      Os Candles que serão usados para interação dentro da estratégia É usado apenas 5 (cinco) candles
 *      fora o índice oscilante.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
let ConfigurationParameters = function (list, resultMACD, candles) {
    resultMACD.resultMACD = MACD.calculate({
        values: list,
        fastPeriod: Constants.fastPeriod,
        slowPeriod: Constants.slowPeriod,
        signalPeriod: Constants.signalPeriod,
        SimpleMAOscillator: Constants.simpleMAOscillator,
        SimpleMASignal: Constants.simpleMASignal
    });
    candles.candlesMacd = {
        oscillatingIndex: resultMACD.resultMACD[Constants.candleOscillatingIndex].MACD,
        one: resultMACD.resultMACD[Constants.candleOne].MACD,
        two: resultMACD.resultMACD[Constants.candleTwo].MACD,
        three: resultMACD.resultMACD[Constants.candleThree].MACD,
        four: resultMACD.resultMACD[Constants.candleFour].MACD,
        five: resultMACD.resultMACD[Constants.candleFive].MACD
    };
};
module.exports = ConfigurationParameters;