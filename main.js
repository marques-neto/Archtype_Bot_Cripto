const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const initialValues = require('./confCoins/InitialValues');
const parameterCoins = require('./confCoins/ParameterCoins');
const coins = require('./confCoins/Coins');
const currencyChange = require('./confCoins/CurrencyChange');
const constantsUsefull = require('./service/usefull/ConstantsUsefull');
const confIndicatorSrsi = require('./indicators/srsi/conf/ConfigurationParameters');
const confIndicatorRsi = require('./indicators/rsi/conf/ConfigurationParameters');
const confIndicatorMacd = require('./indicators/macd/conf/ConfigurationParameters');
const strategyOneRsi = require('./indicators/rsi/core/StrategyOne');
const strategyOneSrsi = require('./indicators/srsi/core/StrategyOne');
const strategyOneMacd = require('./indicators/macd/core/StrategyOne');
const constantsUsefullIndicators = require('./indicators/usefull/ConstantsUsefull');
const buy = require('./service/Buy');
const sell = require('./service/Sell');

const binance = require('binance-api-node').default;
clear();

// Binance API initialization //
const client = binance({
    apiKey: 'your api key',
    apiSecret: 'your secret key',
    useServerTime: true
});

var position = {position: 0};


console.log(chalk.yellow(figlet.textSync('  Moby Dick  ', { horizontalLayout: 'fitted' })));
console.log(chalk.green('your wallet:'));


client.accountInfo().then(info => {
    for (let i = 0; i < info.balances.length; i++) {
        for (let l = 0; l < initialValues.length; l++) {
            if (info.balances[i].asset === initialValues[l].name) {
                initialValues[l].value = info.balances[i].free;
            }
        }
    }
    initialValues[0].value = 0.4;
});

parameterCoins[0].decimal = 0;
parameterCoins[1].decimal = 2;
parameterCoins[2].decimal = 0;
parameterCoins[3].decimal = 0;
parameterCoins[4].decimal = 2;
parameterCoins[5].decimal = 3;
parameterCoins[6].decimal = 0;
parameterCoins[7].decimal = 0;
parameterCoins[8].decimal = 0;
parameterCoins[9].decimal = 2;

for (let i = 0; i < parameterCoins.length; i++) {
    console.log(chalk.blue(coins[i] + ', decimal places:' + parameterCoins[i].decimal));
}

/**
 * Feedback para o operador via terminal.
 *
 * @param position {position: ''}
 *      Posição relacionado a moeda atual que está sendo operada.
 *
 * @param candles {candlesRsi: '', candlesSrsi: '', candlesMacd: ''}
 *      Lista com os candles usados no calculo dos indicadores.
 *
 * @param result {resultRSI: '', resultSRSI: '', resultMACD: ''}
 *      Lista com os candles usados no calculo dos indicadores.
 *
 * @author Daniel Silva Marcelino
 */
function view(position, candles, result) {
    console.log(figlet.textSync(coins[position.position] + 'BTC', { horizontalLayout: 'fitted' }));
    console.log(chalk.green('Posicao da Moeda: ' + position.position));
    console.log(chalk.blue('Tamanho do Array Moedas: ' + coins.length));
    console.log(chalk.green('----------------------------------------------------'));
    console.log(chalk.green('COMPROU: ' + parameterCoins[position.position].isBuy));
    console.log(chalk.green('----------------------------------------------------'));
    console.log(chalk.red('R - S - I'));
    console.log(chalk.green('RI: ' + candles.candlesRsi.oscillatingIndex));
    console.log(chalk.green('R1: ' + candles.candlesRsi.one));
    console.log(chalk.green('R2: ' + candles.candlesRsi.two));
    console.log(chalk.green('R3: ' + candles.candlesRsi.three));
    console.log(chalk.green('R4: ' + candles.candlesRsi.four));
    console.log(chalk.green('R5: ' + candles.candlesRsi.five));
    console.log(chalk.green('TOTAL: ' + result.resultRSI.length));
    console.log(chalk.blue('AVALIANDO MOEDA ...'));
    console.log(chalk.red('S - R - S - I'));
    console.log(chalk.green('KI: ' + candles.candlesSrsi.oscillatingIndex));
    console.log(chalk.green('K1: ' + candles.candlesSrsi.one));
    console.log(chalk.green('K2: ' + candles.candlesSrsi.two));
    console.log(chalk.green('K3: ' + candles.candlesSrsi.three));
    console.log(chalk.green('K4: ' + candles.candlesSrsi.four));
    console.log(chalk.green('K5: ' + candles.candlesSrsi.five));
    console.log(chalk.green('TOTAL: ' + result.resultSRSI.length));
    console.log(chalk.blue('AVALIANDO MOEDA ...'));
    console.log(chalk.red('M - A - C - D'));
    console.log(chalk.green('FI: ' + candles.candlesMacd.oscillatingIndex));
    console.log(chalk.green('F1: ' + candles.candlesMacd.one));
    console.log(chalk.green('F2: ' + candles.candlesMacd.two));
    console.log(chalk.green('F3: ' + candles.candlesMacd.three));
    console.log(chalk.green('F4: ' + candles.candlesMacd.four));
    console.log(chalk.green('F5: ' + candles.candlesMacd.five));
    console.log(chalk.green('TOTAL: ' + result.resultMACD.length));
    console.log(chalk.blue('AVALIANDO MOEDA ...'));
}

