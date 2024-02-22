import { messagesModel } from "../../../models/messages.model.js";
import BasicDao from "./basic.dao.js";

class MessagesDao extends BasicDao {
    constructor(){
        super(messagesModel)
    }
}

export const messagesDao = new MessagesDao();