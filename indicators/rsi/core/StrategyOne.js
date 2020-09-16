const ConstantsUsefull = require('../../usefull/ConstantsUsefull');

/**
 * Primeira estratégia referente ao indicador RSI para indicação de compra e/ou venda.
 *
 * @param candles {candlesRsi: ''}
 *      Os Candles que serão usados para interação dentro da estratégia.
 *
 * @param statsRsiFinal {statsRsiFinal: ''}
 *      Variável que irá receber o status de tendência que será usado na condicional de compra e/ou venda.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
let StrategyOne = function (candles, statsRsiFinal) {
    if (candles.candlesRsi.one > candles.candlesRsi.two) {
        if (candles.candlesRsi.two > candles.candlesRsi.three) {
            if (candles.candlesRsi.three > candles.candlesRsi.four) {
                if (candles.candlesRsi.four > candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fallPossible;
                    }
                } else if (candles.candlesRsi.four <= candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesRsi.three <= candles.candlesRsi.four) {
                if (candles.candlesRsi.four <= candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesRsi.four <= candles.candlesRsi.five) {
                if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                    statsRsiFinal.statsRsiFinal = ConstantsUsefull.high;
                }
            }
        } else if (candles.candlesRsi.two <= candles.candlesRsi.three) {
            if (candles.candlesRsi.three <= candles.candlesRsi.four) {
                if (candles.candlesRsi.four <= candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesRsi.three > candles.candlesRsi.four) {
                if (candles.candlesRsi.four > candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.high;
                    }
                }
            }
        }
    } else if (candles.candlesRsi.one <= candles.candlesRsi.two) {
        if (candles.candlesRsi.two <= candles.candlesRsi.three) {
            if (candles.candlesRsi.three <= candles.candlesRsi.four) {
                if (candles.candlesRsi.four <= candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex > candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.highPossible;
                    } else if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one){
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fall;
                    }
                } else if (candles.candlesRsi.four > candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex< candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fall;
                    }
                }
            } else if (candles.candlesRsi.three > candles.candlesRsi.four) {
                if (candles.candlesRsi.four > candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fall;
                    }
                }
            }
        } else if (candles.candlesRsi.two> candles.candlesRsi.three) {
            if (candles.candlesRsi.three > candles.candlesRsi.four) {
                if (candles.candlesRsi.four > candles.candlesRsi.five) {
                    if (candles.candlesRsi.oscillatingIndex < candles.candlesRsi.one) {
                        statsRsiFinal.statsRsiFinal = ConstantsUsefull.fall;
                    }
                }
            }
        }
    }
};
module.exports = StrategyOne;