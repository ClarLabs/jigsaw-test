import { Router, Request, Response, NextFunction } from 'express'
import { createPost, deleteByTag, deletePost, getAllPosts, getPostById, searchPosts, updatePost } from './handlers'
import { Post } from '../../models/Post'

const router = Router()

// GET all posts with pagination and optional tag filter
router.get('/', getAllPosts)

router.delete('/', deleteByTag)

// GET search posts by title or content
router.get('/search', searchPosts)

// GET single post by ID
router.get('/:id', getPostById)

// POST create a new post (contains tricky bugs)
router.post('/', createPost)

// PUT update post (contains tricky bug)
router.put('/:id', updatePost)

// DELETE post (unexpected behavior if ID is malformed)
router.delete('/:id', deletePost)

export default router
