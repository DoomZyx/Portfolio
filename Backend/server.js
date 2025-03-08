const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = require('./app');

app.use((req, res, next) => {
  console.log(`🔍 Requête reçue : ${req.method} ${req.url}`);
  console.log("🌎 Origin :", req.headers.origin);
  next();
});

app.use(cors({
  origin: "*",  
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
