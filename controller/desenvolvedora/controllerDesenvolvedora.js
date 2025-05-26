/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD da desenvolvedora
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const desenvolvedoraDAO = require('../../model/DAO/desenvolvedora.js')

// Import do controller de pais desenvolvedora
const controllerPaisDesenvolvedora = require('../pais-desenvolvedora/controllerPaisDesenvolvedora.js')

// Função para inserir uma nova desenvolvedora
const inserirDesenvolvedora = async function(desenvolvedora, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                desenvolvedora.nome      == undefined || desenvolvedora.nome == '' || desenvolvedora.nome == null || desenvolvedora.nome.length > 100 ||
                desenvolvedora.descricao == undefined ||
                desenvolvedora.logo      == undefined

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                // Encaminha os dados da nova desenvolvedora para serem inseridos no banco de dados
                let resultDesenvolvedora = await desenvolvedoraDAO.insertDesenvolvedora(desenvolvedora)

                if (resultDesenvolvedora)
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

// Função para atualizar uma desenvolvedora existente
const atualizarDesenvolvedora = async function(desenvolvedora, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                desenvolvedora.nome      == undefined || desenvolvedora.nome == '' || desenvolvedora.nome == null || desenvolvedora.nome.length > 100 ||
                desenvolvedora.descricao == undefined ||
                desenvolvedora.logo      == undefined

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                let resultDesenvolvedora = await buscarDesenvolvedora(parseInt(id))

                if (resultDesenvolvedora.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    desenvolvedora.id = parseInt(id)
                    let result = await desenvolvedoraDAO.updateDesenvolvedora(desenvolvedora)

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultDesenvolvedora.status_code == 404) {
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

// Função para excluir uma desenvolvedora existente
const excluirDesenvolvedora = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            // Chama a função para deletar a desenvolvedora pelo id
            let resultDesenvolvedora = await buscarDesenvolvedora(parseInt(id))

            if (resultDesenvolvedora.status_code == 200) {
                let result = await desenvolvedoraDAO.deleteDesenvolvedora(parseInt(id))

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }
            } else if (resultDesenvolvedora.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todas as desenvolvedoras
const listarDesenvolvedora = async function() {
    try {
        const arrayDesenvolvedoras = []
        let dadosDesenvolvedoras = {}
        let resultDesenvolvedora = await desenvolvedoraDAO.selectAllDesenvolvedora()

        if (resultDesenvolvedora != false || typeof resultDesenvolvedora == 'object') {
            if (resultDesenvolvedora.length > 0) {
                dadosDesenvolvedoras.status = true
                dadosDesenvolvedoras.status_code = 200
                dadosDesenvolvedoras.items = resultDesenvolvedora.length

                for (let itemDesenvolvedora of resultDesenvolvedora) {
                    let dadosPais = await controllerPaisDesenvolvedora.buscarPaisPorDesenvolvedora(itemDesenvolvedora.id_desenvolvedora)
                    itemDesenvolvedora.paises = dadosPais.paises
                    arrayDesenvolvedoras.push(itemDesenvolvedora)
                }

                dadosDesenvolvedoras.data = arrayDesenvolvedoras
                return dadosDesenvolvedoras
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar uma desenvolvedora pelo ID
const buscarDesenvolvedora = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        }

        let dadosDesenvolvedoras = {}
        let resultDesenvolvedora = await desenvolvedoraDAO.selectByIdDesenvolvedora(parseInt(id))

        if (resultDesenvolvedora != false || typeof resultDesenvolvedora == 'object') {
            if (resultDesenvolvedora.length > 0) {

                for (let itemDesenvolvedora of resultDesenvolvedora) {
                    let dadosPais = await controllerPaisDesenvolvedora.buscarPaisPorDesenvolvedora(itemDesenvolvedora.id_desenvolvedora)
                    itemDesenvolvedora.paises = dadosPais.paises
                }

                dadosDesenvolvedoras.status = true
                dadosDesenvolvedoras.status_code = 200
                dadosDesenvolvedoras.data = resultDesenvolvedora

                return dadosDesenvolvedoras
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirDesenvolvedora,
    atualizarDesenvolvedora,
    excluirDesenvolvedora,
    listarDesenvolvedora,
    buscarDesenvolvedora,
}