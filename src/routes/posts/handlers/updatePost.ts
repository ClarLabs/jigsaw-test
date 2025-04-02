import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, isMongoId, setCache } from '../../../utils'

export const updatePost = asyncHandler(
	async (req: Request<{ id: string }, null, { title: string; content: string; tags: string[] }>, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params
			const updates = req.body

			if (!isMongoId(id)) {
				throw new AppError('Invalid or missing post ID', 400)
			}

			const post = await Post.findById(id)
			if (!post) {
				throw new AppError('Post not found', 404)
			}

			Object.assign(post, updates)

			await post.save()

			const cacheKey = `post:${id}`
			const expiry = 60 * 60 // 1 hour
			await setCache(cacheKey, JSON.stringify(post), expiry)

			res.json(post)
		} catch (err) {
			next(err)
		}
	}
)
