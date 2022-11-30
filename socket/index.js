const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:80",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("socket io");
  socket.on("new-user-add", (newUserId) => {
    //if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    console.log("user disconnetcted", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // send message to specific user
  socket.on("send-message", (data) => {
    const { recieverId } = data;
    const user = activeUsers.find((user) => user.userId === recieverId);
    console.log("active users now:", activeUsers);
    console.log(user);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
      console.log(data);
    }
  });
});
