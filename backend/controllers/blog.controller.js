import Blog from '../models/blog.model.js';
import { uploadImage } from '../services/cloudinary.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!title || !content || !image) {
      return res.status(400).json({ error: 'title, content, and image are required' });
    }

    const uploaded = await uploadImage(image, 'mini-blog');

    const blog = await Blog.create({
      title,
      content,
      imageURL: uploaded.secure_url,
      authorId: req.userId,
    });

    return res.status(201).json({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      imageURL: blog.imageURL,
      authorId: blog.authorId,
      createdAt: blog.createdAt,
    });
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({ error: 'Unable to create blog' });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate('authorId', 'name email');

    return res.status(200).json(
      blogs.map((b) => ({
        id: b._id,
        title: b.title,
        content: b.content,
        imageURL: b.imageURL,
        author: b.authorId ? { id: b.authorId._id, name: b.authorId.name, email: b.authorId.email } : null,
        createdAt: b.createdAt,
      }))
    );
  } catch (err) {
    console.error('Fetch blogs error:', err);
    return res.status(500).json({ error: 'Unable to fetch blogs' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('authorId', 'name email');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      imageURL: blog.imageURL,
      author: blog.authorId ? { id: blog.authorId._id, name: blog.authorId.name, email: blog.authorId.email } : null,
      createdAt: blog.createdAt,
    });
  } catch (err) {
    console.error('Fetch blog by id error:', err);
    return res.status(500).json({ error: 'Unable to fetch blog' });
  }
};
