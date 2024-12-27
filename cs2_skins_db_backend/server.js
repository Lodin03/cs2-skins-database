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
      enum: ["Consumer Grade", "Industrial Grade", "Mil-Spec", "Restricted", "Classified", "Covert", "Extraordinary", "Contraband"],
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
  name: 'AK-47 | Panthera onca',
  rarity: 'Classified',
  collection: 'Ancienct',
  imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak_jaguar_light_large.92dd85d59d2615eab90bf86d7e4df6ee9e095132.png',
  floatCap: { min: 0.06, max: 1.00 },
  description: 'The wood on the stock and handguard feature beautiful carvings, often stealing attention from the custom painted jaguar on the side.',
  flavorText: "Who said you can't change your spots?",
  finishStyle: 'Custom Paint Job',
  finishCatalog: '1018',
  dateAdded: '3 December 2020',
  update: 'Operation Broken Fang',
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
  "Contraband": 1, 
  "Extraordinary": 2, // Knife skin/glove
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

// Route to get skins by rarity
app.get('/skins/rarity/:rarity', async (req, res) => {
  const { rarity } = req.params;
  try {
    const skins = await Skin.find({ rarity: rarity });
    res.json(skins);
  } catch (err) {
    console.error('Error fetching skins by rarity:', err);
    res.status(500).send('Error fetching skins by rarity');
  }
});

// Route to get skins by case
app.get('/skins/case/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    const skins = await Skin.find({ collection: collection }); 
    res.json(skins);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching skins by case');
  }
});

// Route to get skins by collection
app.get('/skins/collection/:collection', async (req, res) => {
  const { collection } = req.params;
  try {
    const skins = await Skin.find({ collection: collection }); 
    res.json(skins);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching skins by case');
  }
});

// Route to get skins by weaponType
app.get('/skins/:category/:type', async (req, res) => {
  const { category, type } = req.params; // Extract category and weaponType from the URL parameters
  try {
    const skins = await Skin.find({ category: category, weaponType: type });// Find skins with the specified category and weaponType
    res.json(skins);
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
