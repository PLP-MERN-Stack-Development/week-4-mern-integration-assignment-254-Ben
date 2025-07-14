const express = require('express');
const { getPosts,
  getRecentPosts,
  getPost,
  incrementViewCount,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getPostsByCategory, } = require('../controllers/postControllers');

const router = express.Router();
// Define routes for post operations
router.get('/', getPosts);
router.get('/recent', getRecentPosts);
router.get('/:slug', getPost);
router.put('/:slug/view', incrementViewCount);
router.post('/', createPost);
router.put('/:slug', updatePost);
router.delete('/:slug', deletePost);
router.post('/:slug/comments', addComment);
router.get('/category/:categoryId', getPostsByCategory);

// Export the router to be used in the main app file
module.exports = router;
