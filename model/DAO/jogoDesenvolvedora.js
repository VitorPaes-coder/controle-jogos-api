/************************************************************************************************
 * Objetivo: Model responsável pelo CRUD de dados referente à tabela de jogo_desenvolvedora
 *           no Banco de Dados
 * Data: 18/05/25
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
 ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

// Função para inserir um novo JogoDesenvolvedora
const insertJogoDesenvolvedora = async function(jogoDesenvolvedora){
  try {
      let sql = `insert into tbl_jogo_desenvolvedora (
                    id_jogo,
                    id_desenvolvedora
                ) values (
                    ${jogoDesenvolvedora.id_jogo},
                    ${jogoDesenvolvedora.id_desenvolvedora}
                )`
      let result = await prisma.$executeRawUnsafe(sql)
      
      if (result)
        return result
      else 
        return false
      
  } catch (error) {
      console.log(error)
      return false
  }
}

// Função para atualizar um JogoDesenvolvedora existente
const updateJogoDesenvolvedora = async function(jogoDesenvolvedora){
  try {
      let sql = `update tbl_jogo_desenvolvedora set 
                    id_jogo = ${jogoDesenvolvedora.id_jogo},
                    id_desenvolvedora = ${jogoDesenvolvedora.id_desenvolvedora}
                 where id = ${jogoDesenvolvedora.id}`
      let result = await prisma.$executeRawUnsafe(sql)
      
      if (result)
        return result
      else 
        return false

  } catch (error) {
      console.log(error)
      return false
  }
}

// Função para excluir um JogoDesenvolvedora existente
const deleteJogoDesenvolvedora = async function(id){
  try {
      let sql = `delete from tbl_jogo_desenvolvedora where id = ${id}`
      let result = await prisma.$executeRawUnsafe(sql)
     
      if (result)
        return result
      else 
        return false

  } catch (error) {
      console.log(error)
      return false
  }
}

// Função para retornar todos os JogoDesenvolvedora existentes
const selectAllJogoDesenvolvedora = async function(){
  try {
      let sql = 'select * from tbl_jogo_desenvolvedora order by id desc'
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

// Função para buscar um JogoDesenvolvedora pelo ID
const selectByIdJogoDesenvolvedora = async function(id){
  try {
      let sql = `select * from tbl_jogo_desenvolvedora where id = ${id}`
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

// Função para retornar as desenvolvedoras filtrando pelo jogo
const selectDesenvolvedoraByIdJogo = async function(id){
  try {
      let sql = `select tbl_desenvolvedora.* from tbl_jogo
                  inner join tbl_jogo_desenvolvedora
                    on tbl_jogo.id = tbl_jogo_desenvolvedora.id_jogo
                  inner join tbl_desenvolvedora
                    on tbl_desenvolvedora.id_desenvolvedora = tbl_jogo_desenvolvedora.id_desenvolvedora
                where tbl_jogo.id = ${id}`
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

// Função para retornar os jogos filtrando pela desenvolvedora
const selectJogoByIdDesenvolvedora = async function(id_desenvolvedora){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo
                  inner join tbl_jogo_desenvolvedora
                    on tbl_jogo.id = tbl_jogo_desenvolvedora.id_jogo
                  inner join tbl_desenvolvedora
                    on tbl_desenvolvedora.id_desenvolvedora = tbl_jogo_desenvolvedora.id_desenvolvedora
                where tbl_desenvolvedora.id_desenvolvedora = ${id_desenvolvedora}`

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

module.exports = {
  insertJogoDesenvolvedora,
  updateJogoDesenvolvedora,
  deleteJogoDesenvolvedora,
  selectAllJogoDesenvolvedora,
  selectByIdJogoDesenvolvedora,
  selectDesenvolvedoraByIdJogo,
  selectJogoByIdDesenvolvedora
}