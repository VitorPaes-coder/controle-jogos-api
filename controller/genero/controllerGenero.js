/************************************************************************************************
 * Objetivo: Controller reponsavel pela regra de negócio do CRUD do genero
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js');

// Import do DAO para realizar o CRUD no banco de dados
const generoDAO = require('../../model/DAO/genero.js');

// Import da controller para buscar jogos relacionados ao gênero
const controllerJogoGenero = require('../jogo-genero/controllerJogoGenero.js')

// Função para inserir um novo genero
const inserirGenero = async function(genero, contentType) {

    try{
        if(contentType == 'application/json'){
            if (genero.nome == undefined || genero.nome == '' || genero.nome == null || genero.nome.length > 50){

            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }

            }else{

                // Encaminha os dados do novo genero para serem inseridos no banco de dados
                let resultGenero = await generoDAO.insertGenero(genero);
                
                if(resultGenero)
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

// Função para atualizar um genero existente
const atualizarGenero = async function(genero, id, contentType) {
    
    try {

        if(contentType == 'application/json'){

            if (genero.nome ==            undefined || genero.nome ==            '' || genero.nome ==            null || genero.nome.length > 50 ){

            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }

            }else{

                let resultGenero = await buscarGenero(parseInt(id))

                if(resultGenero.status_code == 200){

                    //Update
                    //Adiciona um atributo id no JSON para encaminhar o id da requisição
                    genero.id = parseInt(id)
                    let result = await generoDAO.updateGenero(genero)

                    if(result)
                        return  MESSAGE.SUCESS_UPDATED_ITEM //200
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

                }else if(resultGenero.status_code == 404){

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

// Função para excluir um genero existente
const excluirGenero = async function(id) {
    try{

        if(isNaN(id) || id == undefined || id == null || id == '' || id <= 0){
         return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
           
        }else{
             // Chama a função para deletar o genero pelo id
            let resultGenero = await buscarGenero(parseInt(id))

            if(resultGenero.status_code == 200){

            let result = await generoDAO.deleteGenero(parseInt(id))

            if(result)
                return { status_code: 200, message: MESSAGE.SUCESS_DELETED_ITEM }
            else
                return { status_code: 500, message: MESSAGE.ERROR_INTERNAL_SERVER_MODEL }

            }else if(resultGenero.status_code == 404){
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

// Função para listar todos os generos
const listarGenero = async function() {
    try {
        const arrayGeneros = []
        let dadosGeneros = {}
        let resultGenero = await generoDAO.selectAllGenero()

        if (resultGenero != false || typeof resultGenero == 'object') {
            if (resultGenero.length > 0) {
                dadosGeneros.status = true
                dadosGeneros.status_code = 200
                dadosGeneros.items = resultGenero.length

                for (let itemGenero of resultGenero) {
                    let dadosJogo = await controllerJogoGenero.buscarJogoPorGenero(itemGenero.id_genero)
                    itemGenero.jogos = dadosJogo.jogos
                    arrayGeneros.push(itemGenero)
                }

                dadosGeneros.data = arrayGeneros
                return dadosGeneros
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

// Função para buscar um genero pelo ID
const buscarGenero = async function(id) {
    try {
        if (isNaN(id) || id == undefined || id == null || id == '' || id <= 0) {
            return { status_code: 400, message: MESSAGE.ERROR_REQUIRED_FIELDS }
        }

        let dadosGeneros = {}
        let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

        if (resultGenero != false || typeof resultGenero == 'object') {
            if (resultGenero.length > 0) {
                for (let itemGenero of resultGenero) {
                    let dadosJogo = await controllerJogoGenero.buscarJogoPorGenero(itemGenero.id_genero)
                    itemGenero.jogos = dadosJogo.jogos
                }
                dadosGeneros.status = true
                dadosGeneros.status_code = 200
                dadosGeneros.data = resultGenero
                return dadosGeneros
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

module.exports = { 
    inserirGenero, 
    atualizarGenero, 
    excluirGenero, 
    listarGenero, 
    buscarGenero 
}