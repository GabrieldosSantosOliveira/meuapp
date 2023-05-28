
 ## <p align="center"> Api-News <a href="LICENSE"> <img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=&labelColor=202024" alt="License"></a> </p>
A Api-News é uma que permite pessoas se cadastrarem para postagem de noticias.

## Desenvolvimento
- Foi utilizado para o desenvolvimetno as praticas de tdd
- Para organizar a aplicação foi utilizada uma arquitetura limpa
- Utilizado o docker compose para levantar todas as ferramentas de desenvolvimento necessarias
- Utilizado repositorios em memoria para testar a aplicação
- Foi criado a caso de uso de recuperação de senha do usuario na aplicação utilizando o envio de email com o nodemailer
## 🛠️ Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Git](https://git-scm.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/pt-br/)
- [jest](https://jestjs.io/)

## 🚚 Git Pré-Commit

- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://typicode.github.io/husky/#/)

## ✔️ Pré Requisitos

- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/) versão 18
- [Docker](https://www.docker.com/)

## 🚀 Como executar

Clone o repositório

```bash
git clone https://github.com/GabrieldosSantosOliveira/meuapp.git
```

Instale as dependências

```bash
npm i
```

Execute com o docker compose

```bash
docker compose up -d
```
Recrie o arquivo .env utilizando o arquivo .env.example

```bash

DATABASE_URL=
PORT=
SECRET_ACCESS_TOKEN=
SECRET_REFRESH_TOKEN=
BASE_URL=
SIZE_FOR_PAGE=
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_AUTH_USER=
MAIL_AUTH_PASS=
```

Execute a aplicação
```bash
npm run dev
```
## 🔖 Documentação
Execute a aplicação
```bash
npm run dev
```
Execute a rota
```bash
/api-docs
```

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

| [<img src="https://avatars.githubusercontent.com/u/86084272?v=4" width=115><br><sub>Gabriel Oliveira</sub>](https://www.linkedin.com/in/gabriel-dos-santos-oliveira-24b67b243/)
| :---: |
