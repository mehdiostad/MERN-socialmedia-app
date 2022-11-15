const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    //if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
      console.log("New User Connected");
    }
    io.emit("get-users", activeUsers);
  });
  io.on("disconnect", () => {
    let activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    console.log("user disconnetcted");
    io.emit("get-users", activeUsers);
  });
});
