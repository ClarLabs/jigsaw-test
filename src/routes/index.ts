import posts from './posts/posts'
import { Router } from 'express'

const router = Router()

router.use('/posts', posts)

export default router
