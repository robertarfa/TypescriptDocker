# Use uma imagem base oficial do Node.js
# Usar 'alpine' resulta em imagens menores
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os manifests de dependências (raiz e backend) para aproveitar cache
COPY package*.json ./
COPY backend/package*.json ./backend/

# Instala as dependências direto na pasta backend
RUN npm install --prefix backend

# O restante do código será montado por um volume no docker-compose
# Este Dockerfile é otimizado para desenvolvimento

# Expõe a porta que o app (Express) usará
EXPOSE 3000

# Comando padrão para manter o contêiner rodando (será sobrescrito pelo compose)
CMD [ "npm", "run", "dev" ]
