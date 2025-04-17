/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de jogos no Banco de Dados
 * Data: 13/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo jogo
const insertJogo = async function (jogo) {
    try {

        let sql = `insert into tbl_jogo (

                                        nome, 
                                        data_lancamento, 
                                        versao, 
                                        tamanho,
                                        descricao,
                                        foto_capa,
                                        link

                                        ) values (

                                            '${jogo.nome}', 
                                            '${jogo.data_lancamento}', 
                                            '${jogo.versao}', 
                                            '${jogo.tamanho}',
                                            '${jogo.descricao}',
                                            '${jogo.foto_capa}',
                                            '${jogo.link}'

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

// Função para atualizar no banco de dados um jogo existente
const updateJogo = async function (jogo) {
    try {

        let SQL = `update tbl_jogo set        nome              = '${jogo.nome}', 
                                              data_lancamento   = '${jogo.data_lancamento}', 
                                              versao            = '${jogo.versao}', 
                                              tamanho           = '${jogo.tamanho}',
                                              descricao         = '${jogo.descricao}',
                                              foto_capa         = '${jogo.foto_capa}',
                                              link              = '${jogo.link}'
                    where id = ${jogo.id}`

        //execute é usado quado não é necessário retornar nada ao dados do banco
        let result = await prisma.$executeRawUnsafe(SQL)

        if (result)
            return true
        else
            return false

    } catch (error) {

        return false
    }

}

// Função para deletar um jogo existente no banco de dados
const deleteJogo = async function (id) {
    try {
        let sql = `delete from tbl_jogo where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
    }
}

// Função para selecionar todos os jogos do banco de dados
const selectAllJogo = async function () {
    try {

        //script SQL para retornar os dados do banco do banco
        let sql = `select * from tbl_jogo order by id desc`

        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {

    }
}

// Função para buscar no banco de dados um jogo pelo id
const selectByIdJogo = async function (id) {
    try {
        let sql = `select * from tbl_jogo where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertJogo, updateJogo, deleteJogo, selectAllJogo, selectByIdJogo
}