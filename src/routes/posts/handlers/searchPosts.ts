import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, getCache, setCache } from '../../../utils'

export const searchPosts = asyncHandler(
	async (
		req: Request<null, null, null, { q: string; page?: string; limit?: string; clearCache?: string }>,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const { page = 1, limit = 10, q, clearCache = false } = req.query
			const cacheKey = `posts:${page}:${limit}:${q}`
			const cachedPosts = await getCache(cacheKey)
			const expiry = 60 * 60 // 1 hour

			if (cachedPosts && clearCache === 'false') {
				try {
					const parsedPosts = JSON.parse(cachedPosts)
					res.json({
						results: parsedPosts,
						totalCount: parsedPosts.length,
						pages: Math.ceil(parsedPosts.length / parseInt(`${limit}`)),
						isCached: true
					})
					return
				} catch (err) {
					// We don't want to throw an error here, just log it
					console.error('Error parsing cached posts:', err)
					Sentry.captureException(err)
				}
			}

			if (!q) {
				throw new AppError('Query string is required', 400)
			}

			const results = await Post.find({
				$or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }]
			})
				.limit(parseInt(`${limit}`))
				.skip((parseInt(`${page}`) - 1) * parseInt(`${limit}`))
				.sort({ createdAt: -1 })

			if (results.length === 0) {
				throw new AppError('No posts found', 404)
			}

			await setCache(cacheKey, JSON.stringify(results), expiry)

			res.json({ results, totalCount: results.length, pages: Math.ceil(results.length / parseInt(`${limit}`)), isCached: false })
		} catch (err) {
			next(err)
		}
	}
)
