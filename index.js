import express from "express";
import dotenv from "dotenv"
import { usersRouter } from "./Routers/users.js";
import cors from "cors";
import { sendMailRouter } from "./Routers/sendMail.js";
import { profilesRouter } from "./Routers/profiles.js";


// configure the envirenment
dotenv.config()

//initialize express server framework
const PORT=process.env.PORT;
const app=express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welocome to Project2")
})
// app.use("/menu",menuRouter);
app.use("/users",usersRouter)   
// app.use("/admin",adminRouter)
app.use("/profile",profilesRouter)
app.get("/mail",sendMailRouter)



//listen to a server
app.listen(PORT,()=>console.log( `server started in localhost:9090`));