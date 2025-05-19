/************************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD de pais_desenvolvedora
 * Data: 18/05/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 ********************************************************************************************/

// Importando o arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD de dados no Banco de Dados
const paisDesenvolvedoraDAO = require('../../model/DAO/paisDesenvolvedora.js')

// Função para inserir um novo pais_desenvolvedora
const inserirPaisDesenvolvedora = async function(paisDesenvolvedora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                paisDesenvolvedora.id_pais == '' || paisDesenvolvedora.id_pais == undefined || paisDesenvolvedora.id_pais == null || isNaN(paisDesenvolvedora.id_pais) || paisDesenvolvedora.id_pais <= 0 ||
                paisDesenvolvedora.id_desenvolvedora == '' || paisDesenvolvedora.id_desenvolvedora == undefined || paisDesenvolvedora.id_desenvolvedora == null || isNaN(paisDesenvolvedora.id_desenvolvedora) || paisDesenvolvedora.id_desenvolvedora <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let result = await paisDesenvolvedoraDAO.insertPaisDesenvolvedora(paisDesenvolvedora)
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

// Função para atualizar um pais_desenvolvedora existente
const atualizarPaisDesenvolvedora = async function(id, paisDesenvolvedora, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                paisDesenvolvedora.id_pais == '' || paisDesenvolvedora.id_pais == undefined || paisDesenvolvedora.id_pais == null || isNaN(paisDesenvolvedora.id_pais) || paisDesenvolvedora.id_pais <= 0 ||
                paisDesenvolvedora.id_desenvolvedora == '' || paisDesenvolvedora.id_desenvolvedora == undefined || paisDesenvolvedora.id_desenvolvedora == null || isNaN(paisDesenvolvedora.id_desenvolvedora) || paisDesenvolvedora.id_desenvolvedora <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultPaisDesenvolvedora = await paisDesenvolvedoraDAO.selectByIdPaisDesenvolvedora(parseInt(id))
                if(resultPaisDesenvolvedora != false || typeof(resultPaisDesenvolvedora) == 'object'){
                    if(resultPaisDesenvolvedora.length > 0){
                        paisDesenvolvedora.id = parseInt(id)
                        let result = await paisDesenvolvedoraDAO.updatePaisDesenvolvedora(paisDesenvolvedora)
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

// Função para excluir um pais_desenvolvedora existente
const excluirPaisDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let resultPaisDesenvolvedora = await paisDesenvolvedoraDAO.selectByIdPaisDesenvolvedora(parseInt(id))
            if(resultPaisDesenvolvedora != false || typeof(resultPaisDesenvolvedora) == 'object'){
                if(resultPaisDesenvolvedora.length > 0){
                    let result = await paisDesenvolvedoraDAO.deletePaisDesenvolvedora(parseInt(id))
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

// Função para listar todos os pais_desenvolvedora
const listarPaisDesenvolvedora = async function(){
    try {
        let dadosPaisDesenvolvedora = {}

        let resultPaisDesenvolvedora = await paisDesenvolvedoraDAO.selectAllPaisDesenvolvedora()

        if(resultPaisDesenvolvedora != false || typeof(resultPaisDesenvolvedora) == 'object'){
            if(resultPaisDesenvolvedora.length > 0){

                dadosPaisDesenvolvedora.status = true
                dadosPaisDesenvolvedora.status_code = 200
                dadosPaisDesenvolvedora.items = resultPaisDesenvolvedora.length
                dadosPaisDesenvolvedora.data = resultPaisDesenvolvedora
                return dadosPaisDesenvolvedora

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

// Função para buscar um pais_desenvolvedora pelo ID
const buscarPaisDesenvolvedora = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let dadosPaisDesenvolvedora = {}

            let resultPaisDesenvolvedora = await paisDesenvolvedoraDAO.selectByIdPaisDesenvolvedora(parseInt(id))

            if(resultPaisDesenvolvedora != false || typeof(resultPaisDesenvolvedora) == 'object'){
                if(resultPaisDesenvolvedora.length > 0){

                    dadosPaisDesenvolvedora.status = true
                    dadosPaisDesenvolvedora.status_code = 200
                    dadosPaisDesenvolvedora.data = resultPaisDesenvolvedora

                    return dadosPaisDesenvolvedora //200
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

// Função para buscar países por id da desenvolvedora
const buscarPaisPorDesenvolvedora = async function(idDesenvolvedora){
    try {
        if(idDesenvolvedora == '' || idDesenvolvedora == undefined || idDesenvolvedora == null || isNaN(idDesenvolvedora) || idDesenvolvedora <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosPais = {}

            let resultPais = await paisDesenvolvedoraDAO.selectPaisByIdDesenvolvedora(parseInt(idDesenvolvedora))
            
            if(resultPais != false || typeof(resultPais) == 'object'){
                if(resultPais.length > 0){
                    dadosPais.status = true
                    dadosPais.status_code = 200
                    dadosPais.paises = resultPais

                    return dadosPais //200
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

// Função para buscar desenvolvedoras por id do país
const buscarDesenvolvedoraPorPais = async function(idPais){
    try {
        if(idPais == '' || idPais == undefined || idPais == null || isNaN(idPais) || idPais <=0){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosDesenvolvedora = {}

            let resultDesenvolvedora = await paisDesenvolvedoraDAO.selectDesenvolvedoraByIdPais(parseInt(idPais))
            
            if(resultDesenvolvedora != false || typeof(resultDesenvolvedora) == 'object'){
                if(resultDesenvolvedora.length > 0){
                    dadosDesenvolvedora.status = true
                    dadosDesenvolvedora.status_code = 200
                    dadosDesenvolvedora.desenvolvedoras = resultDesenvolvedora

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

module.exports = {
    inserirPaisDesenvolvedora,
    atualizarPaisDesenvolvedora,
    excluirPaisDesenvolvedora,
    listarPaisDesenvolvedora,
    buscarPaisDesenvolvedora,
    buscarPaisPorDesenvolvedora,
    buscarDesenvolvedoraPorPais
}