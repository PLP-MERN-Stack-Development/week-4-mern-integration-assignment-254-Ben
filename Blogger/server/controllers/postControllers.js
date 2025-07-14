const Post = require("../models/Post");

// // Create slug from title before saving
// const PostSchema = PostSchema.pre('save', function (next) {
//   if (!this.isModified('title')) {
//     return next();
//   }
  
//   this.slug = this.title
//     .toLowerCase()
//     .replace(/[^\w ]+/g, '')
//     .replace(/ +/g, '-');
    
//   next();
// });

// // Virtual for post URL
// PostSchema.virtual('url').get(function () {
//   return `/posts/${this.slug}`;
// });

// Get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
}
// sort by most recent
const getRecentPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .limit(5); // Adjust the limit as needed
  res.status(200).json(posts);
}
// get Single Post
const getPost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug })
    .populate('author', 'name')
    .populate('category', 'name');
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
}
// increment view count
const incrementViewCount = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOneAndUpdate(
    { slug },
    { $inc: { viewCount: 1 } },
    { new: true }
  );
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
}
// Create a new Post
const createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;
  const author = req.user._id; // Assuming user ID is stored in req.user
  const slug = title.toLowerCase().replace(/ /g, '-');
  const newPost = new Post({
    title,
    content,
    slug,
    author,
    category,
    tags: tags || [],
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
}
// Update a Post
const updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, category, tags } = req.body;
  const post = await Post.findOneAndUpdate(
    { slug }, 
    { title, content, category, tags },
    { new: true, runValidators: true }
  );
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
}
// Delete a Post
const deletePost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOneAndDelete({ slug });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json({ message: 'Post deleted successfully' });
}
// Add a comment to a post
const addComment = async (req, res) => {
  const { slug } = req.params;
  const { content } = req.body;
  const post = await Post.findOne({ slug });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const comment = {
    user: req.user._id, // Assuming user ID is stored in req.user
    content,
    createdAt: new Date(),
  };
  post.comments.push(comment);
  await post.save();
  res.status(201).json({ message: 'Comment added successfully', comment });
}
// Get posts by category
const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const posts = await Post.find({ category: categoryId })
    .populate('author', 'name')
    .populate('category', 'name')
    .sort({ createdAt: -1 });  
  res.status(200).json(posts);
}
module.exports = {
  getPosts,
  getRecentPosts,
  getPost,
  incrementViewCount,
  createPost,
  updatePost,
  deletePost,
  addComment,
  getPostsByCategory,
};