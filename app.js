import express from "express";
import { PORT , MongoDBURL} from "./backend/config.mjs";
import { Contact } from "./backend/SchemaModels.mjs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("./frontend/Public"));
app.use(bodyParser.urlencoded({extended : true }))


app.get("/",(req,res)=>{
    // res.sendFile(__dirname+"/frontend/Public");
    res.send("Hello")
})

app.post("/submit",(req,res)=>{
    const Data = req.body;
    const newClient = new Contact(Data);
    // console.log(Data);
    newClient.save()
    .then(()=>{
        console.log("User data saved in data base");
        res.redirect("/");
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send("Internal Server Error");
    })
})

mongoose
.connect(MongoDBURL,{ useNewUrlParser: true })
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log("Running on PORT: ",PORT);
    });
}
)
.catch((error)=>{
    console.log(error);
})
