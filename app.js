/*******************************************************************************************************
 * Objetivo: API referente ao projeto de controle de jogos
 * Data: 13/02/25
 * Autor: Vitor Paes Rodrigues
 * Versão: 1.0
 * Observação: 
 * 
 *            ***********Para configurar e instalar a API precisamos das seguintes bibliotecas:
 *                          express        npm install express --save
 *                          cors           npm install cors --save
 *                          body-parser    npm install body-parser --save
 * 
 *            ***********Para configurar e instalar o acesso ao banco de dados precisamos:
 *                          prisma         npm install prisma --save (conexão com o BD)
 *                          prisma/client  npm install @prisma/client --save (Executa scripts no BD)
 * 
 *            ***********Após a instalação do prisma e do @prisma/client, devemos:
 *                          npx prisma init (iniciliza o prisma)
 * 
 *            ***********Para realizar o sincronismo com o banco de dados, devemos executar o comando:
 *                          npx prisma migrate dev  
 * *****************************************************************************************************/

// Importando as bibliotecas
const express = require('express');
const cors = require('cors');   
const bodyParser = require('body-parser');

// Importando das controllers para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js');
const controllerGenero = require('./controller/genero/controllerGenero.js');
const controllerDesenvolvedora = require('./controller/desenvolvedora/controllerDesenvolvedora.js');

// Estabelecendo o formato de dados que deverá chegar no body da requisição(POST ou PUT)
const bodyParserJSON = bodyParser.json();

// Cria o objeto app para criar a API
const app = express();

// Configuração do cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors())
    next()
});

/*************************************JOGO********************************************/


// Endpoit para inserir um novo jogo no banco de dados
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request, response) {
    
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    
    // Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    // Encaminha os dados do novo jogo para a controller inserir no banco de dados
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)   
} ) 

// Endpoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {
    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// Endpoint para retornar um jogo específico
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    let idJogo = request.params.id
    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    let idJogo = request.params.id
    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    // Recebe o id do jogo
    let idJogo = request.params.id
    
    // Recebe os dados do jogo encaminhado no body da requisição
    let dadosBody = request.body

    // Chama a função para listar os jogos
    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

/*************************************GENERO********************************************/

// Endpoint para inserir um novo genero no banco de dados
app.post('/v1/controle-jogos/genero', cors(), bodyParserJSON, async function (request, response) {
    
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    
    // Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    // Encaminha os dados do novo genero para a controller inserir no banco de dados
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)   
}) 

// Endpoint para retornar uma lista de generos
app.get('/v1/controle-jogos/genero', cors(), async function (request, response) {
    // Chama a função para listar os generos
    let resultGenero = await controllerGenero.listarGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-jogos/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    // Chama a função para listar os generos
    let resultGenero = await controllerGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-jogos/genero/:id', cors(), async function (request, response) {
    let idGenero = request.params.id
    // Chama a função para listar os generos
    let resultGenero = await controllerGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.put('/v1/controle-jogos/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    // Recebe o id do genero
    let idGenero = request.params.id
    
    // Recebe os dados do genero encaminhado no body da requisição
    let dadosBody = request.body

    // Chama a função para listar os generos
    let resultGenero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

/*************************************DESENVOLVEDORA********************************************/

// Endpoint para inserir uma nova desenvolvedora no banco de dados
app.post('/v1/controle-jogos/desenvolvedora', cors(), bodyParserJSON, async function (request, response) {
    
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    
    // Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    // Encaminha os dados da nova desenvolvedora para a controller inserir no banco de dados
    let resultDesenvolvedora = await controllerDesenvolvedora.inserirDesenvolvedora(dadosBody, contentType)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)   
}) 

// Endpoint para retornar uma lista de desenvolvedoras
app.get('/v1/controle-jogos/desenvolvedora', cors(), async function (request, response) {
    // Chama a função para listar as desenvolvedoras
    let resultDesenvolvedora = await controllerDesenvolvedora.listarDesenvolvedora()

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

// Endpoint para retornar uma desenvolvedora específica
app.get('/v1/controle-jogos/desenvolvedora/:id', cors(), async function (request, response) {
    let idDesenvolvedora = request.params.id
    // Chama a função para buscar a desenvolvedora
    let resultDesenvolvedora = await controllerDesenvolvedora.buscarDesenvolvedora(idDesenvolvedora)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

// Endpoint para excluir uma desenvolvedora
app.delete('/v1/controle-jogos/desenvolvedora/:id', cors(), async function (request, response) {
    let idDesenvolvedora = request.params.id
    // Chama a função para excluir a desenvolvedora
    let resultDesenvolvedora = await controllerDesenvolvedora.excluirDesenvolvedora(idDesenvolvedora)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

// Endpoint para atualizar uma desenvolvedora
app.put('/v1/controle-jogos/desenvolvedora/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']

    // Recebe o id da desenvolvedora
    let idDesenvolvedora = request.params.id
    
    // Recebe os dados da desenvolvedora encaminhados no body da requisição
    let dadosBody = request.body

    // Chama a função para atualizar a desenvolvedora
    let resultDesenvolvedora = await controllerDesenvolvedora.atualizarDesenvolvedora(dadosBody, idDesenvolvedora, contentType)

    response.status(resultDesenvolvedora.status_code)
    response.json(resultDesenvolvedora)
})

/*********************************************************************************/

app.listen(8080, function () {
    console.log('API aguardando requisições...')
})