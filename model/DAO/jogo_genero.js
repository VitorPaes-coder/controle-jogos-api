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

const insertJogoGenero = async function(JogoGenero){
    try {
  
        let sql = `insert into tbl_jogo_Genero  ( 
                                            id_jogo,
                                            id_Genero
                                          ) 
                                            values 
                                          (
                                            ${JogoGenero.id_jogo},
                                            ${JogoGenero.id_Genero}
                                          )`
        //console.log(sql)
  
        //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
        //saber se deu certo                                  
        let result = await prisma.$executeRawUnsafe(sql)
  
        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error);
        return false
    }
  }
  
  //Função para atualizar um JogoGenero existente
  const updateJogoGenero = async function(JogoGenero){
    try {
        let sql = `update tbl_jogo_Genero set id_jogo   = ${JogoGenero.id_jogo},
                                              id_Genero = ${JogoGenero.id_Genero}
                                          
                              where id = ${JogoGenero.id}                
                              `
        let resultJogoGenero = await prisma.$executeRawUnsafe(sql)
  
        if(resultJogoGenero)
          return true
        else
          return false
    } catch (error) {
      console.log(error);
      return false
    }
  }
  
  //Função para excluir um JogoGenero existente
  const deleteJogoGenero = async function(id){
    try {
      let sql = `delete from tbl_jogo_Genero where id = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      console.log(error);
      return false
    }
  }
  
  //Função para retornar todos os JogoGeneros existentes
  const selectAllJogoGenero = async function(){
  
      try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_jogo_enero order by id desc'
  
        //Executa o scriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)
  
        if(result)
          return result
        else
          return false
  
      } catch (error) {
        console.log(error);
        return false
      }
  }
  
  //Função para buscar um JogoGenero pelo ID
  const selectByIdJogoGenero = async function(id){
    try {
      let sql = `select *
                 from tbl_jogo_genero 
                 where id = ${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      console.log(error);
      return false
    }
  }
  
  //Função para retornar os dados do Genero filtrando pelo jogo
  const selectGeneroByIdJogo = async function(id){
    try {
        let sql = `select tbl_genero.* from tbl_jogo 
                            inner join tbl_jogo_Genero
                              on tbl_jogo.id = tbl_jogo_genero.id_jogo
                            inner join tbl_genero
                              on tbl_genero.id = tbl_jogo_genero.id_Genero
                        where tbl_jogo.id = ${id}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
        if (result)
          return result
        else 
          return false
    } catch (error) {
        console.log(error);
        return false 
    }
  }
  
  //Função para retornar os dados do jogo filtrando pelo genero
  const selectJogoByIdGenero = async function(id_genero){
    try {
        let sql = `select tbl_jogo.* from tbl_jogo 
                            inner join tbl_jogo_genero
                              on tbl_jogo.id = tbl_jogo_genero.id_jogo
                            inner join tbl_genero
                              on tbl_genero.id = tbl_jogo_genero.id_genero
                        where tbl_genero.id = ${id_genero}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
        if (result)
          return result
        else 
          return false
    } catch (error) {
        console.log(error);
        return false
    }
  }
  
module.exports = {
  insertJogoGenero,
  updateJogoGenero,
  deleteJogoGenero,
  selectAllJogoGenero,
  selectByIdJogoGenero,
  selectJogoByIdGenero,
  selectGeneroByIdJogo
} 