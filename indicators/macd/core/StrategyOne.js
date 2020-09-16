const ConstantsUsefull = require('../../usefull/ConstantsUsefull');

/**
 * Primeira estratégia referente ao indicador MACD para indicação de compra e/ou venda.
 *
 * @param candles {candlesMacd: ''}
 *      Os Candles que serão usados para interação dentro da estratégia.
 *
 * @param statsMacdFinal {statsMacdFinal: ''}
 *      Variável que irá receber o status de tendência que será usado na condicional de compra e/ou venda.
 *
 * @constructor
 * @author Daniel Silva Marcelino
 */
let StrategyOne = function (candles, statsMacdFinal) {
    if (candles.candlesMacd.one > candles.candlesMacd.two) {
        if (candles.candlesMacd.two > candles.candlesMacd.three) {
            if (candles.candlesMacd.three > candles.candlesMacd.four) {
                if (candles.candlesMacd.four > candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.high;
                    } else if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fallPossible;
                    }
                } else if (candles.candlesMacd.four <= candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal= ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesMacd.three <= candles.candlesMacd.four) {
                if (candles.candlesMacd.four <= candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.high;
                    } else if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesMacd.four <= candles.candlesMacd.five) {
                if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                    statsMacdFinal.statsMacdFinal = ConstantsUsefull.high;
                }
            }
        } else if (candles.candlesMacd.two <= candles.candlesMacd.three) {
            if (candles.candlesMacd.three <= candles.candlesMacd.four) {
                if (candles.candlesMacd.four <= candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.high;
                    } else if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fallPossible;
                    }
                }
            } else if (candles.candlesMacd.three > candles.candlesMacd.four) {
                if (candles.candlesMacd.four > candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.high;
                    }
                }
            }
        }
    } else if (candles.candlesMacd.one <= candles.candlesMacd.two) {
        if (candles.candlesMacd.two <= candles.candlesMacd.three) {
            if (candles.candlesMacd.three <= candles.candlesMacd.four) {
                if (candles.candlesMacd.four <= candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex > candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.highPossible;
                    } else if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fall;
                    }
                } else if (candles.candlesMacd.four > candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fall;
                    }
                }
            } else if (candles.candlesMacd.three > candles.candlesMacd.four) {
                if (candles.candlesMacd.four > candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fall;
                    }
                }
            }
        } else if (candles.candlesMacd.two > candles.candlesMacd.three) {
            if (candles.candlesMacd.three > candles.candlesMacd.four) {
                if (candles.candlesMacd.four > candles.candlesMacd.five) {
                    if (candles.candlesMacd.oscillatingIndex < candles.candlesMacd.one) {
                        statsMacdFinal.statsMacdFinal = ConstantsUsefull.fall;
                    }
                }
            }
        }
    }
};
module.exports = StrategyOne;