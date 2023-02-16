# Escolha a imagem base que será usada para construir a sua imagem
FROM node:14-alpine AS build

# Defina o diretório de trabalho na imagem
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código fonte do projeto para a imagem
COPY . .

# Construa a aplicação React
RUN npm run build

# Escolha a imagem base que será usada para executar a aplicação
FROM nginx:latest

# Copie a configuração do Nginx para a imagem
COPY nginx.conf /etc/nginx/nginx.conf

# Copie a aplicação React construída anteriormente para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para acesso externo
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]
