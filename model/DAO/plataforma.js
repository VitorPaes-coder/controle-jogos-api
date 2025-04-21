/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de plataformas no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados uma nova plataforma
const insertPlataforma = async function (plataforma) {
    try {

        let sql = `insert into tbl_plataforma (nome) values ('${plataforma.nome}')`

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

// Função para atualizar no banco de dados uma plataforma existente
const updatePlataforma = async function (plataforma) {
    try {

        let SQL = `update tbl_plataforma set nome = '${plataforma.nome}'

                    where id_plataforma = ${plataforma.id}`

        //execute é usado quado não é necessário retornar nada ao dados do banco
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

// Função para deletar uma plataforma existente no banco de dados
const deletePlataforma = async function (id) {
    try {
        let sql = `delete from tbl_plataforma where id_plataforma = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
    }
}

// Função para selecionar todas as plataformas do banco de dados
const selectAllPlataforma = async function () {
    try {

        //script SQL para retornar os dados do banco do banco
        let sql = `select * from tbl_plataforma order by id_plataforma desc`

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

// Função para buscar no banco de dados um plataforma pelo id
const selectByIdPlataforma = async function (id) {
    try {
        let sql = `select * from tbl_plataforma where id_plataforma = ${id}`

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
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}