import { messagesDao } from "../persistencia/daos/mongoDao/messages.dao.js";

async function messagesHandler(io, socket) {

    socket.on("messageSent", async (message) => {
        await messagesDao.createOne(message);
        const messages = await messagesDao.findAll(); 
        io.sockets.emit("newMessages",messages);   
    })

    socket.on("getMessages", async() => {
        const messages = await messagesDao.findAll(); 
        io.sockets.emit("newMessages",messages);
    })
}

export { messagesHandler };