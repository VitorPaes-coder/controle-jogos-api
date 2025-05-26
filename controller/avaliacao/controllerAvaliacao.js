/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Avaliação
 * Data: 22/02/2025
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const avaliacaoDAO = require('../../model/DAO/avaliacao.js')

//Import das controlleres para criar as relações com o avaliacao
const controllerUsuario   = require('../usuario/controllerUsuario.js')
const controllerJogo   = require('../jogo/controllerJogo.js')

//Função para tratar a inserção de uma nova avaliacao no DAO
const inserirAvaliacao = async function(avaliacao, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    avaliacao.nota       == ''   || avaliacao.nota        == undefined   || avaliacao.nota       == null   || avaliacao.nota.length > 10 ||
                    avaliacao.comentario == undefined ||
                    avaliacao.id_usuario == ''   || avaliacao.id_usuario  == undefined   ||
                    avaliacao.id_jogo    == ''   || avaliacao.id_jogo     == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultAvaliacao = await avaliacaoDAO.insertAvaliacao(avaliacao)

                    if(resultAvaliacao)
                        return message.SUCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error);

        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um avaliacao no DAO
const atualizarAvaliacao = async function(avaliacao, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (
                    avaliacao.nota       == ''   || avaliacao.nota        == undefined   || avaliacao.nota       == null   || avaliacao.nota.length > 10 ||
                    avaliacao.comentario == undefined ||
                    avaliacao.id_usuario == ''   || avaliacao.id_usuario  == undefined   ||
                    avaliacao.id_jogo    == ''   || avaliacao.id_jogo     == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

                    if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                        if(resultAvaliacao.length > 0 ){
                            //Update
                            //Adiciona o ID do avaliacao no JSON com os dados
                            avaliacao.id = parseInt(id)

                            let result = await avaliacaoDAO.updateAvaliacao(avaliacao)

                            if(result){
                                return message.SUCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um avaliacao no DAO
const excluirAvaliacao = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                //Se existir, faremos o delete
                if(resultAvaliacao.length > 0){
                    //delete
                    let result = await avaliacaoDAO.deleteAvaliacao(parseInt(id))

                    if(result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error);

        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de avaliacaos do DAO
const listarAvaliacao = async function(){
    try {

        //Objeto do tipo array para utilizar no foreach para carregar os dados 
        //do avaliacao e da usuario
        const arrayAvaliacoes = []

        //Objeto do tipo JSON
        let dadosAvaliacao = {}
        //Chama a função para retornar os avaliacaos cadastrados
        let resultAvaliacao = await avaliacaoDAO.selectAllAvaliacao()

        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
            if(resultAvaliacao.length > 0){

                dadosAvaliacao.status = true
                dadosAvaliacao.status_code = 200
                dadosAvaliacao.items = resultAvaliacao.length

                for(itemAvaliacao of resultAvaliacao){

                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemAvaliacao.id_usuario)
                        let dadosJogo = await controllerJogo.buscarJogo(itemAvaliacao.id_jogo)
                        
                        itemAvaliacao.usuario = dadosUsuario.data
                        itemAvaliacao.jogo = dadosJogo.data

                        delete itemAvaliacao.id_usuario
                        delete itemAvaliacao.id_jogo

                    arrayAvaliacoes.push(itemAvaliacao)
                }
                dadosAvaliacao.data = arrayAvaliacoes

                return dadosAvaliacao
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um avaliacao filtrando pelo ID do DAO
const buscarAvaliacao = async function(id){
    try {

        let arrayAvaliacoes = []
        
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosAvaliacao = {}

            let resultAvaliacao = await avaliacaoDAO.selectByIdAvaliacao(parseInt(id))
            
            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosAvaliacao.status = true
                    dadosAvaliacao.status_code = 200

                    //o foreach não consegue trabalhar com requisições async e await
                    for(itemAvaliacao of resultAvaliacao){
                        //Busca os dados da classificação na controller de classificação
                        //Utilizando o ID da classificação (Chave estrangeira)
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemAvaliacao.id_usuario)
                        let dadosJogo = await controllerJogo.buscarJogo(itemAvaliacao.id_jogo)
                        
                        //Adicionando um atributo "usuario" no JSON de avaliacaos
                        itemAvaliacao.usuario = dadosUsuario.data
                        itemAvaliacao.jogo = dadosJogo.data
                        //Remove o atributo id_usuario do JSON de avaliacaos, pois já temos
                        //o ID dentro dos dados da classificação
                        delete itemAvaliacao.id_usuario
                        //Adiciona o JSON do avaliacao, agora com os dados da classificação
                        //em um array
                        arrayAvaliacoes.push(itemAvaliacao)
                    }

                    dadosAvaliacao.data = arrayAvaliacoes

                    return dadosAvaliacao //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        console.log(error);

        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarAvaliacao,
    buscarAvaliacao
}