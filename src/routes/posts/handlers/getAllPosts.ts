import * as Sentry from '@sentry/node'
import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { asyncHandler, getCache, setCache } from '../../../utils'

export const getAllPosts = asyncHandler(
	async (req: Request<null, null, { page: number; limit: number; tag: string; clearCache?: string }>, res: Response, next: NextFunction): Promise<void> => {
		try {
			const expiry = 60 * 60 // 1 hour
			const { page = 1, limit = 10, tag, clearCache = 'false' } = req.query
			const cacheKey = `posts:${page}:${limit}:${tag}`
			const filter = tag ? { tags: tag } : {}

			const cachedPosts = await getCache(cacheKey)
			if (cachedPosts && clearCache === 'false') {
				try {
					const parsedPosts = JSON.parse(cachedPosts)
					res.json({
						posts: parsedPosts,
						totalCount: parsedPosts.length,
						pages: Math.ceil(parsedPosts.length / parseInt(`${limit}`)),
						isCached: true
					})
					return
				} catch (err) {
					//we don't want to throw an error here, just log it
					console.error('Error parsing cached posts:', err)
					Sentry.captureException(err)
				}
			}

			const posts = await Post.find(filter)
				.sort({ createdAt: -1 })
				.limit(parseInt(`${limit}`))
				.skip((parseInt(`${page}`) - 1) * parseInt(`${limit}`))

			await setCache(cacheKey, JSON.stringify(posts), expiry)

			res.json({ posts, totalCount: posts.length, pages: Math.ceil(posts.length / parseInt(`${limit}`)), isCached: false })
		} catch (err) {
			next(err)
		}
	}
)
