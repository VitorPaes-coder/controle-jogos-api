/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD do país
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const paisDAO = require('../../model/DAO/pais.js')

// Função para inserir um novo país
const inserirPais = async function(pais, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                pais.nome  == undefined  || pais.nome  == ''  || pais.nome  == null  || pais.nome.length  > 60 ||
                pais.sigla == undefined  || pais.sigla == ''  || pais.sigla == null  || pais.sigla.length > 2

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                // Encaminha os dados do novo país para serem inseridos no banco de dados
                let resultPais = await paisDAO.insertPais(pais)

                if (resultPais)
                    return { status_code: 201, message: MESSAGE.SUCESS_CREATED_ITEM } // 201
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL } // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para atualizar um país existente
const atualizarPais = async function(pais, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                pais.nome  == undefined  || pais.nome  == ''  || pais.nome  == null  || pais.nome.length  > 60 ||
                pais.sigla == undefined  || pais.sigla == ''  || pais.sigla == null  || pais.sigla.length > 2

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                let resultPais = await buscarPais(parseInt(id))

                if (resultPais.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    pais.id = parseInt(id)
                    let result = await paisDAO.updatePais(pais)

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultPais.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Função para excluir um país existente
const excluirPais = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            // Chama a função para deletar o país pelo id
            let resultPais = await buscarPais(parseInt(id))

            if (resultPais.status_code == 200) {
                let result = await paisDAO.deletePais(parseInt(id))

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }
            } else if (resultPais.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos os países
const listarPais = async function() {
    try {
        let dadosPaises = {}
        // Chama a função para retornar os dados dos países
        let resultPais = await paisDAO.selectAllPais()

        if (resultPais != false || typeof resultPais == 'object') {
            if (resultPais.length > 0) {
                dadosPaises.status = true
                dadosPaises.status_code = 200
                dadosPaises.items = resultPais.length
                dadosPaises.data = resultPais

                return dadosPaises
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um país
const buscarPais = async function(id) {
    try {
        let dadosPaises = {}
        // Chama a função para retornar os dados do país
        let resultPais = await paisDAO.selectByIdPais(parseInt(id))

        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            if (resultPais != false || typeof resultPais == 'object') {
                if (resultPais.length > 0) {
                    dadosPaises.status = true
                    dadosPaises.status_code = 200
                    dadosPaises.data = resultPais

                    return dadosPaises
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    inserirPais,
    atualizarPais,
    excluirPais,
    listarPais,
    buscarPais,
}