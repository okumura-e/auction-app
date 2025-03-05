// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const io = require('socket.io')(3001, {
  cors: {
    origin: "http://localhost:3002", // Permite conexões do Next.js
    methods: ["GET", "POST"]
  }
});

// Middlewares do json-server
server.use(middlewares);
server.use(router);

// Iniciar o json-server na porta 3000
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

// Configurações do socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('new-post', (post) => {
    console.log('New post received:', post);
    io.emit('new-post', post); // Envia o post para todos os clientes
  });
});