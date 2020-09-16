const SRSI = require('technicalindicators').StochasticRSI;
const Constants = require('../const/Constants');
const ConstantsUsefull = require('../../usefull/ConstantsUsefull');

/**
 * Aqui temos os parâmetros de configuração e os candles selecionados para realização das
 * estratégias.
 *
 * @param list
 *      Lista vazia que ira ser usada para quardar os valores de fechando retornado da binance.
 *
 * @param resultSRSI {resultSRSI: ''}
 *      Variável que irá receber o calculo feito pelo indicador SRSI e popular os candles.
 *
 * @param candles {candlesSrsi: ''}
 *      Os Candles que serão usados para interação dentro da estratégia É usado apenas 5 (cinco) candles
 *      fora o índice oscilante.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
ConfigurationParameters = function (list, resultSRSI, candles) {
    resultSRSI.resultSRSI = SRSI.calculate({
        values: list,
        rsiPeriod: Constants.rsiPeriod,
        stochasticPeriod: Constants.stochasticPeriod,
        kPeriod: Constants.kPeriod,
        dPeriod: Constants.dPeriod
    });
    candles.candlesSrsi = {
        oscillatingIndex: parseFloat(resultSRSI.resultSRSI[Constants.candleOscillatingIndex].k.toFixed(ConstantsUsefull.decimal)),
        one: parseFloat(resultSRSI.resultSRSI[Constants.candleOne].k.toFixed(ConstantsUsefull.decimal)),
        two: parseFloat(resultSRSI.resultSRSI[Constants.candleTwo].k.toFixed(ConstantsUsefull.decimal)),
        three: parseFloat(resultSRSI.resultSRSI[Constants.candleThree].k.toFixed(ConstantsUsefull.decimal)),
        four: parseFloat(resultSRSI.resultSRSI[Constants.candleFour].k.toFixed(ConstantsUsefull.decimal)),
        five: parseFloat(resultSRSI.resultSRSI[Constants.candleFive].k.toFixed(ConstantsUsefull.decimal))
    };
};
module.exports = ConfigurationParameters;