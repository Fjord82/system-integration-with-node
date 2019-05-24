const mongoose = require("mongoose");

mongoose.model("Product", {
    // Name Price ItemsInStock ItemsReserved
      Name: {
          type: String,
          require:  true
      },
      Price: {
          type: Number,
          require: true
      },
      ItemsInStock: {
          type: Number,
          require: true
      },
      ItemsReserved: {
          type: Number,
          require: true
      }
    
    
      
})