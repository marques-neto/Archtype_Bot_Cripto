const currencyChange = require('../confCoins/CurrencyChange');
const decimalPlaces = require('../confCoins/DecimalPlaces');
const constantsUsefull = require('./usefull/ConstantsUsefull');
const chalk = require('chalk');

/**
 * Método que realiza a compra na binance.
 *
 * @param position {position: ''}
 *      Posição para pegar a moeda na lista.
 *
 * @param coins
 *      Lista com as moedas a serem operadas.
 *
 * @param parameterCoins
 *      Objeto com os parametros das moedas utilizadas.
 *
 * @param initialValues
 *      Valores iniciais das moedas que estão sendo operadas.
 *
 * @param clientBinance
 *      Cliente da binance autenticado.
 *
 * @author Daniel Silva Marcelino
 */
let buy = function (position, coins, parameterCoins, initialValues, clientBinance) {
    if (parameterCoins[position.position].isBuy) {
        currencyChange.call(this, position, coins);
        console.log(chalk.green('VOCE JÁ COMPROU ESTA MOEDA!'));
    } else {
        const bancaUSDT = parseFloat(initialValues[0].value),
            porcentademBancaUSDT = bancaUSDT * constantsUsefull.percentualBanca,
            valorMoedaPosicao = parameterCoins[position.position].priceCurrent;
        parameterCoins[position.position].priceAltered = valorMoedaPosicao;
        const nomeMoedaAtual = coins[position.position] + 'BTC';
        let valorDeCompra = porcentademBancaUSDT / valorMoedaPosicao;

        valorDeCompra = valorDeCompra + (valorDeCompra * constantsUsefull.percentualTaxa);

        let casas = parameterCoins[position.position].decimal;
        let valorFormatado = decimalPlaces.call(this, valorDeCompra, casas);

        if (valorDeCompra) {
            parameterCoins[position.position].priceBuy = valorMoedaPosicao;
            parameterCoins[position.position].isBuy = true;
            // COMPRA A PRECO DE MERCADO INTEIRO ---------------------------------------------------------------------
           clientBinance.order({
                symbol: nomeMoedaAtual,
                side: 'BUY',
                type: 'MARKET',
                quantity: valorFormatado
            }).then(
                success => {
                    console.log('VALOR DE VENDA : ', success);
                    console.log(chalk.green('MOEDA COMPRADA: ', coins[position.position], ', PRECO: ', valorMoedaPosicao, ', QUANTIDADE :', valorFormatado));
                    console.log('COMPROU');
                    currencyChange.call(this, position, coins);
                }
            ).catch(
                error => {
                    console.log('error : ', error);
                }
            );
        } else {
            console.log('DEU BUG NO SISTEMA : INTERNET OU SERVICE BINANCE.');
            currencyChange.call(this, position, coins);
        }
    }
};
module.exports = buy;