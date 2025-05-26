/************************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD de jogo_plataforma
 * Data: 18/05/25
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
 ********************************************************************************************/

// Importando o arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD de dados no Banco de Dados
const jogoPlataformaDAO = require('../../model/DAO/jogoPlataforma.js')

// Função para inserir um novo jogo_plataforma
const inserirJogoPlataforma = async function(jogoPlataforma, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                jogoPlataforma.id_jogo   == '' || jogoPlataforma.id_jogo   == undefined || jogoPlataforma.id_jogo   == null || isNaN(jogoPlataforma.id_jogo)   || jogoPlataforma.id_jogo   <= 0 ||
                jogoPlataforma.id_plataforma == '' || jogoPlataforma.id_plataforma == undefined || jogoPlataforma.id_plataforma == null || isNaN(jogoPlataforma.id_plataforma) || jogoPlataforma.id_plataforma <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let result = await jogoPlataformaDAO.insertJogoPlataforma(jogoPlataforma)
                if(result)
                    return MESSAGE.SUCESS_CREATED_ITEM
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para atualizar um jogo_plataforma existente
const atualizarJogoPlataforma = async function(jogoPlataforma, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                jogoPlataforma.id_jogo   == '' || jogoPlataforma.id_jogo   == undefined || jogoPlataforma.id_jogo   == null || isNaN(jogoPlataforma.id_jogo)   || jogoPlataforma.id_jogo   <= 0 ||
                jogoPlataforma.id_plataforma == '' || jogoPlataforma.id_plataforma == undefined || jogoPlataforma.id_plataforma == null || isNaN(jogoPlataforma.id_plataforma) || jogoPlataforma.id_plataforma <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultJogoPlataforma = await jogoPlataformaDAO.selectByIdJogoPlataforma(parseInt(id))
                if(resultJogoPlataforma != false || typeof(resultJogoPlataforma) == 'object'){
                    if(resultJogoPlataforma.length > 0){
                        jogoPlataforma.id = parseInt(id)
                        let result = await jogoPlataformaDAO.updateJogoPlataforma(jogoPlataforma)
                        if(result)
                            return MESSAGE.SUCESS_UPDATED_ITEM
                        else
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    } else {
                        return MESSAGE.ERROR_NOT_FOUND
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para excluir um jogo_plataforma existente
const excluirJogoPlataforma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let resultJogoPlataforma = await jogoPlataformaDAO.selectByIdJogoPlataforma(parseInt(id))
            if(resultJogoPlataforma != false || typeof(resultJogoPlataforma) == 'object'){
                if(resultJogoPlataforma.length > 0){
                    let result = await jogoPlataformaDAO.deleteJogoPlataforma(parseInt(id))
                    if(result)
                        return MESSAGE.SUCESS_DELETED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return MESSAGE.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos os jogo_plataforma
const listarJogoPlataforma = async function(){
    try {
        let dadosJogoPlataforma = {}

        let resultJogoPlataforma = await jogoPlataformaDAO.selectAllJogoPlataforma()

        if(resultJogoPlataforma != false || typeof(resultJogoPlataforma) == 'object'){
            if(resultJogoPlataforma.length > 0){

                dadosJogoPlataforma.status = true
                dadosJogoPlataforma.status_code = 200
                dadosJogoPlataforma.items = resultJogoPlataforma.length
                dadosJogoPlataforma.data = resultJogoPlataforma
                return dadosJogoPlataforma

            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um jogo_plataforma pelo ID
const buscarJogoPlataforma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let dadosJogoPlataforma = {}

            let resultJogoPlataforma = await jogoPlataformaDAO.selectByIdJogoPlataforma(parseInt(id))

            if(resultJogoPlataforma != false || typeof(resultJogoPlataforma) == 'object'){
                if(resultJogoPlataforma.length > 0){

                    dadosJogoPlataforma.status = true
                    dadosJogoPlataforma.status_code = 200
                    dadosJogoPlataforma.data = resultJogoPlataforma

                    return dadosJogoPlataforma //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para buscar plataformas por id do jogo
const buscarPlataformaPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosPlataforma = {}

            let resultPlataforma = await jogoPlataformaDAO.selectPlataformaByIdJogo(parseInt(idJogo))
            
            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if(resultPlataforma.length > 0){
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.plataforma = resultPlataforma

                    return dadosPlataforma //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para buscar jogos por id da plataforma
const buscarJogoPorPlataforma = async function(idPlataforma){
    try {
        if(idPlataforma == '' || idPlataforma == undefined || idPlataforma == null || isNaN(idPlataforma) || idPlataforma <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosJogo = {}

            let resultJogo = await jogoPlataformaDAO.selectJogoByIdPlataforma(parseInt(idPlataforma))
            
            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){
                    dadosJogo.status = true
                    dadosJogo.status_code = 200
                    dadosJogo.jogos = resultJogo

                    return dadosJogo //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirJogoPlataforma,
    atualizarJogoPlataforma,
    excluirJogoPlataforma,
    listarJogoPlataforma,
    buscarJogoPlataforma,
    buscarPlataformaPorJogo,
    buscarJogoPorPlataforma
}