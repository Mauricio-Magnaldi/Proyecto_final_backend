import { Schema, model, mongoose } from "mongoose";

const usersSchema = new Schema({
    first_name: { 
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Carts",
    },
    from_github: {
        type: Boolean,
        default: false,
    },
    from_google: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "premium", "user"],
        default: "user",
    },
    tickets: {
        type: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Tickets",
            },
        ],
        default: [],
    }
},
{
    timestamps: true,
}
);

export const usersModel = model("Users", usersSchema);
