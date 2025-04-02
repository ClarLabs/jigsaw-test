import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, getCache, isMongoId, setCache } from '../../../utils'

export const getPostById = asyncHandler(async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params

		if (!isMongoId(id)) {
			throw new AppError('Invalid or missing post ID', 400)
		}

		const cacheKey = `post:${id}`
		const cachedPostStr = await getCache(cacheKey)
		if (cachedPostStr) {
			try {
				const cachedPost = JSON.parse(cachedPostStr)
				res.json({ ...cachedPost, isCached: true })
				return
			} catch (err) {
				// We don't want to throw an error here, just log it
				console.error('Error parsing cached post:', err)
				Sentry.captureException(err)
			}
		}

		const post = await Post.findById(id)
		if (!post) {
			throw new AppError('Post not found', 404)
		}

		const expiry = 60 * 60 // 1 hour
		await setCache(cacheKey, JSON.stringify(post), expiry)

		const postObject = Object.assign({ ...post.toObject(), isCached: false })

		res.json(postObject)
	} catch (err) {
		next(err)
	}
})
