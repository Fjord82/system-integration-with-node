
// Load express
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser"); 

        app.use(bodyParser.json());

// Load mongoose
        const mongoose = require("mongoose");
        
        // Using the Product Model
        require("./Product")
        const Product = mongoose.model("Product");

        //Connect
        mongoose.connect("mongodb+srv://new-user_31:new-user_31@miniproject-1ksmj.mongodb.net/test?retryWrites=true", () => {
            console.log("DB is connected");
        });

app.get("/products", (req, res) => {
Product.find().then((products) => {
    res.json(products)
}).catch(err => {
    throw err;
});

})


// Create func
app.post("/product", (req, res) => {
    var newProduct = {
        Name: req.body.Name,
        Price: req.body.Price,
        ItemsInStock: req.body.ItemsInStock,
        ItemsReserved: req.body.ItemsReserved
    }

    //Create new Product from request body
    var product = new Product(newProduct)
    
    product.save().then(() => {
        console.log("New book created");
    }).catch((err) => {
        console.log(err);
    });
    res.send("A new product was added to the DB!");
})

app.delete("/product/:id", (req, res) => {
    Product.findOneAndRemove(req.params.id).then(() => {
        res.send("Product removed succesfully!")
    }).catch(err => {
        throw err;
    })

    });


app.listen(8080, () => {
    console.log("Up and running! -- This is our Products service");
});
