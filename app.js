require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const { home, register, login } = require('./controlers/auth-controler');
const { addservice } = require('./controlers/service');
const { contact } = require('./controlers/contact');
const serviceModel = require("./models/service-model");
const contactModel = require("./models/contact-model")

const app = express();
connectDB();
app.use(express.json());

// Routes
app.get("/", home);
app.post("/register", register);
app.post("/login", login);
app.post("/service", addservice);

// Get All Services
app.get("/api/service", async (req, res) => {
  try {
    const service = await serviceModel.find();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Service
app.get("/api/service/:id", async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/contact", contact);
app.get("/api/contact", async (req, res) => {
  try {
    const contact = await contactMadel.find();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
