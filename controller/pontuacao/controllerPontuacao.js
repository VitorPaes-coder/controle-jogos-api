/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD da pontuação
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js');

// Import do DAO para realizar o CRUD no banco de dados
const pontuacaoDAO = require('../../model/DAO/pontuacao.js');

// Função para inserir uma nova pontuação
const inserirPontuacao = async function(pontuacao, contentType) {
    try {
        if (contentType == 'application/json') {
            if (pontuacao.nota == undefined || pontuacao.nota == '' || pontuacao.nota == null || pontuacao.nota.length > 10 || isNaN(pontuacao.nota)) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS };
            } else {
                // Encaminha os dados da nova pontuação para serem inseridos no banco de dados
                let resultPontuacao = await pontuacaoDAO.insertPontuacao(pontuacao);

                if (resultPontuacao)
                    return { status_code: 201, message: MESSAGE.SUCESS_CREATED_ITEM }; // 201
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }; // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para atualizar uma pontuação existente
const atualizarPontuacao = async function(pontuacao, id, contentType) {
    try {
        if (contentType == 'application/json') {
            if (pontuacao.nota == undefined || pontuacao.nota == '' || pontuacao.nota == null || pontuacao.nota.length > 10 || isNaN(pontuacao.nota)) {
                return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS };
            } else {
                let resultPontuacao = await buscarPontuacao(parseInt(id));

                if (resultPontuacao.status_code == 200) {
                    // Atualiza
                    // Adiciona um atributo id no JSON para encaminhar o id da requisição
                    pontuacao.id = parseInt(id);
                    let result = await pontuacaoDAO.updatePontuacao(pontuacao);

                    if (result)
                        return MESSAGE.SUCESS_UPDATED_ITEM; // 200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
                } else if (resultPontuacao.status_code == 404) {
                    return MESSAGE.ERROR_NOT_FOUND; // 404
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Função para excluir uma pontuação existente
const excluirPontuacao = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS };
        } else {
            // Chama a função para deletar a pontuação pelo id
            let resultPontuacao = await buscarPontuacao(parseInt(id));

            if (resultPontuacao.status_code == 200) {
                let result = await pontuacaoDAO.deletePontuacao(parseInt(id));

                if (result)
                    return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM };
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL };
            } else if (resultPontuacao.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND;
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para listar todas as pontuações
const listarPontuacao = async function() {
    try {
        let dadosPontuacoes = {};
        // Chama a função para retornar os dados das pontuações
        let resultPontuacao = await pontuacaoDAO.selectAllPontuacao();

        if (resultPontuacao != false || typeof resultPontuacao == 'object') {
            if (resultPontuacao.length > 0) {
                dadosPontuacoes.status = true;
                dadosPontuacoes.status_code = 200;
                dadosPontuacoes.items = resultPontuacao.length;
                dadosPontuacoes.data = resultPontuacao;

                return dadosPontuacoes;
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

// Função para buscar uma pontuação
const buscarPontuacao = async function(id) {
    try {
        let dadosPontuacoes = {};
        // Chama a função para retornar os dados da pontuação
        let resultPontuacao = await pontuacaoDAO.selectByIdPontuacao(parseInt(id));

        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS };
        } else {
            if (resultPontuacao != false || typeof resultPontuacao == 'object') {
                if (resultPontuacao.length > 0) {
                    dadosPontuacoes.status = true;
                    dadosPontuacoes.status_code = 200;
                    dadosPontuacoes.data = resultPontuacao;

                    return dadosPontuacoes;
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    inserirPontuacao,
    atualizarPontuacao,
    excluirPontuacao,
    listarPontuacao,
    buscarPontuacao,
};