const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const io = require('socket.io')(3001, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT"]
  }
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('new-bid', (bid) => {
    console.log('New bid received:', bid);
    io.emit('new-bid', bid);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});