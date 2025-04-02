import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'

export const getAllPosts = async (req: Request<null, null, { page: number; limit: number; tag: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { page = 1, limit = 10, tag } = req.query
		const filter = tag ? { tags: tag } : {}
		const posts = await Post.find(filter)
			.sort({ createdAt: -1 })
			.limit(parseInt(`${limit}`))
			.skip((parseInt(`${page}`) - 1) * parseInt(`${limit}`))
		res.json({ posts, totalCount: posts.length, pages: Math.ceil(posts.length / parseInt(`${limit}`)) })
	} catch (err) {
		next(err)
	}
}
