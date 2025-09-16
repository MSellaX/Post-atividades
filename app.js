//atividade 2 

const { notEqual } = require('assert');
const express = require('express'); 
const app = express();
const PORT = 8081;
const fs = require('fs');

app.use(express.json());

app.post(`/medias`, (req, res ) => { // Rota para adicionar usuários
    try {
        const {nome, notas} = req.body; //extrai nome e notas do corpo da requisição
        if (!nome || !notas || notas.length === 0) {
            return res.status(400).send("Nome e notas são obrigatórios");
        }

        const soma = notas.reduce((valorAcumulado, nota) => valorAcumulado + nota);
        const media = soma / notas.length;
        const situacao = media >= 6 ? "Aprovado" : "Reprovado";

        const mediaFinal = { nome, notas, soma, media, situacao };
        isNaN(mediaFinal.media) ? res.status(400).send("Erro: Notas inválidas"):
        res.status(200).json(mediaFinal);

        let medias = []; //array para armazenar as médias
            const data = fs.readFileSync('medias.json', 'utf-8'); //lê o arquivo medias.json
            medias = JSON.parse(data);       

        res.status(201).json(mediaFinal);

    } catch (error) { //tratamento de erro
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {  //inicia o servidor
    console.log(`Servidor rodando na porta HTTP://localhost:${PORT}`);


});