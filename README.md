# Sistema de Leilões

Este projeto é um sistema de leilões, ondeusuários podem criar leilões e fazerem lances que são notificados a todos em tempo real. O projeto utiliza **Next.js**, **TypeScript**, **React Hook Form**, **React Query**, **axios**, **Zod** e **React Hot Toast**. O sistema realiza a validação de usuários com informações como CPF e senha, além de validar e formatar o CPF durante o processo de login.

## Funcionalidades

- **Validação de CPF** para garantir que ele esteja no formato correto.
- **Formatação automática de CPF** enquanto o usuário digita.
- **Validação de senha** para garantir que a senha tenha pelo menos 6 caracteres.
- **Exibição de mensagens de erro** caso o CPF ou senha não sejam válidos.
- **Cadastro de Leilões** para envio de lances.
- **Envio de lances** para competir nos leilões em tempo real.
- **Encerramento de leilões** Quando o leilão chega no prazo limite, ele se encerra e notifica qual foi o usuário vencedor e qual o valor do seu lance.

## Tecnologias Utilizadas

- **Next.js**: Framework React para a construção de interfaces de usuário e renderização do lado do servidor (SSR).
- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, proporcionando maior segurança e escalabilidade ao código.
- **React Hook Form**: Biblioteca para gerenciamento de estado de formulários de forma eficiente, com menos re-renderizações.
- **React Query**: Biblioteca para gerenciamento de estado remoto e cache de dados, facilitando a integração com APIs e outras fontes de dados.
- **Axios**: Cliente HTTP para fazer requisições a APIs e lidar com respostas assíncronas.
- **Zod**: Biblioteca para validação e parsing de dados de forma declarativa e com suporte a TypeScript.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e eficiente da interface do usuário.
- **Date-fns**: Biblioteca para manipulação de datas e horas de maneira simples e imutável.
- **JSON Server**: Ferramenta para criar uma API RESTful simulada a partir de um arquivo JSON, útil para testes e desenvolvimento.
- **Socket.io**: Biblioteca para comunicação em tempo real via WebSockets, permitindo a criação de funcionalidades como notificações e atualizações em tempo real.


## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

├── app/ 
├── components/ 
├── hooks/
├── context/
├── services/  
├── types/ 
├── db.json/ 
├── server.js/
└── config.json 

### Descrição das Pastas

- **`components/`**: Contém componentes reutilizáveis.
- **`hooks/`**: Contém hooks personalizados.
- **`app/`**: Contém as páginas principais do sistema.
- **`context/`**: Responsável por gerenciar o estado global da aplicação, utilizando o Context API.
- **`services/`**:  Instância do cliente HTTP Axios.
- **`types/`**: Contém definições de tipos TypeScript para garantir a tipagem correta dos dados utilizados no projeto.
- **`db.json/`**: Arquivo utilizado pelo JSON Server para simular uma API RESTful com dados armazenados localmente, útil durante o desenvolvimento.
- **`server.js/`**: Arquivo de configuração do servidor, utilizado para rodar o JSON Server ou para configurar o servidor backend local.
- **`config.json`**: Arquivo contendo configurações do projeto, como variáveis de ambiente, URLs de APIs, e outras opções de configuração.


## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/okumura-e/auction-app.git
   ```
   
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o Servidor:
   ```bash
   node server.js
   ```
    O servidor iniciará na porta 3000

4. Inicie a aplicação em um novo terminal:
   ```bash
   npm run dev
   ```
    A aplicação iniciará na porta 3002. É possível acessar no endereço [http://localhost:3002](http://localhost:3002)
