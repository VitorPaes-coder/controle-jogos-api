/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD da plataforma
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const plataformaDAO = require('../../model/DAO/plataforma.js')

// Import da controller para buscar jogos relacionados à plataforma
const controllerJogoPlataforma = require('../jogo-plataforma/controllerJogoPlataforma.js')

// Função para inserir uma nova plataforma
const inserirPlataforma = async function(plataforma, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                plataforma.nome == undefined || plataforma.nome == '' || plataforma.nome == null || plataforma.nome.length > 100 
            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                // Encaminha os dados da nova plataforma para serem inseridos no banco de dados
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if (resultPlataforma)
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

// Função para atualizar uma plataforma existente
const atualizarPlataforma = async function(plataforma, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (
                plataforma.nome == undefined || plataforma.nome == '' || plataforma.nome == null || plataforma.nome.length > 100 
            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                let resultPlataforma = await buscarPlataforma(parseInt(id))

                if (resultPlataforma.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    plataforma.id = parseInt(id)
                    let result = await plataformaDAO.updatePlataforma(plataforma)

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultPlataforma.status_code == 404) {
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

// Função para excluir uma plataforma existente
const excluirPlataforma = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            // Chama a função para deletar a plataforma pelo id
            let resultPlataforma = await buscarPlataforma(parseInt(id))

            if (resultPlataforma.status_code == 200) {
                let result = await plataformaDAO.deletePlataforma(parseInt(id))

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }
            } else if (resultPlataforma.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todas as plataformas
const listarPlataforma = async function() {
    try {
        let dadosPlataformas = {}
        // Chama a função para retornar os dados das plataformas
        let resultPlataforma = await plataformaDAO.selectAllPlataforma()

        if (resultPlataforma != false || typeof resultPlataforma == 'object') {
            if (resultPlataforma.length > 0) {
                dadosPlataformas.status = true
                dadosPlataformas.status_code = 200
                dadosPlataformas.items = resultPlataforma.length

                const arrayPlataformas = []

                for (let itemPlataforma of resultPlataforma) {
                    let dadosJogo = await controllerJogoPlataforma.buscarJogoPorPlataforma(itemPlataforma.id_plataforma)
                    itemPlataforma.jogos = dadosJogo && dadosJogo.jogos ? dadosJogo.jogos : []
                    arrayPlataformas.push(itemPlataforma)
                }

                dadosPlataformas.data = arrayPlataformas
                return dadosPlataformas
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

// Função para buscar uma plataforma
const buscarPlataforma = async function(id) {
    try {
        let dadosPlataformas = {}
        // Chama a função para retornar os dados da plataforma
        let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            if (resultPlataforma != false || typeof resultPlataforma == 'object') {
                if (resultPlataforma.length > 0) {
                    const arrayPlataformas = []

                    for (let itemPlataforma of resultPlataforma) {
                        let dadosJogo = await controllerJogoPlataforma(itemPlataforma.id_plataforma)
                        itemPlataforma.jogos = dadosJogo && dadosJogo.jogos ? dadosJogo.jogos : []
                        arrayPlataformas.push(itemPlataforma)
                    }

                    dadosPlataformas.status = true
                    dadosPlataformas.status_code = 200
                    dadosPlataformas.data = arrayPlataformas

                    return dadosPlataformas
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
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPlataforma,
    buscarPlataforma
}