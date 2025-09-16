//atividade 4

const express = require('express'); //importa o express
const app = express();
const PORT = 8081;
const fs = require('fs'); //importa o filesystem

app.use(express.json());//middleware para interpretar JSON no corpo da requisição


app.post(`/soma`, (req, res ) => { // Rota para adicionar usuários
    try {
        const {numeros} = req.body; //extrai numeros do corpo da requisição
        console.log(numeros);

        const numerosValidos = numeros.filter(letras => !isNaN(Number(letras)));//filtra apenas os numeros válidos

        const soma = numerosValidos.reduce((valorAcumulado, atual) => valorAcumulado + Number(atual), 0);//realiza a soma dos numeros válidos

        res.status(200).json({resultado: soma});//retorna o resultado da soma

    } catch (error) { //tratamento de erro
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {  //inicia o servidor
    console.log(`Servidor rodando na porta HTTP://localhost:${PORT}`);
});