//atividade 3

const express = require('express'); 
const app = express();
const PORT = 8081;
const fs = require('fs');

app.use(express.json());


app.post(`/soma`, (req, res ) => { // Rota para adicionar usuários
    try {
        const {numeros} = req.body; //extrai numeros do corpo da requisição
        console.log(numeros);
        // Verificar se todos os elementos são números
        if (numeros.some(num => isNaN(Number(num)))) {
            return res.status(400).send("coloque apenas numeros ");
        }

        const soma = numeros.reduce((valorAcumulado, atual) => valorAcumulado + atual, 0);
        res.status(200).json({resultado: soma});

    } catch (error) { //tratamento de erro
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {  //inicia o servidor
    console.log(`Servidor rodando na porta HTTP://localhost:${PORT}`);
});
