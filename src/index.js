import connectDB from "./db/connection.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config(
     {path : "./env" }
);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`server is ready at : ${process.env.PORT}`);
        });
    })



.catch((err)=> {
    console.log(`mongodb connection failed`,err);
})
