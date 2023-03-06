import express  from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from "./mongodb/connect.js";
import UserRouter from './routes/user.routes.js'
import PropertyRouter from './routes/property.routes.js'
import DashboardRouter from './routes/dashboard.js'

 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.get('/', (req,res)=>{
    res.send({message: 'Hello motherFucker'})
})
// app.get('/api/v1/dashboard', (req,res)=>{
//     res.send({message: 'Hello User motherFucker'})
// })

app.use('/api/v1/users',UserRouter);
app.use('/api/v1/properties',PropertyRouter);
app.use('/api/v1/',DashboardRouter);


const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)

        app.listen(8080, () => console.log('server started on port http://localhost:8080') )
    } catch (error) {
        console.log(error)
    }
}

startServer();