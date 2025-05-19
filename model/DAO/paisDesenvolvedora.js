/************************************************************************************************
 * Objetivo: Model reponsavel pelo CRUD de dados referete a tabela de paises no Banco de Dados
 * Data: 13/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão:1.0
 * ********************************************************************************************/

// Importando o prisma client para executar os scripts no banco de dados
const { PrismaClient } = require('@prisma/client')

// Cria uma instância do prisma
const prisma = new PrismaClient()

const insertPaisDesenvolvedora = async function(PaisDesenvolvedora){
    try {
  
        let sql = `insert into tbl_pais_desenvolvedora  ( 
                                            id_pais,
                                            id_desenvolvedora
                                          ) 
                                            values 
                                          (
                                            ${PaisDesenvolvedora.id_pais},
                                            ${PaisDesenvolvedora.id_desenvolvedora}
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
  
  //Função para atualizar um PaisDesenvolvedora existente
  const updatePaisDesenvolvedora = async function(PaisDesenvolvedora){
    try {
        let sql = `update tbl_pais_desenvolvedora set id_pais   = ${PaisDesenvolvedora.id_pais},
                                              id_desenvolvedora = ${PaisDesenvolvedora.id_desenvolvedora}
                                          
                              where id = ${PaisDesenvolvedora.id}                
                              `
        let resultPaisDesenvolvedora = await prisma.$executeRawUnsafe(sql)
  
        if(resultPaisDesenvolvedora)
          return true
        else
          return false
    } catch (error) {
      console.log(error);
      return false
    }
  }
  
  //Função para excluir um PaisDesenvolvedora existente
  const deletePaisDesenvolvedora = async function(id){
    try {
      let sql = `delete from tbl_pais_desenvolvedora where id = ${id}`
  
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
  
  //Função para retornar todos os PaisDesenvolvedora existentes
  const selectAllPaisDesenvolvedora = async function(){
  
      try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_pais_desenvolvedora order by id desc'
  
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
  
  //Função para buscar um PaisDesenvolvedora pelo ID
  const selectByIdPaisDesenvolvedora = async function(id){
    try {
      let sql = `select * from tbl_pais_desenvolvedora where id = ${id}`
  
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
  
  //Função para retornar os dados da desenvolvedora filtrando pelo pais
  const selectDesenvolvedoraByIdPais = async function(id){
    try {
        let sql = `select tbl_desenvolvedora.* from tbl_pais 
                            inner join tbl_pais_desenvolvedora
                              on tbl_pais.id_pais = tbl_pais_desenvolvedora.id_pais
                            inner join tbl_desenvolvedora
                              on tbl_desenvolvedora.id_desenvolvedora = tbl_pais_desenvolvedora.id_desenvolvedora
                        where tbl_pais.id_pais = ${id}`
  
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
  
  //Função para retornar os dados do pais filtrando pela desenvolvedora
  const selectPaisByIdDesenvolvedora = async function(id_desenvolvedora){
    try {
        let sql = `select tbl_pais.* from tbl_pais 
                            inner join tbl_pais_desenvolvedora
                              on tbl_pais.id_pais = tbl_pais_desenvolvedora.id_pais
                            inner join tbl_desenvolvedora
                              on tbl_desenvolvedora.id_desenvolvedora = tbl_pais_desenvolvedora.id_desenvolvedora
                        where tbl_desenvolvedora.id_desenvolvedora = ${id_desenvolvedora}`
  
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
  insertPaisDesenvolvedora,
  updatePaisDesenvolvedora,
  deletePaisDesenvolvedora,
  selectAllPaisDesenvolvedora,
  selectByIdPaisDesenvolvedora,
  selectPaisByIdDesenvolvedora,
  selectDesenvolvedoraByIdPais
} 