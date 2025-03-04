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

const skins = [
  {
    name: 'Driver Gloves | Queen Jaguar',
    rarity: 'Extraordinary',
    collection: 'Operation Broken Fang Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_jaguar_yellow_light_large.f706695fc1cc89762777696d24cd2e22f50582aa.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation.',
    flavorText: '',
    finishStyle: '',
    finishCatalog: '10071',
    dateAdded: '3 December 2020',
    update: 'Operation Broken Fang',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Imperial Plaid',
    rarity: 'Extraordinary',
    collection: 'Clutch Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_plaid_purple_light_large.0315b76daffb839e03a9e543dc0d4a3abe716922.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. This pair of flannel and leather gloves has an imperial hue.',
    flavorText: '',
    finishStyle: '',
    finishCatalog: '10042',
    dateAdded: '16 February 2018',
    update: 'Clutch Case',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | King Snake',
    rarity: 'Extraordinary',
    collection: 'Clutch Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_snakeskin_white_light_large.f6a54c7a3cf91ecbe0a712bb2126bfe77f86825e.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. It has been crafted out of white leather and snakeskin.',
    flavorText: '',
    finishStyle: '',
    finishCatalog: '10041',
    dateAdded: '16 February 2018',
    update: 'Clutch Case',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Overtake',
    rarity: 'Extraordinary',
    collection: 'Clutch Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_stitched_black_orange_light_large.6cd14c51b9f239f57cf20603a13a8f9b7efb42ed.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. Speed is of the essence with these classic black and tan leather gloves.',
    flavorText: '',
    finishStyle: '',
    finishCatalog: '10043',
    dateAdded: '16 February 2018',
    update: 'Clutch Case',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Racing Green',
    rarity: 'Extraordinary',
    collection: 'Clutch Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_stitched_green_grey_light_large.808fca3933fe16b20eb0cc26bd78fbbc47988dad.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation.',
    flavorText: '',
    finishStyle: '',
    finishCatalog: '10044',
    dateAdded: '16 February 2018',
    update: 'Clutch Case',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Crimson Weave',
    rarity: 'Extraordinary',
    collection: 'Operation Hydra Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_red_light_large.137455fd6486c53fef15a523f86e2928743de97e.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'hese driving gloves offer protection from the elements while still maintaining tactile sensation. Black suede has been interwoven with scarlet leather to give these gloves a timeless look.',
    flavorText: 'Leave your mark, not your fingerprints',
    finishStyle: '',
    finishCatalog: '10016',
    dateAdded: '29 November 2016',
    update: 'Operation Hydra',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Diamondback',
    rarity: 'Extraordinary',
    collection: 'Operation Hydra Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_snakeskin_yellow_light_large.017f2c7fab2cecceb4444c05c80fa238f46264e0.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. It has been crafted out of a mix of tan leather, black leather, and snakeskin.',
    flavorText: 'Standard issue is for suckers... - Imogen, Arms Dealer In Training',
    finishStyle: '',
    finishCatalog: '10040',
    dateAdded: '29 November 2016',
    update: 'Operation Hydra',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Convoy',
    rarity: 'Extraordinary',
    collection: 'Operation Hydra Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_military_light_large.8da6c198b3bfb8a70f63bbd99a02ce8fc09c9a95.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. It has been made with a mix of brown soft leather and dyed suede.',
    flavorText: 'Sometimes discretion is called for',
    finishStyle: '',
    finishCatalog: '10015',
    dateAdded: '29 November 2016',
    update: 'Operation Hydra',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
  {
    name: 'Driver Gloves | Lunar Weave',
    rarity: 'Extraordinary',
    collection: 'Operation Hydra Case',
    imageUrl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/slick_gloves_slick_black_light_large.1a38e5968c549d49e791cf55bc4f89232e19e26f.png',
    floatCap: { min: 0.06, max: 0.80 },
    description: 'These driving gloves offer protection from the elements while still maintaining tactile sensation. Midnight blue suede has been interwoven with jet black leather to give these gloves a timeless look.',
    flavorText: 'Keeps the blood off your hands...metaphorically speaking',
    finishStyle: '',
    finishCatalog: '10013',
    dateAdded: '29 November 2016',
    update: 'Operation Hydra',
    category: 'Gloves',
    weaponType: 'Driver Gloves'
  },
];
/*
// Insert the array into the database
Skin.insertMany(skins)
  .then(() => console.log('Skins added successfully!'))
  .catch(err => console.error('Error adding skins:', err));

*/


module.exports = { Skin };

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

// Route to get a skin by name
app.get('/skins/:skinId', async (req, res) => {
  const { skinId } = req.params;
  try {
    const skin = await Skin.findById(skinId);
    if (!skin) {
      return res.status(404).send('Skin not found');
    }
    res.json(skin);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching skin');
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
