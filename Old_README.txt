# 🚀 API Node.js – Desafio Rocketseat

Projeto desenvolvido durante o evento **Desafio: Sua Primeira API com Node.js** da **Rocketseat** (11 a 14 de agosto de 2025), com foco em aprender e aplicar, na prática, os fundamentos do back-end.

## 📚 Sobre o Projeto
Esta aplicação é uma **API REST** desenvolvida com **Node.js** e **TypeScript**, conectada a um banco de dados **PostgreSQL** via **Docker**, com testes automatizados, documentação no **Swagger** e pipeline de integração contínua com **GitHub Actions**.

O objetivo é colocar em prática conceitos essenciais para quem está iniciando no desenvolvimento back-end, resultando em uma aplicação funcional, com deploy e pronta para uso profissional.

---

## 🧠 Conteúdos abordados no evento

- **Fundamentos de API com Node.js**  
  Conceitos de API, padrão REST, comunicação via JSON e protocolo HTTP.

- **Construção prática da API**  
  Criação de endpoints, conexão com PostgreSQL usando Docker, testes e documentação com Swagger.

- **Testes e Mocking**  
  Garantia de qualidade com testes automatizados e simulação de dados.

- **Deploy e Integração Contínua**  
  Deploy da aplicação com Docker, pipeline no GitHub Actions e segurança básica.

- **Aplicação completa no ar**  
  API finalizada, publicada e pronta para integrar no portfólio.

---

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [GitHub Actions](https://github.com/features/actions)

---

## 📂 Estrutura do Projeto
```
│   .gitignore
│   instrucoes.txt          # Instruções do desafio
│   package.json             # Dependências e scripts
│   package-lock.json        # Versões exatas das dependências
│   tsconfig.json            # Configuração do TypeScript
│   requisicoes.http         # Requisições para testar a API
│
├── server.ts                # Ponto de entrada principal
└── server-aula.ts           # Código usado durante as aulas
```

---

## ▶️ Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/DevWebFelipe/ApiNodeJS.git
cd ApiNodeJS
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com suas credenciais e configurações (exemplo abaixo):

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_banco
PORT=3333
```

### 4. Subir o banco de dados com Docker
```bash
docker compose up -d
```

### 5. Rodar a aplicação em modo desenvolvimento
```bash
npm run dev
```

### 6. Testar endpoints
Você pode usar o arquivo `requisicoes.http` no VSCode (com a extensão REST Client) ou ferramentas como **Insomnia** e **Postman**.

---

## 📌 Endpoints
| Método | Rota         | Descrição                                                                 |
|--------|--------------|---------------------------------------------------------------------------|
| GET    | /ping        | Testa se a API está online                                                |
| GET    | /items       | Lista todos os itens                                                      |
| POST   | /items       | Cria um novo item                                                         |
| PUT    | /items/:id   | Atualiza um item *(desenvolvido de forma independente como desafio extra)*|
| DELETE | /items/:id   | Remove um item *(desenvolvido de forma independente como desafio extra)*  |

---

## 📜 Licença
Este projeto foi desenvolvido para fins educacionais durante o evento da Rocketseat e está sob a licença MIT.
