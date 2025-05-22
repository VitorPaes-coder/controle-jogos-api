/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Usuario
 * Data: 22/02/2025
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const usuarioDAO = require('../../model/DAO/usuario.js')

//Import das controlleres para criar as relações com o usuario
const controllerSexo   = require('../sexo/controllerSexo.js')
const controllerPais   = require('../pais/controllerPais.js')

//Função para tratar a inserção de um novo usuario no DAO
const inserirUsuario = async function(usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (usuario.nome              == ''           || usuario.nome               == undefined    || usuario.nome            == null || usuario.nome.length > 20 ||
                    usuario.email             == ''           || usuario.email            == undefined    || usuario.email         == null || usuario.email.length > 80 ||
                    usuario.senha             == ''           || usuario.senha            == undefined    || usuario.senha         == null || usuario.senha.length > 20 ||
                    usuario.data_nascimento   == ''           || usuario.data_nascimento   == undefined    || usuario.data_lancamento == null || usuario.data_lancamento.length > 10 ||
                    usuario.foto_perfil == undefined  || usuario.foto_perfil.length       > 200   ||
                    usuario.telefone    == undefined  || usuario.telefone.length    > 20   ||
                    usuario.biografia   == undefined  ||
                    usuario.id_sexo == ''           || usuario.id_sexo  == undefined ||
                    usuario.id_pais == ''           || usuario.id_pais  == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                    if(resultUsuario)
                        return message.SUCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um usuario no DAO
const atualizarUsuario = async function(id, usuario, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (
                    usuario.nome              == ''           || usuario.nome               == undefined    || usuario.nome            == null || usuario.nome.length > 20 ||
                    usuario.email             == ''           || usuario.email            == undefined    || usuario.email         == null || usuario.email.length > 80 ||
                    usuario.senha             == ''           || usuario.senha            == undefined    || usuario.senha         == null || usuario.senha.length > 20 ||
                    usuario.data_nascimento   == ''           || usuario.data_nascimento   == undefined    || usuario.data_lancamento == null || usuario.data_lancamento.length > 10 ||
                    usuario.foto_perfil == undefined  || usuario.foto_perfil.length       > 200   ||
                    usuario.telefone    == undefined  || usuario.telefone.length    > 20   ||
                    usuario.biografia   == undefined  ||
                    usuario.id_sexo == ''           || usuario.id_sexo  == undefined ||
                    usuario.id_pais == ''           || usuario.id_pais  == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

                    if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                        if(resultUsuario.length > 0 ){
                            //Update
                            //Adiciona o ID do usuario no JSON com os dados
                            usuario.id = parseInt(id)

                            let result = await usuarioDAO.updateUsuario(usuario)

                            if(result){
                                return message.SUCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um usuario no DAO
const excluirUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                //Se existir, faremos o delete
                if(resultUsuario.length > 0){
                    //delete
                    let result = await usuarioDAO.deleteUsuario(parseInt(id))

                    if(result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de usuarios do DAO
const listarUsuario = async function(){
    try {

        //Objeto do tipo array para utilizar no foreach para carregar os dados 
        //do usuario e da sexo
        const arrayUsuarios = []

        //Objeto do tipo JSON
        let dadosUsuario = {}
        //Chama a função para retornar os usuarios cadastrados
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){

                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length

                for(itemUsuario of resultUsuario){

                        let dadosSexo = await controllerSexo.buscarSexo(itemUsuario.id_sexo)
                        
                        itemUsuario.sexo = dadosSexo.sexo

                        delete itemUsuario.id_sexo

                    arrayUsuarios.push(itemUsuario)
                }
                dadosUsuario.users = arrayUsuarios

                return dadosUsuario
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um usuario filtrando pelo ID do DAO
const buscarUsuario = async function(id){
    try {

        let arrayUsuarios = []
        
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosUsuario = {}

            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))
            
            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200

                    //o foreach não consegue trabalhar com requisições async e await
                    for(itemUsuario of resultUsuario){
                        //Busca os dados da classificação na controller de classificação
                        //Utilizando o ID da classificação (Chave estrangeira)
                        let dadosSexo = await controllerSexo.buscarSexo(itemUsuario.id_sexo)
                        
                        //Adicionando um atributo "sexo" no JSON de usuarios
                        itemUsuario.sexo = dadosSexo.sexo
                        //Remove o atributo id_sexo do JSON de usuarios, pois já temos
                        //o ID dentro dos dados da classificação
                        delete itemUsuario.id_sexo
                        //Adiciona o JSON do usuario, agora com os dados da classificação
                        //em um array
                        arrayUsuarios.push(itemUsuario)
                    }

                    dadosUsuario.users = arrayUsuarios

                    return dadosUsuario //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
} 