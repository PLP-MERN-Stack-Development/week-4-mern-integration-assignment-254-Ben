const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: true,
      unique: true,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    color: {
      type: String, 
        required: true, 
    }
})
module.exports = mongoose.model('Category', CategorySchema);