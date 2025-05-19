/************************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD de jogo_desenvolvedora
 * Data: 18/05/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 ********************************************************************************************/

// Importando o arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD de dados no Banco de Dados
const jogoDesenvolvedoraDAO = require('../../model/DAO/jogoDesenvolvedora.js')

// Função para inserir um novo jogo_desenvolvedora
const inserirJogoDesenvolvedora = async function(jogoDesenvolvedora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                jogoDesenvolvedora.id_jogo   == '' || jogoDesenvolvedora.id_jogo   == undefined || jogoDesenvolvedora.id_jogo   == null || isNaN(jogoDesenvolvedora.id_jogo)   || jogoDesenvolvedora.id_jogo   <= 0 ||
                jogoDesenvolvedora.id_desenvolvedora == '' || jogoDesenvolvedora.id_desenvolvedora == undefined || jogoDesenvolvedora.id_desenvolvedora == null || isNaN(jogoDesenvolvedora.id_desenvolvedora) || jogoDesenvolvedora.id_desenvolvedora <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let result = await jogoDesenvolvedoraDAO.insertJogoDesenvolvedora(jogoDesenvolvedora)
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

// Função para atualizar um jogo_desenvolvedora existente
const atualizarJogoDesenvolvedora = async function(id, jogoDesenvolvedora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                jogoDesenvolvedora.id_jogo   == '' || jogoDesenvolvedora.id_jogo   == undefined || jogoDesenvolvedora.id_jogo   == null || isNaN(jogoDesenvolvedora.id_jogo)   || jogoDesenvolvedora.id_jogo   <= 0 ||
                jogoDesenvolvedora.id_desenvolvedora == '' || jogoDesenvolvedora.id_desenvolvedora == undefined || jogoDesenvolvedora.id_desenvolvedora == null || isNaN(jogoDesenvolvedora.id_desenvolvedora) || jogoDesenvolvedora.id_desenvolvedora <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))
                if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
                    if(resultJogoDesenvolvedora.length > 0){
                        jogoDesenvolvedora.id = parseInt(id)
                        let result = await jogoDesenvolvedoraDAO.updateJogoDesenvolvedora(jogoDesenvolvedora)
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

// Função para excluir um jogo_desenvolvedora existente
const excluirJogoDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))
            if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
                if(resultJogoDesenvolvedora.length > 0){
                    let result = await jogoDesenvolvedoraDAO.deleteJogoDesenvolvedora(parseInt(id))
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

// Função para listar todos os jogo_desenvolvedora
const listarJogoDesenvolvedora = async function(){
    try {
        let dadosJogoDesenvolvedora = {}

        let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectAllJogoDesenvolvedora()

        if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
            if(resultJogoDesenvolvedora.length > 0){

                dadosJogoDesenvolvedora.status = true
                dadosJogoDesenvolvedora.status_code = 200
                dadosJogoDesenvolvedora.items = resultJogoDesenvolvedora.length
                dadosJogoDesenvolvedora.data = resultJogoDesenvolvedora
                return dadosJogoDesenvolvedora

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

// Função para buscar um jogo_desenvolvedora pelo ID
const buscarJogoDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let dadosJogoDesenvolvedora = {}

            let resultJogoDesenvolvedora = await jogoDesenvolvedoraDAO.selectByIdJogoDesenvolvedora(parseInt(id))

            if(resultJogoDesenvolvedora != false || typeof(resultJogoDesenvolvedora) == 'object'){
                if(resultJogoDesenvolvedora.length > 0){

                    dadosJogoDesenvolvedora.status = true
                    dadosJogoDesenvolvedora.status_code = 200
                    dadosJogoDesenvolvedora.data = resultJogoDesenvolvedora

                    return dadosJogoDesenvolvedora //200
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

// Função para buscar desenvolvedoras por id do jogo
const buscarDesenvolvedoraPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosDesenvolvedora = {}

            let resultDesenvolvedora = await jogoDesenvolvedoraDAO.selectDesenvolvedoraByIdJogo(parseInt(idJogo))
            
            if(resultDesenvolvedora != false || typeof(resultDesenvolvedora) == 'object'){
                if(resultDesenvolvedora.length > 0){
                    dadosDesenvolvedora.status = true
                    dadosDesenvolvedora.status_code = 200
                    dadosDesenvolvedora.desenvolvedora = resultDesenvolvedora

                    return dadosDesenvolvedora //200
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

// Função para buscar jogos por id da desenvolvedora
const buscarJogoPorDesenvolvedora = async function(idDesenvolvedora){
    try {
        if(idDesenvolvedora == '' || idDesenvolvedora == undefined || idDesenvolvedora == null || isNaN(idDesenvolvedora) || idDesenvolvedora <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosJogo = {}

            let resultJogo = await jogoDesenvolvedoraDAO.selectJogoByIdDesenvolvedora(parseInt(idDesenvolvedora))
            
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
    inserirJogoDesenvolvedora,
    atualizarJogoDesenvolvedora,
    excluirJogoDesenvolvedora,
    listarJogoDesenvolvedora,
    buscarJogoDesenvolvedora,
    buscarDesenvolvedoraPorJogo,
    buscarJogoPorDesenvolvedora
}