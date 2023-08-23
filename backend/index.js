const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/FlashCardRoute");

require("dotenv").config();

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

//Router
app.use("/api", router);


//Test Router
app.get("/", (req, res)=>{
    res.status(200).json("Hello")
})

//Connnect to the database
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Kết nối Database thành công !");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
})
