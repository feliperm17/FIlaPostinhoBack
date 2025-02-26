# FilaPostinhoBack

## Descrição

O **FilaPostinhoBack** é um projeto backend desenvolvido em TypeScript, que visa gerenciar filas de atendimento em ambientes de saúde. Este sistema permite que os usuários se inscrevam em filas, verifiquem seu status e recebam notificações sobre o andamento do atendimento.

## 🔧 Pré-requisitos

Antes de executar o projeto, certifique-se de que você possui os seguintes pré-requisitos instalados em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **PostgreSQL** (versão 12 ou superior)
- **Docker** (opcional, se você preferir usar contêineres para o banco de dados)

## 🚀 Funcionalidades

- **Gerenciamento de Filas**: Criação, visualização e gerenciamento de filas de atendimento.
- **Autenticação**: Sistema de autenticação seguro utilizando JSON Web Tokens (JWT).
- **Notificações**: Notificações em tempo real sobre o status da fila.
- **Integração com Banco de Dados**: Conexão com PostgreSQL para armazenamento de dados.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Express**: Framework para construção de APIs.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **bcrypt**: Biblioteca para hashing de senhas.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.
- **dotenv**: Carregamento de variáveis de ambiente a partir de um arquivo `.env`.

## 🏃 Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/feliperm17/FIlaPostinhoBack
   cd FilaPostinhoBack
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   ```
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
   JWT_SECRET=seu_segredo
   ```

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

## Scripts

- `start`: Inicia o servidor utilizando `ts-node`.
- `dev`: Inicia o servidor em modo de desenvolvimento.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```