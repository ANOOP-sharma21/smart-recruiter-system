const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");  
const mongoose = require("mongoose");  
const cors = require("cors");  
require("dotenv").config();  

const app = express();  

// Middleware  
app.use(cors());  
app.use(express.json());  
app.use("/uploads", express.static("uploads"));  

// Routes  
const candidateRoutes = require("./routes/candidateRoutes");  
app.use("/api/candidates", candidateRoutes);  

// MongoDB connection  
mongoose.connect(process.env.MONGO_URI)  
.then(() => console.log("MongoDB Connected ✅"))  
.catch(err => console.log(err));  

// Start server  
app.listen(5000, () => {  
  console.log("Server running on port 5000 🚀");  
});