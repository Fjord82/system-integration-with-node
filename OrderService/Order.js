
const mongoose = require("mongoose");

mongoose.model("Order", {
    Date: {
        type: Date,
        require: true
    },
    ProductOrder: [{
        ProductId: {
            type: Number,
            require: true
        },
        Quantity: {
            type: Number,
            require: true
        }
    }],
    Status: {
        type: String,
        require: true
         /*cancelled,
        completed,
        shipped,
        paid*/
    }
})

       
        