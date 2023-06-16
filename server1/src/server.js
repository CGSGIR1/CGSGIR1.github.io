const http = require("http");
const express = require("express");
const morgan = require("morgan");
const { Server } = require("socket.io");
let fs = require("fs");

const app = express();
app.use(morgan("combined"));
app.use(express.static("./dist"));
let fileContent = "";

//initialize a simple http server
const server = http.createServer(app);
const io = new Server(server);

const clients = [];

io.on("connection", (socket) => {
  clients.push(socket);
  socket.emit("LoadHistory", fileContent);
  console.log(`Client connected with id: ${fileContent}`);
  socket.on("MessageToServer", (msg) => {
    const replyMsg = msg;
    fileContent += msg;
    console.log(replyMsg);
    for (client of clients) {
      if (client === socket) {
        continue;
      }
      client.emit("MessageFromServer", replyMsg);
    }
  });
  socket.on("disconnect", () => {
    console.log(`Client disconnected with id: ${socket.id}`);
    const index = clients.indexOf(socket);
    if (index > -1) {
      clients.splice(index, 1);
    }
    console.log(clients.length);
    if (clients.length === 0) {
      fs.writeFile("chat.txt", fileContent, function (error) {
        if (error) throw error; // ошибка чтения файла, если есть
        console.log("Данные успешно записаны записать файл");
      });
    }
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
  fileContent = fs.readFileSync("chat.txt", "utf8");
});
