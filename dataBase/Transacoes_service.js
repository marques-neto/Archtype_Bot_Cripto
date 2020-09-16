const axios = require('axios');

class Transacoes_service {

    constructor(){
    }

    cadastroTransacao (transacoesModel){

        axios.post('http://localhost:3002/cadastro', {
            nome: transacoesModel.nome,
            preco: transacoesModel.preco,
            venda: transacoesModel.venda,
            estado: transacoesModel.estado,
            percentual: transacoesModel.percentual
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    listaTransacao (){

       let promise = axios.get('http://localhost:3002/lista')
            .then(function (sucesso) {
                return sucesso.data;

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        return promise;


    }
}
module.exports = Transacoes_service;