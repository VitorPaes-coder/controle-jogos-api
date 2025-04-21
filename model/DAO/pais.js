/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de países no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo país
const insertPais = async function (pais) {
    try {

        let sql = `insert into tbl_pais (

                                        nome, 
                                        sigla

                                        ) values (

                                            '${pais.nome}', 
                                            '${pais.sigla}'

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

// Função para atualizar no banco de dados um país existente
const updatePais = async function (pais) {
    try {

        let SQL = `update tbl_pais set    nome       = '${pais.nome}', 
                                          sigla      = '${pais.sigla}'

                    where id_pais = ${pais.id}`

        //execute é usado quando não é necessário retornar nada ao banco de dados
        let result = await prisma.$executeRawUnsafe(SQL)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

// Função para deletar um país existente no banco de dados
const deletePais = async function (id) {
    try {
        let sql = `delete from tbl_pais where id_pais = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
    }
}

// Função para selecionar todos os países do banco de dados
const selectAllPais = async function () {
    try {

        //script SQL para retornar os dados do banco
        let sql = `select * from tbl_pais order by id_pais desc`

        // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        console.log(error)
    }
}

// Função para buscar no banco de dados um país pelo id
const selectByIdPais = async function (id) {
    try {
        let sql = `select * from tbl_pais where id_pais = ${id}`

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
    insertPais,
    updatePais,
    deletePais,
    selectAllPais,
    selectByIdPais
}