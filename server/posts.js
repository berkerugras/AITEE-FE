import express from 'express';
import { getPosts, createUser, loginUser } from './controllers.js';

// import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/', getPosts);
router.post('/register', createUser);
router.post('/login', loginUser);
// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);

export default router;
