const express = require('express');
const { getCategories,getCategory,createCategory,updateCategory,deleteCategory } = require('../controllers/categoryControler');  


const router = express.Router();
// Define routes for category operations
router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);  
// Export the router to be used in the main app file
module.exports = router;