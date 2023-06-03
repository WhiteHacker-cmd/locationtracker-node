const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000



let location_data = []

app.get('/gpsdata/', (req, res) => {
 
    
    location_data.push(req.query)
    console.log(location_data)
    io.emit('chat message', req.query);
    res.status(200).json({
      query: req.query
  })

});

io.on('connection', (socket) => {
  console.log('a user connected');
});


app.get('/', (req, res) =>{

    res.sendFile(__dirname + '/templates/index.html');
})


server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});