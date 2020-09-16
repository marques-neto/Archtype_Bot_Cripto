const modelTransacoes = require('../dataBase/model/ModelTransacoes');
const Transacoes_service = require('../dataBase/Transacoes_service');
const transacoes_service = new Transacoes_service();
const constantsUsefull = require('./usefull/ConstantsUsefull');
const decimalPlaces = require('../confCoins/DecimalPlaces');
const currencyChange = require('../confCoins/CurrencyChange');
const chalk = require('chalk');

/**
 * Método que realiza a venda na binance.
 *
 * @param position {position: ''}
 *      Posição da moeda nas listas.
 *
 * @param parametersCoins
 *      Parâmetros de configuração das moedas.
 *
 * @param coins
 *      Lista de moedas que estão sendo operadas.
 *
 * @param clientBinance
 *      Cliente da binance autenticado.
 *
 * @author Daniel Silva Marcelino
 */
let sell = function (position, parametersCoins, coins, clientBinance) {
    if (parametersCoins[position.position].isBuy) {
        const nomeMoedaAtual = coins[position.position] + 'BTC';

        // SERVICE
        const venda = parametersCoins[position.position].priceCurrent;
        const compra = parametersCoins[position.position].priceBuy;
        const estado = parametersCoins[position.position].priceBuy < venda ? 'GANHO' : 'PERCA';
        let percentual = (((venda) / compra - (venda * constantsUsefull.percentualTaxa) / compra) - ((compra) / compra - (compra * constantsUsefull.percentualTaxa) / compra)) * 100;
        percentual = percentual.toFixed(constantsUsefull.fractionDigits) + '%';
        // FIM - SERVICE

        let valorDeVenda = parseFloat(parametersCoins[position.position].quantity);
        // SUBTRACAO DE MOEDA QUE JÁ HAVIA NA BANCA
        // TAXA BINANCE
        let casas = parametersCoins[position.position].decimal;
        let valorFormatado = decimalPlaces.call(this, valorDeVenda, casas);
        let nome = coins[position.position];

        if (valorDeVenda) {
            // VALOR DE MOEDAS VENDIDAS INTEIRO ---------------------------------------------------------------------
            clientBinance.order({
                symbol: nomeMoedaAtual,
                side: 'SELL',
                type: 'MARKET',
                quantity: valorFormatado
            }).then(
                success => {
                    console.log('VALOR DE VENDA : ', success);
                    console.log('MOEDA VENDIDA : ', coins[position.position], ', PRECO COMPPRA : ', parametersCoins[position.position].priceBuy, ', PRECO VENDA : ', parametersCoins[position.position].priceCurrent, ', QTD : ', valorFormatado);

                    parametersCoins[position.position].isBuy = 0;
                    modelTransacoes.nome = nome;
                    modelTransacoes.preco = compra;
                    modelTransacoes.venda = venda;
                    modelTransacoes.estado = estado;
                    modelTransacoes.percentual = percentual;
                    transacoes_service.cadastroTransacao(modelTransacoes);
                    currencyChange.call(this, position, coins);
                    console.log('VENDEU');
                }
            ).catch(
                error => {
                    console.log('ERRO : ', error);
                }
            );
            console.log('VENDEU');
        } else {
            console.log(chalk.yellow('AGUARDANDO MOMENTO'));
            currencyChange.call(this, position, coins);
        }
    } else {
        console.log(chalk.yellow('VOCE NAO COMPROU ESSA MOEDA PARA LIQUIDAR'));
        currencyChange.call(this, position, coins);
    }
};
module.exports = sell;