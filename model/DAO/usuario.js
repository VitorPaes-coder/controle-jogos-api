/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de usuarios no Banco de Dados
 * Data: 22/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo usuario
const insertUsuario = async function (usuario) {
    try {

        let sql = `insert into tbl_usuario (

                                        nome, 
                                        email, 
                                        senha, 
                                        data_nascimento,
                                        telefone,
                                        biografia,
                                        foto_perfil,
                                        id_sexo,
                                        id_pais

                                        ) values (

                                            '${usuario.nome}',
                                            '${usuario.email}',
                                            '${usuario.senha}',
                                            '${usuario.data_nascimento}',
                                            '${usuario.telefone}',
                                            '${usuario.biografia}',
                                            '${usuario.foto_perfil}',
                                            '${usuario.id_sexo}',
                                            '${usuario.id_pais}'

                                        )`
        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para atualizar no banco de dados um usuario existente
const updateUsuario = async function (usuario) {
    try {

        let SQL = `update tbl_usuario set   nome              = '${usuario.nome}', 
                                            email             = '${usuario.email}',
                                            senha             = '${usuario.senha}',
                                            data_nascimento   = '${usuario.data_nascimento}',
                                            telefone          = '${usuario.telefone}',
                                            biografia         = '${usuario.biografia}',
                                            foto_perfil       = '${usuario.foto_perfil}',
                                            id_sexo           = '${usuario.id_sexo}',
                                            id_pais           = '${usuario.id_pais}'
                    where id_usuario = ${usuario.id}`

        //execute é usado quado não é necessário retornar nada ao dados do banco
        let result = await prisma.$executeRawUnsafe(SQL)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }

}

// Função para deletar um usuario existente no banco de dados
const deleteUsuario = async function (id) {
    try {
        let sql = `delete from tbl_usuario where id_usuario = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para selecionar todos os usuarios do banco de dados
const selectAllUsuario = async function () {
    try {

        //script SQL para retornar os dados do banco do banco
        let sql = `select * from tbl_usuario order by id_usuario desc`

        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para buscar no banco de dados um usuario pelo id
const selectByIdUsuario = async function (id) {
    try {
        let sql = `select * from tbl_usuario where id_usuario = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertUsuario, 
    updateUsuario, 
    deleteUsuario, 
    selectAllUsuario,
    selectByIdUsuario
}