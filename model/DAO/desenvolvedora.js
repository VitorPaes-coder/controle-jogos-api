/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de desenvolvedoras no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados uma nova desenvolvedora
const insertDesenvolvedora = async function (desenvolvedora) {
    try {

        let sql = `insert into tbl_desenvolvedora (

                                        nome, 
                                        descricao,
                                        logo

                                        ) values (

                                            '${desenvolvedora.nome}', 
                                            '${desenvolvedora.descricao}'
                                            '${desenvolvedora.logo}'

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

// Função para atualizar no banco de dados uma desenvolvedora existente
const updateDesenvolvedora = async function (desenvolvedora) {
    try {

        let SQL = `update tbl_desenvolvedora set    nome       = '${desenvolvedora.nome}', 
                                                    descricao  = '${desenvolvedora.descricao}',
                                                    logo       = '${desenvolvedora.logo}'

                    where id_desenvolvedora = ${desenvolvedora.id}`

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

// Função para deletar uma desenvolvedora existente no banco de dados
const deleteDesenvolvedora = async function (id) {
    try {
        let sql = `delete from tbl_desenvolvedora where id_desenvolvedora = ${id}`

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

// Função para selecionar todas as desenvolvedoras do banco de dados
const selectAllDesenvolvedora = async function () {
    try {

        //script SQL para retornar os dados do banco do banco
        let sql = `select * from tbl_desenvolvedora order by id_desenvolvedora desc`

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

// Função para buscar no banco de dados um desenvolvedora pelo id
const selectByIdDesenvolvedora = async function (id) {
    try {
        let sql = `select * from tbl_desenvolvedora where id_desenvolvedora = ${id}`

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
    insertDesenvolvedora,
    updateDesenvolvedora,
    deleteDesenvolvedora,
    selectAllDesenvolvedora,
    selectByIdDesenvolvedora
}