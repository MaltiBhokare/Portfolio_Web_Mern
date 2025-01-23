// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();




// // Middleware
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb+srv://user2422:2422@cluster0.qdvbx.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));


// // Define the user schema and model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
// });



// // Define a simple route for testing
// app.get("/", (req, res) => {
//   res.send("Hello, the server is working!");
// });

// const User = mongoose.model("User", userSchema, "users"); // "users" is your collection name

// // API endpoint to handle form submissions
// app.post("/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     // Validate request data
//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Save the form data to the database
//     const newUser = new User({ name, email, message });
//     await newUser.save();

//     res.status(201).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ error: "An error occurred while saving the message." });
//   }
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log('Server running on port ${PORT}');
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//   origin: "https://portfolio-web-mern-frontend.vercel.app", // Your frontend domain
//   methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Allow specific headers
// }));

// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(
//     "mongodb+srv://user2422:2422@cluster0.qdvbx.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// // Define the user schema and model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema, "users"); // "users" is your collection name

// // Define a simple route for testing
// app.get("/", (req, res) => {
//   res.send("Hello, the server is working!");
// });



// app.options("*", cors()); // Enable CORS for preflight requests


// // API endpoint to handle form submissions
// app.post("/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     // Validate request data
//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Save the form data to the database
//     const newUser = new User({ name, email, message });
//     await newUser.save();

//     res.status(201).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     res.status(500).json({ error: "An error occurred while saving the message." });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "https://portfolio-web-mern-frontend.vercel.app", // Your frontend domain
  methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};

app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Connection (directly in the code)
const mongoURI = "mongodb+srv://user2422:2422@cluster0.qdvbx.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"; // MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "users"); // "users" is your collection name

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Hello, the server is working!");
});

// Handle CORS preflight requests
app.options("*", cors());

// API endpoint to handle form submissions
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request data
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save the form data to the database
    const newUser = new User({ name, email, message });
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "An error occurred while saving the message." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
