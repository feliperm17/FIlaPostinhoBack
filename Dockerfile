# Use uma imagem base do Node.js
FROM node:16

# Crie um diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código restante para o contêiner
COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "start"]
