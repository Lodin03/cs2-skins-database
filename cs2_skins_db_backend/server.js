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
    update: String, // Update name (e.g., The Armory)
    category: { type: String, enum: ['Pistol', 'Mid-Tier', 'Rifle', 'Knife', 'Gloves'], required: true }, // Type of weapon/equipment
    weaponType: String // Sub-category, type of weapon (USP-S, Butterfly Knife, Bloodhound Gloves etc.)
});

// Create a Skin model from the schema
const Skin = mongoose.model('Skin', skinSchema);

const skin1 = new Skin({
  name: 'AK-47 | Inheritance',
  rarity: 'Extraordinary',
  collection: 'Operation Breakout Weapon Case',
  imageUrl: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60m_7zO6-fzjwHvJEn2OqWotmi3gXt_BVtYD-ncIWcIA85YV-ErwK-ley-18e06oOJlyU3nvbOMA/512fx384f',
  floatCap: { min: 0.00, max: 0.80 },
  description: 'This custom paint job takes inspiration from traditional Chinese porcelain and Delft Blauw art.',
  flavorText: 'A "family" heirloom, passed through generations', 
  finishStyle: 'Gunsmith',
  finishCatalog: '1171',
  dateAdded: '7 February 2024',
  update: 'A Call To Arms',
  category: 'Rifle',
  weaponType: 'AK-47'
});

/*
skin1.save()
  .then(() => console.log("Skin saved successfully!"))
  .catch(err => console.error("Error saving skin:", err));
*/

module.exports = { Skin };

// Define the rarityOrder object for sorting by rarity
const rarityOrder = {
  "Extraordinary": 1, // Knife skin/glove
  "Contraband": 2,
  "Covert": 3,
  "Classified": 4,
  "Restricted": 5,
  "Mil-Spec": 6,
  "Industrial Grade": 7,
  "Consumer Grade": 8
};

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

// Route to get skins by weaponType
app.get('/skins/:category/:type', async (req, res) => {
  const { category, type } = req.params; // Extract category and weaponType from the URL parameters

  console.log(`Received category: ${category}, type: ${type}`);
  try {
    const skins = await Skin.find({ category: category, weaponType: type });// Find skins with the specified category and weaponType
    res.json(skins); // Return the filtered skins as JSON
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

// Route to update a skin by its ID
app.put('/skins/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Data to update

    const updatedSkin = await Skin.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedSkin) {
      return res.status(404).send('Skin not found'); // Handle if no skin matches the ID
    }

    res.status(200).json({ message: 'Skin updated successfully', updatedSkin }); // Return the updated skin
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating skin'); // Handle errors
  }
});


// Route to delete a skin by its ID
app.delete('/skins/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the request parameters
    const deletedSkin = await Skin.findByIdAndDelete(id); // Find the document by ID and delete it

    if (!deletedSkin) {
      return res.status(404).send('Skin not found'); // Handle if no skin matches the ID
    }

    res.status(200).json({ message: 'Skin deleted successfully', deletedSkin }); // Return success response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting skin'); // Handle errors
  }
});


// Start the server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
