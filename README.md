# postman-api
API de envio de e-mail.

## Resumo
Este projeto destina-se a fornecer um serviço web simples de envio de e-mail.

## Como Usar

### Pré-requisitos
O que você precisa para instalar e rodar o projeto:

1. Git (^2.8.1) - https://git-scm.com/
2. Node.js (^6.9.4) e NPM (^3.10.10) - https://nodejs.org/

### Instalando
Um passo a passo...

1. Execute o comando git clone para download dos fontes deste repositório;
2. Vá para a pasta do projeto e execute os comandos npm install e npm start.

#### Acessando o Serviço
1. Envie uma requisição HTTP, usando o método POST, para a rota "/".
2. No cabeçalho da requisição, defina o Content-Type como application/x-www-form-urlencoded.
3. No body da requisição, passe os seguintes valores:

{
    "from": "...",
    "to": "...",
    "subject": "...",
    "text": "...",
    "html": "..."
}

### API no Heroku
Para facilitar, a API foi hospedada no Heroku.

Você também pode testar e usar esta API por meio da URL: https://postman-api.herokuapp.com.

## Licença
MIT License (MIT).
