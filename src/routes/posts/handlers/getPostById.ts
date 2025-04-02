import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'
import { isMongoId, getCache, setCache } from '../../../utils'

export const getPostById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params

		if (!isMongoId(id)) {
			res.status(400).json({ error: 'Invalid or missing post ID' })
			return
		}

		const cacheKey = `post:${id}`
		const cachedPostStr = await getCache(cacheKey)
		if (cachedPostStr) {
			try {
				const cachedPost = JSON.parse(cachedPostStr)
				res.json({ ...cachedPost, isCached: true })
				return
			} catch (err) {
				console.error('Error parsing cached post:', err)
			}
		}

		const post = await Post.findById(id)
		if (!post) {
			res.status(404).json({ error: 'Post not found' })
			return
		}

		const expiry = 60 * 60 // 1 hour
		await setCache(cacheKey, JSON.stringify(post), expiry)

		const postObject = Object.assign({ ...post.toObject(), isCached: false })

		res.json(postObject)
	} catch (err) {
		next(err)
	}
}
