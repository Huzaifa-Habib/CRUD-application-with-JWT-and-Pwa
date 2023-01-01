import express from "express"
import path from 'path';
import cors from 'cors';
import mongoose from "mongoose"
import cookieParser from "cookie-parser";

import router from './routes/api.mjs'


const app = express()
const port = process.env.PORT || 3000
const mongodbURI = process.env.mongodbURI || "mongodb+srv://admin:admin123@cluster0.vpuj8pq.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongoose.connect(mongodbURI);
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3001', '*'],
    credentials: true

}));

// mongoose.set('strictQuery', true);



app.use("/api/v1", router)




const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './product/build')))
app.use('*', express.static(path.join(__dirname, './product/build')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/////////////////////////////////////////////////////////////////////////////////////////////////

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////