const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middlewares/errorMiddleware");
const cors = require("cors");

const connectDB = require("./config/db");
connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/services', require('./routes/serviceRoutes'));
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));