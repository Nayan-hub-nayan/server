require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const {home,register,login} = require('./controlers/auth-controler');
const {addservice} = require('./controlers/service');
const {contact} = require('./controlers/contact');
const serviceModel = require("./models/service-model");

// const  {contactValidate}  = require("./validation/contact-validate");
// const { validateContact } = require('./middleware/validation-middleware');



const app = express();
connectDB();

app.use(express.json());

app.get("/",home)
app.post("/register",register)
app.post("/login",login)

app.post("/service",addservice)

// Get All Pets (GET)
app.get("/api/service", async (req, res) => {
  try {
    const service = await serviceModel.find();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Pet by ID (GET)
app.get("/api/service/:id", async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Pet not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/contact", contact);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serve started on port ${PORT}`));
