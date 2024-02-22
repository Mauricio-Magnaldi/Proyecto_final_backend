import { ticketsModel } from "../../../models/tickets.model.js";
import BasicDao from "./basic.dao.js";

class TicketsDao extends BasicDao {
    constructor(){
        super(ticketsModel)
    }
}

export const ticketsDao = new TicketsDao();

