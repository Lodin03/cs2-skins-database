// updateCategory.js
const mongoose = require('mongoose');

// Import Skin model directly from server.js (assuming server.js is in the same directory)
const { Skin } = require('./server');  // Ensure the model is exported in server.js

const uri = "mongodb+srv://Lodin:8F7WyooagrPE4jtW@cs2-skins-db.uyvln.mongodb.net/?retryWrites=true&w=majority&appName=cs2-skins-db";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");

    // Run the updateMany operation
    Skin.updateMany(
      {},
      { $set: { category: "Pistol" } }
    )
      .then(result => {
        console.log(`Matched ${result.matchedCount} document(s)`);
        console.log(`Updated ${result.modifiedCount} document(s)`);
        mongoose.connection.close();
      })
      .catch(err => {
        console.error("Error updating skins:", err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });
