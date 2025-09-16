//atividade 2

const express = require('express'); 
const app = express();
const PORT = 8081;
const fs = require('fs');

app.use(express.json());

app.post(`/usuarios/`, (req, res ) => { // Rota para adicionar usuários
    try {
        const {nome, nota, situacao} = req.body; //extrai nome e idade do corpo da requisição
        if (nome == "" || nota == "") {
            return res.status(400).send("Nome e nota são obrigatórios");
        }

        const = situacao = nota
        situacao = nota >= 6 ? "Aprovado" : "Reprovado"; 

    } catch (error) { //tratamento de erro
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {  //inicia o servidor
    console.log(`Servidor rodando na porta HTTP://localhost:${PORT}`);


});

