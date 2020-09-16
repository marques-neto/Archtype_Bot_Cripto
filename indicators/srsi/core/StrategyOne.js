const ConstantsUsefull = require('../../usefull/ConstantsUsefull');

/**
 * Primeira estratégia referente ao indicador SRSI para indicação de compra e/ou venda.
 *
 * @param candles {candlesSrsi: ''}
 *      Os Candles que serão usados para interação dentro da estratégia.
 *
 * @param statsSrsiFinal {statsSrsiFinal: ''}
 *      Variável que irá receber o status de tendência que será usado na condicional de compra e/ou venda.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
let StrategyOne = function (candles, statsSrsiFinal) {
    if (candles.candlesSrsi.one > candles.candlesSrsi.two) {
        if (candles.candlesSrsi.two > candles.candlesSrsi.three) {
            if (candles.candlesSrsi.three > candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four > candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fallPossible;
                    }
                } else if (candles.candlesSrsi.four <= candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one){
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesSrsi.three <= candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four <= candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesSrsi.four <= candles.candlesSrsi.five) {
                if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                    statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.high;
                }
            }
        } else if (candles.candlesSrsi.two <= candles.candlesSrsi.three) {
            if (candles.candlesSrsi.three <= candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four <= candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.high;
                    } else if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesSrsi.three > candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four > candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.high;
                    }
                }
            }
        }
    } else if (candles.candlesSrsi.one <= candles.candlesSrsi.two) {
        if (candles.candlesSrsi.two <= candles.candlesSrsi.three) {
            if (candles.candlesSrsi.three <= candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four > candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fall;
                    }
                } else if (candles.candlesSrsi.oscillatingIndex > candles.candlesSrsi.one) {
                    statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.highPossible;
                } else if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                    statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fall;
                }
            } else if (candles.candlesSrsi.three > candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four > candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fall;
                    }
                }
            }
        } else if (candles.candlesSrsi.two > candles.candlesSrsi.three) {
            if (candles.candlesSrsi.three > candles.candlesSrsi.four) {
                if (candles.candlesSrsi.four > candles.candlesSrsi.five) {
                    if (candles.candlesSrsi.oscillatingIndex < candles.candlesSrsi.one) {
                        statsSrsiFinal.statsSrsiFinal = ConstantsUsefull.fall;
                    }
                }
            }
        }
    }
};
module.exports = StrategyOne;