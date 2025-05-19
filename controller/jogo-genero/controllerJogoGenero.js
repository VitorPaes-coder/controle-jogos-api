/************************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD de jogo_genero
 * Data: 18/05/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 ********************************************************************************************/

// Importando o arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD de dados no Banco de Dados
const jogoGeneroDAO = require('../../model/DAO/jogoGenero.js')

// Função para inserir um novo jogo_genero
const inserirJogoGenero = async function(jogoGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                jogoGenero.id_jogo   == '' || jogoGenero.id_jogo   == undefined || jogoGenero.id_jogo   == null || isNaN(jogoGenero.id_jogo)   || jogoGenero.id_jogo   <= 0 ||
                jogoGenero.id_genero == '' || jogoGenero.id_genero == undefined || jogoGenero.id_genero == null || isNaN(jogoGenero.id_genero) || jogoGenero.id_genero <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let result = await jogoGeneroDAO.insertJogoGenero(jogoGenero)
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

// Função para atualizar um jogo_genero existente
const atualizarJogoGenero = async function(id, jogoGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                jogoGenero.id_jogo   == '' || jogoGenero.id_jogo   == undefined || jogoGenero.id_jogo   == null || isNaN(jogoGenero.id_jogo)   || jogoGenero.id_jogo   <= 0 ||
                jogoGenero.id_genero == '' || jogoGenero.id_genero == undefined || jogoGenero.id_genero == null || isNaN(jogoGenero.id_genero) || jogoGenero.id_genero <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))
                if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                    if(resultJogoGenero.length > 0){
                        jogoGenero.id = parseInt(id)
                        let result = await jogoGeneroDAO.updateJogoGenero(jogoGenero)
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

// Função para excluir um jogo_genero existente
const excluirJogoGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))
            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                if(resultJogoGenero.length > 0){
                    let result = await jogoGeneroDAO.deleteJogoGenero(parseInt(id))
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

// Função para listar todos os jogo_genero
const listarJogoGenero = async function(){
    try {
        let dadosJogoGenero = {}

        let resultJogoGenero = await jogoGeneroDAO.selectAllJogoGenero()

        if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
            if(resultJogoGenero.length > 0){

                dadosJogoGenero.status = true
                dadosJogoGenero.status_code = 200
                dadosJogoGenero.items = resultJogoGenero.length
                dadosJogoGenero.data = resultJogoGenero
                return dadosJogoGenero

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

// Função para buscar um jogo_genero pelo ID
const buscarJogoGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let dadosJogoGenero = {}

            let resultJogoGenero = await jogoGeneroDAO.selectByIdJogoGenero(parseInt(id))

            if(resultJogoGenero != false || typeof(resultJogoGenero) == 'object'){
                if(resultJogoGenero.length > 0){

                    dadosJogoGenero.status = true
                    dadosJogoGenero.status_code = 200
                    dadosJogoGenero.data = resultJogoGenero

                    return dadosJogoGenero //200
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

// Função para buscar um genero pelo ID do jogo
const buscarGeneroPorJogo = async function(idJogo){
    try {
        if(idJogo == '' || idJogo == undefined || idJogo == null || isNaN(idJogo) || idJogo <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await jogoGeneroDAO.selectGeneroByIdJogo(parseInt(idJogo))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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
    inserirJogoGenero,
    atualizarJogoGenero,
    excluirJogoGenero,
    listarJogoGenero,
    buscarJogoGenero,
    buscarGeneroPorJogo
}