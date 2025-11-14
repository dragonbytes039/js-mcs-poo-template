import express  from "express";
import 'dotenv/config';
import { connectDB } from "../config/DB/configDb.js";
import { timeout } from "./middleware/timeOut.js";
import ExampleRouter from "./routes/example.router.js";

export async function startServer() {


    //app
    const app = express();

    //conexiones 

    await connectDB();
    // await connectRabbitMQ();
    // await ConsumerRabitMq(); 

    //middleware
    app.use(express.json({ limit: '15mb' }))
    app.use(timeout)

    
    //routes
    app.use("/Example",ExampleRouter)


    //server
    const port = process.env.PORT ?? 3003
    app.listen( port  ,()=> console.log(`Servidor escuchando en el puerto ${port}`))


}
