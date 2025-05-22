/************************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
 * Data: 13/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js')

// Import das controllers para criar as relações com o jogo
const controllerJogoGenero = require('../jogo-genero/controllerJogoGenero.js')
const controllerJogoPlataforma = require('../jogo-plataforma/controllerJogoPlataforma.js')
const controllerJogoDesenvolvedora = require('../jogo-desenvolvedora/controllerJogoDesenvolvedora.js')

// Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                jogo.nome == '' || jogo.nome == undefined || jogo.nome == null || jogo.nome.length > 80 ||
                jogo.data_lancamento == '' || jogo.data_lancamento == undefined || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
                jogo.versao == '' || jogo.versao == undefined || jogo.versao == null || jogo.versao.length > 10 ||
                jogo.tamanho == undefined || jogo.tamanho.length > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.length > 200 ||
                jogo.link == undefined || jogo.link.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultJogo = await jogoDAO.insertJogo(jogo)
                if (resultJogo)
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

// Função para atualizar um jogo existente
const atualizarJogo = async function(id, jogo, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                jogo.nome == '' || jogo.nome == undefined || jogo.nome == null || jogo.nome.length > 80 ||
                jogo.data_lancamento == '' || jogo.data_lancamento == undefined || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
                jogo.versao == '' || jogo.versao == undefined || jogo.versao == null || jogo.versao.length > 10 ||
                jogo.tamanho == undefined || jogo.tamanho.length > 10 ||
                jogo.descricao == undefined ||
                jogo.foto_capa == undefined || jogo.foto_capa.length > 200 ||
                jogo.link == undefined || jogo.link.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))
                if (resultJogo != false || typeof(resultJogo) == 'object') {
                    if (resultJogo.length > 0) {
                        jogo.id = parseInt(id)
                        let result = await jogoDAO.updateJogo(jogo)
                        if (result)
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

// Função para excluir um jogo existente
const excluirJogo = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))
            if (resultJogo != false || typeof(resultJogo) == 'object') {
                if (resultJogo.length > 0) {
                    let result = await jogoDAO.deleteJogo(parseInt(id))
                    if (result)
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

// Função para listar todos os jogos
const listarJogo = async function() {
    try {
        const arrayJogos = []
        let dadosJogos = {}
        let resultJogo = await jogoDAO.selectAllJogo()

        if (resultJogo != false || typeof(resultJogo) == 'object') {
            if (resultJogo.length > 0) {
                
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length

                for (let itemJogo of resultJogo) {
                    // Adiciona os dados de gênero ao jogo
                    let dadosGenero = await controllerJogoGenero.buscarGeneroPorJogo(itemJogo.id)
                    itemJogo.genero = dadosGenero.data

                    // Adiciona as plataformas ao jogo
                    let dadosPlataforma = await controllerJogoPlataforma.buscarPlataformaPorJogo(itemJogo.id)
                    itemJogo.plataformas = dadosPlataforma.plataforma

                    // Adiciona as desenvolvedoras ao jogo
                    let dadosDesenvolvedora = await controllerJogoDesenvolvedora.buscarDesenvolvedoraPorJogo(itemJogo.id)
                    itemJogo.desenvolvedoras = dadosDesenvolvedora.desenvolvedora

                    arrayJogos.push(itemJogo)
                }

                dadosJogos.data = arrayJogos
                return dadosJogos
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um jogo pelo id
const buscarJogo = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        }

        let dadosJogos = {}
        let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))

        if (resultJogo != false || typeof(resultJogo) == 'object') {
            if (resultJogo.length > 0) {
                // Adiciona os dados de gênero ao jogo
                for (let itemJogo of resultJogo) {
                    let dadosGenero = await controllerJogoGenero.buscarGeneroPorJogo(itemJogo.id)
                    itemJogo.genero = dadosGenero.data

                    // Adiciona as plataformas ao jogo
                    let dadosPlataforma = await controllerJogoPlataforma.buscarPlataformaPorJogo(itemJogo.id)
                    itemJogo.plataformas = dadosPlataforma.plataforma

                    // Adiciona as desenvolvedoras ao jogo
                    let dadosDesenvolvedora = await controllerJogoDesenvolvedora.buscarDesenvolvedoraPorJogo(itemJogo.id)
                    itemJogo.desenvolvedoras = dadosDesenvolvedora.desenvolvedora
                }
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.data = resultJogo
                return dadosJogos
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}