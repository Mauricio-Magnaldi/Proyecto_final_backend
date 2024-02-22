import { Schema, model, mongoose } from "mongoose";

const ticketsSchema = new Schema({
  code: {
    type: String,
  },
  purchase_datetime: {
    type: Date,
  },
  code: {
    type: String,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
  },
  products: [{
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  }],
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  }
});

export const ticketsModel = model("Tickets", ticketsSchema);
