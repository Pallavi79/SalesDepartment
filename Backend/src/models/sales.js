const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    id: {
        type:Number
    },
    title: {
        String
    },
    price: {
        type:Number
    },
    description:{
        type:String
    }, 
    category:{
        type:String
    },
    image: {
        type:String
    },
    sold: {
        type:Boolean
    },
    dateOfSale: {
        type:Date
    }
  },{timeStamps:true});

  const Sales = mongoose.model('Sales',salesSchema);

  module.exports = Sales;
