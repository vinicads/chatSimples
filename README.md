# Chat Simples

Um chat em tempo real construído com Vue.js no frontend e NestJS no backend, utilizando WebSockets para comunicação em tempo real. Este projeto permite que os usuários se conectem, enviem e recebam mensagens instantaneamente.

## Tecnologias Utilizadas

- **Frontend:** Vue.js
- **Backend:** NestJS
- **WebSockets:** Socket.IO
- **Gerenciamento de Pacotes:** npm

## Funcionalidades

- Conexão de múltiplos usuários em tempo real.
- Envio e recebimento de mensagens.
- Indicação de quem está online e quem saiu.
- Mensagens pessoais são exibidas à direita e as mensagens dos outros à esquerda.
- Design responsivo que imita a aparência de um aplicativo de mensagens.

## Pré-requisitos

Antes de começar, você precisará ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados na sua máquina.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/vinicads/chatSimples.git
cd chatSimples
```

### 2. Instale as dependências do backend

Navegue até a pasta da api (caso exista) e instale as dependências:

```bash
cd api
npm install
```

### 3. Instale as dependências do frontend

Navegue até a pasta do frontend e instale as dependências:

```bash
cd frontend
npm install
```

### 4. Execute o servidor backend

Volte para a pasta da api e inicie o servidor:

```bash
npm run start:dev
```

### 5. Execute o frontend

Navegue para a pasta do frontend e inicie o aplicativo Vue.js:

```bash
npm run serve
```

### 6. Acesse o chat

Abra o navegador e acesse [http://localhost:8080](http://localhost:8080) (ou a porta especificada) para usar o chat.

