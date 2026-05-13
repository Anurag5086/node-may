const blogData = require('../models/blogData')

exports.getAllBlogs = (req, res) => {
    res.status(200).json({success: true, blogData})
}

exports.getBlogById = (req, res) => {
    const blogId = parseInt(req.params.id)

    const blog = blogData.find(blog => blog.id === blogId)

    if(blog){
        res.status(200).json({success: true, blog})
    }else{
        res.status(404).json({success: false, message: "Blog not found"})
    }
}

exports.createBlog = (req, res) => {
    const { id, title, description } = req.body
    
    if(!id || !title || !description){
        res.status(400).json({success: false, message: "All fields required!"})
    }

    const newBlog = {
        id,
        title,
        description
    }

    console.log(blogData)

    blogData.push(newBlog)

    console.log(blogData)

    res.status(201).json({success: true, message: "Blog created successfully!"})
}