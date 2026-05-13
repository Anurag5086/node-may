const express = require('express');
const { createBlog, getAllBlogs, getBlogById } = require('../controllers/blogController');
const router = express.Router()

router.get('/blogs', getAllBlogs)
router.get('/blog/:id', getBlogById)
router.post('/blog', createBlog)
// router.put('/blog/:id', updateBlog)
// router.delete('/blog/:id', deleteBlog)

module.exports = router