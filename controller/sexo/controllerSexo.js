/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD do sexo
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const sexoDAO = require('../../model/DAO/sexo.js')

// Função para inserir um novo sexo
const inserirSexo = async function(sexo, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                sexo.nome  == undefined  || sexo.nome  == ''  || sexo.nome  == null  || sexo.nome.length  > 20 ||
                sexo.sigla == undefined  || sexo.sigla == ''  || sexo.sigla == null  || sexo.sigla.length > 1

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                // Encaminha os dados do novo sexo para serem inseridos no banco de dados
                let resultSexo = await sexoDAO.insertSexo(sexo)

                if (resultSexo)
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

// Função para atualizar um sexo existente
const atualizarSexo = async function(sexo, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (

                sexo.nome  == undefined  || sexo.nome  == ''  || sexo.nome  == null  || sexo.nome.length  > 20 ||
                sexo.sigla == undefined  || sexo.sigla == ''  || sexo.sigla == null  || sexo.sigla.length > 1

            ) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
            } else {
                let resultSexo = await buscarSexo(parseInt(id))

                if (resultSexo.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    sexo.id = parseInt(id)
                    let result = await sexoDAO.updateSexo(sexo)

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (resultSexo.status_code == 404) {
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

// Função para excluir um sexo existente
const excluirSexo = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            // Chama a função para deletar o sexo pelo id
            let resultSexo = await buscarSexo(parseInt(id))

            if (resultSexo.status_code == 200) {
                let result = await sexoDAO.deleteSexo(parseInt(id))

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }
            } else if (resultSexo.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos os sexos
const listarSexo = async function() {
    try {
        let dadosSexos = {}
        // Chama a função para retornar os dados dos sexos
        let resultSexo = await sexoDAO.selectAllSexo()

        if (resultSexo != false || typeof resultSexo == 'object') {
            if (resultSexo.length > 0) {
                dadosSexos.status = true
                dadosSexos.status_code = 200
                dadosSexos.items = resultSexo.length
                dadosSexos.data = resultSexo

                return dadosSexos
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

// Função para buscar um sexo
const buscarSexo = async function(id) {
    try {
        let dadosSexos = {}
        // Chama a função para retornar os dados do sexo
        let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        } else {
            if (resultSexo != false || typeof resultSexo == 'object') {
                if (resultSexo.length > 0) {
                    dadosSexos.status = true
                    dadosSexos.status_code = 200
                    dadosSexos.data = resultSexo

                    return dadosSexos
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo,
}