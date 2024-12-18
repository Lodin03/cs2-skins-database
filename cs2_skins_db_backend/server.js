const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection string
const uri = "mongodb+srv://Lodin:8F7WyooagrPE4jtW@cs2-skins-db.uyvln.mongodb.net/?retryWrites=true&w=majority&appName=cs2-skins-db";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// Define the Skin schema with the new structure
const skinSchema = new mongoose.Schema({
    name: String, // Skin name (e.g., M4A1-S | Vaporwave)
    rarity: { 
      type: String, 
      enum: ["Consumer Grade", "Industrial Grade", "Mil-Spec", "Restricted", "Classified", "Covert", "Contraband", "Extraordinary"],
      required: true 
    }, // Rarity of the skin
    collection: String, // Collection or case it comes from (e.g., Gallery Case)
    imageUrl: String, // URL for the skin image
    floatCap: {
      min: Number, // Min float value (e.g., 0.00)
      max: Number // Max float value (e.g., 0.60)
    }, 
    description: String, // Description of the skin (e.g., Custom painted with a Greco-Roman statue)
    flavorText: String, // Flavor text (e.g., From a hypnagogic dream)
    finishStyle: String, // Finish style (e.g., Custom Paint Job)
    finishCatalog: String, // Finish catalog (e.g., 106)
    dateAdded: String, // Date added to the game (e.g., 4 October 2024)
    update: String // Update name (e.g., The Armory)
  });

// Create a Skin model from the schema
const Skin = mongoose.model('Skin', skinSchema);

// Route to get all skins
app.get('/skins', async (req, res) => {
  try {
    const skins = await Skin.find(); // Fetch all skins
    res.json(skins); // Return skins as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching skins');
  }
});

// Route to add a new skin
app.post('/skins', async (req, res) => {
  try {
    const newSkin = new Skin(req.body); // Create a new skin document
    await newSkin.save(); // Save it to the database
    res.status(201).json(newSkin); // Return the created skin
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving skin');
  }
});

// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
