/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de sexos no Banco de Dados
 * Data: 17/04/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir no banco de dados um novo sexo
const insertSexo = async function (sexo) {
    try {

        let sql = `insert into tbl_sexo (

                                        nome, 
                                        sigla

                                        ) values (

                                            '${sexo.nome}', 
                                            '${sexo.sigla}'

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

// Função para atualizar no banco de dados um sexo existente
const updateSexo = async function (sexo) {
    try {

        let SQL = `update tbl_sexo set    nome       = '${sexo.nome}', 
                                          sigla  = '${sexo.sigla}'

                    where id_sexo = ${sexo.id}`

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

// Função para deletar um sexo existente no banco de dados
const deleteSexo = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id_sexo = ${id}`

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

// Função para selecionar todos os sexos do banco de dados
const selectAllSexo = async function () {
    try {

        //script SQL para retornar os dados do banco
        let sql = `select * from tbl_sexo order by id_sexo desc`

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

// Função para buscar no banco de dados um sexo pelo id
const selectByIdSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexo where id_sexo = ${id}`

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}