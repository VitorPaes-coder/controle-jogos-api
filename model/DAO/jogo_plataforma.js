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

const insertJogoPlataforma = async function(JogoPlataforma){
    try {
  
        let sql = `insert into tbl_jogo_plataforma  ( 
                                            id_filme,
                                            id_genero
                                          ) 
                                            values 
                                          (
                                            ${JogoPlataforma.id_filme},
                                            ${JogoPlataforma.id_genero}
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
        
        return false
    }
  }
  
  //Função para atualizar um JogoPlataforma existente
  const updateJogoPlataforma = async function(JogoPlataforma){
    try {
        let sql = `update tbl_jogo_plataforma set        id_filme       = ${JogoPlataforma.id_filme},
                                                      id_genero      = ${JogoPlataforma.id_genero}
                                          
                              where id = ${JogoPlataforma.id}                
                              `
        let resultJogoPlataforma = await prisma.$executeRawUnsafe(sql)
  
        if(resultJogoPlataforma)
          return true
        else
          return false
    } catch (error) {
      return false
    }
  }
  
  //Função para excluir um JogoPlataforma existente
  const deleteJogoPlataforma = async function(id){
    try {
      let sql = `delete from tbl_jogo_plataforma where id = ${id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else 
        return false
    } catch (error) {
      return false
    }
  }
  
  //Função para retornar todos os JogoPlataformas existentes
  const selectAllJogoPlataforma = async function(){
  
      try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_jogo_plataforma order by id desc'
  
        //Executa o scriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)
  
        if(result)
          return result
        else
          return false
  
      } catch (error) {
        return false
      }
  }
  
  //Função para buscar um JogoPlataforma pelo ID
  const selectByIdJogoPlataforma = async function(id){
    try {
      let sql = `select * from tbl_jogo_plataforma where id = ${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if (result)
        return result
      else 
        return false
    } catch (error) {
      return false
    }
  }
  
  //Função para retornar os dados do genero filtrando pelo Filme
  const selectGeneroByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_genero.* from tbl_filme 
                            inner join tbl_jogo_plataforma
                              on tbl_filme.id = tbl_jogo_plataforma.id_filme
                            inner join tbl_genero
                              on tbl_genero.id = tbl_jogo_plataforma.id_genero
                        where tbl_filme.id = ${idFilme}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
        if (result)
          return result
        else 
          return false
    } catch (error) {
        return false
    }
  }
  
  //Função para retornar os dados do filme filtrando pelo Genero
  const selectFilmeByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filme.* from tbl_filme 
                            inner join tbl_jogo_plataforma
                              on tbl_filme.id = tbl_jogo_plataforma.id_filme
                            inner join tbl_genero
                              on tbl_genero.id = tbl_jogo_plataforma.id_genero
                        where tbl_genero.id = ${idGenero}`
  
        let result = await prisma.$queryRawUnsafe(sql)
  
        if (result)
          return result
        else 
          return false
    } catch (error) {
        return false
    }
  }
  
  
  
  
  module.exports = {
      insertJogoPlataforma,
      updateJogoPlataforma,
      deleteJogoPlataforma,
      selectAllJogoPlataforma,
      selectByIdJogoPlataforma,
      selectFilmeByIdGenero,
      selectGeneroByIdFilme
  } 