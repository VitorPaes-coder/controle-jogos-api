/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de pontuações no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados uma nova pontuação
const insertPontuacao = async function(pontuacao) {
    try { 

        let sql = `insert into tbl_pontuacao (nota) values ('${pontuacao.nota}')`

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

// Função para deletar uma pontuação existente no banco de dados
const deletePontuacao = async function(id) {
    try {
        let sql = `delete from tbl_pontuacao where id_pontuacao = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
    }
}

// Função para atualizar no banco de dados uma pontuação existente
const updatePontuacao = async function(pontuacao) {
    try {

       let SQL = `update tbl_pontuacao set nota = '${pontuacao.nota}' where id_pontuacao = ${pontuacao.id}`

       //execute é usado quando não é necessário retornar nada ao banco de dados
       let result = await prisma.$executeRawUnsafe(SQL)

       if (result)
           return true
       else
           return false

    } catch (error) {

       return false
    }

}

// Função para selecionar todas as pontuações do banco de dados
const selectAllPontuacao = async function() {
    try {
       
       //script SQL para retornar os dados do banco
       let sql = `select * from tbl_pontuacao order by id_pontuacao desc`

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

// Função para buscar no banco de dados uma pontuação pelo id
const selectByIdPontuacao = async function(id) {
    try {
       let sql = `select * from tbl_pontuacao where id_pontuacao = ${id}`

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
    insertPontuacao, 
    deletePontuacao, 
    updatePontuacao, 
    selectAllPontuacao, 
    selectByIdPontuacao 
}