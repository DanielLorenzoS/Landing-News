# Primera etapa: Construye la aplicación con Vite
#FROM node:18-alpine as BUILD_IMAGE
#
#WORKDIR /app/react-app
#COPY package.json .
#COPY package-lock.json .
#RUN npm ci
#RUN npm install vite@latest -g
#COPY . .
#RUN vite build

# Segunda etapa: Ejecuta la aplicación con Vite
#FROM node:18-alpine as PRODUCTION_IMAGE
#WORKDIR /app/react-app
#COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
#
#COPY package.json .
#COPY vite.config.js .
#
#
#RUN npm install vite@latest 
#EXPOSE 3000
#CMD ["npm", "run", "preview"]


# Primera etapa: Construye la aplicación con Vite
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app/react-app
COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN npm install vite@latest -g
COPY . .
RUN vite build

# Segunda etapa: Ejecuta la aplicación con Nginx
FROM nginx:alpine

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados por Vite en la ubicación adecuada de Nginx
COPY --from=BUILD_IMAGE /app/react-app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
