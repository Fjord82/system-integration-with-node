
const mongoose = require("mongoose");

mongoose.model("Order", {
    Date: {
        type: Date,
        require: true
    },
    ProductOrder: [{
        ProductId: {
            type: String,
            require: true
        },
        Quantity: {
            type: Number,
            require: true
        }
    }],
    Status: {
        type: String,
        require: false
         /*cancelled,
        completed,
        shipped,
        paid*/
    }
})

       
        