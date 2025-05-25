/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de avaliações no Banco de Dados
 * Data: 22/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um nova avaliação
const insertAvaliacao = async function (avaliacao) {
    try {

        let sql = `insert into tbl_avaliacao (

                                        data, 
                                        comentario, 
                                        nota,
                                        id_usuario,
                                        id_jogo

                                        ) values (

                                            '${avaliacao.data}',
                                            '${avaliacao.comentario}',
                                            '${avaliacao.nota}',
                                            '${avaliacao.id_usuario}',
                                            '${avaliacao.id_jogo}'

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

// Função para atualizar no banco de dados um avaliação existente
const updateAvaliacao = async function (avaliacao) {
    try {

        let SQL = `update tbl_avaliacao set 

                                        data = '${avaliacao.data}', 
                                        comentario = '${avaliacao.comentario}', 
                                        nota = '${avaliacao.nota}',
                                        id_usuario = '${avaliacao.id_usuario}',
                                        id_jogo = '${avaliacao.id_jogo}'

                    where id = ${avaliacao.id}`

        //execute é usado quando não é necessário retornar nada ao dados do banco
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

// Função para deletar um avaliação existente no banco de dados
const deleteAvaliacao = async function (id) {
    try {
        let sql = `delete from tbl_avaliacao where id_avaliacao = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
    }
}

// Função para selecionar todos os avaliações do banco de dados
const selectAllAvaliacao = async function () {
    try {

        //script SQL para retornar os dados do banco do banco
        let sql = `select * from tbl_avaliacao order by id_avaliacao desc`

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

// Função para buscar no banco de dados um avaliação pelo id
const selectByIdAvaliacao = async function (id) {
    try {

        let sql = `select * from tbl_avaliacao where id_avaliacao = ${id}`
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
    insertAvaliacao, 
    updateAvaliacao, 
    deleteAvaliacao, 
    selectAllAvaliacao,
    selectByIdAvaliacao
}