/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD do jogo
 * Data: 13/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js');

// Import do DAO para realizar o CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js');

// Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType) {

    try{
        if(contentType == 'application/json'){
            if(
            jogo.nome ==            undefined || jogo.nome ==            '' || jogo.nome ==            null || jogo.nome.length > 80 ||
            jogo.data_lancamento == undefined || jogo.data_lancamento == '' || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
            jogo.versao ==          undefined || jogo.versao ==          '' || jogo.versao ==          null || jogo.versao.length > 10 ||
            jogo.tamanho ==         undefined || jogo.tamanho.length > 10 ||
            jogo.descricao ==       undefined || 
            jogo.foto_capa ==       undefined || jogo.foto_capa.length > 200 ||
            jogo.link ==            undefined || jogo.link.length > 200
            ){

            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }

            }else{

                // Encaminha os dados do novo jogo para serem inseridos no banco de dados
                let resultJogo = await jogoDAO.insertJogo(jogo);
                
                if(resultJogo)
                    return { status_code: 201, message: MESSAGE.SUCESS_CREATED_ITEM } //201
                else
                    return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL } //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
        
        }catch(error){
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para atualizar um jogo existente
const atualizarJogo = async function(jogo, id, contentType) {
    
    try {

        if(contentType == 'application/json'){

            if(
            jogo.nome ==            undefined || jogo.nome ==            '' || jogo.nome ==            null || jogo.nome.length > 80 ||
            jogo.data_lancamento == undefined || jogo.data_lancamento == '' || jogo.data_lancamento == null || jogo.data_lancamento.length > 10 ||
            jogo.versao ==          undefined || jogo.versao ==          '' || jogo.versao ==          null || jogo.versao.length > 10 ||
            jogo.tamanho ==         undefined || jogo.tamanho.length > 10 ||
            jogo.descricao ==       undefined || 
            jogo.foto_capa ==       undefined || jogo.foto_capa.length > 200 ||
            jogo.link ==            undefined || jogo.link.length > 200 ||
            id ==                   undefined || id ==                   '' || id ==                   null || id <= 0 || isNaN(id)
            ){

            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }

            }else{

                let resultJogo = await buscarJogo(parseInt(id))

                if(resultJogo.status_code == 200){

                    //Update
                    //Adiciona um atributo id no JSON para encaminhar o id da requisição
                    jogo.id = parseInt(id)
                    let result = await jogoDAO.updateJogo(jogo)

                    if(result)
                        return  MESSAGE.SUCESS_UPDATED_ITEM //200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

                }else if(resultJogo.status_code == 404){

                    return MESSAGE.ERROR_NOT_FOUND //404

                }else{

                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500

                }
            }
        }else{

            return MESSAGE.ERROR_CONTENT_TYPE //415

        }
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para excluir um jogo existente
const excluirJogo = async function(id) {
    try{

        if(isNaN(id) || id == undefined || id == null || id == '' || id <= 0){
         return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
           
        }else{
             // Chama a função para deletar o jogo pelo id
            let resultJogo = await buscarJogo(parseInt(id))

            if(resultJogo.status_code == 200){

            let result = await jogoDAO.deleteJogo(parseInt(id))

            if(result)
                return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
            else
                return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }

            }else if(resultJogo.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND

            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
            }
        }
    }
    catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

// Função para listar todos os jogos
const listarJogo = async function() {
    try{

        let dadosJogos = {}
        // Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object' ){
            
        if(resultJogo.length > 0){
            dadosJogos.status = true
            dadosJogos.status_code = 200
            dadosJogos.items = resultJogo.length
            dadosJogos.data = resultJogo

            return dadosJogos 
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    }
    catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

// Função para buscar um jogo
const buscarJogo = async function(id) {
    // Implementação da função
    try{
        let dadosJogos = {}
        // Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id))

        if(isNaN(id) || id == undefined || id == null || id == '' || id <= 0){

            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }

        }else{
             
            if(resultJogo != false || typeof(resultJogo) == 'object' ){
            
            if(resultJogo.length > 0){
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.data = resultJogo

                return dadosJogos 
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    }
    catch(error){
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