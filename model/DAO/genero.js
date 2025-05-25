/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de gêneros de generos no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo genero
const insertGenero = async function(genero) {
    try { 

        let sql = `insert into tbl_genero (nome) values ('${genero.nome}')`

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

// Função para deletar um genero existente no banco de dados
const deleteGenero = async function(id) {
    try {
        let sql = `delete from tbl_genero where id_genero = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
    }
}

// Função para atualizar no banco de dados um genero existente
const updateGenero = async function(genero) {
    try {

       let SQL = `update tbl_genero set nome = '${genero.nome}' where id_genero = ${genero.id}`

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

// Função para atualizar no banco de dados um genero existente
const selectAllGenero = async function() {
    try {
       
       //script SQL para retornar os dados do banco do banco
       let sql = `select * from tbl_genero order by id_genero desc`

       // Executa o script SQL no banco de dados e aguarda o retorno do banco de dados
       let result = await prisma.$queryRawUnsafe(sql)

       if (result)
           return result
       else
           return false
    } catch (error) {
       
    }
}

// Função para buscar no banco de dados um genero pelo id
const selectByIdGenero = async function(id) {
    try {
       let sql = `select * from tbl_genero where id_genero = ${id}`

       let result = await prisma.$queryRawUnsafe(sql)

       if (result.length > 0)
           return result
       else
           return false
    } catch (error) {
       console.log(error)
    }
}             

module.exports = { insertGenero, deleteGenero, updateGenero, selectAllGenero, selectByIdGenero }