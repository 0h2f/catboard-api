# CatBoard API

CatBoard API é uma API para compartilhar imagens, feita seguindo os padrão MVC. A API permite que os usuários enviem, visualizem e pesquisem imagens semelhantes utilizando tags que descrevem as caracteristicas das imagens.

## Instalação

Para instalar a API, siga os seguintes passos:

1. Clone o repositório: `git clone https://github.com/purumamerin/catboard-api.git`
2. Navegue até a pasta do projeto: `cd catboard-api`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm start`
5. Crie um arquivo de configuração:
```javascript
module.exports = {
    connectionString: "",
    TOKEN_SECRET: "",
    sendgridKey: "",
    containnerAccount: "",
    containnerAccountKey: ""
}
```
O servidor será iniciado na porta 3000 por padrão. Você pode alterar a porta de escuta editando a variável de ambiente `PORT`.

## Autenticação

A API possui autenticação utilizando JsonWebToken.

## Tecnologias utilizadas

A API foi construída utilizando as seguintes tecnologias:

- Node.js
- Express.js
- MongoDB & Mongoose
- JsonWebToken
- Azure blob storage

## Contribuindo

Se você deseja contribuir para o projeto, por favor, abra um pull request com suas alterações.

## Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
