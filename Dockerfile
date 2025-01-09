FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install tailwindcss --save --legacy-peer-deps
RUN npm install --legacy-peer-deps
RUN npm install --save-dev eslint-config-next@15.0.2 eslint@^8 postcss@^8 tailwindcss@^3.4.1 --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]