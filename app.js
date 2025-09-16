const express = require('express'); 
const app = express();
const PORT = 8081;
const fs = require('fs');

app.use(express.json());

app.post(`/usuarios/`, (req, res ) => { // Rota para adicionar usuários
    try {
        const {nome, email, senha} = req.body;


     if (nome.length < 3) { //regras de validação
        return res.status(400).json({error: "Nome é obrigatório e deve ter pelo menos 3 caracteres."});
     }


     if (!email.includes('@')) { //regras de validação
        return res.status(400).json({error: "Email é obrigatório e deve ser válido."});
     }


        if (senha.length < 4) {  //regras de validação
        return res.status(400).json({error: "Senha é obrigatória e deve ter pelo menos 4 caracteres."});
     }


    let usuarios = [];
if (fs.existsSync('usuarios.json')) { //verifica se o arquivo existe
    const data = fs.readFileSync('usuarios.json', 'utf-8');
    usuarios = JSON.parse(data);


} else {
    usuarios = [];
}


    const usuarioCriado = {nome, email, senha}; //cria o objeto do usuário
    usuarios.push(usuarioCriado);


fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));//escreve no arquivo


    res.status(201).json(usuarioCriado);


    } catch (error) { //tratamento de erro
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.listen(PORT, () => {  //inicia o servidor
    console.log(`Servidor rodando na porta HTTP://localhost:${PORT}`);


});

