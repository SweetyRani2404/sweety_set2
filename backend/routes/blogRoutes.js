import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createBlog, getBlogs, getBlogById } from '../controllers/blog.controller.js';

const router = Router();

router.post('/', auth, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);

export default router;