/**
 * @name BOT
 *
 * @description Operação Total.
 *
 * @author Francisco Orlando Marques Neto
 *
 * @copyright BRAISCOMPANY
 *
 */
function bot() {
    client.prices().then(
        currentValue => {
            parameterCoins[position.position].priceCurrent = currentValue[parameterCoins[position.position].name + constantsUsefull.mainCurrency];
            client.accountInfo().then(
                amount => {
                    for (let i = 0; i < amount.balances.length; i++) {
                        if (amount.balances[i].asset === parameterCoins[position.position].name) {
                            parameterCoins[position.position].quantity = amount.balances[i].free;
                            break;
                        }
                    }
                    const parametros = {
                        symbol: coins[position.position] + constantsUsefull.mainCurrency,
                        interval: constantsUsefull.intervalCandlesFifteenMinutes,
                        limit: constantsUsefull.maximumCandles
                    };
                    client.candles(parametros).then(
                        candlesApi => {
                            const list = [];
                            const result = {resultSRSI: '', resultRSI: '', resultMACD: ''};
                            const candles = {candlesSrsi: '', candlesRsi: '', candlesMacd: ''};
                            const statsFinal = {
                                statsRsiFinal: constantsUsefullIndicators.initial,
                                statsSrsiFinal: constantsUsefullIndicators.initial,
                                statsMacdFinal: constantsUsefullIndicators.initial
                            };
                            for (let i = 0; i < candlesApi.length; i++) {
                                list.push(parseFloat(candlesApi[i].close));
                            }

                            confIndicatorRsi.call(this, list, result, candles);
                            confIndicatorSrsi.call(this, list, result, candles);
                            confIndicatorMacd.call(this, list, result, candles);

                            strategyOneRsi.call(this, candles, statsFinal);
                            strategyOneSrsi.call(this, candles, statsFinal);
                            strategyOneMacd.call(this, candles, statsFinal);

                            if (statsFinal.statsRsiFinal === statsFinal.statsMacdFinal ||
                                statsFinal.statsRsiFinal === statsFinal.statsSrsiFinal ||
                                statsFinal.statsSrsiFinal === statsFinal.statsMacdFinal) {
                                if (candles.candlesSrsi.one < candles.candlesMacd.one &&
                                    candles.candlesMacd.one <= constantsUsefullIndicators.highPossible &&
                                    candles.candlesRsi.oscillatingIndex <= constantsUsefull.parameterBuyIndicatorRSI &&
                                    candles.candlesSrsi.oscillatingIndex <= constantsUsefull.parameterBuyIndicatorSRSI ||
                                    candles.candlesRsi.oscillatingIndex <= constantsUsefull.parameterBuyIndicatorRSI &&
                                    candles.candlesMacd.oscillatingIndex < constantsUsefullIndicators.initial ||
                                    candles.candlesMacd.oscillatingIndex < constantsUsefullIndicators.initial &&
                                    candles.candlesSrsi.oscillatingIndex <= constantsUsefull.parameterBuyIndicatorSRSI) {
                                    buy.call(this, position, coins, parameterCoins, initialValues, client);
                                } else if (candles.candlesSrsi.oscillatingIndex >= constantsUsefullIndicators.fall &&
                                        candles.candlesRsi.one >= constantsUsefullIndicators.fall &&
                                        candles.candlesSrsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorRSI &&
                                        candles.candlesRsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorSRSI ||
                                        candles.candlesSrsi.one >= constantsUsefullIndicators.fall &&
                                        candles.candlesMacd.one >= constantsUsefullIndicators.fall &&
                                        candles.candlesSrsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorSRSI &&
                                        candles.candlesRsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorRSI ||
                                        candles.candlesRsi.one >= constantsUsefullIndicators.fall &&
                                        candles.candlesMacd.one >= constantsUsefullIndicators.fall &&
                                        candles.candlesSrsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorSRSI &&
                                        candles.candlesRsi.oscillatingIndex > constantsUsefull.parameterSellIndicatorRSI) {
                                        sell.call(this, position, parameterCoins, coins, client);
                                } else {
                                    console.log('AGUARDAR');
                                    currencyChange.call(this, position, coins);
                                }
                                view(position, candles, result);
                            } else {
                                console.log('AGUARDAR');
                                currencyChange.call(this, position, coins);
                            }
                            setTimeout(()=>{
                                bot();
                            },700);
                        }
                    ).catch(
                        error => {
                            console.log('candles', error);
                        }
                    );
                }
            ).catch(
                error => {
                    console.log('accountInfo', error);
                }
            );
        }
    ).catch(
        error => {
            console.log('prices', error);
        }
    );
}
setTimeout(()=>{
    bot();
},1000);