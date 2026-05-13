const Blog = require("../models/Blog")

exports.getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find()
        res.status(200).json({success: true, blogs})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.getBlogById = async (req, res) => {
    try{
        const blogId = req.params.id

        // const blog = await Blog.find({_id: blogId}) -----> [{}]
        // const blog = await Blog.findOne({_id: blogId}) ----> {}
        const blog = await Blog.findById(blogId)
        if(!blog){
            res.status(404).json({success: false, message: "Blog not found"})
        }

        res.status(200).json({success: true, blog})

    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}

exports.createBlog = async (req, res) => {
    try{
        const { title, description } = req.body
        
        if(!title || !description){
            res.status(400).json({success: false, message: "All fields required!"})
        }

        // const blog = new Blog(
        //     title,
        //     description
        // )

        // await blog.save()

        const blog = await Blog.create(req.body)
        res.status(201).json({success: true, message: "Blog created successfully!", blog})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }

}

exports.updateBlog = async (req, res) => {
    try{
        const blogId = req.params.id

        const blog = await Blog.findById(blogId)
        if(!blog){
            res.status(404).json({success: false, message: "Blog not found!"})
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true })

        res.status(200).json({success: true, message: "Blog updated successfully!", updatedBlog})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}


exports.deleteBlog = async (req, res) => {
    try{
        const blogId = req.params.id

        const blog = await Blog.findById(blogId)
        if(!blog){
            res.status(404).json({success: false, message: "Blog not found!"})
        }

        await Blog.findByIdAndDelete(blogId)

        res.status(200).json({success: true, message: "Blog deleted successfully!"})
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error!"})
    }
}