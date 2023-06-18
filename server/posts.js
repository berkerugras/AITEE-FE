import express from 'express';
import { getPosts, createUser, loginUser, refreshToken, orderProduct, updateUser, putProductInMarket, getAllTheDocumentInMarketPlace, buyFromProduct, getAllOrderedProducts, getAllOrderedMarketProducts, getYourListedProducts } from './controllers.js';

// import { getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/get-all-documents', getAllTheDocumentInMarketPlace);
router.post('/fetch-all-orders', getAllOrderedProducts);
router.post('/fetch-all-market-orders', getAllOrderedMarketProducts);
router.post('/fetch-all-listed-orders', getYourListedProducts);
router.get('/market-product', putProductInMarket);
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/order-product', orderProduct);
router.post('/market-product', putProductInMarket);
router.put('/update', updateUser)
router.post('/buy-market-product', buyFromProduct);

// router.patch('/:id', updatePost);
// router.delete('/:id', deletePost);
// router.patch('/:id/likePost', likePost);

export default router;
